import {esc,bar,markdown} from './ui.js';
import {xp,rank,streak,gadoScore,grade} from './state.js';
import {areaResults,missionFields} from './phase-data.js';
const missing='<p class="muted">Sem registro disponível. Os dados antigos não são inventados nem exigidos novamente.</p>';
function record(tool,s){if(!tool)return missing;const a=s.answers[tool.key],d=tool.definition;if(!a)return missing;
 if(a.saved&&d.fields)return `<dl>${d.fields.map((f,i)=>`<dt>${esc(f)}</dt><dd>${esc(a.saved['f'+i]||'Sem registro')}</dd>`).join('')}</dl>`;
 if(a.values&&d.items)return `<dl>${d.items.map((f,i)=>`<dt>${esc(f)}</dt><dd>${esc(d.options?.[a.values[i]]??'Sem registro')}</dd>`).join('')}</dl>`;
 if(a.counts){const [n,done,late,lost]=a.counts;return `<p>Promessas: ${n}. Cumpridas no prazo: ${done}. Atrasadas: ${late}. Abandonadas: ${lost}.</p><p>Palavra cumprida neste registro: ${n?Math.round(done/n*100):0}%.</p>`;}
 return missing;
}
export function dossier(ctx){const s=ctx.s,tools=ctx.allTools();const find=match=>tools.find(t=>t.definition.match===match);
 const initial=s.answers['diagnostico-entrada-b0']?.snapshot,final=s.answers['diagnostico-final-b0']?.snapshot;
 const areas=initial?areaResults(initial):[],current=final?areaResults(final):areas;
 const sorted=[...current].sort((a,b)=>b.score-a.score),priority=[...current].sort((a,b)=>a.score-b.score);
 const gadoTool=tools.find(t=>t.definition.result==='gado'),gado=gadoTool?s.answers[gadoTool.key]:null;
 const gadoValues=gado?.initialValues||gado?.values;
 const gadoResult=gadoValues?.length===15?gadoScore(gadoValues):null;
 const principles=s.answers['m7-a3-b1']?.saved,letter=s.answers['m7-a8-b1']?.saved,compass=s.answers['m7-a4-b1']?.saved;
 const units=ctx.course.modules.flatMap(m=>m.lessons);
 const formSummary=(labels,data)=>data?labels.map((l,i)=>`<p><strong>${esc(l)}</strong><br>${esc(data['f'+i])}</p>`).join(''):missing;
 const tests=tools.filter(t=>['quiz','scale'].includes(t.definition.type)&&s.completed[t.key]);
 return `<article class="dossier"><h2>DOSSIÊ DA FORJA</h2><p>SEU PONTO DE PARTIDA E SUA PRÓXIMA DIREÇÃO</p><p>Seus próprios registros reunidos, sem novo preenchimento.</p>
 <section><h2>1 — De onde você partiu</h2>${areas.length?areas.map(a=>`<div class="result-row"><strong>${esc(a.name)} · ${a.label}</strong>${bar(a.score/4*100)}</div>`).join(''):missing}<p>Áreas iniciais de atenção: ${esc(areas.filter(a=>a.score<2).map(a=>a.name).join(', ')||'nenhuma abaixo da faixa definida neste autorrelato')}.</p><h3>Índice inicial do Modo Gado</h3>${gadoResult?`<p>${gadoResult.total} / 45 no primeiro registro ${gado?.initialOrigin==='legacy'?'disponível após a atualização. Respostas anteriores a esse registro não podem ser reconstruídas':'preservado'}.</p>`:missing}</section>
 <section><h2>2 — O que você descobriu</h2>${[['Radar da Carência','RADAR DA CARÊNCIA'],['Termômetro de Autodomínio','TERMÔMETRO DE AUTODOMÍNIO'],['Auditoria de Competência','AUDITORIA DE COMPETÊNCIA'],['Peso da Palavra','O PESO DA SUA PALAVRA'],['Radar de Reciprocidade','RADAR DE RECIPROCIDADE'],['Radar de Recaída','RADAR DE RECAÍDA'],['Radar de Recaída 2.0','RADAR DE RECAÍDA 2.0']].map(([title,match])=>`<details><summary>${title}</summary>${record(find(match),s)}</details>`).join('')}<h3>Bússola de Propósito</h3>${formSummary(['O que valorizo','O que sei fazer','O que preciso aprender','Quem posso servir/ajudar'],compass)}${compass?`<p>Possível direção: usar ${esc(compass.f1)} para ajudar ${esc(compass.f3)}, guiado por ${esc(compass.f0)}, enquanto desenvolvo ${esc(compass.f2)}.</p>`:''}</section>
 <section><h2>3 — Seus pontos mais fortes</h2><p>Três maiores resultados na autoavaliação ${final?'final':'de entrada — este resumo será atualizado após o diagnóstico final'}. São posições relativas entre suas respostas, inclusive quando todas merecem cuidado. Empates seguem a ordem das áreas no questionário.</p>${sorted.slice(0,3).map(a=>`<p><strong>${esc(a.name)}</strong> · ${a.label}</p>`).join('')}</section>
 <section><h2>4 — Suas três frentes de construção</h2><h3>PRÓXIMAS FRENTES DA FORJA</h3><p>Três menores resultados na mesma autoavaliação, como convite à reflexão. Não são uma sentença.</p>${priority.slice(0,3).map(a=>`<p><strong>${esc(a.name)}</strong> · ${a.label}</p>`).join('')}</section>
 <section><h2>5 — Sua missão de 90 dias</h2><h3>Plano criado no módulo 3</h3>${record(find('MAPA DOS 90 DIAS'),s)}${letter?`<h3>Direção assumida no módulo 7</h3><p>${esc(letter.f3)}</p>`:''}</section>
 <section><h2>6 — Seus princípios inegociáveis</h2>${principles?Array.from({length:5},(_,i)=>`<p>${i+1}. ${esc(principles['f'+i])} · ${esc(principles['s'+i])}</p>`).join(''):missing}</section>
 <section><h2>7 — Seu código pessoal</h2>${record(find('CÓDIGO PESSOAL'),s)}</section>
 <section><h2>8 — Sua declaração de missão</h2>${letter?`<h3>MINHA DECLARAÇÃO DE MISSÃO</h3>${letter.name?`<p>${esc(letter.name)}</p>`:''}${formSummary(missionFields,letter)}`:missing}</section>
 <section><h2>9 — Sua jornada</h2><div class="compact-stats">${[[xp(s),'XP total'],[rank(s)[0],'Patente'],[units.filter(u=>u.kind==='lesson'&&s.completed[u.id]).length+'/75','Aulas concluídas'],[tests.length+Number(!!initial)+Number(!!final),'Testes realizados'],[tools.filter(t=>['challenge','wordweek'].includes(t.definition.type)&&s.completed[t.key]).length+Number(!!s.completed['m7-mission-b0']),'Desafios concluídos'],[ctx.course.phase.passages.filter(p=>s.completed[p.id]).length+'/6','Missões de passagem'],[Object.keys(s.awards).filter(k=>k.startsWith('medal:')).length,'Conquistas'],[tests.filter(t=>t.definition.exam).length,'Provas concluídas'],[streak(s.dates),'Sequência atual em dias']].map(([n,l])=>`<span><b>${esc(n)}</b>${esc(l)}</span>`).join('')}</div><h3>Conquistas registradas</h3><p>${esc(Object.keys(s.awards).filter(k=>k.startsWith('medal:')).map(k=>k.slice(6)).join(' · ')||'Nenhuma registrada')}</p>${tests.filter(t=>t.definition.exam).map(t=>`<p>${esc(t.unit.title)}: ${grade(t.definition.questions,s.answers[t.key]?.values||[]).percent}% de acertos.</p>`).join('')}</section></article>`;
}
