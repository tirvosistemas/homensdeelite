import {esc,markdown,bar,download} from './ui.js';
import {domains,diagnosticItems,diagnosticOptions,areaResults,traits,identityActions,missionFields,hoursLabels,categories,principleExamples,validHours,validPriorities} from './phase-data.js';
import {passageReady,directionReady} from './phase-flow.js';
import {dossier} from './phase-dossier.js';
const options=(list,current)=>list.map(v=>`<option ${v===current?'selected':''}>${esc(v)}</option>`).join('');
const select=(label,name,list,value)=>`<label class="field">${esc(label)}<select name="${name}">${options(list,value)}</select></label>`;
const input=(label,name,value='',required=true,type='textarea')=>`<label class="field">${esc(label)}${type==='textarea'?`<textarea name="${name}" ${required?'required':''}>${esc(value)}</textarea>`:`<input name="${name}" type="${type}" value="${esc(value)}" ${required?'required':''} ${type==='number'?'min="0" max="168" step="0.25"':''}>`}</label>`;
const resultPanel=values=>areaResults(values).map(r=>`<article class="area-result"><strong>${esc(r.name)}</strong><span class="tag">${r.label}</span>${bar(r.score/4*100)}</article>`).join('');
export function comparisonPanel(before,after){const b=areaResults(before),out=areaResults(after);return `<h3>ENTRADA X SAÍDA</h3><p>Comparação de autoavaliações declaradas. As faixas organizam suas respostas; não medem seu valor nem uma porcentagem de mudança como pessoa.</p><div class="diagnostic-grid">${out.map((r,i)=>`<article class="area-result"><h4>${esc(r.name)}</h4><div class="two-col"><div><small>QUANDO ENTREI NA FORJA</small><p>${b[i].label}</p>${bar(b[i].score/4*100)}</div><div><small>AO CONCLUIR A FASE I</small><p>${r.label}</p>${bar(r.score/4*100)}</div></div><p>${r.score>b[i].score?'Sua autoavaliação melhorou nesta área.':r.score===b[i].score?'Esta área permaneceu semelhante.':'Sua autoavaliação ficou mais baixa nesta área; observe contexto e honestidade no registro.'} ${r.score<2?'Esta área continua merecendo atenção.':''}</p></article>`).join('')}</div>`;}
export function missionDocument(fields){return `# MINHA DECLARAÇÃO DE MISSÃO\n\n${fields.name?'Nome: '+fields.name+'\n\n':''}`+missionFields.map((l,i)=>l+' '+fields['f'+i]+'.').join('\n\n');}
export function mountPhaseWidget(el,a,s,ctx){if(a.type!=='phase')return false;
 s.fields??={};let f=s.fields;
 const done=()=>!!ctx.s.completed[a.key];
 const save=()=>ctx.save();
 const finish=(points=10)=>{s.saved={...f};ctx.completeActivity(a.key,points);save();draw();};
 const missing=()=>ctx.toast('Complete os campos e ações indicados antes de concluir.');
 function form(content,button='Salvar e concluir',extra=''){return `<form class="phase-form">${content}<button class="primary">${button}</button>${extra}</form>`;}
 function fieldsList(labels){return labels.map((l,i)=>input(l,'f'+i,f['f'+i])).join('');}
 function draw(){
 el.innerHTML=`<div class="eyebrow">${done()?'Registrado ✓':'Aplicação prática'}</div><h3>${esc(a.title)}</h3>`+render();bind();
 }
 function render(){
  if(a.mode==='diagnostic'||a.mode==='exit'){
   if(s.snapshot){const before=ctx.s.answers['diagnostico-entrada-b0']?.snapshot;return `<h3>${a.mode==='diagnostic'?'SEU PONTO DE PARTIDA':'SUA AUTOAVALIAÇÃO AO CONCLUIR'}</h3><p>Registro preservado em ${new Date(s.recorded).toLocaleDateString('pt-BR')}. Referência educacional de autorreflexão.</p><div class="diagnostic-grid">${resultPanel(s.snapshot)}</div>${a.mode==='exit'&&before?comparisonPanel(before,s.snapshot):''}`;}
   const i=Math.max(0,Math.min(s.index||0,44));return `<p>RAIO-X DO HOMEM ATUAL · 45 afirmações. Considere sua rotina recente. As respostas não são uma nota de valor pessoal.</p><small>${esc(domains[Math.floor(i/3)][0])} · ${i+1} de 45</small>${bar((i+1)/45*100)}<h4>${esc(diagnosticItems[i])}</h4><div class="choice-list">${diagnosticOptions.map((v,j)=>`<button type="button" data-diag="${j}" class="choice ${s.values?.[i]===j?'selected':''}" aria-pressed="${s.values?.[i]===j}">${esc(v)}</button>`).join('')}</div><div class="widget-nav"><button data-diag-prev ${i===0?'disabled':''}>Anterior</button>${i===44?'<button class="primary" data-diag-done>Gerar painel</button>':'<button data-diag-next '+(s.values?.[i]===undefined?'disabled':'')+'>Próxima</button>'}</div>`;
  }
  if(a.mode==='contract')return done()?'<div class="feedback">CONTRATO DA FORJA ASSUMIDO · XP inicial registrado.</div>':'<button class="primary" data-contract>ASSUMO O COMPROMISSO · +10 XP</button>';
  if(a.mode==='passage'){
   if(done())return `<div class="feedback">${esc(a.success)}</div><div class="saved-summary">${a.fields.map((l,i)=>`<p><strong>${esc(l)}</strong><br>${esc(s.saved?.['f'+i])}</p>`).join('')}</div>`;
   const remaining=a.delayHours?Math.max(0,Math.ceil((a.delayHours*3600000-(Date.now()-(s.started||Date.now())))/3600000)):0;
   return `${a.delayHours?`<div class="notice">${s.started?`Missão iniciada. Faltam aproximadamente ${remaining} horas para validar as 48 horas. Retorne ao terminar.`:'Inicie o período de 48 horas antes de registrar a conclusão.'}</div>${!s.started?'<button data-start-mission>Iniciar 48 horas</button>':''}`:''}`+form(a.checks.map((l,i)=>`<label class="check-row"><input name="c${i}" type="checkbox" value="yes" ${f['c'+i]==='yes'?'checked':''} required>${esc(l)}</label>`).join('')+fieldsList(a.fields),'Concluir missão de passagem');
  }
  if(a.mode==='identity')return `<p>Escolha características como referência ou escreva as suas: ${traits.map(t=>esc(t)).join(' · ')}.</p>`+form(`<div class="two-col">${input('HOMEM QUE SOU HOJE','f0',f.f0)}${input('HOMEM QUE ESTOU CONSTRUINDO','f1',f.f1)}</div>${input('Qual comportamento atual contradiz mais fortemente o homem que você diz querer ser?','f2',f.f2)}`);
  if(a.mode==='votes')return form(identityActions.map((v,i)=>`${select('Toda vez que você decide '+v.toLowerCase()+', em qual homem está votando?','v'+i,['Escolha','HOMEM ANTIGO','HOMEM EM CONSTRUÇÃO'],f['v'+i])}${s.saved?`<p class="feedback">${esc(v)}: ${[0,1,4,7].includes(i)?'pode apoiar o homem em construção quando praticado com responsabilidade.':'pode reforçar padrões que você deseja abandonar. Reconhecer o comportamento permite corrigi-lo.'}</p>`:''}`).join(''),'Registrar meus votos');
  if(a.mode==='principles')return `<p>Escolha entre os exemplos ou escreva seus cinco princípios.</p><datalist id="principle-examples">${options(principleExamples)}</datalist>`+form(Array.from({length:5},(_,i)=>`<div class="two-col"><label class="field">Princípio ${i+1}<input name="f${i}" list="principle-examples" required value="${esc(f['f'+i])}"></label>${select('Quanto isso já aparece na sua vida?','s'+i,['VIVO ISSO','EM CONSTRUÇÃO','AINDA CONTRADIGO'],f['s'+i]||'EM CONSTRUÇÃO')}</div>`).join(''));
  if(a.mode==='compass')return form(`<div class="two-col">${fieldsList(['O QUE VALORIZO','O QUE SEI FAZER','O QUE PRECISO APRENDER','QUEM POSSO SERVIR/AJUDAR'])}</div>`)+ (s.saved?`<div class="saved-summary"><h4>POSSÍVEL DIREÇÃO DE CONSTRUÇÃO</h4><p>Usar ${esc(s.saved.f1)} para ajudar ${esc(s.saved.f3)}, guiado por ${esc(s.saved.f0)}, enquanto desenvolvo ${esc(s.saved.f2)}.</p><p>Esta é uma hipótese de direção para experimentar e revisar, não seu propósito definitivo.</p></div>`:'');
  if(a.mode==='hours'){const total=hoursLabels.reduce((n,_,i)=>n+Number(f['h'+i]||0),0);return `<p>Uma semana possui 168 horas. Distribua as horas sem contá-las duas vezes; inclua sono, descanso e obrigações.</p>`+form(`<div class="hours-grid">${hoursLabels.map((l,i)=>input(l,'h'+i,f['h'+i]||'0',true,'number')).join('')}</div><p data-hours-total aria-live="polite">Total: ${total} / 168 horas</p>${input('Sua distribuição de tempo confirma suas prioridades declaradas?','f0',f.f0)}`)+(s.saved?`<div class="saved-summary">${hoursLabels.map((l,i)=>`<div class="result-row"><strong>${l} · ${esc(s.saved['h'+i])} h</strong>${bar(Number(s.saved['h'+i])/168*100)}</div>`).join('')}</div>`:'');}
  if(a.mode==='priorities')return `<p>Escolha até dez objetivos. No máximo três podem ficar em AGORA. Se tudo é prioridade, nada é prioridade.</p>`+form(Array.from({length:10},(_,i)=>`<div class="two-col">${input('Objetivo '+(i+1),'g'+i,f['g'+i],false,'text')}${select('Quando?','p'+i,['DEPOIS','AGORA','NÃO É PRIORIDADE'],f['p'+i])}</div>`).join(''));
  if(a.mode==='timeline')return `<p>Escreva objetivos curtos; ao menos um em cada horizonte. Deixe em branco as categorias que ainda precisa explorar. Direção não significa rigidez.</p>`+form(`<div class="timeline-grid">${[1,3,10].map(y=>`<section><h4>${y} ${y===1?'ANO':'ANOS'}</h4>${categories.map((c,i)=>input(c,`y${y}c${i}`,f[`y${y}c${i}`],false,'text')).join('')}</section>`).join('')}</div>`);
  if(a.mode==='letter')return form(input('Nome (opcional)','name',f.name,false,'text')+fieldsList(missionFields),'ASSUMIR MISSÃO')+(s.saved?`<article class="mission-document">${markdown(missionDocument(s.saved))}<strong>🏅 DIREÇÃO DEFINIDA</strong><p><button data-download-mission>BAIXAR</button></p></article>`:'');
  if(a.mode==='direction'){
   if(done())return '<div class="feedback">JORNADA DA FORJA — SETE MÓDULOS CONCLUÍDOS. Continue para seu dossiê, diagnóstico final e encerramento da Fase I.</div>';
   const day=s.started?Math.floor((Date.now()-s.started)/86400000):-1;
   const mission=ctx.s.answers['m7-a8-b1']?.saved?.f3;
   return `<p>Sua missão de 90 dias: <strong>${esc(mission||'Consulte sua declaração de missão.')}</strong></p>${!s.started?'<button data-start-direction>Iniciar 72 horas</button>':`<p>Início: ${new Date(s.started).toLocaleString('pt-BR')}. Cada dia é um intervalo de 24 horas a partir desse início. Registre uma ação em cada intervalo; a conclusão é liberada ao completar 72 horas.</p>`}${[0,1,2].map(i=>`<label class="field">Dia ${i+1}<textarea data-direction-day="${i}" ${day!==i||s.logged?.[i]?'disabled':''}>${esc(f['d'+i]||'')}</textarea></label><button data-log-day="${i}" ${day!==i||s.logged?.[i]?'disabled':''}>${s.logged?.[i]?'Ação registrada ✓':'Registrar ação do dia '+(i+1)}</button>`).join('')}<p><button class="primary" data-finish-direction>Concluir 72 horas</button> <button data-refresh-phase>Atualizar prazo</button></p>${day>=3&&!directionReady(s)?'<p>Faltou um registro diário? Você pode iniciar um novo ciclo. Os registros anteriores ficam preservados no histórico do backup.</p><button data-restart-direction>Iniciar novo ciclo</button>':''}`;
  }
  if(a.mode==='dossier')return dossier(ctx)+`<button data-download-dossier>BAIXAR DOSSIÊ</button> <button class="primary" data-read-dossier>Conferi meu dossiê</button>`;
  if(a.mode==='mirror'){const messages=['Então proteja o padrão que construiu.','Agora você sabe exatamente o que ainda precisa construir.','Então você encontrou sua próxima missão.'];return `<div class="choice-list">${['SIM','EM PARTE','AINDA NÃO'].map((l,i)=>`<button class="choice" data-mirror="${i}" aria-pressed="${f.choice===String(i)}">${l}</button>`).join('')}</div>${f.choice!==undefined?`<div class="feedback"><h3>A FORJA CONTINUA</h3><p>${messages[Number(f.choice)]}</p></div>`:''}`;}
  return '';
 }
 function bind(){
  const on=(q,fn)=>{const b=el.querySelector(q);if(b)b.onclick=fn;};
  el.querySelectorAll('[data-diag]').forEach(b=>b.onclick=()=>{s.values??=[];s.values[s.index||0]=Number(b.dataset.diag);s.index=Math.min(44,(s.index||0)+1);save();draw();});
  on('[data-diag-prev]',()=>{s.index=Math.max(0,(s.index||0)-1);save();draw();});
  on('[data-diag-next]',()=>{if(Number.isInteger(s.values?.[s.index||0]))s.index=Math.min(44,(s.index||0)+1);save();draw();});
  on('[data-diag-done]',()=>{if(Array.from({length:45},(_,i)=>s.values?.[i]).some(v=>!Number.isInteger(v)||v<0||v>4))return missing();s.snapshot??=[...s.values];s.recorded??=Date.now();finish();});
  on('[data-contract]',()=>{s.accepted=Date.now();finish();});
  on('[data-start-mission]',()=>{s.started??=Date.now();save();draw();});
  on('[data-start-direction]',()=>{s.started=Date.now();save();draw();});
  on('[data-refresh-phase]',draw);
  on('[data-restart-direction]',()=>{s.history??=[];s.history.push({started:s.started,fields:{...f},logged:s.logged});s.started=Date.now();s.logged={};s.fields={};f=s.fields;save();draw();});
  el.querySelectorAll('[data-direction-day]').forEach(t=>t.oninput=()=>{f['d'+t.dataset.directionDay]=t.value;save();});
  el.querySelectorAll('[data-log-day]').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.logDay);if(!s.started||Math.floor((Date.now()-s.started)/86400000)!==i||!f['d'+i]?.trim())return missing();s.logged??={};s.logged[i]=Date.now();save();draw();});
  on('[data-finish-direction]',()=>{if(!directionReady(s))return ctx.toast('Registre uma ação em cada dia e complete o período de 72 horas.');ctx.medal('72 Horas de Direção');finish(30);});
  on('[data-read-dossier]',()=>finish());
  on('[data-download-dossier]',()=>{const doc=el.querySelector('.dossier');download('dossie-da-forja.html','<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Dossiê da Forja</title><style>body{font:16px system-ui;max-width:1000px;margin:40px auto;padding:20px}section{margin:32px 0}.bar{background:#ddd;height:8px}.bar span{display:block;height:8px;background:#ff6500}h2{border-bottom:2px solid #ff6500}table{width:100%}pre{white-space:pre-wrap}</style>'+doc.outerHTML+'</html>','text/html;charset=utf-8');});
  on('[data-download-mission]',()=>download('minha-declaracao-de-missao.md',missionDocument(s.saved),'text/markdown;charset=utf-8'));
  el.querySelectorAll('[data-mirror]').forEach(b=>b.onclick=()=>{f.choice=b.dataset.mirror;finish();});
  const formEl=el.querySelector('form');if(!formEl)return;
  formEl.oninput=()=>{s.fields=Object.fromEntries(new FormData(formEl));f=s.fields;const total=el.querySelector('[data-hours-total]');if(total)total.textContent=`Total: ${hoursLabels.reduce((n,_,i)=>n+Number(f['h'+i]||0),0)} / 168 horas`;save();};
  formEl.onchange=e=>{if(a.mode==='priorities'&&e.target.name?.startsWith('p')&&e.target.value==='AGORA'&&[...formEl.querySelectorAll('select')].filter(v=>v.value==='AGORA').length>3){e.target.value='DEPOIS';ctx.toast('No máximo três objetivos em AGORA. Se tudo é prioridade, nada é prioridade.');}formEl.oninput();};
  formEl.onsubmit=e=>{e.preventDefault();formEl.oninput();if(!formEl.checkValidity())return;
   if(a.mode==='passage'&&!passageReady(a,s))return ctx.toast('Conclua as ações e reflexões. A primeira passagem também exige 48 horas desde o início.');
   if(a.mode==='votes'&&identityActions.some((_,i)=>!['HOMEM ANTIGO','HOMEM EM CONSTRUÇÃO'].includes(f['v'+i])))return missing();
   if(a.mode==='hours'&&(!validHours(f)||!f.f0?.trim()))return ctx.toast('Distribua exatamente 168 horas e registre sua reflexão.');
   if(a.mode==='priorities'&&!validPriorities(f))return ctx.toast('Registre de um a dez objetivos, com no máximo três em AGORA.');
   if(a.mode==='timeline'&&[1,3,10].some(y=>!categories.some((_,i)=>f[`y${y}c${i}`]?.trim())))return ctx.toast('Registre ao menos um objetivo em cada horizonte.');
   if(a.mode==='principles'&&new Set(Array.from({length:5},(_,i)=>f['f'+i].trim().toLocaleLowerCase('pt-BR'))).size!==5)return ctx.toast('Escolha cinco princípios distintos.');
   if([...formEl.querySelectorAll('[required]')].some(e=>e.type!=='checkbox'&&!e.value.trim()))return missing();
   if(a.mode==='letter')ctx.medal('Direção Definida');finish();
  };
 }
 draw();return true;
}
