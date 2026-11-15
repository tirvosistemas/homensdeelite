import {phaseAnswerReady} from './phase-flow.js';
export const KEY='homens-de-elite:v1';
export const ranks=[['Recruta',0],['Aprendiz da Forja',100],['Homem em Construção',300],['Sentinela',650],['Guardião',1000],['Homem de Estatura',1500],['Homem de Elite',2200],['Guardião da Forja',5000],['Construtor',6500],['Homem Consolidado',8000],['Estrategista',9500],['Comandante da Forja',11000],['Homem de Influência',12500],['Homem de Ascensão',14000]];
export const fresh=()=>({version:1,completed:{},awards:{},answers:{},notes:{},challenges:{},visited:{},dates:[],last:null,pledged:false});
export const xp=s=>Object.values(s.awards).reduce((sum,a)=>sum+a,0);
export const rank=s=>ranks.filter(r=>xp(s)>=r[1]).at(-1);
export function award(s,id,points){if(Object.hasOwn(s.awards,id))return 0;s.awards[id]=points;return points;}
export const dateKey=(date=new Date())=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
export function daysSince(start,now=dateKey()) {return Math.floor((Date.parse(now+'T12:00:00Z')-Date.parse(start+'T12:00:00Z'))/86400000);}
export function streak(dates,now=dateKey()){const unique=new Set(dates);let n=0;let d=new Date(now+'T12:00:00Z');if(!unique.has(now))d.setUTCDate(d.getUTCDate()-1);while(unique.has(d.toISOString().slice(0,10))){n++;d.setUTCDate(d.getUTCDate()-1);}return n;}
export function challengeStats(rows,width,eligible=rows.length){let best=0,run=0,complete=0;const totals=Array(width).fill(0);for(let i=0;i<Math.min(eligible,rows.length);i++){const row=rows[i]||[];row.forEach((v,j)=>{if(v&&j<width)totals[j]++});if(Array.from({length:width},(_,j)=>!!row[j]).every(Boolean)){run++;complete++;best=Math.max(best,run)}else run=0;}return {complete,best,current:run,totals,percent:Math.round(totals.reduce((a,b)=>a+b,0)/(rows.length*width)*100)};}
export function validateState(value){
 if(!value||typeof value!=='object'||value.version!==1)throw Error('Formato de backup incompatível.');
 const object=v=>v&&typeof v==='object'&&!Array.isArray(v);
 const safeKey=k=>!['__proto__','constructor','prototype'].includes(k);
 for(const k of ['completed','awards','answers','notes','challenges','visited'])if(!object(value[k])||!Object.keys(value[k]).every(safeKey))throw Error('Backup inválido: '+k);
 if(!Object.values(value.awards).every(n=>Number.isFinite(n)&&n>=0&&n<=500))throw Error('XP inválido.');
 if(!Object.values(value.notes).every(n=>typeof n==='string'))throw Error('Anotações inválidas.');
 if(!Object.values(value.completed).every(n=>n===true)||!Object.values(value.visited).every(n=>n===true))throw Error('Progresso inválido.');
 if(!Array.isArray(value.dates)||!value.dates.every(d=>/^\d{4}-\d{2}-\d{2}$/.test(d)))throw Error('Datas inválidas.');
 for(const c of Object.values(value.challenges))if(!object(c)||!/^\d{4}-\d{2}-\d{2}$/.test(c.start)||!Array.isArray(c.rows)||!c.rows.every(r=>Array.isArray(r)&&r.every(v=>typeof v==='boolean')))throw Error('Desafio inválido.');
 for(const [answerKey,a] of Object.entries(value.answers)){
  if(!object(a))throw Error('Resposta inválida.');
  for(const k of ['fields','saved'])if(a[k]!==undefined&&(!object(a[k])||!Object.values(a[k]).every(v=>typeof v==='string')))throw Error('Reflexão inválida.');
  if(/^f[23]-/.test(answerKey))for(const record of [a.fields,a.saved])if(record){
   for(const k of ['rows','history','days','journal'])if(record[k]!==undefined){let parsed;try{parsed=JSON.parse(record[k]);}catch{throw Error('Registro da Consolidação inválido.');}if(['rows','history'].includes(k)?!Array.isArray(parsed):!object(parsed))throw Error('Estrutura da Consolidação inválida.');if(k==='rows'&&!parsed.every(r=>object(r)&&Object.values(r).every(v=>typeof v==='string')))throw Error('Tabela da Consolidação inválida.');if(['days','journal'].includes(k)&&!Object.values(parsed).every(r=>object(r)&&('states' in r?Array.isArray(r.states)&&r.states.every(v=>['feito','manutencao','nao',''].includes(v))&&['return','evidence'].every(f=>r[f]===undefined||typeof r[f]==='string'):Object.values(r).every(v=>typeof v==='string'))))throw Error('Registro diário da Consolidação inválido.');}
  }
  if(answerKey.startsWith('f3-'))for(const record of [a.fields,a.saved])if(record)for(const [key,value] of Object.entries(record))if(/^order[0-5]$/.test(key)){let order;try{order=JSON.parse(value);}catch{throw Error('Ordem da Ascensão inválida.');}if(!Array.isArray(order)||JSON.stringify([...order].sort())!=='[0,1,2,3]')throw Error('Ordem da Ascensão inválida.');}
  if(a.values!==undefined&&(!Array.isArray(a.values)||!a.values.every(v=>v===null||(Number.isInteger(v)&&v>=0&&v<=50))))throw Error('Alternativas inválidas.');
  if(a.baseline!==undefined&&(!Array.isArray(a.baseline)||a.baseline.length!==12||!a.baseline.every(v=>Number.isInteger(v)&&v>=0&&v<=2)))throw Error('Espelho inicial inválido.');
  if(a.points!==undefined&&(!Array.isArray(a.points)||!a.points.every(v=>Number.isFinite(v)&&v>=0&&v<=100)))throw Error('Orçamento inválido.');
  if(a.entries!==undefined&&(!Array.isArray(a.entries)||!a.entries.every(v=>object(v)&&typeof v.name==='string'&&typeof v.group==='string')))throw Error('Classificação inválida.');
  if(a.steps!==undefined&&(!Array.isArray(a.steps)||!a.steps.every(v=>typeof v==='boolean')))throw Error('Etapas inválidas.');
  if(a.snapshot!==undefined&&(!Array.isArray(a.snapshot)||a.snapshot.length!==(['f3-entrada-b0','f3-saida-b0'].includes(answerKey)?50:['f2-entrada-b0','f2-saida-b0'].includes(answerKey)?42:45)||!a.snapshot.every(v=>Number.isInteger(v)&&v>=0&&v<=4)))throw Error('Diagnóstico inválido.');
  if(a.initialValues!==undefined&&(!Array.isArray(a.initialValues)||a.initialValues.length!==15||!a.initialValues.every(v=>Number.isInteger(v)&&v>=0&&v<=3)))throw Error('Índice inicial inválido.');
  for(const k of ['started','accepted','recorded'])if(a[k]!==undefined&&(!Number.isFinite(a[k])||a[k]<0))throw Error('Data de atividade inválida.');
  if(a.logged!==undefined&&(!object(a.logged)||!Object.entries(a.logged).every(([k,v])=>['0','1','2'].includes(k)&&Number.isFinite(v)&&v>=0)))throw Error('Registro diário inválido.');
  if(a.history!==undefined&&(!Array.isArray(a.history)||!a.history.every(h=>object(h)&&Number.isFinite(h.started)&&object(h.fields)&&Object.values(h.fields).every(v=>typeof v==='string')&&(h.logged===undefined||(object(h.logged)&&Object.values(h.logged).every(Number.isFinite))))))throw Error('Histórico de missão inválido.');
  if(a.index!==undefined&&(!Number.isInteger(a.index)||a.index<0))throw Error('Índice inválido.');
  if(a.people!==undefined&&(!Array.isArray(a.people)||!a.people.every(p=>object(p)&&typeof p.name==='string'&&['Fortalece','Neutro','Drena'].includes(p.group))))throw Error('Influências inválidas.');
  if(a.rows!==undefined&&(!Array.isArray(a.rows)||!a.rows.every(r=>Array.isArray(r)&&r.length===4&&r.every(v=>Number.isInteger(v)&&v>=0&&v<=100))))throw Error('Semana inválida.');
  if(a.counts!==undefined&&(!Array.isArray(a.counts)||a.counts.length!==4||!a.counts.every(v=>Number.isInteger(v)&&v>=0&&v<=50)))throw Error('Contagens inválidas.');
 }
 if(value.last!==null&&typeof value.last!=='string')throw Error('Última aula inválida.');
 if(typeof value.pledged!=='boolean')throw Error('Código de conduta inválido.');
 return {...fresh(),...value,curriculumRevision:value.curriculumRevision||1};
}
export function loadState(storage){try{const raw=storage.getItem(KEY);return {state:raw?validateState(JSON.parse(raw)):fresh(),error:null}}catch(e){return {state:fresh(),error:'Não foi possível carregar o progresso local. Exporte seus dados antes de limpar o navegador.'}}}
export function saveState(storage,state){try{storage.setItem(KEY,JSON.stringify(state));return true}catch{return false}}
export function grade(questions,answers){const correct=questions.reduce((n,q,i)=>n+(answers[i]===q[2]?1:0),0);return {correct,total:questions.length,percent:Math.round(correct/questions.length*100),passed:correct/questions.length>=.7};}
export const gadoGroups=[['Carência e ansiedade',[4,5,13]],['Falta de limites',[2,6,11]],['Idealização e insistência',[1,8,14]],['Validação e aparência',[3,7,12]],['Centralidade do relacionamento',[0,9,10]]];
export function gadoScore(answers){const total=answers.reduce((a,b)=>a+b,0);return {total,band:total<=10?0:total<=20?1:total<=30?2:3,areas:gadoGroups.map(([name,indices])=>({name,value:indices.reduce((n,i)=>n+answers[i],0)})).sort((a,b)=>b.value-a.value)};}

