create schema if not exists jaguarrt;
revoke all on schema jaguarrt from public, anon, authenticated;
grant usage on schema jaguarrt to service_role;
create table jaguarrt.settings (id boolean primary key default true check(id), password_hash text not null);
create table jaguarrt.accounts (email text primary key, created_at timestamptz not null default now(), last_seen timestamptz, state jsonb not null default '{}');
create table jaguarrt.sessions (token_hash text primary key, email text not null references jaguarrt.accounts(email), expires_at timestamptz not null default now()+interval '12 hours', last_seen timestamptz not null default now(), admin_until timestamptz);
create table jaguarrt.attempts (id uuid primary key, email text not null references jaguarrt.accounts(email), scope text not null, score integer not null check(score between 0 and 10), details jsonb not null, created_at timestamptz not null default now());
create table jaguarrt.login_limits (key text primary key, count integer not null default 0, started_at timestamptz not null default now());
alter table jaguarrt.settings enable row level security;
alter table jaguarrt.accounts enable row level security;
alter table jaguarrt.sessions enable row level security;
alter table jaguarrt.attempts enable row level security;
alter table jaguarrt.login_limits enable row level security;
grant all on all tables in schema jaguarrt to service_role;
create index on jaguarrt.sessions(email);
create index on jaguarrt.attempts(email,created_at desc);
create function public.jaguarrt_gateway(p_action text, p_token text default '', p_email text default '', p_password text default '', p_data jsonb default '{}') returns jsonb language plpgsql security invoker set search_path = pg_catalog,jaguarrt,extensions as $$
declare v_email text; v_admin boolean; v_result jsonb; v_count int;
begin
 if p_action='login' then
  p_email:=lower(trim(p_email));
  if p_email !~ '^[a-z0-9.!#$%&''*+/=?^_`{|}~-]+@jaguarcontabil\.com\.br$' or length(p_email)>254 then return jsonb_build_object('error','Use seu e-mail @jaguarcontabil.com.br.'); end if;
  insert into jaguarrt.login_limits(key,count) values (p_data->>'limit_key',1) on conflict(key) do update set count=case when login_limits.started_at<now()-interval '15 minutes' then 1 else login_limits.count+1 end,started_at=case when login_limits.started_at<now()-interval '15 minutes' then now() else login_limits.started_at end returning count into v_count;
  if v_count>15 then return jsonb_build_object('error','Muitas tentativas. Aguarde 15 minutos.'); end if;
  if not exists(select 1 from jaguarrt.settings where password_hash=extensions.crypt(p_password,password_hash)) then return jsonb_build_object('error','E-mail ou senha incorretos.'); end if;
  insert into jaguarrt.accounts(email,last_seen) values(p_email,now()) on conflict(email) do update set last_seen=now();
  insert into jaguarrt.sessions(token_hash,email) values(encode(extensions.digest(p_token,'sha256'),'hex'),p_email);
 end if;
 select s.email,coalesce(s.admin_until>now(),false) into v_email,v_admin from jaguarrt.sessions s where s.token_hash=encode(extensions.digest(p_token,'sha256'),'hex') and s.expires_at>now();
 if v_email is null then return jsonb_build_object('error','Sessão expirada. Entre novamente.'); end if;
 if p_action='logout' then delete from jaguarrt.sessions where token_hash=encode(extensions.digest(p_token,'sha256'),'hex'); return '{}'::jsonb; end if;
 update jaguarrt.sessions set last_seen=now() where token_hash=encode(extensions.digest(p_token,'sha256'),'hex');
 update jaguarrt.accounts set last_seen=now() where email=v_email;
 if p_action='save' then update jaguarrt.accounts set state=p_data where email=v_email; end if;
 if p_action='attempt' then insert into jaguarrt.attempts(id,email,scope,score,details) values((p_data->>'id')::uuid,v_email,p_data->>'scope',(p_data->>'score')::int,p_data->'details') on conflict(id) do nothing; end if;
 if p_action='verify_admin' and v_email='rodrigo.silva@jaguarcontabil.com.br' then
  update jaguarrt.sessions set admin_until=now()+interval '1 hour' where token_hash=encode(extensions.digest(p_token,'sha256'),'hex');v_admin:=true;
 end if;
 if p_action='admin' then
  if not v_admin then return jsonb_build_object('error','Confirme o e-mail do administrador para acessar.'); end if;
  select coalesce(jsonb_agg(jsonb_build_object('email',a.email,'created_at',a.created_at,'last_seen',a.last_seen,'online',exists(select 1 from jaguarrt.sessions s where s.email=a.email and s.expires_at>now() and s.last_seen>now()-interval '2 minutes'),'state',a.state,'attempts',coalesce((select jsonb_agg(to_jsonb(t) order by t.created_at desc) from jaguarrt.attempts t where t.email=a.email),'[]'::jsonb)) order by a.last_seen desc),'[]'::jsonb) into v_result from jaguarrt.accounts a;
  return jsonb_build_object('accounts',v_result);
 end if;
 select jsonb_build_object('email',a.email,'admin',v_admin,'state',a.state,'attempts',coalesce((select jsonb_agg(to_jsonb(t) order by t.created_at desc) from jaguarrt.attempts t where t.email=v_email),'[]'::jsonb)) into v_result from jaguarrt.accounts a where a.email=v_email;
 return v_result;
end $$;
revoke all on function public.jaguarrt_gateway(text,text,text,text,jsonb) from public,anon,authenticated;
grant execute on function public.jaguarrt_gateway(text,text,text,text,jsonb) to service_role;
