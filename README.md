# NEPP — IFRN Campus Apodi

O site do Núcleo de Extensão e Prática Profissional do IFRN Campus Apodi apresenta o núcleo, seus objetivos e os projetos desenvolvidos. A navegação funciona em computadores, tablets e celulares.

## Acessar o site

Visite [nepp-apodi no GitHub Pages](https://guilhemesn.github.io/nepp-apodi/). Na página inicial, conheça o NEPP e use o menu para navegar pelas seções. A área **Projetos** reúne as iniciativas; selecione **Conheça o projeto** para ver a apresentação, os objetivos e outras informações disponíveis.

Os projetos exibidos atualmente são exemplos de apresentação. As informações oficiais serão incluídas quando forem fornecidas pelo NEPP.

## Executar no computador

É necessário abrir o site por um servidor local para que seus dados sejam carregados. Abrir o arquivo HTML diretamente pode impedir o funcionamento correto.

**Com o Visual Studio Code**

1. Abra a pasta do projeto no Visual Studio Code.
2. Instale a extensão **Live Server**, caso ainda não esteja instalada.
3. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.
4. O site será aberto no navegador. Use o menu para visitar as páginas e seções.

**Com Python**

1. Abra o terminal na pasta do projeto.
2. Execute `python -m http.server 8000`.
3. No navegador, acesse `http://localhost:8000`.
4. Para encerrar o servidor, volte ao terminal e pressione `Ctrl+C`.

## Especificações técnicas

### Tecnologias

- HTML5 para as páginas e sua estrutura semântica.
- CSS3 para estilos, layout responsivo, navegação móvel e suporte a movimento reduzido.
- JavaScript nativo, sem framework ou dependências de instalação.
- JSON como fonte central dos textos institucionais, objetivos e projetos.

O projeto não possui etapa de compilação nem banco de dados. Como os dados são obtidos com `fetch`, o site deve ser executado por HTTP, localmente ou em uma hospedagem estática.

### Organização dos arquivos

- `index.html`: página inicial e seções institucionais.
- `projetos.html`: catálogo de projetos.
- `projeto-detalhe.html`: modelo compartilhado para exibir um projeto.
- `data/site.json`: conteúdo do site e lista de projetos.
- `js/site.js`: carrega o JSON e renderiza objetivos, cartões e detalhes.
- `style.css`: estilos compartilhados e pontos de adaptação para telas menores.
- `images/logo.jpeg`: logo do NEPP.

### Dados e navegação

O JSON possui um objeto `site` com conteúdo institucional e um array `projects`. Cada projeto deve ter um `id` único, além de título, área, resumo, descrição, objetivos, metodologia, responsável, período e situação. A página inicial exibe até três projetos; o catálogo exibe todos. O detalhe é selecionado pelo parâmetro `id`, por exemplo `projeto-detalhe.html?id=projeto-exemplo-1`.

Os valores são inseridos no HTML como texto, sem interpretar marcação HTML vinda do JSON.

### Responsividade e publicação

O layout usa pontos de quebra em 820 px e 640 px; o menu compacto é ativado em telas de até 640 px. A publicação do GitHub Pages usa a branch `main`, na raiz do repositório, e o endereço público é [nepp-apodi no GitHub Pages](https://guilhemesn.github.io/nepp-apodi/).
