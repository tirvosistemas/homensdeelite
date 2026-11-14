import {esc,bar,markdown,download} from './ui.js';
const note='<p class="muted"><small>Autorreflexão educacional. Não é diagnóstico clínico nem prova automática de transformação.</small></p>';
export function initialSnapshot(ctx){for(const [key,a] of Object.entries(ctx.s.answers))if(key===ctx.entryKey())return a.baseline||null;return null;}
export function expansionScaleResult(a,s,ctx){
 const v=s.values||[];
 if(a.result==='entry')return `<h3>Você acaba de entrar na Forja</h3><p>Não tente justificar suas respostas. Apenas guarde-as. Voltaremos a elas ao longo da jornada.</p><div class="feedback">Suas respostas iniciais foram preservadas para a comparação final. Este registro não recebe classificação.</div>${note}`;
 if(a.result==='entryComparison'){
  const before=initialSnapshot(ctx);if(!before)return '<div class="notice">Responda primeiro ao Espelho da Arrancada, na Aula 1 do módulo 1.</div>';
  const changed=a.items.filter((_,i)=>before[i]!==v[i]);const attention=a.items.filter((_,i)=>v[i]<2);
  return `<h3>Quando entrei × agora</h3><p>Esta comparação mostra mudanças de percepção. Ela não prova transformação automática.</p>${a.items.map((x,i)=>`<div class="result-row"><strong>${esc(x)}</strong><div class="two-col"><span>Quando entrei: ${esc(a.options[before[i]])}</span><span>Agora: ${esc(a.options[v[i]])}</span></div></div>`).join('')}<div class="feedback"><strong>Áreas em que sua percepção mudou: ${changed.length}</strong><p>${esc(changed.join(' · ')||'As respostas permaneceram iguais. Continue observando sua prática.')}</p><strong>Áreas que ainda precisam de trabalho</strong><p>${esc(attention.join(' · ')||'Nenhuma marcada neste registro; mantenha revisão e prática.')}</p></div>${note}`;
 }
 const rows=a.items.map((name,i)=>({name,value:v[i]}));
 if(a.result==='neediness'){const sorted=[...rows].sort((a,b)=>a.value-b.value);return `<h3>Seu radar da carência</h3><p>Área de maior autonomia relativa: <strong>${esc(sorted[0].name)}</strong>.</p><p>Área que merece atenção: <strong>${esc(sorted.at(-1).name)}</strong>.</p><div class="feedback">Primeira ação: identifique o gatilho, nomeie o sentimento e faça uma pausa antes de agir. Retorne a uma responsabilidade e decida depois.</div>${scores(rows,4)}${note}`;}
 if(a.result==='autonomy')return `<h3>Autonomia emocional em desenvolvimento</h3>${scores(rows,4)}<p>Comece pelas áreas com menor pontuação. Aprender a estar consigo não exige abandonar vínculos, amizade ou apoio.</p>${note}`;
 if(a.result==='identity'){const concentrated=v[0]>=7&&v.slice(1).reduce((s,n)=>s+n,0)/7<4;return `<h3>Sua roda da identidade</h3>${scores(rows,10)}<div class="feedback">${concentrated?'Sua identidade pode estar excessivamente concentrada em uma única área.':'Observe como suas áreas se complementam.'} Escolha uma área pouco presente e uma ação concreta para fortalecê-la.</div>${note}`;}
 if(a.result==='traffic')return `<h3>Seu mapa de retorno</h3>${rows.map(r=>`<div class="result-row"><strong>${esc(r.name)}</strong><span class="traffic traffic-${r.value}">${esc(a.options[r.value])}</span></div>`).join('')}<p>Amarelo pede ajuste preventivo. Vermelho pede uma ação de retorno e apoio apropriado quando necessário. As cores não são diagnósticos.</p>${note}`;
 if(a.result==='compatibilityExpanded')return ['Compatível','Ainda não sei','Possível incompatibilidade','Não negociável'].map((label,i)=>`<div class="result-row"><strong>${label}</strong>${esc(a.items.filter((_,j)=>v[j]===i).join(', ')||'Nenhuma área registrada.')}</div>`).join('')+'<p>Um não negociável informa seu limite pessoal, não inferioridade moral de outra pessoa. Conversem com respeito.</p>'+note;
 return null;
}
function scores(rows,max){return rows.map(r=>`<div class="result-row"><strong>${esc(r.name)}</strong>${r.value} / ${max}${bar(r.value/max*100)}</div>`).join('');}
const translations=[
['O que fiz de errado para ela não responder?','Você pode estar assumindo responsabilidade sem evidência.','Não sei o motivo; vou observar fatos antes de concluir.'],
['Se eu mostrar o quanto gosto, ela verá meu valor.','Esforço unilateral pode estar sendo usado para tentar produzir atração.','Demonstro interesse e observo reciprocidade.'],
['Ela é diferente de todas.','Pouco conhecimento pode estar sendo preenchido por idealização.','Preciso de tempo para conhecer caráter e compatibilidade.'],
['Eu faria qualquer coisa por ela.','O desejo de agradar pode estar apagando limites.','Posso amar e ajudar sem abandonar princípios.'],
['Não posso perder essa mulher.','Medo pode estar sendo confundido com posse.','Gostaria que funcionasse, mas posso respeitar a escolha dela.'],
['Vou mostrar o homem que ela perdeu.','Sua evolução pode continuar dependente da reação da ex.','Construo por minha missão e minhas responsabilidades.'],
['Preciso responder agora ou ela vai sumir.','Urgência pode estar reorganizando sua rotina.','Posso responder em um momento compatível com meus compromissos.'],
['Se eu pagar mais, ela vai me escolher.','Generosidade pode ter virado compra de aprovação.','Ofereço sem transformar dinheiro em obrigação afetiva.'],
['Talvez insistindo ela mude de ideia.','A dificuldade de aceitar um não pode gerar pressão.','Interesse não cria direito à reciprocidade.'],
['Ficar solteiro significa que falhei.','Relacionamento pode estar sendo usado como única medida de valor.','Minha vida também se constrói em trabalho, saúde, vínculos e caráter.'],
['Ela curtiu: deve estar apaixonada.','Um pequeno gesto pode ter recebido um significado exagerado.','Uma curtida é um fato pequeno; preciso de mais contexto.'],
['Se eu disser não, vou perder minha chance.','A atração pode estar suspendendo seus princípios.','Um limite respeitoso também mostra quem sou.'],
['Vou sumir para ela sentir minha falta.','Distância pode estar sendo usada como contrajogo.','Reduzo investimento para cuidar de mim, não para provocar reação.'],
['Só me sinto bem quando alguém me quer.','A aprovação pode estar sustentando sua identidade.','Vou construir fontes de identidade que não dependam só de romance.'],
['Se eu resolver tudo, ela vai me amar.','Utilidade pode estar sendo tratada como garantia de afeto.','Apoio não obriga ninguém a corresponder.']
];
const signalGuidance=[
['Se eu parar, a conversa acaba.','Envio mensagens para impedir o silêncio.','Atenção retirada de responsabilidades.','Demonstre interesse e observe iniciativa dos dois lados.'],
['Um gesto pequeno prova um vínculo grande.','Uma curtida vira um plano de relacionamento.','Expectativas crescem antes dos fatos.','Separe o gesto observado da interpretação.'],
['Não posso frustrar alguém atraente.','Aceito um horário que fere um compromisso.','Meus limites tornam-se negociáveis por aprovação.','Diga não com respeito quando necessário.'],
['Preciso pagar para merecer atenção.','Assumo uma dívida para impressionar.','Desorganização financeira e expectativa de retorno.','Planeje e ofereça sem comprar reciprocidade.'],
['Preciso saber imediatamente se respondeu.','Verifico status repetidamente durante o trabalho.','Foco e tranquilidade consumidos por vigilância.','Faça uma pausa e defina momentos de consulta.'],
['Minha importância depende da reação.','Uma resposta fria altera meu dia inteiro.','Identidade instável diante da atenção alheia.','Reforce compromissos e referências próprias.'],
['É melhor aceitar desrespeito do que perder.','Ignoro humilhações para manter contato.','Segurança emocional e dignidade enfraquecidas.','Estabeleça limites e procure apoio; priorize segurança.'],
['O verdadeiro eu não será suficiente.','Exagero experiências para parecer interessante.','Aprovação de uma personagem aumenta insegurança.','Apresente sua vida com honestidade.'],
['Já sei quem ela é porque sinto muito.','Planejo um futuro antes de observar caráter.','Decisões baseadas em fantasia.','Dê tempo a fatos, frustrações e contextos reais.'],
['Estar sozinho prova fracasso.','Aceito uma relação incompatível para evitar silêncio.','Princípios cedem ao medo.','Cultive vínculos e autonomia sem urgência romântica.'],
['A relação precisa ocupar tudo.','Cancelo treino e amigos ao começar a gostar.','Fontes de identidade e apoio se estreitam.','Integre o vínculo a uma vida que continua existindo.'],
['Se eu oferecer mais, equilibrará.','Organizo, procuro e resolvo sozinho continuamente.','Desequilíbrio vira rotina.','Observe o padrão sem exigir contabilidade diária.'],
['Ser desejado prova que sou homem.','Minha confiança desaparece quando ninguém demonstra interesse.','Valor pessoal fica condicionado à aprovação.','Construa evidências de caráter, competência e responsabilidade.'],
['Não posso tolerar silêncio emocional.','Termino uma conversa e procuro outra imediatamente.','Pouco espaço para conhecer desejos próprios.','Pratique momentos de solitude equilibrados com vínculos.'],
['Preciso fazer alguém se arrepender.','Transformo treino e trabalho em vingança.','A reação da outra pessoa continua no centro.','Cresça por valores e responsabilidades próprios.'],
['Se eu for quem sou, não serei escolhido.','Escondo preferências para concordar.','Aprovação depende de uma personagem.','Mude por aprendizado, não apenas por medo de desaprovação.'],
['Qualquer atenção precisa ser prioridade.','Interrompo a família sempre que chega mensagem.','Minha rotina perde autoridade.','Responda respeitando contexto e compromissos.'],
['Estar disponível fará a pessoa me valorizar.','Aceito contato apenas quando precisa de favor.','Reciprocidade é substituída por conveniência.','Observe o padrão e limite disponibilidade unilateral.'],
['Se eu for indispensável, serei amado.','Resolvo tudo esperando que utilidade vire atração.','Ajuda transforma-se em dívida emocional imaginada.','Apoie sem exigir amor como pagamento.'],
['Se sofro muito, deve ser amor.','Confundo vigilância e ansiedade com profundidade.','Medo pode alimentar controle.','Reconheça a emoção e preserve liberdade e respeito.'],
['Só mais uma chance resolverá tudo.','Permaneço apesar de um padrão prejudicial reconhecido.','Minha capacidade de decidir fica paralisada.','Avalie sua segurança e escolha limites com apoio adequado.']
];
export function mountExpansionWidget(el,a,s,ctx){
 const supported=['signals','translator','budget','sorting','sprint','reference'];if(!supported.includes(a.type))return false;
 const header=()=>`<div class="eyebrow">Expansão da Forja · Aplicação prática</div><h3>${esc(a.title)}</h3>`;
 const save=()=>ctx.save();
 function draw(){el.innerHTML=header()+render();bind();}
 function render(){
  if(a.type==='reference')return `<p>Retome a ferramenta que já faz parte da sua jornada. Suas respostas continuam no mesmo lugar.</p><a class="primary" href="#${esc(a.target)}">Abrir ferramenta →</a>`;
  if(a.type==='signals'){
   const original=ctx.course.modules[0].lessons[0].blocks.find(b=>b.title==='SINAIS DO MODO GADO').body;
   const chunks=(original+'\n'+(a.additionalSignals||'')).split(/^## (.+)$/m);const items=[];for(let i=1;i<chunks.length;i+=2)items.push({title:chunks[i],body:chunks[i+1]});
   return `<p>Reconheça o comportamento sem transformá-lo em identidade. Abra cada sinal para observar pensamento, contexto, consequências e alternativa.</p><div class="reading">${items.map((item,i)=>{const g=signalGuidance[i];return `<details><summary>${esc(item.title)}</summary><div><h3>O comportamento</h3>${markdown(item.body)}<h3>O que passa pela cabeça</h3><p>${esc(g[0])}</p><h3>Como aparece na vida real</h3><p>${esc(g[1])}</p><h3>O preço que você paga</h3><p>${esc(g[2])}</p><h3>A postura substituta</h3><p>${esc(g[3])}</p></div></details>`;}).join('')}</div>`;
  }
  if(a.type==='translator')return `<p>Estas leituras são possibilidades para reflexão, não diagnósticos de intenção.</p><div class="reading">${translations.map(([said,behind,mature])=>`<details><summary>${esc(said)}</summary><div><h3>O que você diz</h3><p>${esc(said)}</p><h3>O que pode estar por trás</h3><p>${esc(behind)}</p><h3>Como um homem centrado pensa</h3><p>${esc(mature)}</p></div></details>`).join('')}</div>`;
  if(a.type==='budget'){
   s.points??=Array(a.items.length).fill(0);const total=s.points.reduce((x,y)=>x+y,0);
   return `<p>Distribua exatamente 100 pontos entre as áreas. Isso representa sua percepção de atenção, não horas exatas.</p><div class="fields">${a.items.map((v,i)=>`<label class="field">${esc(v)}<input type="number" min="0" max="100" step="1" data-budget="${i}" value="${s.points[i]}"></label>`).join('')}</div><p data-total>Total: ${total} / 100</p><label class="field">Seu orçamento combina com seus objetivos? Qual ajuste fará?<textarea data-budget-reflection>${esc(s.reflection||'')}</textarea></label><button class="primary" data-budget-save>Registrar orçamento</button>${s.result?'<div class="feedback">Orçamento registrado. Proteja espaço para a prioridade que você escolheu.</div>':''}`;
  }
  if(a.type==='sorting'){s.entries??=[];return `<form class="fields"><label class="field">${esc(a.prompt)}<input name="name" required maxlength="300"></label>${a.categories?`<label class="field">Categoria<select name="category">${a.categories.map(x=>`<option>${esc(x)}</option>`).join('')}</select></label>`:''}<label class="field">Classificação<select name="group">${a.groups.map(x=>`<option>${esc(x)}</option>`).join('')}</select></label><button>Adicionar</button></form><div class="sorting-grid">${a.groups.map(group=>`<div class="comparison"><h3>${esc(group)}</h3>${s.entries.map((r,i)=>r.group===group?`<div class="result-row"><strong>${esc(r.name)}</strong><small>${esc(r.category||'')}</small><select data-sort="${i}" aria-label="Classificação de ${esc(r.name)}">${a.groups.map(g=>`<option ${g===r.group?'selected':''}>${esc(g)}</option>`).join('')}</select><button data-remove-entry="${i}" class="pill">Remover</button></div>`:'').join('')}</div>`).join('')}</div><button class="primary" data-sorting-save>Concluir análise</button>`;}
  if(a.type==='sprint'){s.steps??=[false,false,false];return `<p>Reserve 30 minutos para cada etapa. Marque a etapa depois de executá-la.</p>${a.items.map((label,i)=>`<label class="check-row"><input type="checkbox" data-sprint="${i}" ${s.steps[i]?'checked':''}>${esc(label)}</label>`).join('')}<label class="field">Qual peça concreta você produziu?<textarea data-sprint-evidence>${esc(s.evidence||'')}</textarea></label><button class="primary" data-sprint-save>Concluir sprint</button>${s.result?'<div class="feedback">Sprint registrado. Aprendizado convertido em produção.</div>':''}`;}
 }
 function bind(){
  if(a.type==='budget'){
   el.querySelectorAll('[data-budget]').forEach(input=>input.oninput=()=>{s.points[Number(input.dataset.budget)]=Number(input.value);el.querySelector('[data-total]').textContent=`Total: ${s.points.reduce((x,y)=>x+y,0)} / 100`;save();});
   el.querySelector('[data-budget-reflection]').oninput=e=>{s.reflection=e.target.value;save();};
   el.querySelector('[data-budget-save]').onclick=()=>{if(s.points.some(n=>!Number.isInteger(n)||n<0||n>100)||s.points.reduce((x,y)=>x+y,0)!==100||!s.reflection?.trim()){ctx.toast('Distribua exatamente 100 pontos e registre seu ajuste.');return;}s.result=true;ctx.completeActivity(a.key,10);save();draw();};
  }
  if(a.type==='sorting'){
   el.querySelector('form').onsubmit=e=>{e.preventDefault();const form=e.currentTarget;const values=Object.fromEntries(new FormData(form));if(!values.name.trim())return;s.entries.push(values);save();draw();};
   el.querySelectorAll('[data-sort]').forEach(input=>input.onchange=()=>{s.entries[Number(input.dataset.sort)].group=input.value;save();draw();});
   el.querySelectorAll('[data-remove-entry]').forEach(btn=>btn.onclick=()=>{s.entries.splice(Number(btn.dataset.removeEntry),1);save();draw();});
   el.querySelector('[data-sorting-save]').onclick=()=>{if(!s.entries.length){ctx.toast('Registre ao menos uma situação.');return;}ctx.completeActivity(a.key,10);save();};
  }
  if(a.type==='sprint'){
   el.querySelectorAll('[data-sprint]').forEach(input=>input.onchange=()=>{s.steps[Number(input.dataset.sprint)]=input.checked;if(!input.checked){delete s.result;ctx.invalidate(a.key,a.unit.id);}save();});
   el.querySelector('[data-sprint-evidence]').oninput=e=>{s.evidence=e.target.value;save();};
   el.querySelector('[data-sprint-save]').onclick=()=>{if(!s.steps.every(Boolean)||!s.evidence?.trim()){ctx.toast('Conclua as três etapas e registre o que produziu.');return;}s.result=true;ctx.completeActivity(a.key,10);save();draw();};
  }
 }
 draw();return true;
}
export function enhancedFormSummary(a,s){if(!s.saved)return '';if(a.sentence)return `<div class="feedback"><strong>Minha frase</strong><p>${esc([s.saved.f1,s.saved.f2,s.saved.f3].join(' '))}</p></div>`;if(a.chain)return `<div class="flow-chain" aria-label="Corrente do hábito">${a.fields.map((f,i)=>`<div><small>${esc(f)}</small><p>${esc(s.saved['f'+i])}</p></div>`).join('<span aria-hidden="true">→</span>')}</div>`;if(a.document)return '<button type="button" data-personal-download>↓ Baixar meu código pessoal</button>';return '';}
export function bindEnhancedForm(el,a,s){const btn=el.querySelector('[data-personal-download]');if(btn)btn.onclick=()=>{const content='# Meu Código Pessoal\n\n'+a.fields.map((f,i)=>'## '+f+'\n\n'+(s.saved?.['f'+i]||'')).join('\n\n');download('meu-codigo-pessoal.md',content,'text/markdown;charset=utf-8');};}
