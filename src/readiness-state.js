import {readyConsolidation,validFields} from './consolidation-state.js';
import {grade} from './state.js';
import {motivationLabels,timeLabels,habitLabels,passageDependencies} from './readiness-data.js';
const finite=(f,key,max)=>typeof f?.[key]==='string'&&f[key].trim()!==''&&Number.isFinite(Number(f[key]))&&Number(f[key])>=0&&Number(f[key])<=max;
export const motivationTotal=f=>motivationLabels.reduce((sum,_,i)=>sum+Number(f['m'+i]||0),0);
export const timeTotal=f=>timeLabels.reduce((sum,_,i)=>sum+Number(f['h'+i]||0),0);
export const socialBudget=f=>({available:Number(f.f0)-Number(f.f1)-Number(f.f2)-Number(f.f3),planned:Number(f.f4)});
export function readinessDependencies(a,ctx){return (passageDependencies[(a.passage||0)-1]||[]).flatMap(id=>ctx?.allTools?.().filter(t=>t.unit.id===id)||[]);}
export function readyReadiness(a,s,key,global,ctx){if(!global.completed[key]||!s)return false;
 if(a.type==='quiz')return s.values?.length===a.questions.length&&s.values.every((v,i)=>Number.isInteger(v)&&v>=0&&v<a.questions[i][1].length)&&(!a.exam||grade(a.questions,s.values).passed);
 if(a.type==='consolidation')return readyConsolidation(a,s,key,global,ctx);
 if(['diagnostic','exit'].includes(a.mode))return s.snapshot?.length===50&&s.snapshot.every(v=>Number.isInteger(v)&&v>=0&&v<=4);
 if(['contract','code'].includes(a.mode))return Number.isFinite(s.accepted);
 const f=s.saved;if(!f)return false;
 if(a.mode==='motivation')return motivationLabels.every((_,i)=>finite(f,'m'+i,100)&&Number.isInteger(Number(f['m'+i])))&&motivationTotal(f)===100&&!!f.reflection?.trim();
 if(a.mode==='time')return timeLabels.every((_,i)=>finite(f,'h'+i,168))&&timeTotal(f)<=168&&!!f.reflection?.trim();
 if(a.mode==='budget'){const b=socialBudget(f);return [0,1,2,3,4].every(i=>finite(f,'f'+i,1e12))&&b.planned<=Math.max(0,b.available)&&!!f.reflection?.trim();}
 if(a.mode==='inventory')return f.nohistory==='yes'||s.values?.length===7&&s.values.every(v=>Number.isInteger(v)&&v>=0&&v<=4);
 if(a.mode==='habits'){const priorities=[0,1,2].map(i=>Number(f['priority'+i]));return s.values?.length===20&&s.values.every(v=>Number.isInteger(v)&&v>=0&&v<=2)&&priorities.every((v,i)=>f['priority'+i]!==''&&Number.isInteger(v)&&v>=0&&v<habitLabels.length)&&new Set(priorities).size===3&&!!f.action?.trim();}
 if(a.mode==='tasks')return Array.from({length:3},(_,i)=>!!f['task'+i]?.trim()&&!!f['evidence'+i]?.trim()).every(Boolean);
 if(a.mode==='simulation'||a.mode==='conflict'){const count=a.mode==='conflict'?6:15;return s.values?.length===count&&s.values.every(v=>Number.isInteger(v)&&v>=0&&v<4);}
 if(a.mode==='passage'){const refs=readinessDependencies(a,ctx);return refs.length>0&&refs.every(t=>global.completed[t.unit.id]&&readyReadiness(t.definition,global.answers[t.key],t.key,global,ctx))&&f.confirmed==='yes';}
 if(a.mode==='dossier')return f.reviewed==='yes';return false;
}

export function readinessGate(route,c,s,unitReady,priorDone){if(!priorDone)return {id:'f3-fim',title:'Conclua a Fase 3 — A Ascensão'};if(route==='fase-4')return null;for(const u of c.before){if(u.id===route)return null;if(!s.completed[u.id]||!unitReady(u))return u;}for(let i=0;i<c.modules.length;i++){const m=c.modules[i];if(m.lessons.some(u=>u.id===route))return null;const unfinished=m.lessons.find(u=>!s.completed[u.id]||!unitReady(u));if(unfinished)return unfinished;const p=c.passages[i];if(p){if(p.id===route)return null;if(!s.completed[p.id]||!unitReady(p))return p;}}for(const u of c.after){if(u.id===route)return null;if(!s.completed[u.id]||!unitReady(u))return u;}return null;}
