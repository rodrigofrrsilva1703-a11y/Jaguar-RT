(function(root,factory){
 const rules=factory();
 if(typeof module!=='undefined'&&module.exports) module.exports=rules;
 root.RTAV_RULES=rules;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
 const reviewedAt='2026-09-27';
 const transition={
  2026:{old:1,cbs:0,ibs:0,status:'base_2026',sourceType:'base',note:'2026 é usado como cenário-base da ferramenta.'},
  2027:{old:1,cbs:8.9,ibs:.1,status:'premissa_rtav',sourceType:'premissa',note:'Premissa didática RTAV: total de 9% em 2027, separado em CBS 8,9% + IBS 0,1%.'},
  2028:{old:1,cbs:8.9,ibs:.1,status:'premissa_rtav',sourceType:'premissa',note:'Premissa didática RTAV: mesma estrutura usada para 2027.'},
  2029:{old:.9,cbs:9,ibs:1.891,status:'premissa_rtav',sourceType:'premissa',note:'RTAV: CBS 9% + 10% de IBS cheio estimado em 18,91%; ICMS/ISS a 90%.'},
  2030:{old:.8,cbs:9,ibs:3.782,status:'premissa_rtav',sourceType:'premissa',note:'RTAV: CBS 9% + 20% de IBS cheio estimado; ICMS/ISS a 80%.'},
  2031:{old:.7,cbs:9,ibs:5.673,status:'premissa_rtav',sourceType:'premissa',note:'RTAV: CBS 9% + 30% de IBS cheio estimado; ICMS/ISS a 70%.'},
  2032:{old:.6,cbs:9,ibs:7.564,status:'premissa_rtav',sourceType:'premissa',note:'RTAV: CBS 9% + 40% de IBS cheio estimado; ICMS/ISS a 60%.'},
  2033:{old:0,cbs:9,ibs:18.91,status:'premissa_rtav',sourceType:'premissa',note:'RTAV: projeção didática total de 27,91%; ICMS/ISS extintos.'}
 };

 const simpleTables={
  I:{
   rates26:[[180000,4,0],[360000,7.3,5940],[720000,9.5,13860],[1800000,10.7,22500],[3600000,14.3,87300],[4800000,19,378000]],
   rates27:[[180000,4,0],[360000,7.3,5940],[720000,9.5,13860],[1800000,10.7,22500],[3600000,14.3,87300],[4800000,18.9,378000]],
   cbs27:[15.33,15.33,15.33,15.33,15.33,34.02],ibs27:[.17,.17,.17,.17,.17,0],cbs29:[15.5,15.5,15.5,15.5,15.5,34.4],oldBase:[34,34,33.5,33.5,33.5,0]
  },
  II:{
   rates26:[[180000,4.5,0],[360000,7.8,5940],[720000,10,13860],[1800000,11.2,22500],[3600000,14.7,85500],[4800000,30,720000]],
   rates27:[[180000,4.5,0],[360000,7.8,5940],[720000,10,13860],[1800000,11.2,22500],[3600000,14.7,85500],[4800000,29.9,720000]],
   cbs27:[13.85,13.85,13.85,13.85,13.85,25.22],ibs27:[.15,.15,.15,.15,.15,0],cbs29:[14,14,14,14,14,25.5],oldBase:[32,32,32,32,32,0]
  },
  III:{
   rates26:[[180000,6,0],[360000,11.2,9360],[720000,13.5,17640],[1800000,16,35640],[3600000,21,125640],[4800000,33,648000]],
   rates27:[[180000,6,0],[360000,11.2,9360],[720000,13.5,17640],[1800000,16,35640],[3600000,21,125640],[4800000,32.9,648000]],
   cbs27:[15.43,16.91,16.42,16.42,15.43,19.29],ibs27:[.17,.19,.19,.19,.17,0],cbs29:[15.6,17.1,16.6,16.6,15.6,19.5],oldBase:[33.5,32,32.5,32.5,33.5,0]
  },
  IV:{
   rates26:[[180000,4.5,0],[360000,9,8100],[720000,10.2,12420],[1800000,14,39780],[3600000,22,183780],[4800000,33,828000]],
   rates27:[[180000,4.5,0],[360000,9,8100],[720000,10.2,12420],[1800000,14,39780],[3600000,22,183780],[4800000,32.9,828000]],
   cbs27:[21.26,24.73,23.74,22.75,21.76,24.7],ibs27:[.24,.27,.26,.25,.24,0],cbs29:[21.5,25,24,23,22,25],oldBase:[44.5,40,40,40,40,0]
  },
  V:{
   rates26:[[180000,15.5,0],[360000,18,4500],[720000,19.5,9900],[1800000,20.5,17100],[3600000,23,62100],[4800000,30.5,540000]],
   rates27:[[180000,15.5,0],[360000,18,4500],[720000,19.5,9900],[1800000,20.5,17100],[3600000,23,62100],[4800000,30.4,540000]],
   cbs27:[16.96,16.96,17.95,18.94,16.96,19.78],ibs27:[.19,.19,.20,.21,.19,0],cbs29:[17.15,17.15,18.15,19.15,17.15,20],oldBase:[14,17,19,21,23.5,0]
  }
 };

 return Object.freeze({
  version:'2026.09.27-1',
  reviewedAt,
  transition:Object.freeze(transition),
  simpleTables:Object.freeze(simpleTables),
  metadata:Object.freeze({
   transition:{classification:'premissas_didaticas_e_transicao',source:'RTAV + materiais oficiais indicados na plataforma',reviewedAt},
   simpleTables:{classification:'tabelas_do_modelo_de_simulacao',source:'base vigente adotada pelo projeto; validar enquadramento real do contribuinte',reviewedAt},
   warning:'A ferramenta separa regras oficiais de premissas didáticas. Premissas RTAV não devem ser tratadas como alíquota universal definitiva.'
  })
 });
});
