import {f4Prerequisites} from './readiness-fixtures.js';
import {daysAgo} from './consolidation-fixtures.js';
import {definition,requiredActivity} from '../src/widgets.js';
import {consolidationUnits} from '../src/consolidation-state.js';
import {choiceProfiles,labDecisions,labPrinciples} from '../src/selection-lab-data.js';
export const laboratoryRows=()=>Array.from({length:32},(_,i)=>({step:String(i),profile:choiceProfiles[Math.floor(i/8)].id,decision:labDecisions[3],principle:labPrinciples[7],fact:String(i%8),reason:'Este fato precisa ser considerado no contexto disponível.',unknown:'Ainda não conheço todos os planos e compromissos.'}));
export function seedF5Unit(s,u){s.completed[u.id]=true;u.blocks.forEach((b,i)=>{const a=definition(b,u.moduleIndex),key=u.id+'-b'+i;if(!requiredActivity(a))return;s.completed[key]=true;const f={confirmed:'yes'};a.fields?.forEach((field,i)=>f['f'+i]=field.type==='select'?field.options[0]:'Minha reflexão concreta '+i);
 if(a.mode==='tracker'){f.start=daysAgo(a.days);f.practiceMode=a.practiceModes[0];f.days=JSON.stringify(Object.fromEntries(Array.from({length:a.days},(_,i)=>[i,{states:a.items.map(()=>'feito'),evidence:'Pratiquei o raciocínio com um cenário fictício '+i,return:''}])));for(let i=0;i<4;i++)f['week'+i]='Revisei a semana '+i;}
 if(a.mode==='observation'){f.context='Cenário fictício';a.items.forEach((_,i)=>{f['c'+i]=a.options[0];f['n'+i]='Fato fictício e contexto sem identificar ninguém';});}
 if(a.mode==='savior'){a.items.forEach((_,i)=>f['q'+i]='1');f.action='Oferecer apoio respeitando os limites';}
 if(a.mode==='conversations'){f.favorite0='yes';f.reflection='Abrir uma conversa natural sem exigir resposta.';}
 if(a.mode==='laboratory')f.rows=JSON.stringify(laboratoryRows());
 if(a.mode==='dossier')Object.assign(f,{interpretation:'Minha interpretação não é prova.',conversation:'Quero conhecer melhor os planos.',reason:'Ainda falta informação e decidirei sem pressa.',decision:'DESACELERAR E OBSERVAR',reviewed:'yes'});
 s.answers[key]={fields:f,saved:{...f}};if(a.type==='quiz')Object.assign(s.answers[key],{values:a.questions.map(q=>q[2]),result:true});if(['diagnostic','exit'].includes(a.mode))s.answers[key].snapshot=Array(50).fill(2);if(['contract','code'].includes(a.mode))s.answers[key].accepted=Date.now();
 });}
export function f5Prerequisites(course,id,s=f4Prerequisites(course,'f4-fim')){const c=course.selection;consolidationUnits(c);for(const u of c.before){if(u.id===id)return s;seedF5Unit(s,u);}for(let i=0;i<c.modules.length;i++){const m=c.modules[i];if(m.lessons.some(u=>u.id===id))return s;m.lessons.forEach(u=>seedF5Unit(s,u));const p=c.passages[i];if(p){if(p.id===id)return s;seedF5Unit(s,p);}}for(const u of c.after){if(u.id===id)return s;seedF5Unit(s,u);}return s;}
