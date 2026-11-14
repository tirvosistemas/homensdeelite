# Fase II — A Consolidação

**Do conhecimento ao padrão de vida.** Esta implementação mantém a segunda fase separada da primeira. A fonte enviada pelo proprietário foi preservada em `fase-2-oficial.md`; as instruções de implementação não aparecem como conteúdo de aula.

## Estrutura

| Ordem | Módulo | Aulas | Atividades finais |
|---|---|---:|---|
| 1 | Disciplina, Rotina e Execução | 12 | 14 dias de essenciais + avaliação de 20 questões |
| 2 | Corpo, Saúde, Energia e Presença | 10 | 21 dias de cuidado + avaliação de 20 questões |
| 3 | Trabalho, Competência e Produtividade | 11 | Entrega real + avaliação de 20 questões |
| 4 | Dinheiro, Ordem e Construção Patrimonial | 10 | 30 dias de ordem financeira + avaliação de 20 questões |
| 5 | Comunicação, Presença Social e Respeito | 11 | Sete conversas + avaliação de 20 questões |
| 6 | Ambiente, Irmandade e Influência | 10 | Sete dias de reorganização + avaliação de 20 questões |
| 7 | Constância, Sistema de Vida e Missão de 90 Dias | 12 | Checkpoints 30/60/90 e 30 dias de consolidação total |

São **76 aulas e 100 etapas** nesta fase. Não foram criados módulos adicionais. Os temas românticos excluídos pelo documento não foram acrescentados.

A ordem de navegação é:

1. Conclusão da Fase I e entrada na página `fase-2`.
2. Índice de Consolidação (`f2-entrada`) e contrato (`f2-contrato`).
3. Sete módulos na ordem da tabela, com seis passagens entre eles.
4. Prova final, diagnóstico de saída e dossiê.
5. Encerramento definitivo (`f2-fim`).

As passagens são: sete dias de execução; corpo sob comando; produza valor; encare seus números; uma conversa que estava evitando; reorganize o campo. As duas primeiras exigem sete dias cumpridos. A passagem financeira reutiliza os números já preenchidos no Raio-X e pede apenas a reflexão/aplicação.

## Preservação da primeira fase

Os identificadores da nova fase usam o prefixo `f2-`. O conteúdo fica em `course.consolidation`; `course.modules` e a estrutura da Fase I não foram reorganizados. Um teste de checksum compara **todo o currículo da Fase I** com o commit de fechamento `77cb68e`, além dos testes anteriores de preservação de aulas e blocos.

A chave de armazenamento continua `homens-de-elite:v1`. Respostas, notas, conquistas e XP antigos são preservados. O novo contrato não reinicia nada. Os sete níveis anteriores mantêm seus nomes e limites; foram acrescentados Guardião da Forja (5.000 XP), Construtor (6.500 XP) e Homem Consolidado (8.000 XP).

O acesso por URL também respeita a conclusão da primeira fase, os diagnósticos, contratos, módulos anteriores e passagens. Dentro de um módulo liberado, o aluno pode consultar suas aulas e ferramentas na ordem numérica do menu; a passagem seguinte exige concluir todas as etapas desse módulo.

## Ferramentas e dados

As ferramentas indicadas no material permanecem dentro das respectivas aulas. Os dados estruturados são declarados em `consolidation-data.js` e as interfaces estão divididas entre formulários/tabelas, desafios e ciclo de 90 dias.

- Formulários preservam rascunhos e o último registro aceito.
- Três Vitórias preserva os dias e seus estados; a Revisão de Comando e o Protocolo de Retorno mantêm histórico.
- Mapas de dia, energia e planejamento trimestral geram apresentações visuais.
- Tabelas permitem adicionar, editar e remover registros. Dívidas e diário de consumo aceitam a indicação honesta de ausência de registros.
- O Raio-X Financeiro separa parcelas mensais e saldo total de dívida, evitando descontar o estoque da dívida do saldo mensal.
- A meta de reserva é definida pelo aluno, sem valor universal nem indicação de ativos.
- Os cronômetros de foco oferecem 25/45/60/90 minutos, pausa e retomada. Exigem preparação, tempo transcorrido e registro de entrega.
- O treino de voz usa textos guiados e um cronômetro de um minuto. Não grava microfone nesta versão.
- O conselho de referências não obriga preencher todos os papéis imediatamente.
- A frente principal exige uma área em ATAQUE, duas em DESENVOLVIMENTO e quatro em MANUTENÇÃO.

