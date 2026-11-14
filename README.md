# Homens de Elite — Jornada da Forja

Sala de aula interativa com a expansão oficial da Fase I, em português, com a identidade preta, creme e vermelha da marca e destaques em laranja fluorescente.

## O que está implementado

- Sete módulos, **75 aulas e 101 etapas** na trilha completa: 90 dentro dos módulos e 11 de entrada, passagem e fechamento. Os 80 estágios da versão anterior permanecem preservados.
- Painel de jornada, busca de aulas, navegação anterior/próxima, estados de progresso e menu adaptável ao celular.
- Índice do Modo Gado com 15 perguntas, cinco indicadores e faixas de resultado oficiais.
- Termômetro de autodomínio, radar de reciprocidade, filtro de compatibilidade, auditorias de competência, ostentação, irmandade e autossuficiência.
- Simuladores de decisão, treinador do não, exercícios de reflexão, regras SE/ENTÃO, mapa de 90 dias e plano antirrecaída.
- Desafios de 7, 21 e 30 dias; painel semanal de compromissos; registros incompletos permanecem visíveis.
- Avaliações dos módulos 1 a 5, prova integradora de 30 questões dos módulos 1 a 6 e avaliação de 18 questões do módulo 7. Aprovação: 70%.
- XP concedido uma vez por atividade, sete patentes, conquistas e encerramento condicionado às etapas concluídas.
- Leitura por voz do navegador, com pausar, continuar, parar e destaque do trecho. Depende de suporte à Web Speech API e de vozes instaladas no dispositivo.
- Anotações por aula, exportação do caderno e reflexões em Markdown, backup completo em JSON e restauração validada.

## Expansão da Fase I

As 27 aulas anteriores foram complementadas, sem substituição dos seus textos, e 40 aulas novas foram inseridas na ordem numérica de cada módulo. O [mapa completo da integração](docs/EXPANSAO.md) registra o destino de cada aula e a migração dos dados.

Inclui Espelho da Arrancada com comparação final, Raio-X de 21 sinais, tradutor da carência, orçamento de atenção, sprint de aprendizagem, mapas de responsabilidade e influência, código pessoal para download e o desafio de 14 dias. As avaliações dos módulos 1 e 5 têm 25 questões; as dos módulos 2, 3 e 4 têm 20; a prova integradora dos seis primeiros módulos mantém suas 30 questões.

## Fechamento oficial da Fase I

A [documentação do fechamento](docs/FECHAMENTO.md) descreve a ordem, os critérios e a preservação dos registros.

- Antes do módulo 1: Raio-X do Homem Atual com 45 afirmações em 15 áreas e Contrato da Forja obrigatório.
- Entre os módulos: seis missões de passagem. A primeira exige 48 horas desde o início; todas pedem registros da aplicação real.
- Módulo 7: oito aulas sobre identidade, princípios, propósito e direção; oito ferramentas; avaliação de 18 questões; missão de 72 horas com uma ação por dia.
- Ferramentas: identidade atual/construção, votos de identidade, cinco inegociáveis, bússola, auditoria das 168 horas, matriz com até três prioridades em AGORA, linha do tempo de 1/3/10 anos e carta de missão.
- Depois do módulo 7: dossiê automático, diagnóstico final equivalente, comparação de autorrelatos, último espelho e encerramento definitivo.
- Carta de missão e dossiê exportáveis como documentos HTML independentes, legíveis e imprimíveis sem dependências externas.

## Executar

O site é estático, sem dependências de produção. Use um servidor HTTP; abrir `index.html` diretamente como `file://` não permite carregar os módulos JavaScript e o conteúdo JSON.

```bash
python3 -m http.server 3000
```

Abra `http://localhost:3000`. Alternativamente, use `npm run dev`.

## Verificar e atualizar o conteúdo

Node.js 22 ou posterior e Python 3 são usados nas ferramentas de desenvolvimento.

```bash
npm ci
npm run build
npm test
```

`npm run build` recompila `src/course.json` a partir de `docs/conteudo-oficial.md`, `docs/expansao-fase-1.md` e `docs/fechamento-fase-1.json`. Não altera os arquivos originais. As ferramentas interativas estão em `src/activities.js`; as questões adicionais derivadas do conteúdo ficam em `src/exams.js` , `src/expansion-exams.js` e `src/phase-data.js`.

## Arquivos

- `index.html`, `styles.css`: estrutura visual e responsividade.
- `src/app.js`: navegação, painel, progresso, caderno e áudio.
- `src/widgets.js`: ferramentas, testes, desafios e formulários.
- `src/phase-flow.js`, `src/phase-data.js`, `src/phase-widgets.js`, `src/phase-dossier.js`: sequência final, diagnóstico, ferramentas do módulo 7 e dossiê.
- `src/state.js`: armazenamento, validação, XP e cálculos.
- `src/ui.js`: apresentação segura de textos e exportação.
- `docs/briefing.md` e `docs/conteudo-oficial.md`: materiais oficiais preservados integralmente.
- `tests/`: testes de regras de negócio e de interações em DOM simulado.

## Dados e privacidade

Esta versão não tem login, servidor, banco de dados, pagamento nem administração. Os dados ficam em `localStorage` neste navegador, na chave `homens-de-elite:v1`. Limpar o navegador ou trocar de dispositivo pode remover o acesso ao progresso. Exporte um backup periodicamente.

**O GitHub guarda o código e o material do treinamento, não as respostas pessoais do aluno.** Os backups podem conter reflexões sensíveis; devem ser guardados pelo próprio aluno.

O site utiliza fontes do Google Fonts com alternativas locais. Nenhuma resposta do aluno é enviada a esse serviço.

## Identidade e validação visual

A logo original enviada pelo proprietário está em `assets/logo-homens-de-elite.jpg`. É utilizada no menu, cabeçalho, painel inicial, quadro de patente, celebrações e conclusão, além do ícone da aba do navegador. O arquivo foi preservado sem cortes ou alterações de cor.

A responsividade foi implementada por CSS. Há 50 testes automatizados de conteúdo, migração, regras e interações em DOM simulado, incluindo o percurso do diagnóstico até o encerramento. A inspeção visual em navegador real e a reprodução efetiva de áudio em cada dispositivo ainda precisam ser realizadas. O ambiente desta implementação não ofereceu a rota de pré-visualização gerenciada necessária para esses testes.

## Publicação

O repositório contém uma aplicação estática pronta para um host estático. A hospedagem pública não foi configurada nesta etapa. Para GitHub Pages, selecionar a branch `main` e a pasta `/ (root)` em **Settings → Pages**. Os caminhos relativos suportam o endereço `/homensdeelite/`.

## Continuidade e segurança do trabalho

Cada etapa deve ser enviada ao GitHub e conferida antes de avançar. Nunca acumular mudanças apenas no ambiente temporário. Não versionar senhas, chaves, respostas pessoais ou `node_modules`.

O uso desta base como produto para alunos reais exige a fase posterior de contas, armazenamento no servidor e infraestrutura descrita no briefing.
