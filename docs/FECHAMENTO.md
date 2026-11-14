# Fechamento oficial — Jornada da Forja, Fase I

A Fase I tem exatamente **7 módulos e 75 aulas**. Esta integração acrescenta oito aulas sem remover nenhum dos 80 estágios anteriores. São 90 estágios nos módulos e 11 etapas externas, totalizando 101 etapas navegáveis antes da tela final.

## Ordem fechada

1. Diagnóstico Geral de Entrada (`diagnostico-entrada`).
2. Contrato da Forja (`contrato`).
3. Módulo 1 → Recupere seu Centro → Módulo 2.
4. Faça o que Disse → Módulo 3.
5. Entregue Algo Real → Módulo 4.
6. Uma Conversa Firme → Módulo 5.
7. Olhe para os Dois Lados → Módulo 6.
8. Quem Vem Depois de Você? → Módulo 7.
9. Dossiê da Forja → Diagnóstico Final → Último Espelho.
10. Encerramento definitivo (`fim`).

As etapas de entrada, passagem e fechamento não são módulos adicionais. O menu e a navegação anterior/próxima seguem essa ordem. As verificações também se aplicam à abertura direta dos endereços das aulas.

O código assumido no antigo módulo 6 continua naquele módulo, com os mesmos textos e identificadores. Agora leva à sexta passagem. Ele exige as atividades do módulo 6, sem criar a dependência circular de concluir o módulo 7 antes de poder acessá-lo. A avaliação de 30 questões foi preservada e apresentada como prova integradora dos módulos 1 a 6. O encerramento geral passa a ocorrer somente depois das novas etapas finais.

## Diagnóstico e comparação

O Raio-X tem 45 afirmações, três para cada uma das 15 áreas solicitadas. Todas têm direção positiva e usam a mesma escala de 0 a 4. O instrumento final é exatamente equivalente ao inicial.

A primeira conclusão de cada instrumento congela uma cópia das respostas. Não há botão para reescrever o ponto de partida. A faixa por área usa a média das três respostas:

- A partir de 3: FORTE.
- De 2 até abaixo de 3: EM CONSTRUÇÃO.
- Abaixo de 2: PRECISA DE ATENÇÃO.

São faixas educacionais de autorrelato, não um instrumento clínico ou medida do valor pessoal. A comparação mostra as duas faixas e descreve a mudança nas respostas; não calcula um percentual de transformação da pessoa.

O dossiê seleciona as três maiores e as três menores médias do diagnóstico final disponível. Antes de refazê-lo, informa que utiliza a entrada. Empates seguem a ordem declarada das áreas, com explicação visível. As listas são relativas, não sentenças.

## Missões e condições de avanço

O contrato depende do diagnóstico e concede 10 XP uma única vez. Uma passagem só pode ser aberta após a conclusão do módulo anterior. O módulo seguinte depende da passagem registrada.

A primeira passagem registra seu horário de início e exige 48 horas decorridas, confirmação de cinco ações e reflexão. As outras cinco exigem as ações/reflexões correspondentes; a quinta exige as duas respostas sobre padrões esperados e oferecidos.

A missão do módulo 7 só abre depois das oito aulas e da avaliação. Registra uma ação em cada intervalo de 24 horas, contado desde o início. O aluno conclui após 72 horas. Se perder um intervalo, pode reiniciar, preservando o ciclo anterior no histórico do backup. Não é possível preencher antecipadamente um dia futuro pela interface.

Os horários e a declaração das ações são locais. Esta versão não tem auditoria por servidor, autenticação ou sincronização entre dispositivos; o relógio do dispositivo é sua referência. Não há comprovação externa das ações.

## Ferramentas do módulo 7

| Aula | Ferramenta | Critério |
|---|---|---|
| 1 | Homem atual × homem em construção | Duas descrições e comportamento contraditório |
| 2 | Voto de identidade | Oito escolhas com reflexão contextual |
| 3 | Meus 5 inegociáveis | Cinco princípios distintos e seus estados |
| 4 | Bússola de propósito | Quatro quadrantes e síntese de uma direção possível |
| 5 | Auditoria das 168 horas | Soma exata, sem negativos, gráfico e reflexão |
| 6 | Matriz de prioridade | De um a dez objetivos; até três em AGORA |
| 7 | Linha do tempo | Três horizontes e oito categorias; ao menos um objetivo por horizonte |
| 8 | Carta de missão | Oito frases, nome opcional, conquista e documento para baixar |

A avaliação usa 18 situações práticas e aprovação de 70%. As recompensas não se repetem ao refazer atividades.

## Dossiê sem novo preenchimento

As nove seções reúnem os dados anteriores: diagnóstico, índice inicial do Modo Gado, radares, termômetro, auditoria de competência, peso da palavra, bússola, três forças, três frentes, plano de 90 dias, cinco princípios, código pessoal, declaração de missão e histórico de jornada.

O primeiro resultado do Índice do Modo Gado passa a ser preservado separadamente. Para alunos antigos, só é possível preservar a primeira resposta ainda disponível após esta atualização. Isso aparece explicitamente no dossiê; não reconstruímos um resultado histórico que nunca foi armazenado.

A carta e o dossiê são exportados como HTML independente, com texto escapado e estilo local. O dossiê baixado abre as seções de resultados para leitura e impressão. As respostas ficam exclusivamente no navegador e nos arquivos baixados pelo aluno.

## Preservação e continuidade

- Os blocos, títulos, IDs e posições dos blocos dos 80 estágios anteriores foram preservados.
- A revisão 3 não reabre novamente as aulas expandidas de alunos que já estavam na revisão 2.
- Respostas, notas, desafios e XP anteriores continuam na mesma chave de armazenamento.
- Backups antigos continuam aceitos, com validação e migração.
- Alunos com histórico anterior precisam realizar as novas etapas de entrada e passagem; seus registros anteriores permanecem acessíveis na restauração e no caderno.
- A fonte estruturada de leitura está em `fechamento-fase-1.json`; questões e regras estão em `src/phase-*.js`. O build acrescenta o módulo ao conteúdo anterior.

## Verificação

`npm run build` e `npm test`: 50 testes automatizados. Incluem preservação por checksum dos estágios anteriores, migração, restauração, bloqueios de URL, as seis passagens, limites de tempo e prioridade, ferramentas do módulo 7, avaliação, XP único, documentos escapados, dossiê automático e sequência completa até o encerramento.

Os testes de interface usam jsdom. A validação visual e de áudio em navegador real continua pendente, conforme a limitação de pré-visualização descrita no README. Esta integração envia o código ao repositório; não configura uma nova hospedagem pública.
