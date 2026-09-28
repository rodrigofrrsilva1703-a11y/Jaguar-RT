(function(root,factory){
 const api=factory();
 if(typeof module!=='undefined'&&module.exports)module.exports=api;
 root.RTAV_QUIZ=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
 const shuffle=(items,random=Math.random)=>{
  const result=[...items];
  for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
  return result;
 };

 function pool(bank){
  return Object.entries(bank).flatMap(([module,group])=>[
   ...group.m.map((row,i)=>({id:`${module}-m${i}`,module,context:group.contexts?.m[i],prompt:row[0],choices:row[1],answer:row[2],explanation:row[3]})),
   ...group.v.map((row,i)=>({id:`${module}-v${i}`,module,context:group.contexts?.v[i],prompt:`Verdadeiro ou falso: ${row[0]}`,choices:['Verdadeiro','Falso'],answer:row[1]?0:1,explanation:row[2]}))
  ]);
 }

 function build(scope,bank,seen=[],moduleCounts={},previousIds=[],random=Math.random){
  const all=pool(bank),previous=new Set(previousIds),used=new Set(seen);
  const modules=Object.keys(bank);
  if(scope!=='all'&&!bank[scope])throw Error('Módulo inexistente');
  const chosenModules=scope==='all'
   ?shuffle(modules,random).sort((a,b)=>(moduleCounts[a]||0)-(moduleCounts[b]||0)).slice(0,10)
   :Array(10).fill(scope);
  const picked=[];
  for(const module of chosenModules){
   const choices=shuffle(all.filter(q=>q.module===module&&!picked.some(x=>x.id===q.id)),random)
    .sort((a,b)=>Number(used.has(a.id))-Number(used.has(b.id))||Number(previous.has(a.id))-Number(previous.has(b.id)));
   if(!choices.length)throw Error('Banco de perguntas insuficiente');
   picked.push(choices[0]);
  }
  return shuffle(picked,random).map(q=>{
   const options=shuffle(q.choices.map((text,index)=>({text,index})),random);
   return {id:q.id,module:q.module,context:q.context,prompt:q.prompt,options:options.map(x=>x.text),correct:options.findIndex(x=>x.index===q.answer),explanation:q.explanation};
  });
 }

 function grade(questions,answers){
  const details=questions.map((q,i)=>({id:q.id,module:q.module,selected:answers[i],correct:q.correct,ok:answers[i]===q.correct,explanation:q.explanation}));
  return {score:details.filter(x=>x.ok).length,total:questions.length,details};
 }
 return Object.freeze({pool,build,grade});
});
