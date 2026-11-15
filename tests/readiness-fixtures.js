import {f3Prerequisites} from './ascension-fixtures.js';
import {daysAgo} from './consolidation-fixtures.js';
import {definition,requiredActivity} from '../src/widgets.js';
import {consolidationUnits} from '../src/consolidation-state.js';
export function seedF4Unit(s,u){s.completed[u.id]=true;u.blocks.forEach((b,i)=>{const a=definition(b,u.moduleIndex),key=u.id+'-b'+i;if(!requiredActivity(a))return;s.completed[key]=true;const f={confirmed:'yes'};a.fields?.forEach((field,i)=>f['f'+i]=field.type==='select'?field.options[0]:field.type==='number'?'5':'Ação responsável '+i);
 if(a.mode==='tracker'){f.start=daysAgo(a.days);f.days=JSON.stringify(Object.fromEntries(Array.from({length:a.days},(_,i)=>[i,{states:a.items.map(()=>'feito'),evidence:'Observei uma situação real e escolhi uma resposta responsável '+i,return:''}])));if(a.custom)for(let i=0;i<a.custom;i++)f['essential'+i]='Ajuste concreto '+i;if(a.weekly)for(let i=0;i<4;i++)f['week'+i]='Revisei e ajustei a semana '+i;}
 if(a.mode==='motivation'){for(let i=0;i<9;i++)f['m'+i]=i===0?'100':'0';f.reflection='Quero construir com responsabilidade';}
 if(a.mode==='time'){for(let i=0;i<8;i++)f['h'+i]='10';f.reflection='Tenho espaço e cuidarei da atenção';}
 if(a.mode==='budget')Object.assign(f,{f0:'5000',f1:'2000',f2:'500',f3:'1500',f4:'300',reflection:'Experiências possíveis'});
 if(a.mode==='habits')Object.assign(f,{priority0:'1',priority1:'3',priority2:'7',action:'Mudarei a rotina com uma ação concreta'});
 if(a.mode==='tasks')for(let i=0;i<3;i++){f['task'+i]='Pendência '+i;f['evidence'+i]='Resolvida com evidência '+i;}
 if(a.mode==='dossier')f.reviewed='yes';s.answers[key]={fields:f,saved:{...f}};if(a.type==='quiz')Object.assign(s.answers[key],{values:a.questions.map(q=>q[2]),result:true});if(a.mode==='scale')Object.assign(s.answers[key],{values:a.items.map(()=>3),result:true});if(['diagnostic','exit'].includes(a.mode))s.answers[key].snapshot=Array(50).fill(2);if(['contract','code'].includes(a.mode))s.answers[key].accepted=Date.now();if(a.mode==='inventory')Object.assign(s.answers[key],{values:Array(7).fill(1),result:true});if(a.mode==='habits')s.answers[key].values=Array(20).fill(1);if(['conflict','simulation'].includes(a.mode))s.answers[key].values=Array(a.mode==='conflict'?6:15).fill(0);
 });}
export function f4Prerequisites(course,id,s=f3Prerequisites(course,'f3-fim')){const c=course.readiness;consolidationUnits(c);for(const u of c.before){if(u.id===id)return s;seedF4Unit(s,u);}for(let i=0;i<c.modules.length;i++){const m=c.modules[i];if(m.lessons.some(u=>u.id===id))return s;m.lessons.forEach(u=>seedF4Unit(s,u));const p=c.passages[i];if(p){if(p.id===id)return s;seedF4Unit(s,p);}}for(const u of c.after){if(u.id===id)return s;seedF4Unit(s,u);}return s;}
