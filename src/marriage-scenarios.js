import {marriageCases} from './marriage-cases.js';
import {datingCases} from './dating-cases.js';
import {controlScenarios,familyScenarios} from './dating-scenarios.js';
import {caseQuestions} from './marriage-exams.js';
const parse=(text,options)=>text.trim().split('\n').map(line=>{const [q,n,why]=line.split('|');return [q,options,Number(n),why];});
export const partnershipOptions=['Cooperação saudável','Liderança servidora','Submissão voluntária na moldura adotada','Controle','Abuso/comportamento grave','Informação insuficiente'];
export const partnershipScenarios=parse(`Os dois distribuem responsabilidades depois de ouvir as possibilidades de cada um.|0|A cooperação preserva voz e responsabilidade.
Ele percebe uma necessidade da casa, organiza a solução e presta contas.|1|Assumir, servir e responder pelos efeitos expressa liderança servidora.
Ela, livre de pressão, escolhe apoiar uma decisão prudente discutida pelos dois dentro da fé que compartilham.|2|Adesão voluntária não significa inferioridade ou silêncio obrigatório.
Ele proíbe a esposa de discordar de decisões familiares.|3|Calar uma pessoa adulta não é escuta ou parceria.
Ele ameaça machucá-la se não aceitar sua vontade.|4|Ameaça exige segurança; linguagem de aliança não a justifica.
Só se sabe que ela concordou com uma decisão, sem conhecer as condições.|5|Concordância isolada não revela liberdade, contexto ou coerção.
O casal negocia descanso e cuidado conforme a rotina real.|0|Divisão conversada considera necessidades de ambos.
Ele assume um erro de planejamento e organiza reparação.|1|Prestação de contas inclui reconhecer os próprios erros.
Ela escolhe acompanhar uma proposta familiar após participar e manter liberdade para recusar.|2|Escolha livre e voz preservada diferem de obediência forçada.
Ele usa sua renda para reivindicar autoridade sobre todas as preferências dela.|3|Renda não compra dignidade ou autonomia.
Um marido retém todos os recursos para impedir a esposa de sair de uma situação perigosa.|4|Aprisionamento financeiro é grave e pede proteção.
Alguém informa que o marido decidiu rápido; não há contexto sobre urgência ou participação.|5|Uma decisão isolada precisa de contexto para ser avaliada.
Os dois revisam um acordo doméstico quando chega um filho.|0|Acordos podem mudar com as necessidades da família.
Ele busca orientação especializada para um risco que ultrapassa sua capacidade.|1|Reconhecer limites e buscar ajuda integra responsabilidade.
Ela apoia por convicção compartilhada um plano que ajudou a discutir, sem medo de retaliação.|2|Voluntariedade exige liberdade e dignidade preservadas.
Ele exige abandonar um trabalho seguro para que ela não tenha contatos profissionais.|3|Restringir autonomia por imposição não é proteção.
Ele exige intimidade sexual usando medo e ameaça religiosa.|4|Consentimento não existe sob coerção, inclusive no casamento.
Só se sabe que o casal possui funções domésticas diferentes.|5|Funções diferentes não revelam por si só justiça ou coerção.
O casal escolhe um modelo de contas com transparência e acesso combinado.|0|Modelos podem variar quando respeitam acordo e segurança.
Ele assume cuidado noturno possível para proteger o descanso da família.|1|Serviço concreto e responsabilidade não diminuem liderança.
Ela decide livremente seguir uma orientação que considera prudente, podendo expressar dúvida e discordância.|2|Submissão voluntária na moldura da fase não apaga voz adulta.
Ele transforma toda divergência em cobrança de submissão.|3|A linguagem religiosa está substituindo diálogo por imposição.
Um marido quebra objetos para intimidar a esposa durante uma discussão.|4|Intimidação é grave, não firmeza ou liderança.
Um casal afirma seguir uma visão cristã, sem descrever como vive suas decisões.|5|O rótulo religioso não prova segurança, serviço ou controle.
Os dois protegem a privacidade do lar e aceitam apoio saudável de familiares.|0|Fronteiras podem coexistir com redes de apoio.
Ele explica uma decisão emergencial, ouve impactos e revê o plano depois.|1|Urgência não elimina escuta posterior e prestação de contas.
Ela aceita de modo livre e informado uma proposta familiar, sem obrigação de tolerar erro, crime ou risco.|2|Adesão voluntária não exige cumplicidade com conduta destrutiva.
Ele exige autorização prévia para cada movimento cotidiano da esposa.|3|Fiscalização permanente restringe autonomia.
Ele impede acesso a atendimento necessário para obter obediência.|4|Impedir cuidado por coerção requer atenção à segurança e apoio.
Ela está silenciosa numa reunião; não se sabe se deseja falar ou se sente medo.|5|Silêncio não permite concluir voluntariedade nem submissão.`,partnershipOptions);
const intimacyOptions=['Cuidado e diálogo respeitosos','Uso deliberado de poder/coerção','Saúde ou contexto a compreender','Informação insuficiente'];
export const intimacyExtra=parse(`No pós-parto há recuperação física, exaustão e menor desejo.|2|A recuperação pede respeito, cuidado e apoio; não obrigação sexual.
Ela recusou uma aproximação, sem outras informações sobre motivo ou padrão.|3|Um não deve ser respeitado e não prova manipulação.
Ele condiciona o acesso a recursos essenciais à aceitação de sexo.|1|Pressão financeira compromete consentimento e segurança.
Os dois conversam sobre diferença de desejo sem cobrar ou humilhar.|0|Diálogo pode acolher necessidades e limites de ambos.
Houve mudança de medicamento e desconforto persistente.|2|Causas de saúde merecem avaliação profissional, não diagnóstico pelo cônjuge.
A intimidade diminuiu, mas não se sabe contexto, acordo ou sofrimento.|3|Frequência isolada não revela intenção.
Uma pessoa declara retirar afeto íntimo para punir uma discordância e conseguir obediência.|1|Nomear um padrão deliberado não autoriza responder com coerção.
Ele respeita uma recusa e oferece conversa em momento oportuno.|0|Respeito permanece mesmo diante de frustração.
Existe dor e receio de procurar atendimento.|2|Acolhimento e orientação de saúde são apropriados; insistência não é cuidado.
A esposa não quis conversar naquele momento, sem outras informações.|3|É possível combinar outro momento, sem presumir uma causa ou intenção.`,intimacyOptions);
export const intimacySimulation=[...caseQuestions([marriageCases[6][1],marriageCases[6][5],marriageCases[6][6]]),intimacyExtra[0],...caseQuestions([marriageCases[6][7],marriageCases[6][8],marriageCases[6][9],marriageCases[6][2]])];
export const crisisSimulation=parse(`Uma demissão reduz a renda da casa. Qual primeiro conjunto de ações é responsável?|0|Reorganizar prioridades, ser transparente e buscar apoio protege sem prometer solução imediata.
Uma internação muda a rotina e exige cuidado. Qual postura priorizar?|0|Atendimento e apoio prático vêm antes de julgar responsabilidades ou prescrever tratamentos.
Uma dívida relevante é revelada. Como começar a resposta familiar?|0|Clareza sobre obrigações e orientação adequada são mais úteis que ocultação ou novo crédito impulsivo.
Uma dependência está produzindo risco e prejuízos. Qual limite é necessário?|0|Amor não substitui tratamento ou obriga financiar condutas destrutivas.
Uma perda familiar afeta os cônjuges de formas diferentes. Como apoiar?|0|Luto não tem uma forma única; apoio não exige suprimir sentimentos.
Um acidente exige resposta imediata. Qual prioridade?|0|Segurança, atendimento apropriado e rede de apoio precedem busca de culpados.`,['Priorizar segurança e necessidades reais, compartilhar informações e buscar apoio adequado ao caso','Resolver sozinho e ocultar o problema para preservar a imagem familiar','Atribuir responsabilidade antes de organizar cuidado e proteção']);
const forgivenessExtra=parse(`Após uma reparação reconhecida, ele usa o erro antigo em toda divergência. O que rever?|0|Um problema tratado não deve se tornar arma permanente; pendências reais ainda podem ser discutidas.
Ela aceita um pedido de perdão, mas mantém um limite financeiro prudente. Como compreender?|0|Perdão não elimina consequências ou planejamento responsável.
Ele pede reconciliação enquanto mantém a conduta escondida. O que falta?|1|Sem verdade e interrupção da conduta não há base para afirmar mudança.
Há ameaça atual e pressão para perdoar ficando no mesmo local. Qual prioridade?|2|Segurança e apoio apropriado vêm antes de pressão por continuidade.
Só se sabe que alguém pediu desculpas. O que se pode concluir?|3|Uma frase isolada não comprova responsabilidade, mudança ou obrigação de reconciliação.`,['Responsabilidade e consequências podem coexistir','Mudança e verdade ainda precisam ser verificadas','Segurança em primeiro lugar','Informação insuficiente']);
const adapt=cases=>cases.map(c=>c.map(t=>t.replace(/namoro/g,'casamento').replace(/parceira/g,'esposa')));
export const specialMarriageQuestions={
 1:caseQuestions([...marriageCases[1],...marriageCases[2],...marriageCases[3]]),
 2:caseQuestions([...marriageCases[1],...marriageCases[4]]),
 3:partnershipScenarios,
 4:caseQuestions([...marriageCases[5],...adapt(datingCases[7])]),
 5:[...caseQuestions(marriageCases[6]),...caseQuestions(adapt(datingCases[6])),...intimacyExtra],
 6:controlScenarios,
 7:[...caseQuestions(marriageCases[9]),...familyScenarios.slice(0,15)],
 8:caseQuestions([...marriageCases[12],...marriageCases[1]]),
 9:[...caseQuestions(marriageCases[8]),...caseQuestions(marriageCases[14]),...forgivenessExtra],
 10:caseQuestions([...marriageCases[0],...marriageCases[2]])
};
