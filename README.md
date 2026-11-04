# NEPP — IFRN Campus Apodi

O site do Núcleo de Extensão e Prática Profissional do IFRN Campus Apodi apresenta o núcleo, seus objetivos e os projetos desenvolvidos. A navegação funciona em computadores, tablets e celulares.

## Acessar o site

Visite [nepp-apodi no GitHub Pages](https://guilhemesn.github.io/nepp-apodi/). Na página inicial, conheça o NEPP e use o menu para navegar pelas seções. A área **Projetos** reúne as iniciativas; selecione **Conheça o projeto** para ver a apresentação, os objetivos e outras informações disponíveis.

O catálogo reúne seis projetos com vínculo confirmado ao NEPP-AP, a partir do portal do IFRN, documentos oficiais e dados do SUAP fornecidos pelo responsável pelo site. Os quatro projetos de 2026 aparecem nos destaques; os registros de 2025 e 2015–2016 permanecem no catálogo. Consulte [as fontes e pendências](data/FONTES.md).

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
- JavaScript nativo para carregar os dados e inicializar o Swiper.js v12, usado no carrossel de projetos.
- JSON como fonte central dos textos institucionais, objetivos e projetos.

O projeto não possui etapa de compilação nem banco de dados. Os dados são carregados com `fetch`, e o Swiper é obtido pelo CDN jsDelivr; a conexão com a internet é necessária para o carrossel interativo. Se o CDN estiver indisponível, os projetos continuam visíveis em uma grade estática.

### Organização dos arquivos

- `index.html`: página inicial e seções institucionais.
- `pages/projetos.html`: catálogo de projetos.
- `pages/projeto-detalhe.html`: modelo compartilhado para exibir um projeto.
- `data/site.json`: conteúdo do site e lista de projetos.
- `js/site.js`: carrega o JSON, renderiza objetivos e projetos e inicializa o Swiper.
- `css/style.css`: estilos compartilhados e pontos de adaptação para telas menores.
- `images/logo.jpeg`: logo do NEPP.

### Dados e navegação

As classificações dos projetos usam `areas`, uma lista com uma ou mais opções entre `Informática`, `Química` e `Agropecuária`. A interface apresenta as áreas em estilo neutro. O carregamento valida essas opções e rejeita áreas vazias, repetidas ou fora da lista.

O JSON possui um objeto `site` com conteúdo institucional e um array `projects`. Cada projeto tem um `id` único, título, áreas, resumo, descrição, objetivos, metodologia, coordenação (`responsible`), período e situação. Campos sem informação são ocultados na interface. A documentação das fontes e pendências fica em `data/FONTES.md`; as páginas apresentam apenas conteúdo voltado ao visitante.

O destaque embaralha apenas os projetos com `featured: true`. O Swiper percorre a lista em loop, com autoplay de 3 segundos, navegação e gestos de toque; exibe até três slides em desktop, dois em tablet e um em celular. O mouse sobre um card interrompe o autoplay; ao sair, ele retoma, respeitando a preferência por movimento reduzido. O catálogo exibe todos os registros. O detalhe é selecionado pelo parâmetro `id`, por exemplo `pages/projeto-detalhe.html?id=jovem-extensionista`.

Os valores são inseridos no HTML como texto, sem interpretar marcação HTML vinda do JSON.

### Responsividade e publicação

O layout usa pontos de quebra em 820 px e 640 px; o menu compacto é ativado em telas de até 640 px. A publicação do GitHub Pages usa a branch `main`, na raiz do repositório, e o endereço público é [nepp-apodi no GitHub Pages](https://guilhemesn.github.io/nepp-apodi/).
