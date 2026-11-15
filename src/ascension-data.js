import {f,indexOptions} from './consolidation-data.js';
import {ascensionExams,ascensionFinal} from './ascension-exams.js';
export const ascensionAreas=[
 ['Pensamento estratégico',['Examino consequências além do resultado imediato.','Distingo sintomas de possíveis causas.','Comparo opções antes de comprometer recursos.','Considero o custo de não decidir.','Identifico o que posso testar e reverter.','Procuro informação que contrarie minha hipótese.','Concentro recursos no que tem maior impacto.']],
 ['Tomada de decisão',['Registro decisões importantes e suas razões.','Defino critérios antes de escolher.','Avalio probabilidade e impacto dos riscos.','Considero quem será afetado por minha decisão.','Reviso decisões à luz de novas evidências.','Defino limites de perda aceitáveis.','Decido dentro de um prazo proporcional à importância.']],
 ['Competência profissional',['Consigo demonstrar resultados do meu trabalho.','Conheço meu principal gargalo profissional.','Pratico habilidades ligadas ao meu objetivo.','Converto estudo em entregas verificáveis.','Peço feedback específico sobre meu desempenho.','Mantenho um plano realista de desenvolvimento.']],
 ['Liderança',['Comunico resultados e padrões esperados.','Assumo minha parte nos erros da equipe.','Delego com autonomia e limites claros.','Dou feedback sobre fatos e comportamentos.','Acompanho entregas sem controlar cada movimento.','Ajudo outras pessoas a desenvolver capacidade.']],
 ['Negociação e comunicação',['Preparo interesses e limites antes de negociar.','Faço perguntas para compreender necessidades.','Conheço alternativas se não houver acordo.','Respeito recusas sem manipular.','Apresento propostas com evidências.','Registro os compromissos do acordo.']],
 ['Geração de renda',['Investigo problemas reais de possíveis clientes.','Testo hipóteses antes de investir muito.','Separo faturamento de resultado.','Comunico valor sem prometer o que não entrego.','Avalio se uma oportunidade combina com minha capacidade.','Concluo experimentos pequenos com aprendizado registrado.']],
 ['Capital e risco',['Conheço aproximadamente meus ativos e dívidas.','Separo dinheiro disponível de patrimônio imobilizado.','Relaciono objetivos financeiros com seus prazos.','Desconfio de promessas de retorno garantido elevado.','Considero perdas que não poderia suportar.','Reviso meu plano patrimonial sem buscar enriquecimento rápido.']],
 ['Reputação e influência',['Cumpro acordos mesmo sem reconhecimento imediato.','Minha apresentação corresponde ao que consigo entregar.','Ofereço ajuda sem transformar relações em cobranças.','Mantenho contato respeitoso com minha rede.','Reviso a coerência da minha presença digital.','Observo contexto e interesses antes de intervir.']]
];
export const ascensionItems=ascensionAreas.flatMap(([,items])=>items);
export {indexOptions};
export function ascensionResults(values){let offset=0;return ascensionAreas.map(([name,items])=>{const mean=values.slice(offset,offset+=items.length).reduce((a,b)=>a+b,0)/items.length;return {name,mean,label:mean>=3?'FORTE':mean>=2?'EM DESENVOLVIMENTO':'LIMITANTE'};});}
const sel=(label,options,extra={})=>f(label,'select',{options,...extra});
const num=(label,min=0,max=1e12)=>f(label,'number',{min,max,step:'any'});
const form=(fields,extra={})=>({type:'consolidation',mode:'form',fields:fields.map(x=>typeof x==='string'?f(x):x),...extra});
const table=(columns,extra={})=>({type:'consolidation',mode:'table',columns:columns.map(x=>typeof x==='string'?f(x,'text'):x),...extra});
const scale=(items,extra={})=>({type:'consolidation',mode:'scale',items,options:Array.from({length:11},(_,i)=>String(i)),summary:'priorities',...extra});
const quiz=(questions)=>({type:'quiz',questions});
const q=(question,good,bad,why)=>[question,[good,bad],0,why];
const summaryForm=(summary,fields,extra={})=>form(fields,{summary,...extra});
export const medals3=['Mente Estratégica','Capital de Carreira','Comando Responsável','Negociador','Gerador de Valor','Guardião do Capital','Capital Social','Construtor de Grande Missão'];
export const ascensionTools={
 'REAÇÃO OU DECISÃO?':quiz([
 ['Um cliente reclama e você responde com insultos antes de conferir o pedido.',0,'A reação descarrega emoção antes de compreender o problema.'],['Um prazo muda; você verifica impactos e combina prioridades antes de responder.',1,'Informação e critérios orientam uma decisão.'],['Uma oferta com prazo curto faz você comprar sem ler condições.',0,'A pressão substituiu sua avaliação.'],['Você compara custo, prazo e possibilidade de reverter antes de contratar.',1,'A decisão considera alternativas e consequências.'],['Um colega discorda e você corta seu acesso ao projeto para puni-lo.',0,'Punição impulsiva não resolve a divergência.'],['Você investiga um erro antes de definir a correção e a responsabilidade.',1,'Investigar permite uma ação proporcional.'],['Você promete uma entrega impossível para encerrar a cobrança.',0,'O alívio imediato cria um problema posterior.'],['Você recusa uma entrega depois de analisar capacidade e explicar o limite.',1,'Limites fundamentados preservam o compromisso.'],['Você demite alguém no calor da discussão sem apurar o ocorrido.',0,'A consequência é alta e exige apuração e processo adequado.'],['Você pausa uma contratação para confirmar uma referência relevante.',1,'A pausa produz informação que pode mudar a escolha.'],['Você copia um investimento porque um conhecido se gabou do resultado.',0,'Imitação não substitui análise de risco e adequação.'],['Você define um teste pequeno antes de expandir um serviço.',1,'O teste cria evidências com exposição limitada.']].map(([text,answer,why])=>[text,['REAÇÃO','DECISÃO'],answer,why])),
 'CINCO PORQUÊS':summaryForm('whys',['Problema observado',...Array.from({length:5},(_,i)=>f('Por quê? '+(i+1),'textarea',{optional:i>0}))]),
 'E DEPOIS?':form(['Decisão','Consequência imediata','Consequência em 30 dias','Consequência em um ano','Quem será afetado?','Que padrão esta decisão fortalece?']),
 'PORTA DE UMA VIA OU DUAS VIAS':summaryForm('door',['Decisão',sel('Reversibilidade',['Duas vias — reversível','Uma via — difícil de reverter']),'Que custo, limite ou teste justifica sua classificação?']),
 'MATRIZ DE DECISÃO':{type:'ascension',mode:'matrix'},
 'SALA DO FRACASSO':form(['Projeto',...Array.from({length:5},(_,i)=>['Causa possível '+(i+1),'Como prevenir '+(i+1),'Sinal precoce '+(i+1),'Resposta '+(i+1)]).flat()]),
 'TRÊS FUTUROS':summaryForm('futures',['Melhor cenário razoável','Cenário provável','Pior cenário razoável','Preparação útil nos três cenários']),
 'MAPA DE RISCO':{type:'ascension',mode:'risk'},
 'SALA DE COMANDO':{type:'ascension',mode:'order'},
 'DIÁRIO DE DECISÕES':table([f('Data','date'),'Decisão','Hipótese','Risco',f('Resultado posterior','text',{optional:true}),f('Lição','text',{optional:true})]),
 'BALANÇO DE CARREIRA':scale(['Competência técnica','Comunicação','Liderança','Portfólio','Experiência','Rede','Reputação','Capacidade comercial'],{summary:'bottleneck'}),
 'PILHA DE COMPETÊNCIAS 2.0':form(['Competência principal','Complementar 1','Complementar 2','Competência comercial','Competência humana']),
 'DETECTOR DE GARGALO':scale(['Consigo executar o trabalho necessário','Consigo demonstrar minha capacidade','Consigo comunicar o valor que entrego','Tenho acesso a oportunidades relevantes','Consigo transformar oportunidades em acordos'],{summary:'bottleneck',note:'As menores notas indicam gargalos possíveis segundo suas respostas. Escolha uma ação e teste essa hipótese.'}),
 'BANCO DE EVIDÊNCIAS':table(['Situação','Problema','Minha ação','Resultado','Aprendizado']),
 'CONVERSA DE CRESCIMENTO':quiz([
 q('Você quer negociar salário. Como iniciar?','Apresentar entregas, responsabilidades e uma proposta compatível com o contexto.','Exigir aumento apenas pelo tempo de casa.','Clareza, evidência e realismo ajudam a sustentar a conversa.'),q('Você deseja promoção, mas ainda não demonstrou parte das competências.','Pedir critérios e construir um plano com evidências e revisão.','Declarar-se pronto e ignorar as lacunas.','Postura madura inclui reconhecer o que precisa desenvolver.'),q('Uma mudança de função amplia sua responsabilidade.','Alinhar escopo, recursos, autoridade, critérios e remuneração.','Aceitar qualquer escopo sem esclarecer o trabalho.','Responsabilidade precisa de condições concretas.'),q('O gestor diz que não há orçamento neste ciclo.','Investigar prazo, critérios e alternativas legítimas de desenvolvimento.','Inventar uma oferta externa para pressionar.','Não falsifique alternativas. Negociação deve preservar confiança.')]),
 'career-plan':form(['Posição atual','Posição desejada','Competências exigidas','Competências atuais','Lacunas','Projetos que construirão evidência','Referências ou mentores','Evidências de avanço',sel('Horizonte',['12 meses','18 meses','24 meses'])]),
 'AUTÓPSIA DE LIDERANÇA':form(['Resultado esperado','O que aconteceu?','O que comuniquei?','O que acompanhei?','O que deleguei?','O que faltou?','Minha responsabilidade','Responsabilidade de outras pessoas','Correção']),
 'BRIEFING DE MISSÃO':form(['Objetivo','Por que importa?','Prazo','Padrão de qualidade','Limites','Recursos','Critério de conclusão']),
 'ESCADA DA DELEGAÇÃO':summaryForm('delegation',['Contexto e capacidade atual da pessoa',sel('Nível de autonomia',['1 — Execute esta instrução','2 — Pesquise e traga opções','3 — Recomende uma opção','4 — Decida e me informe antes','5 — Decida e informe depois','6 — Assuma a responsabilidade integral']),'Limites e risco','Quando e como acompanhar?']),
 'TREINADOR DE FEEDBACK':summaryForm('feedback',[sel('Situação',['Entrega atrasada','Qualidade abaixo do acordo','Interrupções em reunião','Bom resultado a reforçar']),'Fato observável','Impacto','Padrão esperado','Próxima ação acordada']),
 'MAPA DO CONFLITO':form([f('Parte A — apelido opcional','text',{optional:true}),f('Parte B — apelido opcional','text',{optional:true}),'Fato','Interpretação A','Interpretação B','Interesse A','Interesse B','Objetivo comum','Acordo possível']),
 'CRISE DE EQUIPE':{type:'ascension',mode:'simulation',variant:'team'},
 'PLANO DE DESENVOLVIMENTO DE PESSOA':form(['Habilidade atual','Próximo nível','Nova responsabilidade','Apoio necessário','Checkpoint']),
 'POSIÇÃO X INTERESSE':form(['O que a pessoa pede?','O que pode estar tentando proteger?','O que pode estar tentando obter?','Que medo pode estar presente?','Que pergunta ajudaria a descobrir?']),
 'PREPARADOR DE NEGOCIAÇÃO':form(['O que desejo?','Meu mínimo aceitável','O que posso conceder?','O que não negocio?','Melhor alternativa fora do acordo']),
 'PERGUNTA OU PRESSÃO?':quiz([
 ['Qual problema esta condição precisa resolver?',['Pergunta útil','Pressão','Ameaça','Exploração de vulnerabilidade'],0,'Busca compreender interesses sem retirar a liberdade de decisão.'],['Assine agora; não vou deixar você ler o contrato.',['Pergunta útil','Pressão','Ameaça','Exploração de vulnerabilidade'],1,'A urgência imposta impede avaliação informada.'],['Se não aceitar, vou divulgar uma informação privada sua.',['Pergunta útil','Pressão','Ameaça','Exploração de vulnerabilidade'],2,'Coerção não é negociação legítima.'],['Sei que você está desesperado, então vou esconder os custos.',['Pergunta útil','Pressão','Ameaça','Exploração de vulnerabilidade'],3,'Usar fragilidade para esconder termos prejudica o consentimento.']]),
 'MATRIZ DE CONCESSÕES':form(['O que posso conceder facilmente?','O que só concedo em troca de algo?','O que é inegociável?']),
 'CONSTRUTOR DE ARGUMENTO':summaryForm('argument',['Problema','Consequência','Solução','Evidência','Próximo passo']),
 'TREINADOR DE 3 MINUTOS':{type:'ascension',mode:'presentation'},
 'MESA DE NEGOCIAÇÃO':quiz(['Salário','Cliente','Fornecedor','Prazo','Parceria','Compra profissional'].map((context,i)=>q(context+': uma condição importante impede o acordo. Qual próximo passo preserva uma negociação legítima?', ['Confrontar entregas e critérios de remuneração.','Investigar necessidade e ajustar escopo com transparência.','Comparar prazo, qualidade e contrapartidas sustentáveis.','Explicar capacidade e negociar prioridade ou recursos.','Definir responsabilidades, riscos e critérios de saída.','Comparar custo total, condições e alternativa de não comprar.'][i],'Ameaçar ou inventar informações para forçar a aceitação.','Prepare limites, interesses e alternativas; deixe claros os compromissos de cada parte.'))),
 'CAÇADOR DE PROBLEMAS':form(['Quem enfrenta o problema?','Qual problema?','Frequência','Custo do problema','Como resolve hoje?','Possível solução']),
 'TESTE DE HIPÓTESE':form(['Cliente','Problema','Solução pela qual poderia pagar','Como testar em sete dias?']),
 'CONVERSA DE VENDAS':quiz([
 q('Uma pessoa está curiosa, mas não explicou uma necessidade.','Perguntar o que ela pretende resolver antes de oferecer.','Criar medo para acelerar a compra.','Descubra a necessidade real e aceite quando não houver adequação.'),q('Um cliente precisa de algo que seu serviço não oferece.','Explicar o limite e considerar encaminhamento adequado.','Prometer para conseguir o pagamento e decidir depois.','Vender com ética exige capacidade de entregar.'),q('O cliente compara preços e tem orçamento limitado.','Esclarecer escopo, custo total e opções viáveis sem pressão.','Ocultar custos futuros para parecer mais barato.','O acordo precisa ser compreendido pelas duas partes.')]),
 'OFICINA DE PROPOSTA':summaryForm('proposal',['Cliente','Problema','Resultado esperado','Mecanismo de entrega','Evidência']),
 'SIMULADOR DE NEGÓCIO SIMPLES':summaryForm('business',[num('Faturamento estimado'),num('Custos variáveis'),num('Custos fixos')]),
 'QUALIFICADOR DE CLIENTE':form(['Necessidade','Orçamento','Prazo','Adequação','Respeito','Capacidade de decisão']),
 'MAPA DE GERAÇÃO DE RENDA':form(['Renda atual — descrição ou valor aproximado','Habilidades monetizáveis','Serviços possíveis','Tempo disponível','Risco aceitável','Primeiro experimento']),
 'BALANÇO DO HOMEM':summaryForm('balance',[num('Total de ativos — inclua a reserva uma única vez'),num('Total de dívidas')],{private:true}),
 'DETECTOR DE PROMESSA SUSPEITA':quiz([
 q('Uma oferta promete retorno muito alto e garantido.','Tratar a garantia como sinal de alerta e investigar riscos.','Concluir que o investimento não tem risco.','Retorno elevado garantido é um alerta, não prova de segurança.'),q('Um vendedor exige transferência hoje e recusa documentação.','Interromper a pressa e verificar informações de forma independente.','Transferir antes que a oportunidade desapareça.','Pressão e falta de transparência impedem decisão informada.'),q('Você não entende como o resultado seria produzido.','Buscar explicação verificável e não comprometer recursos sem entender.','Aceitar porque a apresentação usa termos complexos.','Complexidade não substitui compreensão.'),q('Um anúncio mostra riqueza rápida, sem custos ou perdas possíveis.','Considerar as informações ausentes antes de qualquer decisão.','Tomar depoimentos como garantia de resultado.','Exemplos selecionados não demonstram retorno esperado nem adequação.')]),
 'TESTE DE SOBREVIVÊNCIA':summaryForm('survival',['Decisão','Pior perda razoável',sel('Consigo suportar?',['Sim','Não','Ainda não sei']),'Tempo de recuperação','Como limitar o dano?']),
 'MAPA DE CAPITAL':form(['Objetivo','Horizonte','Necessidade de liquidez','Risco que posso suportar','Opções que preciso estudar — sem recomendação automática']),
 'capital-plan':form(['Situação atual','Dívidas','Reserva','Objetivos de 1–3 anos','Objetivos de 5–10 anos','Habilidades para gerar renda','Riscos','Próxima ação educacional'],{private:true}),
 'ESPELHO DE REPUTAÇÃO':form(['Três palavras que as pessoas provavelmente usam sobre mim','Três palavras pelas quais quero ser reconhecido','Diferença e comportamento a desenvolver']),
 'APRESENTAÇÃO DE 30 SEGUNDOS':summaryForm('intro',['Nome ou identificação','Área','Problema que resolvo','Evidência','Interesse atual']),
 'CRM PESSOAL SIMPLES':table(['Nome ou apelido','Contexto','Área',f('Último contato','date'),f('Próximo contato','date'),'Como posso ajudar?'],{private:true}),
 'AUDITORIA DE PRESENÇA':form(['Perfil','Biografia','Foto','Conteúdo','Coerência','Informações antigas a atualizar','Risco à reputação e ação']),
 'LEIA A SALA':quiz([
 q('Em uma reunião, todos opinam, mas ninguém definiu quem aprova.','Perguntar respeitosamente quem decide e quais critérios serão usados.','Tentar dominar a conversa com volume.','Identifique papéis antes de confundir fala com autoridade.'),q('Em um evento, uma pessoa está encerrando uma conversa e olhando o relógio.','Fazer apresentação breve e perguntar se há momento adequado para continuar.','Prender sua atenção com um pedido longo.','O contexto e o tempo da outra pessoa importam.'),q('Dois setores discutem o prazo de uma entrega.','Identificar interesses, fatos e objetivo comum antes de propor acordo.','Escolher o lado de quem tem mais influência.','Inteligência social não é bajulação; é compreender o contexto com ética.')]),
 'DECOMPOSITOR DE MISSÃO':form(['Objetivo','Marco 1','Marco 2','Marco 3','Próxima ação']),
 'ESSENCIAL X DESEJÁVEL X DEPOIS':{type:'ascension',mode:'scope'},
 'MAPA DE RECURSOS':form(['Tempo','Orçamento','Pessoas','Ferramentas','Riscos']),
 'PERSISTIR, AJUSTAR OU ENCERRAR':summaryForm('decision',['Dados disponíveis','Progresso','Custo','Aprendizado','Alternativas',sel('Minha decisão fundamentada',['Persistir','Ajustar','Considerar encerramento']),'Por que e quando revisar?']),
 'ESTACIONAMENTO DE IDEIAS':table(['Ideia','Por que interessa?',f('Quando revisar?','date')]),
 'PÓS-MISSÃO':form(['O que pretendíamos fazer?','O que aconteceu?','Por que houve diferença?','O que manter ou mudar na próxima missão?'])
};
export const passageFields=[['Decisão real tomada','Como usei critérios, riscos e consequências?','O que executarei e quando revisarei?'],['Evidência produzida','O que ela demonstra?'],['Responsabilidade delegada','Clareza, autonomia e limites combinados','Como acompanhei sem microgerenciar?'],['Negociação real realizada','Como a preparação orientou a conversa?','Resultado e aprendizado'],['Oferta, serviço ou melhoria testada','Valor econômico observado e evidência','O que ajustarei?'],['O que o balanço, os riscos e o plano já preenchidos revelaram?','Qual ação concreta realizei?'],['Relação profissional fortalecida','Que valor ofereci antes de pedir?','Aprendizado']];
export const challenges3=[
 {type:'consolidation',mode:'tracker',days:7,items:['Registrei uma decisão relevante e seu raciocínio'],evidence:true,evidencePrompt:'Qual decisão tomou, por quê e o que aprendeu?'},
 form(['Projeto ou evidência concluída','Competência demonstrada','Resultado verificável','Aprendizado']),
 form(['Missão real — profissional, voluntária ou colaborativa','Resultado esperado','Como distribuí responsabilidades?','Como acompanhei?','Resultado e retrospectiva']),
 form(['Negociação legítima realizada','Preparação utilizada','Resultado','Aprendizado']),
 form(['Problema real','Oferta ou melhoria simples','Como testei com pessoas reais?','Resultado observado','Próximo ajuste']),
 form(['Que ação concreta tomei para organizar meu capital?','O que aprendi com o balanço, riscos e plano já registrados?']),
 {type:'ascension',mode:'connections'}
];
export function ascensionDefinition(block){if(!block.ascension)return null;const mode=block.ascension;
 const title=block.title.replace(/^(FERRAMENTA|SIMULADOR) — /,'');
 let a=ascensionTools[mode.replace(/^(FERRAMENTA|SIMULADOR) — /,'')];
 if(mode==='module-challenge')a={...challenges3[block.module-1],medal:medals3[block.module-1]};
 if(mode==='passage')a=form(passageFields[block.passage-1]);
 if(mode==='module-exam')a={...quiz(ascensionExams[block.module-1]),exam:true};
 if(mode==='final-exam')a={...quiz(ascensionFinal),exam:true};
 return {type:'ascension',mode,title,phase:'III',...a,passage:block.passage};
}
