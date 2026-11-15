import {datingCases} from './dating-cases.js';
const parse=(text,options)=>text.trim().split('\n').map(line=>{const [q,n,why]=line.split('|');return [q,options,Number(n),why];});
export const limitOptions=['Pedido','Limite','Controle','Ameaça','Acordo'];
export const limitScenarios=parse(`Podemos reservar uma noite por semana para conversar sem telas?|0|Há uma proposta que admite resposta e negociação.
Se houver insultos, encerrarei minha participação na conversa e retomarei quando for seguro.|1|A pessoa regula a própria participação para se proteger.
Você só poderá ver seus amigos se eu autorizar.|2|A autonomia é submetida a autorização unilateral.
Se não me der a senha, divulgarei suas fotos privadas.|3|Há ameaça de exposição para impor uma ação.
Os dois decidem avisar quando um imprevisto afetar o encontro.|4|O combinado foi construído e aceito por ambos.
Você pode me avisar quando souber que chegará mais tarde?|0|É um pedido específico, sem imposição.
Não vou assumir um empréstimo que ultrapassa meu orçamento.|1|A pessoa define sua própria responsabilidade financeira.
Escolherei quais roupas você pode usar.|2|A escolha pessoal do outro é controlada unilateralmente.
Se terminar comigo, vou perseguir você no trabalho.|3|A fala contém ameaça e exige prioridade de segurança.
Ambos combinam não publicar fotos íntimas ou conversas privadas.|4|Há um acordo de privacidade que também exige consentimento.
Gostaria de entender como você prefere receber apoio.|0|Pergunta aberta procura compreender sem decidir pelo outro.
Não continuarei uma relação que exige abandonar meus filhos.|1|O limite protege responsabilidade e valores próprios.
Você terá de abandonar o trabalho para não falar com colegas.|2|Impedir trabalho restringe autonomia.
Vou quebrar suas coisas se você sair agora.|3|A intimidação ameaça dano para impedir uma escolha.
Os dois escolhem um teto de gastos para uma viagem.|4|Há planejamento consensual conforme a realidade.
Podemos falar desse assunto depois de descansar?|0|A proposta pode ser conversada e precisa de retorno.
Não autorizo compartilhar minhas mensagens pessoais com terceiros.|1|O limite trata da própria privacidade.
Preciso inspecionar seu celular toda noite, mesmo contra sua vontade.|2|Fiscalização coercitiva não constitui transparência voluntária.
Se você disser não, vou contar sua intimidade aos seus pais.|3|Exposição é usada como ameaça para obter obediência.
O casal combina uma pausa de trinta minutos e horário de retorno.|4|A pausa foi acordada para autorregulação.
Seria possível alternarmos quem planeja os encontros?|0|É uma proposta sobre participação, não uma ordem.
Não vou permanecer em um local onde estou sendo intimidado.|1|A pessoa prioriza segurança sobre a própria permanência.
Você deve enviar uma foto a cada hora para provar onde está.|2|Há monitoramento obrigatório da rotina.
Vou prejudicar seu emprego se não fizer o que pedi.|3|A conduta utiliza medo de dano para controlar.
Os dois concordam em rever um acordo quando a rotina mudar.|4|A revisão preserva consentimento e realidade.
Podemos conversar sobre o significado de fidelidade para cada um?|0|É abertura para construir entendimento mútuo.
Não aceitarei que usem uma vulnerabilidade minha em piadas.|1|O limite protege dignidade e respeito.
Não permito que você converse com familiares que nunca fizeram mal ao casal.|2|Isolamento unilateral de vínculos saudáveis é controle.
Se discordar de mim diante de alguém, você vai se arrepender.|3|A intimidação cria medo de retaliação.
O casal escolhe compartilhar localização durante uma viagem e desligar depois.|4|Finalidade, duração e consentimento diferenciam acordo de vigilância.`,limitOptions);
export const controlOptions=['Conflito normal','Padrão preocupante','Comportamento abusivo/grave','Informação insuficiente'];
export const controlScenarios=parse(`Os dois discordam sobre um restaurante, escutam e escolhem outra opção.|0|Divergência respeitosa faz parte da convivência.
Apenas se sabe que houve uma discussão ontem.|3|Sem condutas ou contexto não é possível classificar a discussão.
Uma pessoa ameaça divulgar fotos íntimas para impedir o término.|2|Ameaça e coerção exigem prioridade de segurança.
Pequenos incômodos são evitados repetidamente até virarem ressentimento.|1|O padrão de evitação merece cuidado, sem diagnóstico.
Um parceiro pede trinta minutos, combina retorno e volta para conversar.|0|Pausa com retorno é diferente de castigo.
Um parceiro quebra objetos para intimidar durante uma discussão.|2|Intimidação é comportamento grave, não técnica de comunicação.
A parceira pediu tempo sozinha; não se sabe o contexto nem o que foi combinado.|3|Tempo individual não permite concluir punição ou rejeição.
Um casal repete cobranças vagas e não chega a acordos verificáveis.|1|A recorrência pede mudança na forma de tratar o problema.
Após uma recusa sexual, a outra pessoa respeita o não e regula a frustração.|0|Desejo não elimina consentimento ou autonomia.
Uma pessoa usa medo de represália para obter contato sexual.|2|Pressão e medo comprometem consentimento livre.
Duas pessoas discordam da lembrança de um horário, sem outros indícios.|3|Divergência isolada de memória não prova manipulação deliberada.
Um casal promete mudanças toda semana, mas nunca define ações.|1|Há um padrão de intenção sem execução que precisa ser examinado.
Uma pessoa impede fisicamente a outra de sair e ameaça machucá-la.|2|Risco físico exige proteção e apoio apropriado.
Eles negociam gastos após uma queda de renda, preservando o direito de discordar.|0|Negociação contextual não é controle por si só.
Uma pessoa exige localização contínua e pune qualquer desligamento.|2|Monitoramento coercitivo restringe liberdade e segurança.
Só se sabe que alguém não compartilhou uma senha.|3|Privacidade não é prova de culpa ou deslealdade.
Um parceiro admite atraso, escuta o impacto e cumpre o novo combinado.|0|Responsabilidade e reparação favorecem convivência.
Discussões são reabertas sempre com listas de erros já reparados.|1|O padrão impede resolução e merece revisão.
Uma pessoa segue a outra após o término apesar de pedidos para parar.|2|Perseguição não é demonstração de afeto.
Há comentário de que alguém parece distante, sem fatos adicionais.|3|Uma impressão não basta para classificar conduta.
Após discordar, os dois ajustam o plano sem xingamentos ou medo.|0|Discordância segura pode produzir aprendizado.
Um parceiro ridiculariza vulnerabilidades repetidamente para diminuir o outro.|2|Humilhação deliberada não deve ser normalizada.
Um casal evita qualquer conversa sobre dívida por vergonha.|1|O padrão de omissão financeira pede atenção e verdade.
Uma pessoa perdeu uma ligação; não há contexto sobre a disponibilidade.|3|A ligação perdida não prova desprezo ou controle.
Os dois decidem pedir ajuda qualificada para um ciclo de discussões sem risco atual.|0|Reconhecer limites e buscar apoio pode ser responsável.
Uma pessoa impede contato com familiares saudáveis e controla o acesso a dinheiro.|2|Isolamento e controle financeiro são condutas graves.
O casal só aborda dificuldades durante explosões verbais sem acordos posteriores.|1|O padrão de escalada merece atenção; condutas intimidatórias exigem cuidado adicional.
Alguém mudou a foto do perfil; não se sabe o motivo.|3|Esse dado isolado não revela intenção relacional.
Uma pessoa reconhece erro sem exigir perdão imediato.|0|Responsabilidade não obriga o outro a perdoar ou continuar.
Uma ameaça de dano é apresentada depois como brincadeira para impedir que o outro procure ajuda.|2|Minimizar uma ameaça não elimina o risco.`,controlOptions);
export const trustScenarios=parse(`Ela avisa voluntariamente que um imprevisto atrasará o encontro.|0|Informação relevante pode sustentar previsibilidade sem fiscalização.
Ele exige relatórios de cada deslocamento sob punição.|1|Há obrigação de monitoramento, não transparência livre.
Ambos conversam sobre o que consideram flerte.|0|Acordos explícitos ajudam a construir confiança.
Ele lê mensagens privadas escondido para aliviar ansiedade.|1|A ansiedade não autoriza invasão de privacidade.
O casal compartilha localização por logística durante uma viagem, podendo rever.|0|Consentimento e finalidade importam.
Ela não publicou uma foto do casal; nenhum outro dado foi informado.|2|Ausência de postagem não define compromisso.
Ele apaga mensagens que violam um acordo explícito e mente sobre isso.|3|Há quebra de acordo e ocultação, não simples privacidade.
Ela conversa com o ex sobre os filhos e mantém limites claros.|0|Coparentalidade pode exigir contato legítimo.
Ele exige abandonar todas as amizades para provar fidelidade.|1|Isolamento não produz lealdade.
Uma notificação chega e não se conhece seu conteúdo.|2|Não há informação para concluir intenção ou conduta.
Ambos decidem como proteger conversas íntimas do casal.|0|Acordos podem proteger privacidade de ambos.
Um parceiro usa um perfil falso para testar a fidelidade do outro.|1|Armadilhas e monitoramento não constroem confiança.
Ela mantém apoio a uma amiga sem compartilhar segredos pessoais dessa amiga.|0|Privacidade de terceiros pode ser preservada.
Ele pede acesso permanente ao celular porque recebeu uma recusa de senha.|1|A recusa não legitima fiscalização coercitiva.
Alguém cumprimenta um conhecido; não há contexto adicional.|2|Cumprimento isolado não comprova flerte.
Após quebrar um combinado, ele reconhece e pratica mudanças observáveis.|0|Reconstrução depende de responsabilidade, sem obrigar continuidade.
A pessoa mantém encontros românticos escondidos que sabe violarem o acordo.|3|Há conduta contrária a um acordo explícito.
Um namorado exige prova fotográfica do ambiente a cada hora.|1|Prova contínua de localização é vigilância.
A conversa foi apagada, mas não se sabe por quem, por quê ou o conteúdo.|2|É preciso esclarecer contexto sem investigação invasiva.
Um casal revê acordos digitais porque a rotina de trabalho mudou.|0|Acordos podem ser atualizados com clareza e consentimento.`,['Construção de confiança','Vigilância/controle','Informação insuficiente','Quebra de acordo observável']);
export const familyScenarios=parse(`A mãe oferece ajuda e aceita quando o casal prefere outra solução.|0|Cuidado respeita autonomia e recusa.
Um pai exige decidir onde o casal deve morar e ameaça retirar apoio essencial.|2|A pressão pode exigir limites e avaliação de segurança e dependência.
Um familiar discorda com respeito sem tentar impor a decisão.|0|Opinião não é automaticamente interferência.
Um amigo incentiva mentir para a parceira para conseguir vantagem.|1|A conduta interfere na confiança do casal.
Só se sabe que houve uma visita da sogra.|3|Visita isolada não comprova invasão.
A mãe dele humilha a parceira repetidamente, e ele combina uma conversa respeitosa com sua própria mãe.|1|Ele assume a fronteira com a própria família.
Um ex envia informações necessárias sobre o filho.|0|Responsabilidade parental pode exigir comunicação.
Um familiar divulga detalhes íntimos contra a vontade do casal.|2|Exposição indevida exige proteção e limites.
Uma amiga alerta sobre violência que presenciou e oferece apoio.|0|Alerta de segurança não deve ser confundido com sabotagem.
Familiares pressionam casamento apesar das dúvidas do casal.|1|O casal precisa preservar a própria decisão e o ritmo.
A parceira pretende passar uma tarde com parentes saudáveis.|0|Vínculos familiares podem coexistir com o namoro.
Não se sabe o conteúdo de uma conversa com os pais.|3|Não há base para concluir triangulação.
O casal conta cada briga aos pais para que decidam quem venceu.|1|Transformar familiares em juízes dificulta a fronteira do casal.
Um familiar ameaça machucar o parceiro se o namoro continuar.|2|Ameaça exige segurança e apoio apropriado.
Os pais perguntam se precisam de ajuda durante uma doença e respeitam a resposta.|0|Apoio contextual pode ser saudável.
Um amigo ridiculariza constantemente o namoro e estimula traição.|1|Sabotagem deve ser abordada por condutas concretas.
Alguém relata que a família é exigente, sem exemplos.|3|O rótulo não esclarece a gravidade ou a conduta.
Uma criança é pressionada a escolher entre um dos pais e o novo parceiro.|2|Crianças não devem ser instrumentos de disputa.
A família tem uma tradição diferente e aceita negociar a participação.|0|Diferenças podem ser conciliadas com respeito.
Um parente aparece sem combinar, e o casal pede visitas agendadas.|1|É possível estabelecer fronteira sem rompimento automático.`,['Cuidado/vínculo legítimo','Interferência que pede limite','Situação grave — proteger e buscar apoio','Informação insuficiente']);
export const problemScenarios=parse(`Ambos querem se encontrar, mas precisam reorganizar horários.|0|Uma dificuldade de agenda pode admitir acordo.
Um quer ter filhos e o outro não, ambos convictos.|1|Há diferença central de projeto de vida.
A pessoa ameaça ferir o parceiro caso ele termine.|2|Segurança tem prioridade sobre preservar o vínculo.
Só se sabe que o casal discutiu uma vez.|3|Faltam fatos e contexto.
Um esqueceu um combinado, reconheceu e propôs reparação verificável.|0|Erro reconhecido pode ser tratado com mudança.
Há repetidas mentiras após vários acordos sem responsabilização.|1|A recorrência pode inviabilizar confiança e valores centrais.
Um parceiro força contato sexual por medo de retaliação.|2|Coerção exige proteção, não negociação comum.
Os dois discordam sobre o restaurante e conseguem negociar.|0|Preferências cotidianas não indicam incompatibilidade central por si só.
Uma mudança de trabalho temporária exige ajustar frequência dos encontros.|0|Mudança de rotina pode pedir planejamento.
Um deseja exclusividade e o outro rejeita esse tipo de compromisso.|1|O significado do vínculo pode ser incompatível.
Alguém diz que está confuso, sem explicar sobre o quê.|3|Confusão genérica não permite classificar o problema.
O casal gasta mais do que pode e ambos querem revisar o orçamento.|0|Há espaço para organização e responsabilidade conjunta.
Uma pessoa impede trabalho e contato com redes de apoio.|2|Isolamento e restrição de autonomia exigem atenção à segurança.
Os dois têm fé diferente, mas ainda não conversaram sobre impactos práticos.|3|Diferença não determina incompatibilidade sem conhecer valores e acordos.
Há desacordo sobre morar no exterior que ambos consideram inegociável.|1|Direções centrais irreconciliáveis merecem decisão consciente.
Ela pede uma pausa com horário de retorno e cumpre o combinado.|0|Autorregulação com retorno pode ajudar conflitos.
Ele persegue a ex após o término e ameaça aparecer no trabalho.|2|Perseguição não é dificuldade comum de comunicação.
Uma pessoa está retraída durante luto recente, sem outros dados.|3|Contexto de sofrimento pede cuidado e mais informação.
Ambos percebem interrupções na conversa e querem praticar escuta.|0|Uma habilidade pode ser desenvolvida com cooperação.
Um diz que vai mudar, mas recusa qualquer ação ao longo de meses.|1|Ausência persistente de responsabilidade altera a base para continuar.
A família opina, e o casal consegue preservar decisões próprias com respeito.|0|Influência externa pode ser administrada por fronteiras.
Uma pessoa divulga intimidade para punir uma recusa.|2|Exposição coercitiva é comportamento grave.
Só se sabe que uma mensagem demorou a ser respondida.|3|Demora isolada não permite inferir intenção.
Ambos reconhecem sobrecarga e reorganizam responsabilidades.|0|Problemas tratáveis admitem ajustes reais.
Um exige abandono de um valor central que o outro não aceita negociar.|1|Compromisso não deve depender de fingir compatibilidade.`,['Problema potencialmente corrigível','Incompatibilidade ou padrão sério a avaliar','Segurança em primeiro lugar','Informação insuficiente']);
export const factScenarios=parse(`O encontro estava marcado para 19h e ela chegou às 19h40.|0|É uma descrição verificável do evento.
Ela chegou tarde porque não se importa comigo.|1|A causa e a intenção foram inferidas.
Fiquei frustrado com o atraso.|2|A frase nomeia uma emoção própria.
Preciso de previsibilidade para organizar minha noite.|3|É uma necessidade a comunicar.
Recebi aviso de cancelamento às 17h.|0|Há um acontecimento observável.
Esse cancelamento prova que nunca serei prioridade.|1|A conclusão extrapola o fato.
Senti tristeza quando nosso plano mudou.|2|A frase relata sentimento.
Preciso conversar sobre como avisamos imprevistos.|3|Há uma necessidade de coordenação.
Ela pediu trinta minutos de pausa e retornou às 20h.|0|A frase descreve ações e horário.
A pausa significa que ela desistiu da relação.|1|O significado precisa ser confirmado.
Fiquei ansioso durante a pausa.|2|Ansiedade descreve experiência emocional.
Preciso saber quando retomaremos a conversa.|3|A frase expressa necessidade de clareza.
Durante dez minutos, interrompi três vezes a fala dela.|0|É uma descrição concreta da própria conduta.
Se ela discordou, quis me diminuir.|1|Discordância não comprova intenção de humilhar.
Senti vergonha depois de interromper.|2|A frase nomeia uma emoção.
Preciso de espaço para entender antes de responder.|3|A necessidade pode orientar um pedido.`,['Fato','Interpretação','Emoção','Necessidade']);
export const tensionScenarios=[datingCases[1][0],datingCases[1][3],datingCases[1][8],datingCases[3][5],datingCases[3][3],datingCases[9][2],datingCases[5][0],datingCases[8][2]].map(c=>[c[0],[c[1],c[2],c[3]],0,c[4]]);
export const conflictScenarios=[...datingCases[4],...datingCases[1].slice(0,5)].map(c=>[c[0],[c[1],c[2],c[3]],0,c[4]]);
export const familySimulation=datingCases[8].slice(0,6).map(c=>[c[0],[c[1],c[2],c[3]],0,c[4]]);