Saúde permanece no âmbito de educação e organização da rotina, com orientação profissional para necessidades individuais. Finanças permanecem no âmbito de orçamento e educação, sem recomendações individualizadas de investimentos.

## Diagnóstico e avaliações

O Índice de Consolidação utiliza **42 afirmações positivas**, seis em cada uma das sete áreas, atendendo à quantidade aproximada de 40 solicitada. Entrada e saída usam o mesmo instrumento:

- 0 — Nunca;
- 1 — Raramente;
- 2 — Às vezes;
- 3 — Frequentemente;
- 4 — Quase sempre.

A média de cada área produz BASE FORTE (a partir de 3), EM CONSTRUÇÃO (de 2 a menos de 3) ou FRÁGIL (abaixo de 2). A primeira conclusão de cada diagnóstico preserva um snapshot. A comparação descreve mudanças nas respostas declaradas, sem percentuais psicológicos nem diagnóstico clínico.

O banco possui 20 questões para cada avaliação dos módulos 1 a 6 e cinco questões integradoras de constância. A prova final seleciona **40 questões** do banco: 6 de cada uma das cinco primeiras áreas, 5 de ambiente e 5 de constância. Todas são contextualizadas; posições das alternativas corretas variam. O aluno recebe explicação após responder. Aprovação de 70%, com recompensa única por avaliação.

## Desafios, falhas e retomada

Os desafios começam na data local em que o aluno os inicia; a interface não permite iniciar com uma data retroativa nem registrar dias futuros. Registros de dias passados do ciclo são autodeclarados. O módulo financeiro exige também quatro revisões semanais; o de comunicação pede aprendizado sem dados privados.

Os desafios permitem registrar execução, mínimo/manutenção ou uma falha acompanhada de um plano de retorno. Assim, terminar o ciclo não exige fingir perfeição. As missões de sete dias entre módulos têm critério mais estrito: cumprir os mínimos e os cuidados combinados. Se o período não for cumprido, pode ser reiniciado, preservando o histórico anterior no backup.

Não se retira XP por falhar. Pontos por um mesmo registro/atividade não são duplicados ao clicar novamente. O sistema indica retorno à menor ação possível.

## Quartel-General 90D

A aula 4 do módulo 7 ativa uma meta principal, três indicadores (nome, unidade, inicial e meta), três hábitos, uma coisa a abandonar, uma habilidade e um resultado concreto. O painel fica acessível pelo menu da Fase II, respeitando o acesso ao módulo.

O aluno pode registrar hábitos, indicadores e evidência diária. Indicadores admitem metas crescentes, decrescentes ou de manutenção. O tempo transcorrido do calendário é mostrado separadamente da quantidade de registros e não comprova execução.

Os checkpoints abrem no 30º, 60º e 90º dia do ciclo. Cada um exige reflexões específicas. Revisar o plano mantém o início do ciclo e arquiva o plano anterior. Após o 90º dia, o formulário seleciona uma data dentro do ciclo encerrado, sem produzir registros além dele. A conclusão das aulas de checkpoint depende dos respectivos registros.

Os prazos usam a data/relógio local do dispositivo. Não há auditoria remota, autenticação ou proteção contra alteração manual do armazenamento. Os controles são educacionais e dependem da honestidade assumida no contrato.

## Dossiê

O Dossiê da Consolidação reúne automaticamente disciplina, corpo, competência, trabalho, dinheiro, comunicação, ambiente e constância. Inclui os planos existentes, código financeiro, mapas, missão de 90 dias, indicadores, checkpoints, diagnóstico inicial/final, XP, patente e conquistas. Não exige redigitar esses dados.

Pode ser baixado como HTML independente, sem dependências externas, com texto escapado e seções abertas para leitura e impressão. O caderno e o backup geral abrangem ambas as fases. As respostas pessoais permanecem no navegador e nos arquivos baixados pelo aluno; não vão para o GitHub.

## Verificação e limites

`npm run build` gera as duas fases. `npm test` executa 75 testes, incluindo as 100 rotas da nova fase, os percursos das duas fases, os bloqueios, cálculos financeiros, cronômetros, retomada, checkpoints, comparação, dossiê, backup e preservação do currículo anterior.

A inspeção visual em navegador real, áudio em dispositivos reais e hospedagem pública não foram realizados nesta etapa. A interface possui CSS responsivo e foi verificada em DOM simulado. Não foram acrescentados login, banco de dados, pagamentos ou sincronização entre dispositivos.
