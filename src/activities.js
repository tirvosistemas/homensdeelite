import {expansionActivities} from './expansion-activities.js';
const form=(match,title,fields,extra={})=>({match,title,type:'form',fields,...extra});
const scale=(match,title,items,options,extra={})=>({match,title,type:'scale',items,options,...extra});
const challenge=(match,days,items,medal)=>({match,title:match,type:'challenge',days,items,medal});
export const activities=[
 scale('ÍNDICE DO MODO GADO','Índice do Modo Gado',[
 'Já abandonei responsabilidades para conseguir atenção feminina.','Continuo insistindo mesmo quando percebo pouco interesse.','Tenho dificuldade de dizer “não” para uma mulher que considero muito atraente.','Já gastei dinheiro que não deveria para impressionar alguém.','Verifico mensagens repetidamente esperando resposta.','Meu humor muda muito quando sou ignorado.','Tolero comportamentos que considero desrespeitosos por medo de perder alguém.','Já exagerei ou menti sobre minha vida para parecer mais interessante.','Costumo idealizar mulheres que ainda conheço pouco.','Tenho medo excessivo de ficar solteiro.','Já abandonei rotina, amigos, estudo ou treino por uma paixão.','Frequentemente dou muito mais atenção do que recebo.','Preciso sentir interesse feminino para me considerar valioso.','Sinto necessidade constante de estar conversando com alguma mulher.','Quando sou rejeitado, sinto forte necessidade de provar meu valor.'
 ],['Nunca','Raramente','Frequentemente','Quase sempre'],{result:'gado'}),
 form('O CONSELHO DOS CINCO HOMENS','O conselho dos cinco homens',Array.from({length:5},(_,i)=>[`Referência ${i+1} — nome ou identificação`,`Referência ${i+1} — qualidade que admiro`,`Referência ${i+1} — o que aprenderia com ele`]).flat().concat('Se observassem sua rotina por sete dias, o que mandariam você parar de fazer?')),
 {match:'PAUSA DE 10 MINUTOS',title:'Pausa de 10 minutos',type:'pause'},
 {match:'MITO OU POSTURA',title:'Mito ou postura?',type:'quiz',questions:[
 ['Homem forte nunca pede ajuda.',['Postura','Distorção'],1,'Autossuficiência não significa isolamento. Reconhecer a necessidade de ajuda é maturidade.'],
 ['Homem de palavra admite quando erra.',['Postura','Distorção'],0,'Assumir o erro permite reparar a confiança.'],
 ['Liderar exige controlar todas as decisões da mulher.',['Postura','Distorção'],1,'Liderança exige diálogo e responsabilidade; sua companheira não é subordinada.'],
 ['Homem de valor consegue dizer não mesmo sob pressão.',['Postura','Distorção'],0,'Um limite respeitoso não depende de aprovação.'],
 ['Demonstrar carinho torna o homem fraco.',['Postura','Distorção'],1,'Afeto e discernimento podem coexistir.'],
 ['Controlar a própria raiva exige mais força do que simplesmente explodir.',['Postura','Distorção'],0,'Autodomínio cria espaço entre impulso e ação.']
 ]},
 challenge('LIMPEZA DIGITAL',7,['Controlei notificações','Não persegui respostas','Reduzi distrações','Priorizei minha rotina'],'Despertar'),
 form('SE / ENTÃO','Minhas regras de autodomínio', ['Regra 1 — SE','Regra 1 — ENTÃO','Regra 2 — SE','Regra 2 — ENTÃO','Regra 3 — SE','Regra 3 — ENTÃO']),
 {match:'A HORA DE IR EMBORA',title:'A hora de ir embora',type:'quiz',questions:[['Amanhã você tem compromisso às 8h. Já passou do horário planejado e os amigos insistem: “Só mais uma”.',['Fico para não parecer chato.','Espero alguém decidir sair comigo.','Agradeço a noite e vou embora.'],2,'Sustentar seu horário protege a responsabilidade de amanhã. Não é ser antissocial; é cumprir uma decisão.']]},
 scale('TERMÔMETRO DE AUTODOMÍNIO','Quanto este comportamento controla você hoje?',['Álcool','Pornografia/sexualização compulsiva','Redes sociais','Jogos','Procrastinação','Sono desorganizado','Comida impulsiva','Compras/gastos impulsivos'],['Não me controla','Pouco','Moderadamente','Bastante','Muito'],{result:'priority'}),
 {match:'CHECK-UP DE PRESENÇA',title:'Check-up de presença',type:'checklist',items:['Sono minimamente organizado','Atividade física','Higiene','Saúde bucal','Alimentação minimamente organizada','Exames e cuidados de saúde quando necessários','Postura','Roupa e apresentação']},
 challenge('21 DIAS DE DOMÍNIO',21,['Horário de acordar','Atividade física','Controle de álcool','Zero drogas ilícitas','Controle de pornografia','Sono','Hidratação','Tarefa produtiva antes do entretenimento'],'Autodomínio'),
 {match:'CONSUMIDOR VS. CONSTRUTOR',title:'Consumidor × construtor',type:'comparison',pairs:[['O que existe para me divertir?','O que consigo produzir?'],['Quem vai me ajudar?','O que preciso aprender?'],['Como pareço bem-sucedido?','O que estou realmente construindo?']]},
 form('AUDITORIA DE COMPETÊNCIA','Meu próximo foco de competência',['O que sei fazer hoje?','Que habilidade aprendi no último ano?','Qual habilidade aumentaria meu valor profissional?','Que conhecimento estou adiando?','Que problema consigo resolver para alguém?','Qual profissão ou área desejo aprofundar?']),
 scale('AUDITORIA DE OSTENTAÇÃO','Auditoria de ostentação',['Compro para impressionar.','Gasto mais quando estou acompanhado.','Evito olhar minhas contas.','Uso crédito sem planejamento.','Gasto no fim de semana e me arrependo na segunda.','Priorizo aparência de sucesso.','Não possuo reserva.','Não sei quanto gasto por mês.','Adio contas essenciais para comprar algo por status.','Compro por impulso sem comparar com meu orçamento.'],['Nunca','Às vezes','Frequentemente'],{result:'finance'}),
 form('MAPA DOS 90 DIAS','Meu contrato de 90 dias',['Minha meta em 90 dias','Por que isso importa','Resultado concreto que comprovará','Habilidade necessária','Ação diária mínima','Ação semanal principal','Obstáculo mais provável','Minha resposta ao obstáculo','Como medirei progresso'],{button:'Assumir missão'}),
 {match:'O PESO DA SUA PALAVRA',title:'O peso da sua palavra',type:'promises'},
 {match:'TREINADOR DO',title:'Treinador do “não”',type:'quiz',questions:[
 ['Um amigo pede dinheiro novamente sem devolver o anterior.',['Empresto por medo de perder a amizade.','Humilho o amigo.','Não posso emprestar mais; precisamos resolver o valor anterior.','Ignoro para sempre.'],2,'Assertividade combina clareza e respeito. Você pode negar um pedido sem humilhar.'],
 ['No trabalho pedem uma entrega incompatível com seu prazo atual.',['Prometo tudo.','Explico minha capacidade e negocio prioridades.','Grito.','Desapareço.'],1,'Negociar o escopo antes do prazo preserva confiança e qualidade.'],
 ['Sua família insiste em um compromisso que você não pode assumir.',['Aceito e falto.','Culpo todos.','Digo que não consigo e proponho uma alternativa possível.','Minto.'],2,'Limites claros evitam promessas que você sabe que não cumprirá.'],
 ['Em um relacionamento, uma brincadeira recorrente te humilha.',['Aceito em silêncio.','Retalio.','Explico o impacto e peço que pare.','Faço ameaças.'],2,'Conversar sobre limites é diferente de controlar alguém.'],
 ['O grupo insiste para você beber mais.',['Bebo para pertencer.','Digo: para mim já deu.','Ofendo os amigos.','Aceito e culpo o grupo.'],1,'Uma resposta simples e firme sustenta sua decisão.']
 ]},
 scale('MATRIZ DE AUTOSSUFICIÊNCIA','Minhas próximas habilidades práticas',['Casa — preparar uma refeição e cuidar da limpeza','Finanças — organizar um orçamento','Saúde — organizar cuidados e consultas','Mobilidade — resolver manutenção ou transporte','Documentos — organizar prazos e documentos','Emergência — conhecer primeiros socorros básicos','Tecnologia — proteger contas e arquivos'],['Não sei','Sei o básico','Consigo fazer sozinho','Consigo ensinar'],{result:'skills'}),
 {match:'SEMANA DA PALAVRA INEGOCIÁVEL',title:'Semana da palavra inegociável',type:'wordweek',days:7,medal:'Guardião da Palavra'},
 {match:'DILEMAS DE HONRA',title:'Dilemas de honra',type:'quiz',questions:[
 ['Você percebe um erro no trabalho que ninguém descobriu.',['Escondo.','Espero alguém perceber.','Aviso e apresento uma solução.'],2,'Honra não exige perfeição. Exige responsabilidade e reparação.'],
 ['Você prometeu chegar às 19h e percebe às 18h que vai atrasar.',['Não digo nada.','Aviso antes e assumo o atraso.','Invento uma desculpa depois.'],1,'Avisar permite que a outra pessoa se organize; a responsabilidade continua sua.'],
 ['Você recebe crédito por uma ideia de um colega.',['Fico em silêncio.','Reconheço a contribuição dele.','Digo que a ideia era minha.'],1,'Integridade também aparece quando a vantagem de ficar calado parece pequena.']
 ]},
 scale('RADAR DE RECIPROCIDADE','Radar de reciprocidade',['Os dois iniciam conversas?','A pessoa demonstra curiosidade sobre minha vida?','Ela também sugere encontros?','Quando não pode, sugere outra possibilidade?','Existe respeito pelo meu tempo?','Existe interesse sem necessidade de presentes?','Existe esforço dos dois lados?','Quando discordamos, existe conversa em vez de punição?'],['Não','Às vezes','Sim'],{result:'reciprocity'}),
 {match:'ALERTAS DE COMPORTAMENTO',title:'Alertas de comportamento',type:'alerts'},
 scale('FILTRO DE CARÁTER','Caráter e compatibilidade',['Respeito','Verdade','Responsabilidade','Reciprocidade','Visão de futuro','Família','Dinheiro','Conflito','Limites','Fidelidade'],['Compatível','Ainda não sei','Possível incompatibilidade'],{result:'compatibility'}),
 scale('O PADRÃO QUE EXIJO','O padrão que desejo e o padrão que ofereço',['Lealdade — você também oferece?','Saúde e cuidado — você também oferece?','Responsabilidade — você também oferece?','Maturidade — você também oferece?'],['Sim','Em construção','Ainda não'],{result:'standards'}),
 {match:'INTERESSE SEM HUMILHAÇÃO',title:'Interesse sem humilhação',type:'quiz',questions:[
 ['Você convida alguém. Ela não pode e não oferece outra data.',['Pressiono por uma data.','Respondo com educação e deixo espaço.','Mando mensagens diariamente.'],1,'Demonstre interesse sem carregar a interação sozinho. Observe reciprocidade.'],
 ['A pessoa demora algumas horas para responder.',['Cobro imediatamente.','Continuo minha rotina e observo o padrão ao longo do tempo.','Faço ciúmes.'],1,'Uma demora isolada não define interesse. Preserve sua rotina e observe contexto.'],
 ['Você percebe desrespeito recorrente.',['Aceito para não perder.','Converso claramente e estabeleço limite.','Humilho de volta.'],1,'Firmeza protege dignidade sem exigir agressão. Se houver ameaça, priorize segurança.']
 ]},
 form('CARTA AO MEU FUTURO FILHO','Carta ao meu futuro filho',['Quais cinco princípios você gostaria que seu filho aprendesse observando sua vida?'],{count:true}),
 {match:'AUDITORIA DA IRMANDADE',title:'Auditoria da irmandade',type:'brotherhood'},
 scale('RADAR DE RECAÍDA','Radar de recaída',['Estou voltando a dormir tarde sem necessidade?','Estou abandonando treino?','Estou voltando a gastar impulsivamente?','Estou procurando validação novamente?','Estou negligenciando trabalho?','Estou escondendo erros?','Estou voltando para ambientes que me derrubavam?','Estou relaxando completamente porque já melhorei?'],['Não','Um pouco','Sim'],{result:'priority'}),
 form('PLANO ANTIRRECAÍDA','Meu protocolo de retorno',['Meu hábito antigo mais perigoso','Meu principal gatilho','Meu primeiro sinal de alerta','Quando isso acontecer, vou','Quem pode me ajudar','O que preciso remover do ambiente','Qual ação me coloca novamente no caminho']),
 form('REVISÃO SEMANAL','Revisão da Forja',['Onde fui forte?','Onde preciso melhorar?','Que promessa cumpri?','Que promessa quebrei?','Onde desperdicei tempo?','Quanto avancei profissionalmente?','Como cuidei do corpo?','Como tratei minha família?','Estou voltando para algum comportamento antigo?','Qual será minha prioridade da próxima semana?']),
 challenge('30 DIAS DA FORJA',30,['Corpo — movimento físico','Mente — estudo','Missão — trabalho ou construção profissional','Ordem — ambiente ou finanças','Caráter — uma promessa cumprida'],'Homem em Forja Constante'),
 form('FERRAMENTA — O ESPELHO','Minha declaração pessoal',['O homem que sou hoje','O homem que preciso me tornar','O comportamento que termina agora','A disciplina que começa agora','Minha missão nos próximos 90 dias']),
 {match:'O CÓDIGO DOS HOMENS',title:'Eu assumo este código',type:'pledge'}
];
// Preserve old field/choice indices so existing answers keep their meaning.
activities.find(a=>a.match==='SE / ENTÃO').fields.push('Regra 4 — SE','Regra 4 — ENTÃO','Regra 5 — SE','Regra 5 — ENTÃO');
activities.find(a=>a.match==='21 DIAS DE DOMÍNIO').items.push('Autocontrole digital','Consumo consciente','Promessa diária cumprida');
activities.find(a=>a.match==='MATRIZ DE AUTOSSUFICIÊNCIA').items.push('Cozinha — preparar refeições','Primeiros socorros — buscar formação adequada','Automóvel — quando aplicável','Viagem — planejar com autonomia','Segurança doméstica básica');
export const activityFor=title=>[...expansionActivities,...activities].find(a=>title.includes(a.match));
