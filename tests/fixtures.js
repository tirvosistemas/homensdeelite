import {fresh} from '../src/state.js';
import {definition,requiredActivity} from '../src/widgets.js';
export function seedUnit(s,u,mi){s.completed[u.id]=true;u.blocks.forEach((b,i)=>{const a=definition(b,mi),key=u.id+'-b'+i;if(!requiredActivity(a))return;s.completed[key]=true;const old=s.answers[key]||{};
 if(a.type==='quiz')s.answers[key]={...old,values:a.questions.map(q=>q[2]),result:true};
 if(a.type==='scale')s.answers[key]={...old,values:Array(a.items.length).fill(0),result:true,...(a.baseline?{baseline:old.baseline||Array(12).fill(0)}:{})};
 if(a.type==='form'){const fields=Object.fromEntries(a.fields.map((_,j)=>['f'+j,'Registro anterior '+j]));s.answers[key]={...old,fields,saved:fields};}
 if(a.type==='phase'){
 const fields={};
 if(['identity','compass','letter','principles'].includes(a.mode))for(let j=0;j<(a.mode==='letter'?8:a.mode==='principles'?5:a.mode==='compass'?4:3);j++)fields['f'+j]='Registro de construção '+j;
 if(a.mode==='principles')for(let j=0;j<5;j++)fields['s'+j]='EM CONSTRUÇÃO';
 if(a.mode==='votes')for(let j=0;j<8;j++)fields['v'+j]='HOMEM EM CONSTRUÇÃO';
 if(a.mode==='hours'){fields.h0='168';fields.f0='Preciso rever minha distribuição.';for(let j=1;j<11;j++)fields['h'+j]='0';}
 if(a.mode==='priorities'){fields.g0='Construir uma habilidade';fields.p0='AGORA';}
 if(a.mode==='timeline')for(const y of [1,3,10])fields['y'+y+'c0']='Cuidar da saúde';
 const extra={};if(a.mode==='direction'){extra.started=Date.now()-73*3600000;extra.logged={};for(let j=0;j<3;j++){fields['d'+j]='Ação concreta '+j;extra.logged[j]=extra.started+j*86400000+3600000;}}
 s.answers[key]={fields,saved:{...fields},...extra};
 }
 if(a.type==='challenge')s.challenges[key]={start:'2025-01-01',rows:Array.from({length:a.days},()=>Array(a.items.length).fill(true))};
 });}
export function seedOnboarding(s){s.completed['diagnostico-entrada']=s.completed['diagnostico-entrada-b0']=s.completed.contrato=s.completed['contrato-b0']=true;s.answers['diagnostico-entrada-b0']={snapshot:Array(45).fill(2),recorded:Date.now()};s.answers['contrato-b0']={accepted:Date.now()};return s;}
export function seedPassage(s,p){const a=p.blocks[0];s.completed[p.id]=s.completed[p.id+'-b0']=true;const fields={...Object.fromEntries(a.fields.map((_,i)=>['f'+i,'Ação real registrada'])),...Object.fromEntries(a.checks.map((_,i)=>['c'+i,'yes']))};s.answers[p.id+'-b0']={fields,saved:{...fields},started:Date.now()-49*3600000};}
export function prerequisites(course,id,s=fresh()){s.curriculumRevision=3;seedOnboarding(s);const mi=course.modules.findIndex(m=>m.lessons.some(u=>u.id===id));for(let i=0;i<mi;i++){course.modules[i].lessons.forEach(u=>seedUnit(s,u,i));seedPassage(s,course.phase.passages[i]);}if(id==='m7-mission')course.modules[6].lessons.filter(u=>u.id!==id).forEach(u=>seedUnit(s,u,6));return s;}
