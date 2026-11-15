import {readyConsolidation} from './consolidation-state.js';
import {grade} from './state.js';
import {passageDependencies5} from './selection-data.js';
import {laboratoryReady} from './selection-lab-data.js';
export const observationContexts=['Cenário fictício','Situação observada, sem identificação'];
export const isUnknown=value=>/não sei|não observei|conhecer melhor|informação insuficiente/i.test(value||'');
export const personalDecisions=['CONTINUAR CONHECENDO','DESACELERAR E OBSERVAR','NÃO AVANÇAR'];
export function observationReady(a,f){return f&&observationContexts.includes(f.context)&&a.items.every((_,i)=>a.options.includes(f['c'+i])&&(isUnknown(f['c'+i])||!!f['n'+i]?.trim()));}
export function reciprocityLabel(a,f){const values=a.items.map((_,i)=>f['c'+i]),known=values.filter(v=>!isUnknown(v));if(known.length<5)return 'INCONCLUSIVA';if(values.filter(v=>v==='Pouco movimento observado').length>=3)return 'BAIXA RECIPROCIDADE';if(values.filter(v=>v==='Movimento consistente').length>=6&&!values.includes('Pouco movimento observado'))return 'RECIPROCIDADE CONSISTENTE';return 'INCONCLUSIVA';}
export function selectionDependencies(a,ctx){return (passageDependencies5[(a.passage||0)-1]||[]).flatMap(id=>ctx?.allTools?.().filter(t=>t.unit.id===id)||[]);}
export function readySelection(a,s,key,global,ctx){if(!global.completed[key]||!s)return false;if(a.type==='quiz')return s.values?.length===a.questions.length&&s.values.every((v,i)=>Number.isInteger(v)&&v>=0&&v<a.questions[i][1].length)&&(!a.exam||grade(a.questions,s.values).passed);if(a.type==='consolidation'){if(!readyConsolidation(a,s,key,global,ctx))return false;return !a.practiceModes||a.practiceModes.includes(s.saved.practiceMode);}
 if(['diagnostic','exit'].includes(a.mode))return s.snapshot?.length===50&&s.snapshot.every(v=>Number.isInteger(v)&&v>=0&&v<=4);if(['contract','code'].includes(a.mode))return Number.isFinite(s.accepted);const f=s.saved;if(!f)return false;
 if(a.mode==='observation')return observationReady(a,f);
 if(a.mode==='savior')return a.items.every((_,i)=>f['q'+i]!==''&&f['q'+i]!==undefined&&Number.isInteger(Number(f['q'+i]))&&Number(f['q'+i])>=0&&Number(f['q'+i])<=4)&&!!f.action?.trim();
 if(a.mode==='conversations'){const count=Object.keys(f).filter(k=>/^favorite\d+$/.test(k)&&f[k]==='yes').length;return count>=1&&count<=5&&!!f.reflection?.trim();}
 if(a.mode==='passage'){const refs=selectionDependencies(a,ctx);return refs.length>0&&refs.every(t=>global.completed[t.unit.id]&&readySelection(t.definition,global.answers[t.key],t.key,global,ctx))&&f.confirmed==='yes';}
 if(a.mode==='laboratory')return laboratoryReady(f);
 if(a.mode==='dossier')return ['interpretation','conversation','reason'].every(k=>f[k]?.trim())&&personalDecisions.includes(f.decision)&&f.reviewed==='yes';return false;
}
export function selectionGate(route,c,s,unitReady,priorDone){if(!priorDone)return {id:'f4-fim',title:'Conclua a Fase 4 — A Prontidão'};if(route==='fase-5')return null;for(const u of c.before){if(u.id===route)return null;if(!s.completed[u.id]||!unitReady(u))return u;}for(let i=0;i<c.modules.length;i++){const m=c.modules[i];if(m.lessons.some(u=>u.id===route))return null;const unfinished=m.lessons.find(u=>!s.completed[u.id]||!unitReady(u));if(unfinished)return unfinished;const p=c.passages[i];if(p){if(p.id===route)return null;if(!s.completed[p.id]||!unitReady(p))return p;}}for(const u of c.after){if(u.id===route)return null;if(!s.completed[u.id]||!unitReady(u))return u;}return null;}