// Expansion migration preserves answer positions, notes and earned XP.
export function reconcileCurriculum(s,course,definitions){
 const units=course.modules.flatMap(m=>m.lessons);
 const revision=s.curriculumRevision||1;
 if(revision<2&&(course.revision||1)>=2){
  for(const u of units)if(u.blocks.some(b=>b.expansion))delete s.completed[u.id];
 }
 for(const {key,definition:a,unit} of definitions){
  if(!a)continue;
  const saved=s.answers[key];let valid=true;
  if(a.result==='gado'&&saved?.result&&saved.values?.length===15&&!saved.initialValues){saved.initialValues=[...saved.values];saved.initialOrigin='legacy';}
  if(a.type==='quiz'||a.type==='scale'){
   const count=(a.questions||a.items).length;
   const firstMissing=Array.from({length:count},(_,i)=>i).find(i=>!Number.isInteger(saved?.values?.[i]));
   if(firstMissing!==undefined){valid=false;if(saved){saved.result=false;saved.index=firstMissing;saved.revealed=false;}}
  }
  if(a.type==='phase')valid=phaseAnswerReady(a,saved);
  if(a.type==='form')valid=!!saved?.saved&&a.fields.every((_,i)=>String(saved.saved['f'+i]||'').trim());
  if(a.type==='challenge'){
   const c=s.challenges[key];
   if(c){c.rows=Array.from({length:a.days},(_,i)=>Array.from({length:a.items.length},(_,j)=>c.rows[i]?.[j]===true));valid=c.rows.every(r=>r.every(Boolean));}else valid=false;
  }
  if(!valid){delete s.completed[key];delete s.completed[unit.id];}
 }
 const pledge=units.find(u=>u.kind==='pledge');
 if(units.filter(u=>u.id.startsWith('m6-')).some(u=>u.kind!=='pledge'&&!s.completed[u.id])){s.pledged=false;if(pledge)delete s.completed[pledge.id];}
 s.curriculumRevision=course.revision||1;
 return s;
}
