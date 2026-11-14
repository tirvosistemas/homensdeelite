# Homens de Elite — Jornada da Forja

Primeira versão funcional da sala de aula interativa, em português, com a identidade preta, creme e vermelha da marca e destaques em laranja fluorescente.

## O que está implementado

- Seis módulos, **27 aulas e 40 etapas** de treinamento, com o conteúdo oficial organizado em blocos e accordions.
- Painel de jornada, busca de aulas, navegação anterior/próxima, estados de progresso e menu adaptável ao celular.
- Índice do Modo Gado com 15 perguntas, cinco indicadores e faixas de resultado oficiais.
- Termômetro de autodomínio, radar de reciprocidade, filtro de compatibilidade, auditorias de competência, ostentação, irmandade e autossuficiência.
- Simuladores de decisão, treinador do não, exercícios de reflexão, regras SE/ENTÃO, mapa de 90 dias e plano antirrecaída.
- Desafios de 7, 21 e 30 dias; painel semanal de compromissos; registros incompletos permanecem visíveis.
- Avaliações dos módulos 1 a 5 e prova final de 24 questões cobrindo os seis módulos. A prova final encerra a avaliação do módulo 6. Aprovação: 70%.
- XP concedido uma vez por atividade, sete patentes, conquistas e encerramento condicionado às etapas concluídas.
- Leitura por voz do navegador, com pausar, continuar, parar e destaque do trecho. Depende de suporte à Web Speech API e de vozes instaladas no dispositivo.
- Anotações por aula, exportação do caderno e reflexões em Markdown, backup completo em JSON e restauração validada.

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

`npm run build` recompila `src/course.json` a partir de `docs/conteudo-oficial.md`. Não altera os arquivos originais. As ferramentas interativas estão em `src/activities.js`; as questões adicionais derivadas do conteúdo ficam em `src/exams.js`.

## Arquivos

- `index.html`, `styles.css`: estrutura visual e responsividade.
- `src/app.js`: navegação, painel, progresso, caderno e áudio.
- `src/widgets.js`: ferramentas, testes, desafios e formulários.
- `src/state.js`: armazenamento, validação, XP e cálculos.
- `src/ui.js`: apresentação segura de textos e exportação.
- `docs/briefing.md` e `docs/conteudo-oficial.md`: materiais oficiais preservados integralmente.
- `tests/`: testes de regras de negócio e de interações em DOM simulado.

## Dados e privacidade

Esta versão não tem login, servidor, banco de dados, pagamento nem administração. Os dados ficam em `localStorage` neste navegador, na chave `homens-de-elite:v1`. Limpar o navegador ou trocar de dispositivo pode remover o acesso ao progresso. Exporte um backup periodicamente.

**O GitHub guarda o código e o material do curso, não as respostas pessoais do aluno.** Os backups podem conter reflexões sensíveis; devem ser guardados pelo próprio aluno.

O site utiliza fontes do Google Fonts com alternativas locais. Nenhuma resposta do aluno é enviada a esse serviço.

## Identidade e validação visual

O monograma em escudo é um elemento de interface inspirado na referência fornecida. Não é uma reprodução do arquivo original da logo. A imagem foi apresentada na conversa como referência; para usar a logo exata como arquivo do site, adicionar o original a `assets/`.

A responsividade foi implementada por CSS e as interações foram verificadas por testes automatizados em DOM simulado. A inspeção visual em navegador real e a reprodução efetiva de áudio em cada dispositivo ainda precisam ser realizadas. O ambiente desta implementação não ofereceu a rota de pré-visualização gerenciada necessária para esses testes.

## Publicação

O repositório contém uma aplicação estática pronta para um host estático. A hospedagem pública não foi configurada nesta etapa. Para GitHub Pages, selecionar a branch `main` e a pasta `/ (root)` em **Settings → Pages**. Os caminhos relativos suportam o endereço `/homensdeelite/`.

## Continuidade e segurança do trabalho

Cada etapa deve ser enviada ao GitHub e conferida antes de avançar. Nunca acumular mudanças apenas no ambiente temporário. Não versionar senhas, chaves, respostas pessoais ou `node_modules`.

O uso desta base como produto para alunos reais exige a fase posterior de contas, armazenamento no servidor e infraestrutura descrita no briefing.
