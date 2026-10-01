create or replace function jaguarrt.merge_progress(previous jsonb,incoming jsonb) returns jsonb
language plpgsql immutable security invoker set search_path=pg_catalog as $$
declare merged jsonb:=incoming; study jsonb:=coalesce(previous->'study','{}')||coalesce(incoming->'study','{}'); item record; a jsonb; b jsonb; steps jsonb;
begin
 -- Different course orders must be migrated by the client before combining indexes.
 if coalesce(previous#>>'{study,__orderVersion}','1')<>coalesce(incoming#>>'{study,__orderVersion}','1') then return incoming; end if;
 for item in select key from jsonb_each(study) where key ~ '^[0-9]{2}$' loop
  a:=coalesce(previous->'study'->item.key,'{}');b:=coalesce(incoming->'study'->item.key,'{}');
  select coalesce(jsonb_agg(value order by value),'[]') into steps from (
   select distinct value from jsonb_array_elements(case when jsonb_typeof(a->'read')='array' then a->'read' else '[]'::jsonb end || case when jsonb_typeof(b->'read')='array' then b->'read' else '[]'::jsonb end)
  ) t;
  study:=jsonb_set(study,array[item.key],a||b||jsonb_build_object('read',steps));
 end loop;
 return jsonb_set(merged,'{study}',study);
end $$;
revoke all on function jaguarrt.merge_progress(jsonb,jsonb) from public,anon,authenticated;
grant execute on function jaguarrt.merge_progress(jsonb,jsonb) to service_role;
create or replace function public.jaguarrt_gateway(p_action text, p_token text default '', p_email text default '', p_password text default '', p_data jsonb default '{}') returns jsonb language plpgsql security invoker set search_path = pg_catalog,jaguarrt,extensions as $$
declare v_email text; v_admin boolean; v_result jsonb; v_count int;
begin
 if p_action='login' then
  p_email:=lower(trim(p_email));
  if p_email !~ '^[a-z0-9.!#$%&''*+/=?^_`{|}~-]+@jaguarcontabil\.com\.br$' or length(p_email)>254 then return jsonb_build_object('error','Use seu e-mail @jaguarcontabil.com.br.'); end if;
  insert into jaguarrt.login_limits(key,count) values (p_data->>'limit_key',1) on conflict(key) do update set count=case when login_limits.started_at<now()-interval '15 minutes' then 1 else login_limits.count+1 end,started_at=case when login_limits.started_at<now()-interval '15 minutes' then now() else login_limits.started_at end returning count into v_count;
  if v_count>15 then return jsonb_build_object('error','Muitas tentativas. Aguarde 15 minutos.'); end if;
  if not exists(select 1 from jaguarrt.settings where
   case when p_email='rodrigo.silva@jaguarcontabil.com.br'
    then admin_password_hash is not null and admin_password_hash=extensions.crypt(p_password,admin_password_hash)
    else password_hash=extensions.crypt(p_password,password_hash) end) then return jsonb_build_object('error','E-mail ou senha incorretos.'); end if;
  delete from jaguarrt.login_limits where key=p_data->>'limit_key';
  insert into jaguarrt.accounts(email,last_seen) values(p_email,now()) on conflict(email) do update set last_seen=now();
  insert into jaguarrt.sessions(token_hash,email) values(encode(extensions.digest(p_token,'sha256'),'hex'),p_email);
 end if;
 select s.email,s.email='rodrigo.silva@jaguarcontabil.com.br' into v_email,v_admin from jaguarrt.sessions s where s.token_hash=encode(extensions.digest(p_token,'sha256'),'hex') and s.expires_at>now();
 if v_email is null then return jsonb_build_object('error','Sessão expirada. Entre novamente.'); end if;
 if p_action='logout' then delete from jaguarrt.sessions where token_hash=encode(extensions.digest(p_token,'sha256'),'hex'); return '{}'::jsonb; end if;
 update jaguarrt.sessions set last_seen=now() where token_hash=encode(extensions.digest(p_token,'sha256'),'hex');
 update jaguarrt.accounts set last_seen=now() where email=v_email;
 if p_action='save' then update jaguarrt.accounts set state=jaguarrt.merge_progress(state,p_data) where email=v_email; end if;
 if p_action='attempt' then insert into jaguarrt.attempts(id,email,scope,score,details,order_version) values((p_data->>'id')::uuid,v_email,p_data->>'scope',(p_data->>'score')::int,p_data->'details',coalesce((p_data->>'orderVersion')::integer,2)) on conflict(id) do nothing; end if;
 if p_action='admin' then
  if not v_admin then return jsonb_build_object('error','Acesso exclusivo do administrador.'); end if;
  select coalesce(jsonb_agg(jsonb_build_object('email',a.email,'created_at',a.created_at,'last_seen',a.last_seen,'online',exists(select 1 from jaguarrt.sessions s where s.email=a.email and s.expires_at>now() and s.last_seen>now()-interval '2 minutes'),'state',a.state,'attempts',coalesce((select jsonb_agg(to_jsonb(t) order by t.created_at desc) from jaguarrt.attempts t where t.email=a.email),'[]'::jsonb)) order by a.last_seen desc),'[]'::jsonb) into v_result from jaguarrt.accounts a;
  return jsonb_build_object('accounts',v_result);
 end if;
 select jsonb_build_object('email',a.email,'admin',v_admin,'state',a.state,'attempts',coalesce((select jsonb_agg(to_jsonb(t) order by t.created_at desc) from jaguarrt.attempts t where t.email=v_email),'[]'::jsonb)) into v_result from jaguarrt.accounts a where a.email=v_email;
 return v_result;
end $$;
revoke all on function public.jaguarrt_gateway(text,text,text,text,jsonb) from public,anon,authenticated;
grant execute on function public.jaguarrt_gateway(text,text,text,text,jsonb) to service_role;
