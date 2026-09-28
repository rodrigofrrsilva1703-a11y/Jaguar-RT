const assert=require('node:assert/strict');
const bank=require('../quiz-bank.js');
const quiz=require('../quiz-engine.js');

const pool=quiz.pool(bank);
assert.equal(Object.keys(bank).length,13);
assert.equal(pool.length,260);
assert.equal(new Set(pool.map(q=>q.id)).size,260);
for(const [module,group] of Object.entries(bank)){
 assert.equal(group.m.length+group.c.length+group.v.length,20,`Módulo ${module}`);
 assert.equal(group.c.length,5,`Casos novos do módulo ${module}`);
 assert.equal(group.contexts.m.length,group.m.length,`Contextos de múltipla escolha ${module}`);
 assert.equal(group.contexts.v.length,group.v.length,`Contextos de verdadeiro/falso ${module}`);
 for(const q of pool.filter(x=>x.module===module)){
  assert.ok(q.prompt&&q.explanation&&q.context?.length>45,`Contexto específico em ${q.id}`);
  assert.notEqual(q.context,q.prompt);
  assert.ok(q.choices.length>=2&&q.choices.every(Boolean));
  assert.ok(q.answer>=0&&q.answer<q.choices.length);
  assert.equal(new Set(q.choices).size,q.choices.length);
 }
}

for(const module of Object.keys(bank)){
 const first=quiz.build(module,bank);
 assert.equal(first.length,10);
 assert.ok(first.every(q=>q.module===module));
 assert.equal(first.filter(q=>q.kind==='case').length,5);
 assert.equal(first.filter(q=>q.kind==='concept').length,5);
 assert.equal(new Set(first.map(q=>q.id)).size,10);
 const second=quiz.build(module,bank,first.map(q=>q.id),{},first.map(q=>q.id));
 assert.equal(second.length,10);
 assert.ok(second.every(q=>!first.some(p=>p.id===q.id)),`Dez questões inéditas na segunda seleção do módulo ${module}`);
 const perfect=quiz.grade(first,first.map(q=>q.correct));
 assert.equal(perfect.score,10);
 assert.equal(quiz.grade(first,first.map(q=>(q.correct+1)%q.options.length)).score,0);
}
const mixed=quiz.build('all',bank);
assert.equal(mixed.length,10);
assert.equal(new Set(mixed.map(q=>q.module)).size,10,'Teste geral deve cobrir 10 módulos distintos');
assert.equal(mixed.filter(q=>q.kind==='case').length,5);
const counts=Object.fromEntries(mixed.map(q=>[q.module,1]));
const next=quiz.build('all',bank,mixed.map(q=>q.id),counts,mixed.map(q=>q.id));
assert.equal(next.length,10);
assert.ok(next.some(q=>!counts[q.module]),'Próximo teste geral inclui módulos não selecionados');
console.log('✓ quiz-engine: banco, seleção, renovação e correção validados');
