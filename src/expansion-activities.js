const form=(match,title,fields,extra={})=>({match,title,type:'form',fields,...extra});
const scale=(match,title,items,options,extra={})=>({match,title,type:'scale',items,options,...extra});
const quiz=(match,title,questions)=>({match,title,type:'quiz',questions});
export const entryStatements=[
'Já aceitei comportamentos que normalmente não aceitaria por medo de perder alguém.',
'Já deixei compromissos importantes de lado porque apareceu uma oportunidade romântica.',
'Já fiquei horas pensando por que alguém não respondeu.',
'Já tentei convencer alguém a gostar de mim.',
'Já gastei dinheiro para impressionar.',
'Já me senti inferior porque fui rejeitado.',
'Já coloquei alguém que mal conhecia em um pedestal.',
'Já fiquei monitorando curtidas, visualizações ou status.',
'Já continuei insistindo depois de perceber pouco interesse.',
'Já escondi minhas opiniões por medo de desagradar.',
'Já senti que precisava ter alguma mulher conversando comigo para me sentir bem.',
'Já fiz coisas que considero humilhantes tentando evitar uma rejeição.'
];
export const expansionActivities=[
 scale('O ESPELHO DA ARRANCADA','O Espelho da Arrancada',entryStatements,['Sim','Às vezes','Não'],{result:'entry',baseline:true}),
 scale('O ESPELHO DE RETORNO','O homem que entrou × o homem que está saindo',entryStatements,['Sim','Às vezes','Não'],{result:'entryComparison'}),
 {match:'RAIO-X DO MODO GADO',title:'Raio-X do Modo Gado · 21 sinais',type:'signals'},
 {match:'TRADUTOR DA CARÊNCIA',title:'Tradutor da carência',type:'translator'},
 scale('RADAR DA CARÊNCIA','Radar da carência',['Necessidade de mensagens','Medo de ficar sozinho','Idealização','Necessidade de aprovação','Urgência para relacionamento','Dificuldade com rejeição','Dependência de elogios','Abandono da rotina'],['Não percebo','Pouco','Moderado','Frequente','Muito frequente'],{result:'neediness'}),
 quiz('VÁCUO SEM DESESPERO','Vácuo sem desespero',[
 ['Uma pessoa responde à noite, explica que trabalhou e continua a conversa normalmente. O que é possível concluir?',['Ela está manipulando você.','Não há evidência suficiente de jogo; observe a continuidade.','Demore um dia a mais para equilibrar.'],1,'A explicação é compatível com uma rotina ocupada. Atribuir intenção sem evidência cria uma história; retaliar cria um jogo.'],
 ['Há semanas você inicia tudo e recebe respostas frias. Qual decisão é proporcional?',['Carregar a conversa com mais presentes.','Reconhecer baixa reciprocidade e reduzir o investimento.','Diagnosticar a personalidade da pessoa.'],1,'Você pode decidir com base no padrão de pouca reciprocidade sem adivinhar o motivo nem tentar comprar interesse.'],
 ['Aproximação intensa e sumiço se repetem quando você muda seu investimento.',['Reproduzir o padrão para vencer.','Observar a instabilidade e estabelecer um limite, sem diagnosticar.','Tratar toda demora futura de qualquer pessoa como manipulação.'],1,'Um limite responde ao comportamento observado. O padrão não autoriza diagnóstico, revanche ou generalização.'],
 ['Após quatro horas sem resposta, você manda várias perguntas ansiosas.',['A falta de informação não é uma emergência; pause e volte à rotina.','Continue até obter certeza.','Exija acesso ao celular.'],0,'Ansiedade não cria direito à resposta imediata. Pausar permite tolerar incerteza; cobrança e vigilância ampliam o problema.']
 ]),
 form('FATO X HISTÓRIA','Fato × história',['Fato — o que aconteceu de forma observável?','História — o que minha cabeça está concluindo?','Que informação está faltando?','Qual decisão proporcional posso tomar agora?'],{columns:true}),
 quiz('TREINADOR DE REJEIÇÃO','Treinador de rejeição',[
 ['Ela diz que não quer um relacionamento com você. Qual resposta preserva dignidade?',['Entendo e respeito sua decisão.','Mas eu fiz tanto, você precisa tentar.','Você vai se arrepender.','Vou provocar ciúmes para ela mudar de ideia.'],0,'Digna: respeita a autonomia. Pedir pagamento emocional é carência; ameaçar é agressividade; provocar ciúme é manipulação.'],
 ['Um convite foi recusado. Você sente tristeza e vontade de insistir.',['Aceitar a tristeza e procurar apoio sem pressionar a pessoa.','Enviar um texto até ela explicar cada motivo.','Ofender para não parecer fraco.','Fingir uma crise para receber atenção.'],0,'Sentir tristeza é humano. A resposta digna regula o sentimento sem transferir ao outro a obrigação de corresponder.'],
 ['Você percebe que está treinando apenas para mostrar a uma ex o que perdeu.',['Retomar metas ligadas à própria saúde e responsabilidade.','Mandar fotos para causar arrependimento.','Abandonar o treino porque houve rejeição.','Usar outra pessoa para provocar ciúmes.'],0,'Reorientar a motivação preserva o benefício do treino. As outras opções continuam organizadas pela reação da ex.']
 ]),
 scale('TESTE DA PRÓPRIA COMPANHIA','Autonomia emocional em desenvolvimento',['Consigo ficar algumas horas sem buscar mensagens.','Consigo fazer atividades sozinho sem sentir vergonha.','Tenho interesses próprios.','Tenho objetivos que não dependem de relacionamento.','Consigo permanecer solteiro sem sentir que minha vida está parada.','Tenho amizades e vínculos fora de relacionamento amoroso.','Sei descansar sem precisar de estímulo constante.'],['Ainda não','Raramente','Às vezes','Frequentemente','Consigo com constância'],{result:'autonomy'}),
 form('3 HORAS DE SOLITUDE','Solitude intencional',['Qual atividade você escolheu para três horas de presença consigo?','O que senti quando parei de fugir do silêncio?','Como equilibrarei solitude e vínculos saudáveis?']),
 form('MAPA DE REFERÊNCIAS MASCULINAS','Mapa de referências masculinas',Array.from({length:5},(_,i)=>['Pessoa','Qualidade','O que aprendo','O que não quero repetir','Como aplicarei'].map(x=>`Referência ${i+1} — ${x}`)).flat()),
 scale('RODA DA IDENTIDADE','Roda da identidade',['Relacionamento','Família','Trabalho','Estudo','Saúde','Amizades','Propósito/serviço','Vida interior'],Array.from({length:11},(_,i)=>String(i)),{result:'identity'}),
 {match:'14 DIAS DE RUPTURA',title:'14 dias de ruptura',type:'challenge',days:14,items:['Não persegui validação','Cumpri minha prioridade','Controlei impulsos digitais','Mantive meus limites','Fiz algo para minha construção'],medal:'O Despertar'},
 form('RAIO-X DO IMPULSO','Raio-X do impulso',['Hábito que quero compreender','Gatilho','O que sinto','O que faço','Qual recompensa recebo','Qual consequência vem depois','Qual comportamento pode substituir'],{chain:true}),
 quiz('SEMÁFORO DO CONTROLE SOCIAL','Semáforo do controle social',[
 ['Você percebe que está falando demais e decidindo pior. Em que sinal está?',['Verde — posso continuar.','Amarelo — hora de interromper o consumo e sair com segurança.','Só existe problema se houver conflito.'],1,'O amarelo pede ação antes da perda de controle. Não espere o vermelho; organize transporte seguro e não dirija após beber.'],
 ['Você bebeu, mas se sente normal e precisa voltar para casa.',['Dirigir devagar.','Usar transporte seguro sem dirigir.','Tomar café e dirigir.'],1,'A sensação subjetiva de controle não garante aptidão. Café e prudência percebida não tornam a direção segura após beber.'],
 ['Um amigo perde controle e inicia uma discussão.',['Disputar quem aguenta mais.','Priorizar segurança e buscar apoio apropriado.','Insistir para beber mais e relaxar.'],1,'No vermelho, segurança vem primeiro. Confronto e mais consumo ampliam risco.']
 ]),
 {match:'ORÇAMENTO DE ATENÇÃO',title:'Orçamento de atenção',type:'budget',items:['Trabalho','Estudo','Família','Treino','Redes','Relacionamento','Entretenimento','Sono/preparação','Outro']},
 quiz('PRESSÃO E RAIVA','Pressão e raiva',[
 ['Um colega te critica em público e você sente raiva.',['Engolir e fingir que nada ocorreu para sempre.','Pedir uma conversa reservada e tratar o fato com clareza.','Humilhar o colega para recuperar posição.','Ameaçar para encerrar o assunto.'],1,'Assertividade trata o problema sem humilhar. Passividade evita o limite; agressividade e ameaça criam novos danos.'],
 ['Uma discussão está escalando e você percebe que vai explodir.',['Fazer uma pausa comunicada e combinar a retomada.','Sair e nunca mais responder como punição.','Quebrar algo para mostrar frustração.','Continuar até vencer.'],0,'Uma pausa com retomada regula a tensão. Silêncio punitivo, destruição e disputa não resolvem o conflito.']
 ]),
 form('AUDITORIA DO SONO','Auditoria de sono e recuperação',['Horário habitual de dormir','Horário habitual de levantar','Como o celular participa do horário de dormir?','Como cafeína e ambiente afetam meu descanso?','Qual ajuste de regularidade farei nesta semana?']),
 form('ENGENHEIRO DO AMBIENTE','Engenheiro do ambiente',['Quero parar ou reduzir','Como aumento o atrito?','Quero começar ou aumentar','Como reduzo o atrito?'],{columns:true}),
 form('INVENTÁRIO DE VALOR','Inventário de valor',['Três problemas que sei resolver','Três problemas que preciso aprender a resolver','Três maneiras de aumentar minha competência']),
 {match:'SPRINT DE APRENDIZAGEM',title:'Sprint de aprendizagem · 30–30–30',type:'sprint',items:['Aprender por 30 minutos','Praticar por 30 minutos','Produzir por 30 minutos']},
 form('AUTÓPSIA DO FRACASSO','Autópsia do fracasso',['O que aconteceu?','O que estava sob meu controle?','O que aprendo?','O que modifico?','Quando tento novamente?']),
 form('DETECTOR DE OSTENTAÇÃO','Detector de ostentação',['Qual compra estou considerando?','Eu compraria isso se ninguém pudesse ver? Por quê?','Como essa compra cabe nas quatro caixas do meu orçamento?']),
 form('PILHA DE COMPETÊNCIAS','Pilha de competências',['Competência principal','Competência complementar 1','Competência complementar 2','Competência que falta']),
 form('CHECKPOINTS DE 90 DIAS','Checkpoints da missão',['Meta de 90 dias que assumi','Dia 30 — evidência de resultado e próximo ajuste','Dia 60 — evidência de resultado e próximo ajuste','Dia 90 — resultado e continuidade']),
 form('PAINEL DO CONSTRUTOR','Minha semana de construção',['Três resultados importantes','Cinco tarefas essenciais','Tempo reservado para estudo','Tempo reservado para treino','Presença com a família','Descanso planejado']),
 {match:'CÍRCULO DE RESPONSABILIDADE',title:'Círculo de responsabilidade',type:'sorting',groups:['Não controlo','Posso influenciar'],prompt:'Situação ou problema'},
 form('CONSTRUTOR DE FRASES FIRMES','Construtor de frases firmes',['Situação','Fato observável','Meu limite','Pedido ou decisão'],{sentence:true}),
 quiz('SALA DE CONFLITO','Sala de conflito',[
 ['Vocês discordam por mensagem e o tom está piorando.',['Marcar conversa em momento calmo, deixando claro que o assunto será retomado.','Mandar todas as acusações de uma vez.','Ameaçar terminar para conseguir acordo.'],0,'Trocar canal e combinar retomada é regulação. Acumular acusações ou ameaçar abandono pressiona sem resolver.'],
 ['Seu parceiro revelou uma insegurança em confiança. Durante a briga, você pensa em usá-la.',['Usar porque o outro também errou.','Tratar o desacordo atual sem usar a vulnerabilidade como arma.','Publicar uma indireta.'],1,'Intimidade não é munição. Trate fatos do conflito, preservando confidencialidade e respeito.'],
 ['Um familiar te pressiona a decidir enquanto você está exausto.',['Responder por obrigação imediatamente.','Explicar que precisa descansar e combinar um momento concreto para decidir.','Prometer algo e depois ignorar.'],1,'Adiar com compromisso de retorno difere de fugir. O cansaço pode prejudicar decisões.']
 ]),
 scale('MAPA DE COMPATIBILIDADE','Mapa de compatibilidade',['Filhos','Casamento','Fé/religião','Cidade e moradia','Estilo de vida','Dinheiro','Família','Papéis no relacionamento'],['Compatível','Ainda não sei','Possível incompatibilidade','Não negociável'],{result:'compatibilityExpanded'}),
 quiz('MANIPULAÇÃO OU CONFLITO NORMAL','Manipulação ou conflito normal?',[
 ['Depois de uma discordância, a pessoa pede meia hora para se acalmar e combina a retomada.',['Conflito normal.','Possível padrão preocupante.','Informação insuficiente.'],0,'Uma pausa comunicada com retorno pode regular o conflito. Não equivale, por si só, a punição pelo silêncio.'],
 ['A pessoa não respondeu durante a tarde. Você não sabe o motivo.',['Conflito normal.','Possível padrão preocupante.','Informação insuficiente.'],2,'Uma ausência isolada não revela intenção. Observar contexto é mais responsável do que concluir manipulação.'],
 ['Toda vez que você encontra amigos, recebe ameaças e bloqueios até desistir.',['Conflito normal.','Possível padrão preocupante.','Informação insuficiente.'],1,'A repetição liga punição à restrição de vínculos. Preserve segurança, apoio e limites; não responda com controle.'],
 ['Um desacordo financeiro levou a uma conversa difícil, com escuta e tentativa de acordo.',['Conflito normal.','Possível padrão preocupante.','Informação insuficiente.'],0,'Conflitos podem ser legítimos. A maneira de tratá-los e o padrão ao longo do tempo importam.'],
 ['Alguém ameaça violência caso você encerre a relação.',['Conflito normal.','Possível padrão preocupante.','Informação insuficiente.'],1,'Ameaça exige priorizar segurança e ajuda adequada. Não espere repetição para agir.']
 ]),
 quiz('TREINADOR DE LIMITES','Pedido, limite, ameaça ou controle?',[
 ['“Podemos combinar um horário para conversar?”',['Pedido','Limite','Ameaça','Controle'],0,'Um pedido abre espaço para acordo sem impor punição.'],
 ['“Se continuar havendo humilhação, vou encerrar minha participação nessa conversa.”',['Pedido','Limite','Ameaça','Controle'],1,'O limite descreve sua resposta e protege sua participação.'],
 ['“Se você sair, vou destruir suas coisas.”',['Pedido','Limite','Ameaça','Controle'],2,'A ameaça anuncia dano para coagir. Priorize segurança e apoio adequado.'],
 ['“Você está proibida de ver seus amigos.”',['Pedido','Limite','Ameaça','Controle'],3,'Controlar a liberdade alheia é diferente de definir seus limites.']
 ]),
 scale('ESPELHO DO PADRÃO','O padrão que exijo e o que ofereço',['Lealdade','Responsabilidade','Honestidade','Consciência financeira','Estabilidade e autorregulação','Capacidade de pedir desculpa','Capacidade de ouvir não','Diálogo sem humilhação'],['Ofereço','Estou construindo','Ainda não ofereço'],{result:'standards'}),
 {match:'CONVERSAS ANTES DO COMPROMISSO',title:'Conversas antes do compromisso sério',type:'checklist',items:['Filhos','Casamento','Fé','Dinheiro','Família','Moradia','Carreira','Fidelidade','Privacidade','Expectativas','Conflitos']},
 form('QUEBRA DE CICLO GERACIONAL','Quebra de ciclo geracional',['Herdei e quero manter — cinco exemplos','Herdei e quero corrigir — cinco exemplos','Não recebi e quero construir — cinco exemplos'],{columns:true}),
 {match:'MAPA DE INFLUÊNCIA',title:'Mapa de influência',type:'sorting',groups:['Eleva','Neutro','Drena'],categories:['Pessoas','Grupos','Conteúdos','Ambientes'],prompt:'Pessoa, grupo, conteúdo ou ambiente'},
 scale('RADAR DE RECAÍDA 2.0','Radar de recaída 2.0',['Modo Gado','Sono','Treino','Trabalho','Dinheiro','Vícios','Palavra','Família','Amizades','Estudo'],['Verde — rotina preservada','Amarelo — sinais de atenção','Vermelho — preciso agir'],{result:'traffic'}),
 form('DECLARAÇÃO DE LEGADO','Minha declaração de legado',['Quero ser lembrado como…','Minha família deverá receber de mim…','Minha maior contribuição será…','O padrão que termina comigo é…','O padrão que começa comigo é…']),
 form('CÓDIGO PESSOAL','Meu código pessoal',['Meu nome ou identificação','Corpo — minha regra mínima','Mente — minha regra mínima','Trabalho — minha regra mínima','Dinheiro — minha regra mínima','Relacionamentos — minha regra mínima','Família — minha regra mínima','Amizades — minha regra mínima','Caráter — minha regra mínima','Descanso — minha regra mínima','Serviço/legado — minha regra mínima'],{document:true})
];
