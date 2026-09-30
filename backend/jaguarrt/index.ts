import bank from './bank.ts';
const URL=Deno.env.get('SUPABASE_URL')!;
const KEY=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const SITE='https://rodrigofrrsilva1703-a11y.github.io/Jaguar-RTAV/';
const ADMIN='rodrigo.silva@jaguarcontabil.com.br';
const headers={'Content-Type':'application/json','Access-Control-Allow-Origin':'https://rodrigofrrsilva1703-a11y.github.io','Access-Control-Allow-Headers':'content-type, authorization','Access-Control-Allow-Methods':'POST, OPTIONS','Cache-Control':'no-store'};
async function rpc(args:unknown){const r=await fetch(URL+'/rest/v1/rpc/jaguarrt_gateway',{method:'POST',headers:{'Content-Type':'application/json',apikey:KEY,Authorization:'Bearer '+KEY},body:JSON.stringify(args)});if(!r.ok) throw Error('Não foi possível salvar os dados. Tente novamente.');return r.json();}
Deno.serve(async(req)=>{
 if(req.method==='OPTIONS')return new Response(null,{headers});
 const reply=(data:unknown,status=200)=>new Response(JSON.stringify(data),{status,headers});
 try{
 if(req.method!=='POST')return reply({error:'Método inválido'},405);
 const raw=await req.text();if(raw.length>150000)return reply({error:'Dados muito grandes'},413);
 const b=JSON.parse(raw);let token=b.token||'';
 if(b.action==='login'){
  token=crypto.randomUUID().replaceAll('-','')+crypto.randomUUID().replaceAll('-','');
  const ip=req.headers.get('x-forwarded-for')?.split(',')[0]||'unknown';
  const result=await rpc({p_action:'login',p_token:token,p_email:String(b.email||''),p_password:String(b.password||''),p_data:{limit_key:ip}});
  return reply(result.error?result:{...result,token},result.error?401:200);
 }
 if(!/^[a-f0-9]{64}$/.test(token))return reply({error:'Entre para continuar.'},401);
 if(!['state','save','attempt','logout','admin','send_admin','verify_admin'].includes(b.action))return reply({error:'Ação inválida'},400);
 const me=await rpc({p_action:'state',p_token:token});if(me.error)return reply(me,401);
 if(b.action==='send_admin'){
  if(me.email!==ADMIN)return reply({error:'Acesso restrito ao administrador.'},403);
  const r=await fetch(URL+'/auth/v1/otp?redirect_to='+encodeURIComponent(SITE),{method:'POST',headers:{'Content-Type':'application/json',apikey:Deno.env.get('SUPABASE_ANON_KEY')!},body:JSON.stringify({email:ADMIN,create_user:true})});
  if(!r.ok)return reply({error:'O envio de confirmação precisa ser configurado no Supabase (SMTP e URL de redirecionamento).'},503);
  return reply({sent:true});
 }
 if(b.action==='verify_admin'){
  if(me.email!==ADMIN)return reply({error:'Acesso restrito.'},403);
  const r=await fetch(URL+'/auth/v1/user',{headers:{apikey:Deno.env.get('SUPABASE_ANON_KEY')!,Authorization:'Bearer '+String(b.access_token||'')}});
  const user=await r.json();if(!r.ok||user.email!==ADMIN||!user.email_confirmed_at)return reply({error:'Confirmação de e-mail inválida ou expirada.'},403);
 }
 let data=b.data||{};
 if(b.action==='save'){
  if(!data||typeof data!=='object'||Array.isArray(data))return reply({error:'Progresso inválido'},400);
  data={study:data.study||{},history:data.history||{},quiz:data.quiz||null};
 }
 if(b.action==='attempt'){
  if(!Array.isArray(data.questions)||data.questions.length!==10||new Set(data.questions.map((q:any)=>q.id)).size!==10||!Array.isArray(data.answers))return reply({error:'Teste inválido'},400);
  const details=data.questions.map((q:any,i:number)=>{
   const match=/^(\d{2})-([mcv])(\d+)$/.exec(q.id);if(!match)throw Error('Questão inválida');
   const row=(bank as any)[match[1]]?.[match[2]]?.[Number(match[3])];if(!row)throw Error('Questão inválida');
   const choices=match[2]==='v'?['Verdadeiro','Falso']:match[2]==='c'?row[2]:row[1];
   const answer=match[2]==='v'?(row[1]?0:1):match[2]==='c'?row[3]:row[2];
   const selected=q.options?.[data.answers[i]];
   if(!choices.includes(selected))throw Error('Resposta inválida');
   return {id:q.id,module:match[1],selected,correct:choices[answer],ok:selected===choices[answer]};
  });
  if(data.scope!=='all'&&details.some((q:any)=>q.module!==data.scope))throw Error('Módulo inválido');
  data={id:data.id,scope:data.scope,score:details.filter((q:any)=>q.ok).length,details};
 }
 const result=await rpc({p_action:b.action,p_token:token,p_data:data});return reply(result,result.error?403:200);
 }catch(e){return reply({error:e instanceof Error?e.message:'Erro inesperado'},400);}
});
