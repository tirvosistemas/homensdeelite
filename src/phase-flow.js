import {validHours,validPriorities,categories} from './phase-data.js';
export function orderedUnits(course){const list=[...course.phase.before];course.modules.forEach((m,i)=>{m.lessons.forEach(u=>{u.moduleIndex=i;});list.push(...m.lessons);if(course.phase.passages[i])list.push(course.phase.passages[i]);});return [...list,...course.phase.after];}
export function gateFor(id,course,s,ready){
 const before=course.phase.before;
 const moduleDone=m=>m.lessons.every(u=>s.completed[u.id]&&ready(u));
 if(id===before[0].id)return null;
 if(!s.completed[before[0].id]||!ready(before[0]))return before[0];
 if(id===before[1].id)return null;
 if(!s.completed[before[1].id]||!ready(before[1]))return before[1];
 for(let i=0;i<course.modules.length;i++){
  const m=course.modules[i];if(m.lessons.some(u=>u.id===id)){if(id==='m7-mission')return m.lessons.find(u=>u.id!==id&&(!s.completed[u.id]||!ready(u)))||null;return null;}
  if(!moduleDone(m))return m.lessons.find(u=>!s.completed[u.id]||!ready(u));
  const p=course.phase.passages[i];if(p){if(id===p.id)return null;if(!s.completed[p.id]||!ready(p))return p;}
 }
 for(const stage of course.phase.after){if(id===stage.id)return null;if(!s.completed[stage.id]||!ready(stage))return stage;}
 return null;
}
export function passageReady(a,s,now=Date.now()){
 return (!a.delayHours||Number.isFinite(s.started)&&now-s.started>=a.delayHours*3600000)
  &&(a.checks||[]).every((_,i)=>s.fields?.['c'+i]==='yes')
  &&(a.fields||[]).every((_,i)=>s.fields?.['f'+i]?.trim());
}
export function directionReady(s,now=Date.now()){
 if(!Number.isFinite(s.started)||now-s.started<72*3600000)return false;
 return [0,1,2].every(i=>s.fields?.['d'+i]?.trim()&&s.logged?.[i]>=s.started+i*86400000&&s.logged[i]<s.started+(i+1)*86400000);
}

export function phaseAnswerReady(a,s){
 if(!s)return false;
 const f=s.saved||{},filled=n=>Array.from({length:n},(_,i)=>f['f'+i]?.trim()).every(Boolean);
 if(['diagnostic','exit'].includes(a.mode))return s.snapshot?.length===45&&s.snapshot.every(v=>Number.isInteger(v)&&v>=0&&v<=4);
 if(a.mode==='contract')return Number.isFinite(s.accepted);
 if(a.mode==='passage')return !!s.saved&&passageReady(a,{...s,fields:f});
 if(a.mode==='identity')return filled(3);
 if(a.mode==='votes')return Array.from({length:8},(_,i)=>f['v'+i]).every(v=>['HOMEM ANTIGO','HOMEM EM CONSTRUÇÃO'].includes(v));
 if(a.mode==='principles')return filled(5)&&new Set(Array.from({length:5},(_,i)=>f['f'+i].trim().toLocaleLowerCase('pt-BR'))).size===5&&Array.from({length:5},(_,i)=>f['s'+i]).every(v=>['VIVO ISSO','EM CONSTRUÇÃO','AINDA CONTRADIGO'].includes(v));
 if(a.mode==='compass')return filled(4);
 if(a.mode==='hours')return validHours(f)&&filled(1);
 if(a.mode==='priorities')return validPriorities(f);
 if(a.mode==='timeline')return [1,3,10].every(y=>categories.some((_,i)=>f[`y${y}c${i}`]?.trim()));
 if(a.mode==='letter')return filled(8);
 if(a.mode==='direction')return !!s.saved&&directionReady({...s,fields:f});
 if(a.mode==='mirror')return ['0','1','2'].includes(f.choice);
 if(a.mode==='dossier')return !!s.saved;
 return false;
}
