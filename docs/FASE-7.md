# Fase 7 — O Casamento

O [documento original](fase-7-oficial.md) está preservado integralmente. `scripts/build-marriage.py` incorpora a seção `marriage` em `src/course.json`, mantendo os conteúdos e IDs das seis fases anteriores.

## Estrutura

São 16 módulos, cada um com 10 aulas: 160 aulas, 202 etapas obrigatórias e 10 testes especiais opcionais. O treinamento completo passa a ter **7 fases, 70 módulos e 726 aulas**. O painel superior das páginas de entrada calcula esses totais diretamente do conteúdo e não conta provas ou desafios como aulas.

A fase exige o encerramento da Fase 6. Antes do módulo 1 estão o Índice de Prontidão e Maturidade Conjugal, com 75 afirmações em quinze áreas, e o Contrato da Aliança. As quinze missões entram entre os módulos indicados. As missões específicas dos módulos 1, 2 e 6 também permanecem.

Depois do módulo 16: conclusão da campanha integrada de 90 dias, prova final, simulação, diagnóstico final equivalente, Dossiê do Marido, Código do Marido com quarenta compromissos e encerramento. A campanha pode começar logo após o contrato, durante a fase; seu período e registros são requisitos para a prova final. Os testes especiais são revisitáveis e não bloqueiam a conclusão.

## Central do Casamento e ferramentas

A Central fica disponível após o contrato durante toda a fase. Suas quinze ferramentas usam os mesmos registros das aulas, inclusive antes de o módulo correspondente abrir. Preencher uma ferramenta pela Central não conclui a aula nem pula módulos. Isso permite preparar o Painel da Casa na passagem 4 e o Mapa de Legado na passagem 15.

A Central reúne Carta da Aliança, Índice de Liderança Servidora, Conselho do Lar, Painel da Casa, Conselho Financeiro do Casal, Check-in de Intimidade, Muros e Portas, Mapa do Ressentimento, Constituição de Fronteiras Familiares, Código de Paternidade, Regra Espiritual da Casa, Sala de Crise, Mapa de Vitalidade Conjugal, Decisão em Crise Conjugal e Mapa de Legado Conjugal.

Formulários preservam revisões datadas e não concedem XP duplicado. Documentos pessoais podem ser baixados em HTML independente. O Conselho Financeiro distingue renda, despesas, parcelas mensais, estoque de dívida e reserva; não desconta dívida total novamente do saldo mensal. A missão conjugal de doze meses é preenchida na última aula e reaproveitada no dossiê.

A moldura cristã do material foi preservada: liderança como serviço, proteção e responsabilidade; submissão voluntária sem inferioridade ou coerção. Consentimento permanece no casamento. Recusa ou baixo desejo não comprovam manipulação. Ferramentas não atribuem valor à esposa nem decidem automaticamente permanecer ou separar. Segurança precede pressão por reconciliação; os cenários reconhecem limites do treinamento em saúde, direito e finanças.

## Avaliações e simulação

Os dezesseis módulos têm, respectivamente, 25/25/25/20/20/25/25/25/25/20/25/20/25/20/25/20 questões. A prova final contém **113 questões com situações práticas**: a distribuição fornecida soma 113, embora o documento a descreva como aproximadamente 110. A distribuição exata foi preservada: 7/8/7/6/6/8/9/7/8/6/8/6/8/6/7/6. Aprovação a partir de 70%, com explicações e nova tentativa.

Os dez testes especiais totalizam 250 cenários, nas quantidades solicitadas: 30/20/30/20/30/30/25/20/25/20.

“30 Anos em 30 Decisões” percorre todas as trinta estações indicadas. Escolhas anteriores alteram o contexto narrativo das seguintes. O Perfil de Marido em Longo Prazo organiza decisões em onze áreas educativas; concluir exige uma reflexão fundamentada. Não há diagnóstico psicológico. Nova tentativa preserva o registro anterior e não duplica XP.

## Campanha de 90 dias

Seis períodos de quinze dias: verdade e aliança; casa e dinheiro; comunicação e conflito; intimidade e fidelidade; família e filhos; fé, futuro e legado. Cada dia registra ação, conversa/escuta, aprendizado e pendências/próximo passo. Os temas trazem orientações próprias. Dias futuros ficam bloqueados; cada período exige revisão. Falhas admitem reconhecimento e próxima ação, sem apagar XP acumulado.

## Dossiê, privacidade e continuidade

O Dossiê do Marido reúne as vinte seções previstas, reutilizando os registros salvos. Pontos fortes e prioridades usam apenas a autoavaliação do aluno. A comparação de entrada e saída descreve mudanças nas respostas, sem percentuais de transformação pessoal.

Detalhes privados ficam ocultos por padrão. O aluno pode incluí-los explicitamente na visualização e no download. As respostas permanecem no navegador e nos backups exportados; não são enviadas ao GitHub.

As chaves `f7-` compartilham `homens-de-elite:v1` com as fases anteriores. XP, patentes, anotações, respostas, histórico e diagnósticos continuam acumulados. A validação do backup reconhece os novos diagnósticos de 75 respostas.

## Verificação

Validação concluída: **179 testes aprovados, sem falhas** — 22 da Fase 7 e 157 de regressão das fases anteriores.

A suíte cobre estrutura, contagem automática, preservação da Fase 6, avaliações, progressão, dependências da Central, cálculos financeiros, campanha, simulação, privacidade, restauração e todas as 212 rotas em DOM simulado. Também foi feita inspeção em Chromium nas larguras de 1440 e 390 pixels: painel inicial, entrada da Fase 7, menu móvel e dossiê. O download do dossiê também foi exercitado em Chromium: gerou HTML independente com os detalhes privados excluídos por padrão. O arquivo oficial foi comparado byte a byte com o anexo e permanece idêntico. A reprodução efetiva do áudio depende das vozes e permissões de cada dispositivo e não foi validada auditivamente.
