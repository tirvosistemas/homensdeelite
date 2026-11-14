import {consolidationExams,consolidationFinal} from './consolidation-exams.js';
export const consolidationAreas=[
 ['Disciplina e execução',['Cumpro aquilo que planejo para o dia.','Consigo começar tarefas mesmo sem vontade.','Tenho horários minimamente organizados.','Defino um primeiro passo para tarefas adiadas.','Preservo um mínimo possível nos dias difíceis.','Reviso o que funcionou e ajusto a semana.']],
 ['Corpo e saúde',['Cuido do sono.','Pratico atividade física regularmente conforme minhas condições.','Organizo alimentação e hidratação na rotina.','Mantenho cuidados de higiene e apresentação.','Respeito a necessidade de recuperação.','Busco avaliação apropriada para sintomas persistentes.']],
 ['Trabalho e competência',['Sei quais habilidades profissionais estou desenvolvendo.','Concluo entregas que posso descrever ou demonstrar.','Protejo períodos de concentração para tarefas importantes.','Comunico riscos de prazo com antecedência.','Utilizo feedback para melhorar meu trabalho.','Aplico o estudo em projetos reais.']],
 ['Dinheiro e organização',['Tenho clareza sobre meus gastos.','Evito dívidas desnecessárias.','Consulto meu orçamento antes de assumir parcelas.','Reviso obrigações e seus prazos.','Construo uma reserva conforme minhas possibilidades.','Reconheço quando uma compra busca apenas impressionar.']],
 ['Comunicação e postura',['Consigo dizer não de maneira respeitosa.','Consigo conversar em situações desconfortáveis e seguras.','Escuto sem interromper automaticamente.','Separo fatos de minhas interpretações.','Expresso limites de forma clara.','Cuido do ritmo e da clareza da minha fala.']],
 ['Ambiente e influência',['Meu ambiente facilita bons hábitos.','Convivo com pessoas que respeitam minha evolução.','Reviso conteúdos digitais que consomem minha atenção.','Organizo materiais para facilitar minhas atividades.','Limito exposição a influências que prejudicam minha rotina.','Ofereço o apoio e a lealdade que espero dos amigos.']],
 ['Constância e direção',['Retomo rapidamente depois de falhar.','Consigo manter hábitos durante semanas.','Tenho uma meta concreta para meu ciclo atual.','Acompanho indicadores ligados às minhas ações.','Reviso a direção sem trocar de objetivo a cada dificuldade.','Mantenho cuidados básicos nas áreas que não são prioridade principal.']]
];
export const indexItems=consolidationAreas.flatMap(([,items])=>items);
export const indexOptions=['0 — Nunca','1 — Raramente','2 — Às vezes','3 — Frequentemente','4 — Quase sempre'];
export const indexResults=values=>consolidationAreas.map(([name],i)=>{const mean=values.slice(i*6,i*6+6).reduce((a,b)=>a+b,0)/6;return {name,mean,label:mean>=3?'BASE FORTE':mean>=2?'EM CONSTRUÇÃO':'FRÁGIL'};});
export const pillars=['Corpo','Mente','Trabalho','Dinheiro','Palavra','Ambiente','Serviço/responsabilidade'];
export const f=(label,type='textarea',extra={})=>({label,type,...extra});
const opts=(label,options,extra={})=>f(label,'select',{options,...extra});
const form=(fields,extra={})=>({mode:'form',fields:fields.map(x=>typeof x==='string'?f(x):x),...extra});
const table=(columns,extra={})=>({mode:'table',columns:columns.map(x=>typeof x==='string'?f(x,'text'):x),...extra});
const scale=(items,options,extra={})=>({mode:'scale',items,options,...extra});
const choices=['Escolha','Sim','Em parte','Ainda não'];
const actionScenarios=[
 ['Você planejou treino, dormiu adequadamente e apenas está sem vontade.',['Preciso de motivação','Preciso cumprir o sistema'],1,'Comece pelo plano ou pelo mínimo combinado. A ausência de entusiasmo não é impedimento por si só.'],
 ['Você reservou vinte minutos de estudo e o material está preparado.',['Preciso de motivação','Preciso cumprir o sistema'],1,'Proteja o bloco possível e execute a primeira ação.'],
 ['A entrega de trabalho está definida, mas começar parece desconfortável.',['Preciso de motivação','Preciso cumprir o sistema'],1,'Escolha a primeira ação concreta e use o tempo reservado.'],
 ['Documentos acumulam porque você espera disposição para organizar tudo.',['Preciso de motivação','Preciso cumprir o sistema'],1,'Agende um passo pequeno; não é necessário resolver tudo hoje.'],
 ['Está no horário de desacelerar para dormir, mas um vídeo sugere outro.',['Preciso de motivação','Preciso cumprir o sistema'],1,'A regra contra distração protege a rotina de sono.'],
 ['Uma tarefa doméstica combinada cabe no dia, mas você prefere adiar.',['Preciso de motivação','Preciso cumprir o sistema'],1,'O compromisso precisa de uma ação, não de vontade perfeita.'],
 ['Você prometeu enviar um documento e tem as informações necessárias.',['Preciso de motivação','Preciso cumprir o sistema'],1,'Cumpra o acordo e comunique qualquer impedimento real.'],
 ['Uma caminhada planejada cabe em sua condição atual, mas há desânimo leve.',['Preciso de motivação','Preciso cumprir o sistema'],1,'Um início possível pode preservar a prática. Dor, doença ou exaustão pedem ajuste responsável.'],
 ['Você pode ler por vinte minutos, mas quer esperar uma noite ideal.',['Preciso de motivação','Preciso cumprir o sistema'],1,'Use o período possível e preserve continuidade.'],
 ['A revisão semanal está agendada, mas você prefere apenas fazer outra lista.',['Preciso de motivação','Preciso cumprir o sistema'],1,'Revisar o que funcionou e falhou orienta a próxima execução.']
];
const q=(text,good,bad,other,explanation)=>[text,[good,bad,other],0,explanation];
export const toolsByTitle={
 'FERRAMENTA — MOTIVAÇÃO OU DEVER?':{type:'quiz',questions:actionScenarios},
 'FERRAMENTA — TRANSFORMADOR DE INTENÇÃO':form(['Quero…',f('Quando?','time'),'Onde?',f('Durante quantos minutos?','number',{min:1,max:1440}),'Qual é o primeiro passo?'],{summary:'intention'}),
 'FERRAMENTA — PRIMEIRO MOVIMENTO':{mode:'first-move',fields:[f('Qual tarefa está atrasada?'),f('Qual é o resultado final?'),f('Qual primeira ação física pode executar em menos de cinco minutos?')]},
 'FERRAMENTA — MEU MÍNIMO':form(['Corpo','Estudo','Trabalho','Organização','Leitura','Sono'].flatMap(c=>[c+' — ideal',c+' — mínimo não negociável']),{columns:true}),
 'FERRAMENTA — MAPA DO DIA':form(['Trabalho','Treino','Estudo','Refeições','Família','Descanso','Tarefas'].flatMap(c=>[opts(c+' — período',['Manhã','Tarde','Noite']),f(c+' — horário ou bloco possível','text')]),{columns:true,summary:'day-map'}),
 'FERRAMENTA — 3 VITÓRIAS':{mode:'victories'},
 'FERRAMENTA — DIAGNÓSTICO DA RESISTÊNCIA':{mode:'resistance',items:['Estou fisicamente cansado','Estou confuso sobre o que fazer','Estou com medo de errar','Estou entediado','Estou distraído','Estou evitando uma conversa/tarefa difícil'],responses:['Avalie descanso e recuperação; ajuste o plano à sua condição. Cansaço persistente merece atenção apropriada.','Defina o resultado esperado e a primeira ação física.','Escolha um passo pequeno e seguro; procure informação ou apoio para a dúvida concreta.','Retome o objetivo e execute um bloco curto possível.','Afaste um estímulo e prepare o ambiente antes de recomeçar.','Descreva o fato e o próximo passo; prepare a conversa em um contexto seguro.']},
 'FERRAMENTA — FECHAMENTO NOTURNO':form(['Ambiente minimamente organizado','Roupas/material preparados','Prioridades de amanhã definidas','Alarmes definidos','Telefone preparado para o horário de sono'].map(l=>opts(l,['Conferi e está pronto','Preciso ajustar','Não se aplica hoje'])),{summary:'review'}),
 'FERRAMENTA — REVISÃO DE COMANDO':form(['O que funcionou?','O que falhou?','O que desperdicei?','Onde fui disciplinado?','Onde negociei demais comigo?','Qual hábito precisa de ajuste?','Prioridade 1 da próxima semana','Prioridade 2 da próxima semana','Prioridade 3 da próxima semana'],{journal:true}),
 'execution-system':form([f('Horário aproximado para acordar','time'),f('Horário de sono','time'),'Três prioridades diárias','Mínimos não negociáveis','Quando e como farei minha revisão semanal?','SE ocorrer o obstáculo…','ENTÃO executarei…','Minhas regras contra distração'],{button:'ATIVAR MEU SISTEMA',summary:'system',prefill:'system'}),
 'FERRAMENTA — MAPA FÍSICO':form([f('Dias por semana em que se movimenta','number',{min:0,max:7,step:1}),opts('Possui rotina de força?',choices),opts('Possui atividade cardiovascular?',choices),opts('Trabalha mobilidade?',choices),opts('Fica sentado por muitas horas?',choices),opts('Possui dores persistentes?',choices),'Qual primeiro passo é adequado à sua realidade?'],{summary:'physical'}),
 'FERRAMENTA — TREINO SUSTENTÁVEL':form(['Dias disponíveis',f('Minutos reais disponíveis por sessão','number',{min:1,max:1440}),'Atividade escolhida','Plano ideal','Plano mínimo']),
 'FERRAMENTA — AUDITORIA DE ALIMENTAÇÃO':scale(['Organizo minha hidratação','Incluo frutas e vegetais','Mantenho regularidade possível','Modero ultraprocessados','Observo e evito excesso noturno','Modero bebidas açucaradas','Evito excesso de álcool','Planejo minha alimentação'],indexOptions,{summary:'priorities',note:'Princípios gerais de organização. Necessidades clínicas e quantidades individuais devem ser tratadas com profissional qualificado.'}),
 'FERRAMENTA — RAIO-X DO SONO':form([f('Horário habitual de sono','time'),opts('Regularidade',['Regular','Varia um pouco','Muito irregular']),opts('Tela na cama',['Não uso','Às vezes','Frequentemente']),opts('Cafeína perto do sono',['Não consumo','Às vezes','Frequentemente']),opts('Ambiente',['Adequado para descansar','Precisa de ajustes']),opts('Despertares',['Raros','Ocasionais','Frequentes']),opts('Sensação ao acordar',['Recuperado','Variável','Frequentemente cansado']),'Qual ajuste prático farei?'],{summary:'sleep'}),
 'FERRAMENTA — CHECKLIST DE PRESENÇA':form(['Postura','Contato visual','Voz audível','Roupa adequada','Higiene','Movimento','Energia'].map(l=>opts(l,['Em dia','Em construção','Precisa de atenção']))),
 'FERRAMENTA — MAPA DE ENERGIA':form(['Manhã','Meio do dia','Tarde','Noite'].flatMap(c=>[opts(c+' — energia',['1','2','3','4','5']),opts(c+' — atividade',['Trabalho profundo','Tarefas simples','Treino','Descanso'])]),{columns:true,summary:'energy'}),
 'FERRAMENTA — PRODUÇÃO X MOVIMENTO':{mode:'classify',options:['Produção real','Manutenção','Distração disfarçada'],items:['Concluir o relatório que resolve a demanda do cliente','Arquivar documentos necessários à operação','Reorganizar listas repetidamente para evitar a entrega','Entregar uma correção testada no projeto','Responder uma solicitação necessária de andamento','Assistir vídeos sem relação com a habilidade planejada'],correct:[0,1,2,0,1,2]},
 'FERRAMENTA — BLOCO DE FOCO':{mode:'focus'},
 'FERRAMENTA — MATRIZ DE IMPACTO':table(['Tarefa',opts('Quadrante',['Alta importância / alta urgência','Alta importância / baixa urgência','Baixa importância / alta urgência','Baixa importância / baixa urgência'])],{summary:'groups'}),
 'FERRAMENTA — PROJETO DE COMPETÊNCIA':form(['Objetivo','Habilidade','Projeto prático',f('Prazo','date'),'Critério de conclusão']),
 'SIMULADOR — RECEBENDO CRÍTICA':{type:'quiz',questions:[q('Seu chefe aponta um erro real usando um tom áspero. Qual resposta é madura?','Vou corrigir o erro; podemos tratar o ajuste com respeito.','Se o tom foi ruim, não há nada a aprender.','Concordo com qualquer crítica para acabar a conversa.','Separe conteúdo e tom: responsabilidade não exige aceitar humilhação.'),q('Um cliente diz que a entrega não atende ao combinado.','Vamos comparar o acordo e um exemplo do que ficou diferente.','O cliente não conhece meu esforço, então a crítica não vale.','Mudarei tudo sem esclarecer o problema.','Pedir exemplos e contexto evita defesa automática e retrabalho sem direção.'),q('Um colega sugere melhorar um processo que você criou.','Quais dificuldades percebeu e que mudança podemos testar?','Meu processo não precisa de avaliação.','Vou abandonar o processo inteiro para não discordar.','Uma postura madura examina informação e testa uma melhora proporcional.')]},
 'FERRAMENTA — PROPOSTA DE VALOR PROFISSIONAL':form(['Eu ajudo…','A resolver…','Por meio de…','Minha evidência é…'],{summary:'value'}),
 'FERRAMENTA — MAPA PROFISSIONAL 12M':form(['Competência central','Competência complementar 1','Competência complementar 2','Projeto prático',f('Certificação relevante (opcional)','text',{optional:true}),'Evidência de domínio','0–3 meses — entrega e aprendizado','4–6 meses — entrega e aprendizado','7–9 meses — entrega e aprendizado','10–12 meses — entrega e aprendizado'],{summary:'professional'}),
 'FERRAMENTA — RAIO-X FINANCEIRO':{mode:'finance',fields:['Entradas mensais','Despesas fixas mensais (sem parcelas de dívida)','Despesas variáveis mensais','Parcelas mensais de dívidas','Saldo total das dívidas','Reserva atual'].map(l=>f(l,'number',{min:0,step:.01}))},
 'FERRAMENTA — CLASSIFICADOR DE GASTOS':table(['Despesa',f('Valor','number',{min:0,step:.01}),opts('Categoria',['Necessidade','Conforto','Status','Construção'])],{summary:'expenses'}),
 'FERRAMENTA — MAPA DE DÍVIDAS':table(['Credor ou apelido',f('Saldo devedor','number',{min:0,step:.01}),f('Parcela','number',{min:0,step:.01}),f('Taxa e período, quando conhecidos','text',{optional:true}),'Prazo',opts('Prioridade',['Alta','Média','Baixa'])],{allowEmpty:'Não tenho dívidas a registrar',summary:'debts'}),
 'FERRAMENTA — META DE RESERVA':{mode:'reserve',fields:[f('Despesa essencial mensal','number',{min:0,step:.01}),f('Meta total de reserva definida por você','number',{min:.01,step:.01}),f('Valor atual','number',{min:0,step:.01})]},
 'FERRAMENTA — DIÁRIO DO GASTO IMPULSIVO':table(['O que queria comprar?',f('Quanto?','number',{min:0,step:.01}),'O que senti antes?',opts('Preciso disso?',['Sim','Não','Ainda avaliando']),opts('Esperarei?',['24 horas','48 horas','Mais tempo']),opts('Comprei depois?',['Ainda esperando','Sim','Não'])],{allowEmpty:'Não observei episódio neste período',summary:'journal'}),
 'FERRAMENTA — CÓDIGO FINANCEIRO PESSOAL':form(['Minha regra para compras de status','Minha regra para parcelas e orçamento','Minha regra para construir reserva','Minha frequência de revisão de gastos','Minha regra para honrar acordos'],{summary:'financial-code'}),
 'FERRAMENTA — TREINO DE VOZ':{mode:'voice'},
 'FERRAMENTA — ESCUTA EM 3 CAMADAS':{mode:'listening'},
 'TREINADOR DE ASSERTIVIDADE':{mode:'assertive'},
 'SIMULADOR — DISCORDÂNCIA':{type:'quiz',questions:[q('Um colega propõe uma solução que você considera arriscada.','Vejo um risco neste ponto. Podemos comparar as alternativas?','Sua proposta mostra que você não entende o assunto.','Concordo agora e reclamo com outros depois.','Apresente razões sem ridicularizar a pessoa.'),q('Um amigo tem uma opinião diferente sobre um tema importante.','Discordo por estes motivos e quero entender seu raciocínio.','Se discordamos, nossa amizade não pode continuar.','Vou provocar até ele desistir de falar.','Discordar não exige insultar ou encerrar automaticamente o vínculo.'),q('Uma brincadeira recorrente incomoda você.','Não gosto dessa brincadeira. Peço que pare.','Vou expor uma falha sua para equilibrar.','Rirei mesmo incomodado, sem comunicar meu limite.','Um limite claro não depende de revanche nem de adivinhação.')]},
 'FERRAMENTA — PREPARADOR DE CONVERSA DIFÍCIL':form(['Situação','Fato observado','Minha interpretação','O que quero resolver','Meu limite','O que posso negociar']),
 'FERRAMENTA — AUDITORIA DO AMBIENTE':form(['Quarto','Mesa','Celular','Cozinha','Roupa','Documentos','Ferramentas'].map(l=>opts(l,['Ajuda','Neutro','Atrasa'])),{summary:'environment'}),
 'FERRAMENTA — LIMPEZA DE INFLUÊNCIA':table(['Tipo de conteúdo ou identificação opcional',opts('Efeito principal',['Ensina','Inspira','Distrai','Irrita','Sexualiza','Desperdiça tempo']),opts('Decisão',['Aproximar','Manter','Reduzir','Remover'])],{summary:'groups'}),
 'FERRAMENTA — MAPA DA IRMANDADE 2.0':table(['Identificação ou apelido',opts('Influência',['Eleva','Neutra','Drena']),opts('Exposição',['Aproximar','Manter','Limitar'])],{summary:'groups'}),
 'FERRAMENTA — MEU CONSELHO DE HOMENS':form(['Homem que me ensina disciplina','Homem que entende profissão','Homem que fala verdade','Homem com experiência familiar','Homem que admiro pelo caráter'].map(l=>f(l+' — identificação opcional','text',{optional:true})).concat([f('Qual referência quero aproximar ou buscar?')]),{summary:'council'}),
 'FERRAMENTA — PAINEL DOS 7 PILARES':scale(pillars,['0 — Abandonado','1 — Frágil','2 — Funcionando','3 — Forte'],{summary:'pillars'}),
 'FERRAMENTA — FRENTE PRINCIPAL':{mode:'front',fields:pillars.map(l=>opts(l,['MANUTENÇÃO','DESENVOLVIMENTO','ATAQUE']))},
 'FERRAMENTA — QUARTEL-GENERAL 90D':{mode:'hq'},
 'FERRAMENTA — BOTÃO DE RETORNO':form(['O que aconteceu?','O que aprendi?','Qual será minha próxima ação?'],{button:'VOLTAR PARA A FORJA',summary:'return',journal:true})
};
export const moduleChallenges=[
 {days:14,custom:4,items:['Essencial 1','Essencial 2','Essencial 3','Essencial 4'],medal:'Executor'},
 {days:21,items:['Movimento adequado','Água','Sono','Alimentação','Higiene','Postura'],medal:'Corpo Sob Comando'},
 {mode:'delivery',medal:'Construtor de Competência'},
 {days:30,items:['Registrei meus gastos (ou ausência deles)','Evitei compra impulsiva de status','Agi sobre uma fonte de desperdício'],weekly:true,medal:'Dinheiro em Ordem'},
 {days:7,items:['Presença','Escuta','Clareza','Limite respeitoso quando necessário'],evidence:true,medal:'Voz Firme'},
 {days:7,items:['Cuidei do ambiente físico','Revisei o ambiente digital','Reduzi uma influência negativa','Fortaleci uma influência positiva'],medal:'Guardião do Ambiente'},
 {days:30,items:['Corpo','Estudo','Trabalho','Dinheiro','Palavra','Ambiente','Responsabilidade'],maintenance:true,medal:'Homem Consolidado — Fase II'}
];
export function consolidationDefinition(block){
 const mode=block.consolidation;if(!mode)return null;
 if(mode==='module-exam')return {type:'quiz',exam:true,title:block.title,questions:consolidationExams[block.module-1]};
 if(mode==='final-exam')return {type:'quiz',exam:true,title:block.title,questions:consolidationFinal,consolidationFinal:true};
 if(mode==='module-challenge')return {type:'consolidation',mode:'tracker',title:block.title,...moduleChallenges[block.module-1],module:block.module};
 const a=toolsByTitle[mode];return a?{type:'consolidation',title:block.title.replace(/^FERRAMENTA — /,''),...a}:{...block,type:'consolidation',mode};
}
export const hqKey='f2-m7-a4-b2'; // resolved by title at runtime as well, never shared with Phase I.
