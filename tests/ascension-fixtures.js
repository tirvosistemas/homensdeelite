import {f2Prerequisites,daysAgo} from './consolidation-fixtures.js';
import {dateKey} from '../src/state.js';
import {definition,requiredActivity} from '../src/widgets.js';
import {consolidationUnits} from '../src/consolidation-state.js';
import {campaignFields,milestones} from '../src/ascension-state.js';
export function sample3(field,i){if(field.type==='select')return field.options[0];if(field.type==='number')return '10';if(field.type==='date')return dateKey();if(field.type==='time')return '09:00';return 'Evidência concreta '+i;}
export function seedF3Unit(s,u){s.completed[u.id]=true;u.blocks.forEach((b,i)=>{const a=definition(b,u.moduleIndex),key=u.id+'-b'+i;if(!requiredActivity(a))return;s.completed[key]=true;const f={confirmed:'yes'};a.fields?.forEach((field,i)=>f['f'+i]=sample3(field,i));if(a.columns)f.rows=JSON.stringify([Object.fromEntries(a.columns.map((field,i)=>['f'+i,sample3(field,i)]))]);if(a.mode==='tracker'){f.start=daysAgo(a.days);f.days=JSON.stringify(Object.fromEntries(Array.from({length:a.days},(_,i)=>[i,{states:a.items.map(()=>'feito'),evidence:'Decisão e aprendizado',return:''}])));}
 if(a.mode==='matrix'){for(let i=0;i<3;i++){f['option'+i]='Opção '+i;f['rating0'+i]=String(i+3);}f.criterion0='Custo';f.weight0='1';}
 if(a.mode==='risk')f.rows=JSON.stringify([{f0:'Atraso',f1:'Média',f2:'Alto',f3:'Reduzir dependência'}]);
 if(a.mode==='scope')f.rows=JSON.stringify([{f0:'Entrega essencial',f1:'Essencial'}]);
 if(a.mode==='connections')f.rows=JSON.stringify(Array.from({length:10},(_,i)=>({f0:'Contexto '+i,f1:'Ajuda real '+i,f2:dateKey(),f3:'Sim'})));
 if(a.mode==='order')for(let i=0;i<6;i++){f['order'+i]='[0,1,2,3]';f['reason'+i]='Conter risco e apurar fatos';}
 if(a.mode==='presentation'){Object.assign(f,{theme:'Tema',structure:'Ideia e evidência',evidence:'Aprendi a pausar',until:String(Date.now()-1000)});for(let i=0;i<4;i++)f['check'+i]='yes';}
 if(a.mode==='campaign'){campaignFields.forEach((field,i)=>f['f'+i]=sample3(field,i));f.start=daysAgo(180);milestones.forEach(day=>{f['checkpoint'+day]='Reflexão '+day;f['evidence'+day]='Entrega '+day;});f.outcome='Resultado honesto';}
 if(a.mode==='dossier')f.reviewed='yes';s.answers[key]={fields:f,saved:{...f}};if(a.type==='quiz')Object.assign(s.answers[key],{values:a.questions.map(q=>q[2]),result:true});if(a.mode==='scale')Object.assign(s.answers[key],{values:a.items.map(()=>5),result:true});if(['diagnostic','exit'].includes(a.mode))s.answers[key].snapshot=Array(50).fill(2);if(['contract','code'].includes(a.mode))s.answers[key].accepted=Date.now();if(a.mode==='simulation')s.answers[key].values=Array(a.variant==='team'?4:12).fill(0);
 });}
export function f3Prerequisites(course,id,s=f2Prerequisites(course,'f2-fim')){const c=course.ascension;consolidationUnits(c);for(const u of c.before){if(u.id===id)return s;seedF3Unit(s,u);}for(let i=0;i<c.modules.length;i++){const m=c.modules[i];if(m.lessons.some(u=>u.id===id))return s;m.lessons.forEach(u=>seedF3Unit(s,u));const p=c.passages[i];if(p){if(p.id===id)return s;seedF3Unit(s,p);}}for(const u of c.after){if(u.id===id)return s;seedF3Unit(s,u);}return s;}
