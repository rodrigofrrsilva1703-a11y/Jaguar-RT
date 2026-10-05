/* Load the pinned, local Excel library only for an explicit export. */
window.JaguarExports=(()=>{
 const url=new URL('vendor/xlsx-0.18.5.min.js',document.currentScript.src).href;
 let pending=null;
 function load(){
  if(window.XLSX)return Promise.resolve(window.XLSX);
  if(pending)return pending;
  pending=new Promise((resolve,reject)=>{
   const script=document.createElement('script');script.src=url;script.async=true;
   let finished=false;
   const finish=error=>{
    if(finished)return;finished=true;clearTimeout(timer);
    script.onload=script.onerror=null;
    if(error){script.remove();pending=null;reject(error);}else resolve(window.XLSX);
   };
   const timer=setTimeout(()=>finish(new Error('A exportação demorou a carregar. Verifique a conexão e tente novamente.')),15000);
   script.onload=()=>finish(window.XLSX?null:new Error('Não foi possível preparar o Excel. Tente novamente.'));
   script.onerror=()=>finish(new Error('Não foi possível preparar o Excel. Verifique a conexão e tente novamente.'));
   document.head.appendChild(script);
  });
  return pending;
 }
 async function run(id,task,statusId){
  const button=document.getElementById(id);if(!button||button.disabled)return;
  let status=document.getElementById(statusId||id+'Status');
  if(!status){status=document.createElement('p');status.id=id+'Status';status.className='export-status';status.setAttribute('role','status');button.insertAdjacentElement('afterend',status);}
  const content=button.innerHTML;button.disabled=true;button.setAttribute('aria-busy','true');button.textContent='Preparando Excel…';status.textContent='';
  try{await load();await task();status.textContent='Arquivo exportado.';}
  catch(error){status.textContent=error.message||'Não foi possível exportar. Tente novamente.';}
  finally{button.innerHTML=content;button.disabled=false;button.removeAttribute('aria-busy');}
 }
 return {load,run};
})();
