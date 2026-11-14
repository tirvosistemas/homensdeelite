import {daysSince,dateKey,grade} from './state.js';
export const readJSON=(value,fallback)=>{try{const data=JSON.parse(value);return data??fallback}catch{return fallback}};
export const rowsOf=f=>{const rows=readJSON(f?.rows,[]);return Array.isArray(rows)?rows.filter(r=>r&&typeof r==='object'&&!Array.isArray(r)&&Object.values(r).every(v=>typeof v==='string')):[];};
export function validFields(fields={},schema=[]){return schema.every((field,i)=>{const v=fields['f'+i];if(field.optional&&!String(v||'').trim())return true;if(typeof v!=='string'||!v.trim())return false;if(field.type==='number')return Number.isFinite(Number(v))&&Number(v)>=(field.min??-Infinity)&&Number(v)<=(field.max??Infinity)&&(field.step!==1||Number.isInteger(Number(v)));if(field.type==='select')return field.options.includes(v)&&v!=='Escolha';if(field.type==='date')return /^\d{4}-\d{2}-\d{2}$/.test(v)&&Number.isFinite(Date.parse(v+'T12:00:00Z'));if(field.type==='time')return /^([01]\d|2[0-3]):[0-5]\d$/.test(v);return true;});}
export function budgetValues(fields){return {income:Number(fields.f0),fixed:Number(fields.f1),variable:Number(fields.f2),payments:Number(fields.f3),debt:Number(fields.f4),reserve:Number(fields.f5),balance:Number(fields.f0)-Number(fields.f1)-Number(fields.f2)-Number(fields.f3)};}
export const reservePercent=fields=>Number(fields.f1)>0?Number(fields.f2)/Number(fields.f1)*100:0;
export function trackerRows(f){const data=readJSON(f?.days,{});return data&&typeof data==='object'&&!Array.isArray(data)?data:{};}
export function dayRecorded(row,count,strict=false){return row&&Array.isArray(row.states)&&row.states.length===count&&row.states.every(v=>['feito','manutencao',...(strict?[]:['nao'])].includes(v))&&(!row.states.includes('nao')||typeof row.return==='string'&&row.return.trim());}
export function trackerReady(a,f,now=dateKey()){if(!f?.start||daysSince(f.start,now)<a.days-1)return false;const days=trackerRows(f);if(!Array.from({length:a.days},(_,i)=>dayRecorded(days[i],a.items.length,a.strict)).every(Boolean))return false;if(a.evidence&&!Array.from({length:a.days},(_,i)=>days[i]?.evidence?.trim()).every(Boolean))return false;if(a.weekly&&!Array.from({length:Math.floor(a.days/7)},(_,i)=>f['week'+i]?.trim()).every(Boolean))return false;return true;}
export const cycleDay=(start,now=dateKey())=>start?Math.max(1,daysSince(start,now)+1):0;
export const indicatorProgress=(initial,target,current)=>target===initial?null:(current-initial)/(target-initial)*100;
export function readyConsolidation(a,s,key,global,ctx){if(!global.completed[key]||!s)return false;
 if(a.type==='quiz')return Array.from({length:a.questions.length},(_,i)=>Number.isInteger(s.values?.[i])).every(Boolean)&&(!a.exam||grade(a.questions,s.values).passed);
 const f=s.saved;
 if(['diagnostic','exit'].includes(a.mode))return s.snapshot?.length===42&&s.snapshot.every(v=>Number.isInteger(v)&&v>=0&&v<=4);
 if(a.mode==='contract')return Number.isFinite(s.accepted);
 if(!f)return false;
 if(['form','finance','reserve','front','first-move','listening','assertive'].includes(a.mode)){if(!validFields(f,a.fields))return false;if(a.mode==='first-move')return f.began==='yes';if(a.mode==='front')return Object.values(f).filter(v=>v==='ATAQUE').length===1&&Object.values(f).filter(v=>v==='DESENVOLVIMENTO').length===2;return true;}
 if(a.mode==='scale')return s.values?.length===a.items.length&&s.values.every(v=>Number.isInteger(v)&&v>=0&&v<a.options.length);
 if(a.mode==='table')return (a.allowEmpty&&f.empty==='yes')||(rowsOf(f).length>0&&rowsOf(f).every(r=>validFields(r,a.columns)));
 if(a.mode==='tracker'||a.mode==='passage-days')return trackerReady(a,f);
 if(a.mode==='checkpoint'){const plan=ctx?.getHQ();return !!plan?.saved?.start&&f.cycle===plan.saved.start&&cycleDay(plan.saved.start)>=a.day&&[0,1,2,3].every(i=>f['f'+i]?.trim());}
 if(a.mode==='hq')return !!f.start&&validFields(f,a.fields||[]);
 if(a.mode==='dossier')return f.reviewed==='yes';
 return !!f.confirmed;
}
export function consolidationUnits(c){const units=[...c.before];c.modules.forEach((m,i)=>{m.lessons.forEach(u=>u.moduleIndex=i);units.push(...m.lessons);if(c.passages[i])units.push(c.passages[i]);});return [...units,...c.after];}
export function consolidationGate(route,c,s,unitReady,phaseOneDone){if(!phaseOneDone)return {id:'fim',title:'Conclua a Fase I — Jornada da Forja'};if(route==='fase-2')return null;
 for(const u of c.before){if(u.id===route)return null;if(!s.completed[u.id]||!unitReady(u))return u;}
 for(let i=0;i<c.modules.length;i++){const m=c.modules[i];if(m.lessons.some(u=>u.id===route))return null;const unfinished=m.lessons.find(u=>!s.completed[u.id]||!unitReady(u));if(unfinished)return unfinished;const p=c.passages[i];if(p){if(p.id===route)return null;if(!s.completed[p.id]||!unitReady(p))return p;}}
 for(const u of c.after){if(u.id===route)return null;if(!s.completed[u.id]||!unitReady(u))return u;}return null;
}
