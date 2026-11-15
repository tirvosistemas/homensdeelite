import {esc} from './ui.js';
import {businessValues,netWorth} from './ascension-state.js';
const money=n=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
export function ascensionSummary(a,v){if(a.phase!=='III')return '';let text='';
 if(a.summary==='whys')text='Possível causa-raiz: '+Object.entries(v).filter(([k,val])=>/^f[1-5]$/.test(k)&&val.trim()).at(-1)?.[1]+'. Confirme esta hipótese com fatos; não é necessário forçar cinco respostas.';
 if(a.summary==='door')text=v.f1.startsWith('Duas')?'Teste em escala pequena, defina limites e uma data de revisão.':'Antes de assumir um compromisso difícil de reverter, busque evidências, alternativas e uma revisão proporcional ao risco.';
 if(a.summary==='futures')text='Preparação que atravessa os três cenários: '+v.f3;
 if(a.summary==='delegation')text='Autonomia escolhida: '+v.f1+'. Verifique se a experiência e o risco permitem esse nível; combine pontos de controle, não vigilância contínua.';
 if(a.summary==='feedback'){const attack=/\b(inútil|burro|idiota|preguiçoso|incompetente)\b/i.test([v.f1,v.f2,v.f3,v.f4].join(' '));text=(attack?'Revise rótulos pessoais encontrados: descreva o comportamento observável. ':'')+'Roteiro: “Observei '+v.f1+'. O impacto foi '+v.f2+'. O padrão combinado é '+v.f3+'. Vamos '+v.f4+'.” Confira se há fato específico, impacto, padrão e próxima ação. Esta checagem de estrutura não avalia automaticamente a qualidade da conversa.';}
 if(a.summary==='argument')text='O problema é '+v.f0+'. Isso provoca '+v.f1+'. Proponho '+v.f2+'. A evidência é '+v.f3+'. Próximo passo: '+v.f4+'.';
 if(a.summary==='proposal')text='Para '+v.f0+', que enfrenta '+v.f1+', proponho '+v.f2+' por meio de '+v.f3+'. Evidência: '+v.f4+'. Valide a proposta sem prometer um resultado garantido.';
 if(a.summary==='intro')text='Sou '+v.f0+', atuo em '+v.f1+' e ajudo a resolver '+v.f2+'. Minha evidência é '+v.f3+'. Atualmente busco '+v.f4+'. Ensaie para caber em cerca de 30 segundos.';
 if(a.summary==='business'){const b=businessValues(v);text='Resultado estimado: '+money(b.result)+'. Margem: '+(b.margin===null?'não calculável com faturamento zero':b.margin.toFixed(1)+'%')+'. Faturamento menos custos variáveis e fixos. Modelo educativo simplificado; não substitui contabilidade e não promete renda.';}
 if(a.summary==='balance')text='Patrimônio líquido aproximado: '+money(netWorth(v))+'. Ativos menos dívidas. Inclua a reserva nos ativos uma única vez; patrimônio não é o mesmo que dinheiro disponível.';
 if(a.summary==='survival')text=v.f2==='Sim'?'Confirme as premissas da perda suportável e os limites antes de decidir.':'Sem capacidade comprovada de suportar a perda, reduza a exposição ou investigue alternativas antes de assumir o risco.';
 if(a.summary==='decision')text='Sua decisão registrada: '+v.f5+'. Fundamento e revisão: '+v.f6+'. O sistema organiza seus critérios; a decisão continua sendo sua.';
 return text?`<div class="feedback">${esc(text)}</div>`:'';
}
