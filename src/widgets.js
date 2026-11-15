import {ascensionDefinition} from './ascension-data.js';
import {mountAscensionWidget} from './ascension-widgets.js';
import {consolidationDefinition} from './consolidation-data.js';
import {mountConsolidationWidget} from './consolidation-widgets.js';
import {phaseDefinition} from './phase-data.js';
import {mountPhaseWidget} from './phase-widgets.js';
import {mountExpansionWidget, expansionScaleResult, initialSnapshot, enhancedFormSummary, bindEnhancedForm} from './expansion-widgets.js';
import {activities,activityFor} from './activities.js';
import {exams,finalExam} from './exams.js';
import {esc,bar,field} from './ui.js';
import {grade,gadoScore,dateKey,daysSince,challengeStats} from './state.js';
let ctx;
export const setContext=c=>ctx=c;
export function definition(block,m){if(block.ascension)return ascensionDefinition(block);if(block.consolidation)return consolidationDefinition(block);if(block.phaseType)return phaseDefinition(block);if(block.reference)return {type:'reference',title:block.title,target:block.reference};if(block.reflection)return {type:'form',title:'Meu próximo passo',fields:[block.reflection]};if(block.title.startsWith('AVALIAÇÃO'))return {type:'quiz',title:'Avaliação de domínio',questions:exams[m],exam:true};if(block.title.startsWith('PROVA FINAL'))return {type:'quiz',title:'Prova integradora · módulos 1 a 6',questions:finalExam,exam:true,final:true};const a=activityFor(block.title);return a?{...a,...(block.additionalSignals?{additionalSignals:block.additionalSignals}:{})}:a;}
export const requiredActivity=a=>a&&!['comparison','alerts','pledge','signals','translator','reference'].includes(a.type);
export const widgetShell=(key)=>`<div class="widget" data-widget="${esc(key)}"></div>`;
const educational='<p class="muted"><small>Ferramenta educacional de autorreflexão. Não é diagnóstico médico ou psicológico.</small></p>';
const choice=(text,index,selected=false)=>`<button type="button" class="choice ${selected?'selected':''}" data-choice="${index}" aria-pressed="${selected}"><span class="choice-index">${index+1}</span>${esc(text)}</button>`;
const options=(items,selected)=>`<div class="choice-list">${items.map((x,i)=>choice(x,i,selected===i)).join('')}</div>`;
const resultRows=items=>items.map(({name,value,max=1})=>`<div class="result-row"><strong>${esc(name)}</strong>${value} / ${max}${bar(value/max*100)}</div>`).join('');
function title(a){return `<div class="eyebrow">${a.exam?'Avaliação de domínio':'Aplicação prática'} · ${ctx.s.completed[a.key]?'Concluído ✓':'Sua vez de agir'}</div><h3>${esc(a.title)}</h3>`}
function answer(key,defaults={}){if(!ctx.s.answers[key]||typeof ctx.s.answers[key]!=='object')ctx.s.answers[key]={...defaults};return ctx.s.answers[key];}
function finish(a,points=10){ctx.completeActivity(a.key,points);}
export function mountWidgets(container,unit){unit.blocks.forEach((b,i)=>{const a=definition(b,unit.moduleIndex);if(!a)return;const key=unit.id+'-b'+i;const el=container.querySelector(`[data-widget="${key}"]`);if(el)mount(el,{...a,key,unit});});}
function mount(el,a){const s=answer(a.key);if(mountAscensionWidget(el,a,s,ctx))return;if(mountConsolidationWidget(el,a,s,ctx))return;if(mountPhaseWidget(el,a,s,ctx))return;if(mountExpansionWidget(el,a,s,ctx))return;let timer;
 const draw=()=>{clearInterval(timer);el.innerHTML=title(a)+render(a,s);bind();};
 const save=()=>ctx.save();
 function bind(){
  el.querySelectorAll('[data-choice]').forEach(btn=>btn.onclick=()=>{
   const i=Number(btn.dataset.choice);
   if(a.type==='scale'||a.type==='quiz'){
    s.values??=[];const q=s.index||0;if(a.type==='quiz'&&s.revealed)return;
    s.values[q]=i;
    if(a.type==='quiz')s.revealed=true;
    else if(q<a.items.length-1)s.index=q+1;
    save();draw();
   }
  });
  const prev=el.querySelector('[data-prev]');if(prev)prev.onclick=()=>{s.index=Math.max(0,(s.index||0)-1);s.revealed=a.type==='quiz'&&s.values?.[s.index]!==undefined;save();draw();};
  const next=el.querySelector('[data-next]');if(next)next.onclick=()=>{s.index=(s.index||0)+1;s.revealed=a.type==='quiz'&&s.values?.[s.index]!==undefined;save();draw();};
  const done=el.querySelector('[data-finish]');if(done)done.onclick=()=>{
   const length=a.items?.length||a.questions?.length;
   if(!s.values||Array.from({length},(_,i)=>s.values[i]).some(x=>!Number.isInteger(x)))return;
   if(a.result==='entryComparison'&&!initialSnapshot(ctx)){ctx.toast('Responda primeiro ao Espelho da Arrancada.');return;}
   s.result=true;if(a.result==='gado'&&!s.initialValues){s.initialValues=[...s.values];s.initialOrigin='first';}if(a.baseline&&!s.baseline)s.baseline=[...s.values];
   if(a.type==='scale')finish(a);
   else{const g=grade(a.questions,s.values);if(!a.exam||g.passed)finish(a,a.exam?100:10);else ctx.toast('Revise as explicações e tente novamente.');}
   save();draw();
  };
  const redo=el.querySelector('[data-redo]');if(redo)redo.onclick=()=>{s.result=false;s.values=[];s.index=0;s.revealed=false;save();draw();};
  el.querySelectorAll('form').forEach(form=>{
   form.oninput=()=>{s.fields=Object.fromEntries(new FormData(form));save();};
   form.onsubmit=e=>{e.preventDefault();s.fields=Object.fromEntries(new FormData(form));if(Object.values(s.fields).some(v=>!String(v).trim())){ctx.toast('Preencha cada reflexão antes de concluir.');return;}s.saved={...s.fields};finish(a);save();draw();};
  });
  el.querySelectorAll('[data-check]').forEach(c=>c.onchange=()=>{s.checked??=[];s.checked[Number(c.dataset.check)]=c.checked;save();});
  const checkDone=el.querySelector('[data-check-done]');if(checkDone)checkDone.onclick=()=>{s.result=true;finish(a);save();draw();};
  if(a.type==='challenge')bindChallenge();
  if(a.type==='wordweek')bindWeek();
  if(a.type==='promises')bindPromises();
  if(a.type==='pause')bindPause();
  if(a.type==='brotherhood')bindBrotherhood();
  bindEnhancedForm(el,a,s);
  const pledge=el.querySelector('[data-pledge]');if(pledge)pledge.onclick=()=>{ctx.pledge();};
 }
 function bindChallenge(){
  const difficulty=el.querySelector('[data-challenge-difficulty]');if(difficulty)difficulty.oninput=e=>{s.difficulty=e.target.value;save();};
  el.querySelectorAll('[data-family-week]').forEach(input=>input.onchange=()=>{s.family??=Array(5).fill(false);s.family[Number(input.dataset.familyWeek)]=input.checked;save();});
  const c=challengeData(a);const start=el.querySelector('[data-start]');start.onchange=()=>{if(!start.value||start.value>dateKey())return; c.start=start.value;save();draw();};
  el.querySelectorAll('[data-day]').forEach(b=>b.onclick=()=>{s.day=Number(b.dataset.day);save();draw();});
  el.querySelectorAll('[data-day-check]').forEach(b=>b.onchange=()=>{
   const day=s.day||0;if(day>daysSince(c.start))return;
   c.rows[day][Number(b.dataset.dayCheck)]=b.checked;
   if(c.rows[day].every(Boolean))ctx.award(a.key+'-day'+day,5);
   if(c.rows.every(r=>r.every(Boolean))){finish(a,30);ctx.medal(a.medal);}else if(ctx.s.completed[a.key]){ctx.invalidate(a.key,a.unit.id);}
   save();draw();
  });
 }
 function bindWeek(){
  s.rows??=Array.from({length:7},()=>[0,0,0,0]);
  el.querySelectorAll('[data-word-row]').forEach(row=>row.querySelectorAll('input').forEach(input=>input.oninput=()=>{
   const d=Number(row.dataset.wordRow);s.rows[d][Number(input.dataset.col)]=Number(input.value);save();
  }));
  const b=el.querySelector('[data-week-save]');b.onclick=()=>{const rows=s.rows;if(rows.some(r=>r.some(n=>!Number.isInteger(n)||n<0||n>100)||r[1]+r[2]+r[3]>r[0])){ctx.toast('Os registros devem ser inteiros e não podem superar os compromissos assumidos.');return;}
   if(rows.some(r=>r[0]===0||r[1]+r[2]+r[3]!==r[0])){ctx.toast('Registre o resultado de todos os compromissos nos sete dias.');return;}
   s.result=true;finish(a,30);ctx.medal(a.medal);save();draw();};
 }
 function bindPromises(){
  el.querySelectorAll('[data-number]').forEach(select=>select.onchange=()=>{s.counts??=[0,0,0,0];s.counts[Number(select.dataset.number)]=Number(select.value);save();});
  el.querySelector('[data-calculate]').onclick=()=>{const [total,done,late,lost]=s.counts||[];if(!total||done+late+lost>total){ctx.toast('Informe um total maior que zero e categorias que não ultrapassem esse total.');return;}s.result=true;finish(a);save();draw();};
 }
 function bindPause(){
  const start=el.querySelector('[data-timer]');if(start)start.onclick=()=>{s.until=Date.now()+600000;save();draw();};
  const stop=el.querySelector('[data-stop-timer]');if(stop)stop.onclick=()=>{delete s.until;save();draw();};
  el.querySelectorAll('[data-pause-choice]').forEach(b=>b.onclick=()=>{s.decision=b.dataset.pauseChoice;if(s.decision!=='Voltar para minha prioridade'){finish(a);s.response=s.decision==='Esperar'?'Esperar é uma escolha. Volte a uma tarefa e observe a vontade sem obedecer automaticamente.':'Antes de enviar, confirme que sua decisão respeita seus limites e a reciprocidade.';}save();draw();});
  el.querySelectorAll('[data-priority]').forEach(b=>b.onclick=()=>{s.priority=b.dataset.priority;s.response=`Sua atenção volta para: ${s.priority}. Escolha uma pequena ação agora.`;finish(a);save();draw();});
  if(s.until){clearInterval(timer);timer=setInterval(()=>{if(!el.isConnected){clearInterval(timer);return;}const seconds=Math.max(0,Math.ceil((s.until-Date.now())/1000));const out=el.querySelector('[data-countdown]');if(out)out.textContent=`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;if(!seconds){clearInterval(timer);delete s.until;save();ctx.toast('Pausa concluída. Escolha seu próximo passo com calma.');}},1000);}
 }
 function bindBrotherhood(){
  s.people??=[];
  const f=el.querySelector('form');f.oninput=null;f.onsubmit=e=>{e.preventDefault();const data=new FormData(f);const name=String(data.get('name')).trim();if(!name)return;s.people.push({name,group:data.get('group')});save();draw();};
  el.querySelectorAll('[data-person]').forEach(select=>select.onchange=()=>{s.people[Number(select.dataset.person)].group=select.value;save();draw();});
  el.querySelectorAll('[data-remove]').forEach(btn=>btn.onclick=()=>{s.people.splice(Number(btn.dataset.remove),1);save();draw();});
  el.querySelectorAll('[data-social-reflection]').forEach(input=>input.oninput=()=>{s[input.dataset.socialReflection]=input.value;save();});
  el.querySelector('[data-social-save]').onclick=()=>{if(!s.people.length||!s.increase?.trim()||!s.decrease?.trim()){ctx.toast('Registre uma influência e as duas reflexões.');return;}finish(a);save();draw();};
 }
 draw();
}
function render(a,s){
 if(a.type==='quiz'||a.type==='scale')return renderQuestions(a,s);
 if(a.type==='form')return `<p>Registre com honestidade. Se um campo não se aplicar, explique brevemente.</p><form class="fields ${a.columns?'two-col':''}">${a.fields.map((f,i)=>field(f,'f'+i,s.fields?.['f'+i]||'','textarea')).join('')}${a.count?`<label class="field">Quantos desses princípios você já demonstra hoje?<select name="count">${Array.from({length:6},(_,i)=>`<option ${String(i)===s.fields?.count?'selected':''}>${i}</option>`).join('')}</select></label>`:''}<button class="primary">${esc(a.button||'Salvar reflexão')} · +10 XP</button></form>${s.saved?`<dl class="saved-summary"><h3>${esc(a.title)}</h3>${a.fields.map((f,i)=>`<dt>${esc(f)}</dt><dd>${esc(s.saved['f'+i])}</dd>`).join('')}</dl>${enhancedFormSummary(a,s)}`:''}`;
 if(a.type==='comparison')return `<div class="two-col"><div class="comparison"><h3>Consumidor</h3>${a.pairs.map(p=>`<p>${esc(p[0])}</p>`).join('')}</div><div class="comparison"><h3>Construtor</h3>${a.pairs.map(p=>`<p>${esc(p[1])}</p>`).join('')}</div></div>`;
 if(a.type==='checklist'){const count=(s.checked||[]).filter(Boolean).length;return a.items.map((v,i)=>`<label class="check-row"><input type="checkbox" data-check="${i}" ${s.checked?.[i]?'checked':''}>${esc(v)}</label>`).join('')+`<button data-check-done class="primary">Concluir check-up</button>${s.result?`<div class="feedback">Você marcou ${count} de ${a.items.length} áreas. Próximas áreas a desenvolver ou conversar: ${esc(a.items.filter((_,i)=>!s.checked?.[i]).slice(0,3).join(', ')||'mantenha os cuidados que já pratica')}.</div>`:''}`;}
 if(a.type==='challenge')return renderChallenge(a,s);
 if(a.type==='wordweek')return renderWeek(s);
 if(a.type==='promises'){const counts=s.counts||[0,0,0,0];return `<p>Considere categorias distintas: cumpridas no prazo, atrasadas sem aviso e abandonadas.</p><div class="two-col">${['Promessas importantes feitas','Cumpridas no prazo','Atrasadas sem avisar','Abandonadas'].map((l,j)=>`<label class="field">${l}<select data-number="${j}">${Array.from({length:51},(_,i)=>`<option value="${i}" ${counts[j]===i?'selected':''}>${i}</option>`).join('')}</select></label>`).join('')}</div><button class="primary" data-calculate>Calcular índice</button>${s.result?`<div class="feedback"><strong>${counts[0]?Math.round(counts[1]/counts[0]*100):0}% de palavra cumprida</strong><p>Seu objetivo não é parecer confiável. É tornar seu histórico confiável.</p></div>`:''}`;}
 if(a.type==='pause')return `<p>Estou fazendo isso porque escolhi ou porque estou ansioso?</p><div class="timer" data-countdown>10:00</div><div class="inline-actions"><button data-timer ${s.until?'disabled':''}>Iniciar pausa</button><button data-stop-timer>Reiniciar</button></div><div class="choice-list">${['Enviar conscientemente','Esperar','Voltar para minha prioridade'].map(v=>`<button class="choice" data-pause-choice="${v}">${v}</button>`).join('')}</div>${s.decision==='Voltar para minha prioridade'?`<p>Para onde vai sua atenção?</p><div class="inline-actions">${['Trabalho','Estudo','Treino','Família','Descanso','Outro'].map(v=>`<button class="pill" data-priority="${v}">${v}</button>`).join('')}</div>`:''}${s.response?`<div class="feedback">${esc(s.response)}</div>`:''}`;
 if(a.type==='brotherhood')return renderBrotherhood(s);
 if(a.type==='alerts')return `<p>Estes comportamentos podem existir em homens e mulheres. Considere padrão, gravidade, contexto e segurança. Uma ocorrência isolada não define toda uma pessoa; violência ou ameaça já exigem proteção.</p><div class="reading">${[['Mentira recorrente','Observe contradições repetidas e se existe responsabilidade ao corrigi-las.'],['Humilhação','Desqualificação e exposição constrangedora não são respeito. Expresse limites e procure apoio.'],['Chantagem','Ameaças para forçar escolhas reduzem sua liberdade. Busque apoio e preserve limites.'],['Violência','Priorize sua segurança e procure ajuda adequada. Em emergência no Brasil, acione 190.'],['Ciúme controlador','Vigilância e imposições não são demonstrações de cuidado.'],['Tentativa de isolamento','Afastar você de pessoas de confiança pode aumentar vulnerabilidade. Preserve sua rede de apoio.'],['Infidelidade','Converse sobre acordos, honestidade e confiança. Observe atitudes, não só promessas.'],['Manipulação financeira','Controle coercitivo de recursos exige atenção e apoio.'],['Desrespeito persistente','Limites repetidamente ignorados merecem uma decisão consciente.'],['Dependências graves não tratadas','Perda de controle pode exigir ajuda profissional. Apoiar não significa assumir sozinho o tratamento.'],['Irresponsabilidade extrema','Observe repetição, consequências e disposição real para reparar.']].map(([t,b])=>`<details><summary>${t}</summary><p>${b}</p></details>`).join('')}</div>`;
 if(a.type==='pledge'){const ready=ctx.canFinish();return `<p>Assumir este código é um compromisso com a prática contínua.</p>${!ready?'<div class="notice">Conclua as etapas anteriores, os desafios e as avaliações deste módulo para assumir o código e seguir à missão de passagem.</div>':''}<button class="primary" data-pledge ${!ready?'disabled':''}>Eu assumo este código</button>`;}
 return '';
}
function renderQuestions(a,s){
 const isQuiz=a.type==='quiz';const all=isQuiz?a.questions:a.items;
 s.index=Math.max(0,Math.min(s.index||0,all.length-1));const i=s.index;const selected=s.values?.[i];
 if(s.result)return isQuiz?quizResult(a,s):scaleResult(a,s);
 const q=all[i];const opts=isQuiz?q[1]:a.options;let buttons=options(opts,selected);
 if(isQuiz&&s.revealed)buttons=buttons.replaceAll('data-choice=', 'disabled data-choice=');
 return `${!isQuiz?educational:''}<div class="section-head"><small>Pergunta ${i+1} de ${all.length}</small><small>${isQuiz&&a.exam?'Aprovação: 70%':'Responda no seu ritmo'}</small></div>${bar((i+1)/all.length*100)}<p style="margin-top:22px;font-size:17px"><strong>${esc(isQuiz?q[0]:q)}</strong></p>${buttons}${isQuiz&&s.revealed?`<div class="feedback ${selected===q[2]?'':'warning'}"><strong>${selected===q[2]?'Boa decisão.':'Observe o raciocínio.'}</strong><br>${esc(q[3])}<br>Resposta recomendada: ${esc(q[1][q[2]])}</div>`:''}<div class="widget-nav"><button data-prev ${i===0?'disabled':''}>← Anterior</button>${i<all.length-1?`<button data-next class="primary" ${selected===undefined?'disabled':''}>Próxima →</button>`:`<button data-finish class="primary" ${selected===undefined?'disabled':''}>Ver resultado</button>`}</div>`;
}
function quizResult(a,s){const g=grade(a.questions,s.values||[]);const groups=a.final?exams.map((_,m)=>{const indices=a.questions.map((q,i)=>q[4]===m?i:-1).filter(i=>i>=0);return {m,score:indices.filter(i=>s.values[i]===a.questions[i][2]).length,of:indices.length};}).sort((a,b)=>b.score-a.score):[];return `<div class="result-score">${g.percent}%</div><h3>${g.passed?'Domínio demonstrado':'Revise alguns conceitos'}</h3><p>${g.correct} acertos · ${g.total-g.correct} pontos para revisar. ${a.exam?(g.passed?'Aprovado · recompensa de 100 XP concedida uma única vez.':'Aprovação a partir de 70%. Você pode refazer.'): 'Atividade concluída · +10 XP na primeira conclusão.'}</p>${groups.length?`<div class="feedback">Melhor desempenho: módulo ${groups[0].m+1}.<br>Prioridade de revisão: ${groups.at(-1).score===groups.at(-1).of?'nenhuma — todos os módulos com domínio completo':`módulo ${groups.at(-1).m+1}`}.</div>`:''}<div class="reading">${a.questions.map((q,i)=>`<details><summary>${s.values[i]===q[2]?'✓':'↻'} ${esc(q[0])}</summary><p>Sua resposta: ${esc(q[1][s.values[i]])}</p><p>Recomendação: ${esc(q[1][q[2]])}</p><p>${esc(q[3])}</p></details>`).join('')}</div><button data-redo>Refazer avaliação</button>`;}
function scaleResult(a,s){const extra=expansionScaleResult(a,s,ctx);if(extra!==null)return extra+(a.baseline?'':'<button data-redo>Refazer reflexão</button>');const values=s.values||[];let content='';const sorted=a.items.map((name,i)=>({name,value:values[i],max:a.options.length-1})).sort((a,b)=>b.value-a.value);
 if(a.result==='gado'){const g=gadoScore(values);const bands=[['Baixa dependência de validação','Você demonstra relativa independência nessa área. Continue observando pontos isolados, porque ninguém está completamente livre de comportamentos de validação.'],['Pontos de atenção','Existem comportamentos que podem estar entregando parte da sua direção à aprovação externa. Este é um bom momento para corrigir antes que se tornem padrão.'],['Dependência significativa de validação','Sua rotina e emoções provavelmente já são afetadas por busca de aprovação. O objetivo agora é reconstruir limites, direção e capacidade de tolerar rejeição.'],['Modo Gado em alta intensidade','Existe forte tendência de abandonar a si mesmo em busca de atenção ou relacionamento. Não use o resultado para se humilhar. Use-o para identificar exatamente onde sua reconstrução deve começar.']];content=`<div class="result-score">${g.total}<small> / 45</small></div><h3>${bands[g.band][0]}</h3><p>${bands[g.band][1]}</p><h3>Radar do Modo Gado</h3>${resultRows(g.areas.map(v=>({...v,max:9})))}<div class="feedback">Áreas que merecem atenção: ${esc(g.areas.filter(x=>x.value>0).slice(0,3).map(x=>x.name).join(', ')||'nenhuma pontuação elevada neste registro')}.</div>`;}
 else if(a.result==='compatibility'){content=`<h3>Áreas que você ainda precisa conhecer melhor</h3><p>${esc(a.items.filter((_,i)=>values[i]===1).join(', ')||'Você não marcou áreas desconhecidas. Continue observando ao longo do tempo.')}</p><h3>Possíveis incompatibilidades</h3><p>${esc(a.items.filter((_,i)=>values[i]===2).join(', ')||'Nenhuma marcada.')}</p><p>Este registro não é uma nota para outra pessoa. Use-o para orientar diálogo e observação.</p>`;}
 else if(a.result==='reciprocity'){const sum=values.reduce((a,b)=>a+b,0);content=`<h3>${sum<=5?'Reciprocidade baixa':sum<=11?'Reciprocidade inconclusiva':'Reciprocidade consistente'}</h3><p>Seu registro aponta ${sum} de 16 pontos de reciprocidade percebida. Esta leitura educacional não substitui observação ao longo do tempo, contexto e conversa.</p>${resultRows(sorted)}`;}
 else if(a.result==='standards')content=`<div class="feedback">O padrão que você procura precisa conversar com o padrão que você pratica.</div>${a.items.map((x,i)=>`<p>${esc(x)} <strong>${esc(a.options[values[i]])}</strong></p>`).join('')}`;
 else {const priority=a.result==='skills'?[...sorted].reverse():sorted;content=`<h3>${a.result==='skills'?'Suas próximas habilidades práticas':a.result==='finance'?'Seu próximo passo financeiro':'Suas áreas prioritárias'}</h3>${a.result==='finance'?'<p>Organize as contas, registre gastos e planeje antes de comprar. Comece pelo comportamento mais frequente abaixo; não é uma recomendação de investimento.</p>':''}<div class="feedback">${esc(priority.filter(v=>a.result==='skills'?v.value<3:v.value>0).slice(0,3).map(v=>v.name).join(' · ')||'Mantenha os cuidados e revise periodicamente.')}</div>${resultRows(priority)}`;}
 return content+educational+'<button data-redo>Refazer reflexão</button>';
}
function challengeData(a){if(!ctx.s.challenges[a.key])ctx.s.challenges[a.key]={start:dateKey(),rows:Array.from({length:a.days},()=>Array(a.items.length).fill(false))};return ctx.s.challenges[a.key];}
function renderChallenge(a,s){const c=challengeData(a);const available=Math.max(0,Math.min(a.days,daysSince(c.start)+1));s.day=Math.min(s.day||0,Math.max(0,available-1));const stats=challengeStats(c.rows,a.items.length,available);const high=Math.max(...stats.totals),low=Math.min(...stats.totals);return `<p>Marque somente ações que você realizou. Dias futuros ficam bloqueados. Corrigir um registro atualiza seu progresso; cada recompensa é concedida uma única vez.</p><label class="field">Data de início<input type="date" data-start value="${c.start}" max="${dateKey()}"></label><div class="compact-stats"><span><b>${stats.complete}/${a.days}</b>Dias completos</span><span><b>${stats.percent}%</b>Progresso</span><span><b>${stats.current}</b>Sequência atual</span><span><b>${stats.best}</b>Melhor sequência</span></div>${bar(stats.percent)}<div class="days">${c.rows.map((r,i)=>`<button class="day ${r.every(Boolean)?'complete':i<available?'incomplete':''} ${i===s.day?'active':''}" data-day="${i}" ${i>=available?'disabled':''} aria-label="Dia ${i+1}${r.every(Boolean)?', completo':', incompleto'}">${i+1}</button>`).join('')}</div><h3>Dia ${s.day+1}</h3>${a.items.map((v,j)=>`<label class="check-row"><input type="checkbox" data-day-check="${j}" ${c.rows[s.day][j]?'checked':''}>${esc(v)}</label>`).join('')}<p class="muted">Dia incompleto não é identidade. Corrija no próximo bloco. Disciplina também é saber retornar.</p>${a.days===30?`<div class="feedback">Pilar mais forte: ${esc(a.items[stats.totals.indexOf(high)])}.<br>Pilar que mais precisa de atenção: ${esc(a.items[stats.totals.indexOf(low)])}. ${high===low?'Todos têm o mesmo número de registros.':''}</div>`:''}<label class="field">Principal dificuldade e próximo ajuste<textarea data-challenge-difficulty>${esc(s.difficulty||'')}</textarea></label>${a.days===30?`<details class="content-block"><summary>Presença com família ou irmandade · opcional</summary><div class="reading"><p>Uma ação semanal de presença. Este registro é opcional e não bloqueia o desafio.</p>${Array.from({length:5},(_,i)=>`<label class="check-row"><input type="checkbox" data-family-week="${i}" ${s.family?.[i]?'checked':''}>Semana ${i+1} — realizei uma ação de presença</label>`).join('')}</div></details>`:''}<small>Conquista ao completar: ${esc(a.medal)}.</small>`;}
function renderWeek(s){s.rows??=Array.from({length:7},()=>[0,0,0,0]);const totals=s.rows.reduce((acc,row)=>acc.map((x,i)=>x+row[i]),[0,0,0,0]);return `<p>Registre os sete dias. Cada compromisso deve ter apenas um resultado: cumprido, renegociado antes do prazo ou quebrado.</p>${s.rows.map((row,d)=>`<details class="content-block" ${d===0?'open':''}><summary>Dia ${d+1}</summary><div class="reading two-col" data-word-row="${d}">${['Assumidos','Cumpridos','Renegociados antes do prazo','Quebrados'].map((name,c)=>`<label class="field">${name}<input type="number" min="0" max="100" step="1" data-col="${c}" value="${row[c]}"></label>`).join('')}</div></details>`).join('')}<button data-week-save class="primary">Salvar semana</button>${s.result?`<div class="feedback">${totals[0]?Math.round(totals[1]/totals[0]*100):0}% cumpridos · ${totals[2]} renegociados · ${totals[3]} quebrados. Observe o que precisa reparar.</div>`:''}`;}
function renderBrotherhood(s){const people=s.people||[];return `<p>Não é necessário usar nomes reais. Você pode escrever “Amigo A” ou “Grupo da faculdade”.</p><form class="fields">${field('Pessoa ou ambiente','name')}<label class="field">Influência<select name="group"><option>Fortalece</option><option>Neutro</option><option>Drena</option></select></label><button>Adicionar influência</button></form>${['Fortalece','Neutro','Drena'].map(group=>`<div class="comparison" style="margin-top:15px"><h3>${group}</h3>${people.map((p,i)=>p.group===group?`<div class="result-row"><strong>${esc(p.name)}</strong><select aria-label="Influência de ${esc(p.name)}" data-person="${i}">${['Fortalece','Neutro','Drena'].map(g=>`<option ${p.group===g?'selected':''}>${g}</option>`).join('')}</select><button class="pill" data-remove="${i}">Remover</button></div>`:'').join('')||'<small>Nenhum registro.</small>'}</div>`).join('')}<label class="field">Com qual grupo precisa aumentar exposição?<textarea data-social-reflection="increase">${esc(s.increase||'')}</textarea></label><label class="field">Com qual precisa reduzir?<textarea data-social-reflection="decrease">${esc(s.decrease||'')}</textarea></label><button class="primary" data-social-save>Salvar reflexão</button>`;}
