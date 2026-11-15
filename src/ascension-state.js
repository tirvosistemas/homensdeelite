import {dateKey,daysSince,grade} from './state.js';
import {readyConsolidation,validFields,rowsOf,readJSON} from './consolidation-state.js';
import {f} from './consolidation-data.js';
export const milestones=[30,60,90,120,150,180];
export const campaignFields=[
 f('Em 180 dias terei…'),f('Por que esta missão importa?'),f('Evidência objetiva de conclusão'),
 ...milestones.map(day=>f('Marco de '+day+' dias')),
 ...['Tempo','Dinheiro','Conhecimento','Pessoas','Ferramentas'].map(label=>f('Recurso: '+label)),
 ...Array.from({length:5},(_,i)=>[f('Risco '+(i+1)),f('Resposta ao risco '+(i+1))]).flat(),
 ...Array.from({length:5},(_,i)=>f('Indicador '+(i+1)+' — nome, referência inicial e meta','text',{optional:i>0})),
 f('Rotina semanal'),f('Não começarei… durante esta campanha'),f('Pessoa ou sistema de prestação de contas')
];
export const campaignDay=(start,now=dateKey())=>start?Math.max(1,daysSince(start,now)+1):0;
export function campaignReady(f,now=dateKey()){return !!f&&validFields(f,campaignFields)&&campaignDay(f.start,now)>=180&&milestones.every(day=>f['checkpoint'+day]?.trim()&&f['evidence'+day]?.trim())&&!!f.outcome?.trim();}
export function matrixResult(f){const rows=Array.from({length:5},(_,i)=>i).filter(i=>f['criterion'+i]?.trim());if(![0,1,2].every(i=>f['option'+i]?.trim())||!rows.length)return null;let total=0,scores=[0,0,0];for(const i of rows){const w=Number(f['weight'+i]);if(!Number.isFinite(w)||w<=0||w>100)return null;total+=w;for(let o=0;o<3;o++){const v=f['rating'+i+o];if(v===undefined||v===''||!Number.isFinite(Number(v))||Number(v)<0||Number(v)>10)return null;scores[o]+=w*Number(v);}}return scores.map((score,i)=>({name:f['option'+i],score:score/total})).sort((a,b)=>b.score-a.score);}
export const businessValues=f=>{const revenue=Number(f.f0),result=revenue-Number(f.f1)-Number(f.f2);return {revenue,result,margin:revenue>0?result/revenue*100:null};};
export const netWorth=f=>Number(f.f0)-Number(f.f1);
export function readyAscension(a,s,key,global,ctx){if(!global.completed[key]||!s)return false;
 if(a.type==='quiz')return s.values?.length===a.questions.length&&s.values.every((v,i)=>Number.isInteger(v)&&v>=0&&v<a.questions[i][1].length)&&(!a.exam||grade(a.questions,s.values).passed);
 if(a.type==='consolidation')return readyConsolidation(a,s,key,global,ctx);
 if(['diagnostic','exit'].includes(a.mode))return s.snapshot?.length===50&&s.snapshot.every(v=>Number.isInteger(v)&&v>=0&&v<=4);
 if(['contract','code'].includes(a.mode))return Number.isFinite(s.accepted);
 const f=s.saved;if(!f)return false;
 if(a.mode==='matrix')return !!matrixResult(f);
 if(a.mode==='risk')return rowsOf(f).length>0&&rowsOf(f).every(r=>r.f0?.trim()&&['Baixa','Média','Alta'].includes(r.f1)&&['Baixo','Médio','Alto'].includes(r.f2)&&r.f3?.trim());
 if(a.mode==='scope')return rowsOf(f).length>0&&rowsOf(f).every(r=>r.f0?.trim()&&['Essencial','Desejável','Depois'].includes(r.f1));
 if(a.mode==='connections')return rowsOf(f).length>=10&&rowsOf(f).every(r=>r.f0?.trim()&&r.f1?.trim()&&/^\d{4}-\d{2}-\d{2}$/.test(r.f2)&&Date.parse(r.f2)<=Date.parse(dateKey())&&['Sim','Não'].includes(r.f3))&&rowsOf(f).filter(r=>r.f3==='Sim').length>=5;
 if(a.mode==='order')return Array.from({length:6},(_,i)=>JSON.stringify([...readJSON(f['order'+i],[])].sort())==='[0,1,2,3]'&&!!f['reason'+i]?.trim()).every(Boolean);
 if(a.mode==='simulation'){const count=a.variant==='team'?4:12;return s.values?.length===count&&s.values.every(v=>Number.isInteger(v)&&v>=0&&v<3);}
 if(a.mode==='presentation')return !!f.until&&Date.now()>=Number(f.until)&&!!f.theme?.trim()&&!!f.structure?.trim()&&!!f.evidence?.trim()&&[0,1,2,3].every(i=>f['check'+i]==='yes');
 if(a.mode==='campaign')return campaignReady(f);
 if(a.mode==='dossier')return f.reviewed==='yes';return false;
}
export function ascensionGate(route,c,s,unitReady,priorDone){if(!priorDone)return {id:'f2-fim',title:'Conclua a Fase 2 — A Consolidação'};if(route==='fase-3')return null;
 for(const u of c.before){if(u.id===route)return null;if(!s.completed[u.id]||!unitReady(u))return u;}
 for(let i=0;i<c.modules.length;i++){const m=c.modules[i];if(m.lessons.some(u=>u.id===route))return null;const unfinished=m.lessons.find(u=>!s.completed[u.id]||!unitReady(u));if(unfinished)return unfinished;const p=c.passages[i];if(p){if(p.id===route)return null;if(!s.completed[p.id]||!unitReady(p))return p;}}
 for(const u of c.after){if(u.id===route)return null;if(!s.completed[u.id]||!unitReady(u))return u;}return null;
}
