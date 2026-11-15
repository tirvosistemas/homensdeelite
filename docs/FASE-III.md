# Fase 3 — A Ascensão

O conteúdo oficial está preservado integralmente em [fase-3-oficial.md](fase-3-oficial.md). O compilador `scripts/build-ascension.py` gera uma seção independente `ascension` em `src/course.json`. Os textos, IDs e posições das fases 1 e 2 permanecem preservados, com verificações por hash nos testes.

## Estrutura

Acesso após concluir as Fases I e II. Entrada com 50 afirmações em oito áreas, seguida do Contrato da Ascensão. São oito módulos e 95 aulas (12, 12, 12, 12, 12, 11, 12 e 12), sete desafios, sete avaliações de módulo e sete missões de passagem. Total: 123 etapas, além da tela de encerramento.

Ordem final: módulo 8 e campanha → prova de 50 questões → simulação Sala de Comando → diagnóstico final equivalente → dossiê → Código da Ascensão → encerramento. A Fase 4 não faz parte desta implementação.

## Aplicações

- Estratégia: 12 classificações reação/decisão, cinco porquês opcionais após o primeiro, consequências, reversibilidade, matriz de três opções com até cinco critérios ponderados, pré-mortem, três cenários, matriz visual de riscos, seis exercícios de ordenação com justificativa e diário editável.
- Carreira: balanço de oito competências, pilha de habilidades, gargalo possível a partir das menores autoavaliações, banco de evidências, conversa de crescimento e plano de 12–24 meses.
- Liderança: autópsia de missão, briefing, seis níveis de delegação, roteiro de feedback, conflito, crise progressiva de equipe e plano de desenvolvimento de outra pessoa.
- Negociação: posições/interesses, preparação, perguntas/pressão, concessões, argumento, cronômetro de três minutos e seis contextos de negociação.
- Renda: problemas, teste de hipótese, venda ética, proposta, faturamento/custos/resultado/margem, qualificação e experimento real.
- Capital: ativos menos dívidas, alertas de promessas suspeitas, perda suportável, objetivos/liquidez/risco e plano patrimonial educativo. Não indica ativos ou retornos.
- Reputação: apresentação, CRM local editável, presença digital, leitura de contexto e dez conexões reais. Pelo menos cinco registros sem pedidos concretizam a exigência de uma parte significativa de contribuição. Nenhuma mensagem é enviada pelo sistema.
- Execução: decomposição de missão, quadro arrastável com seletores acessíveis, recursos, decisão de persistir/ajustar/encerrar, estacionamento de ideias e retrospectiva.

O feedback de comunicação monta um roteiro com os campos preenchidos e faz uma checagem simples de rótulos pessoais. Não promete análise psicológica ou avaliação automática de fala. As ferramentas de reflexão utilizam os critérios e respostas do próprio aluno.

## Campanha de 180 dias

Uma missão, motivo, evidência objetiva, seis marcos (30/60/90/120/150/180), cinco categorias de recursos, cinco riscos e respostas, até cinco indicadores, rotina semanal, regra de foco e prestação de contas. O início usa a data local real. O painel apresenta dia, marco atual, indicadores, última revisão e próximo checkpoint.

Os checkpoints são liberados pelo tempo transcorrido e exigem reflexão e evidência. É possível revisar o plano sem reiniciar o calendário. A conclusão requer o dia 180, seis checkpoints e relato final honesto. O calendário sozinho não concede conclusão. Há conquistas ao iniciar, atingir os registros até 90 dias e concluir a campanha. XP de marcos e atividades é idempotente.

## Avaliações e simulação

Os módulos 1 a 7 possuem 25 questões cada. A prova final tem 50, distribuídas pelos oito módulos em 7/6/7/7/6/6/5/6. Aprovação: 70%. As alternativas corretas variam de posição; as explicações são apresentadas depois da resposta.

A Sala de Comando possui 12 decisões. Caixa, capacidade, confiança, reputação e progresso são recursos fictícios que mudam conforme as escolhas anteriores; os contextos seguintes refletem essas mudanças. O relatório apresenta princípios, pontos fortes e decisões a revisar, sem gerar perfil psicológico. A crise de equipe usa quatro decisões progressivas do mesmo motor.

## Persistência, comparação e exportação

Chaves `f3-` isolam as novas respostas. Não há mudança da chave global `homens-de-elite:v1`. O índice inicial de 50 afirmações é preservado como snapshot; a saída usa as mesmas afirmações. Comparações descrevem autorrelatos, sem percentual de transformação pessoal.

O dossiê reúne as respostas existentes em nove seções e oferece download HTML independente. Valores do balanço, plano patrimonial e contatos do CRM ficam ocultos por padrão no dossiê e em seu download. Um controle explícito permite incluí-los na visualização atual. Backups completos contêm os registros pessoais e devem ser guardados pelo aluno.

Patentes anteriores mantêm os mesmos limiares. Foram acrescentadas Estrategista (9.500), Comandante da Forja (11.000), Homem de Influência (12.500) e Homem de Ascensão (14.000). A fase encerra uma etapa da formação, não declara perfeição ou conclusão definitiva de todo o treinamento.

## Verificação

Testes de conteúdo, preservação, regras, cálculos, backups e DOM simulado cobrem todas as 123 rotas e o percurso completo até o encerramento. Incluem bloqueios temporais, snapshots, privacidade no dossiê, edição de tabelas, XP único e consequências encadeadas. Validação visual e reprodução efetiva de áudio em navegador real continuam pendentes.

## Numeração das fases

Menus, aulas, painéis e documentos exibem Fase 1, Fase 2 e Fase 3. A transformação ocorre na apresentação do conteúdo, preservando o documento original e os IDs dos registros. A conquista antiga “Homem Consolidado — Fase II” conserva sua chave interna para manter compatibilidade com backups; a apresentação usa Fase 2.
