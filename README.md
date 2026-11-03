# NEPP — IFRN Campus Apodi

Site institucional do Núcleo de Extensão e Prática Profissional do IFRN Campus Apodi. O projeto usa HTML e CSS estáticos, sem dependências nem etapa de compilação.

## Estrutura do repositório

- `index.html`: página inicial, com apresentação, projetos em destaque, equipe e contato.
- `style.css`: estilos da página inicial e ajustes responsivos.
- `projetos.html`: catálogo demonstrativo de projetos.
- `projeto-detalhe.html`: modelo demonstrativo para a página de um projeto.
- `css/projetos.css`: estilos compartilhados pelas páginas de projetos.
- `images/logo.jpeg`: logo usada no cabeçalho.

Mantenha os caminhos e nomes dos arquivos, ou atualize os atributos `href` e `src` correspondentes nos arquivos HTML.

## Como visualizar

1. Clone ou baixe o repositório e abra a pasta no Visual Studio Code.
2. Abra `index.html` no navegador. Não é necessário instalar pacotes.

Para recarregar a página automaticamente durante a edição, instale a extensão **Live Server**, clique com o botão direito em `index.html` e selecione **Open with Live Server**.

## Como editar o site

- Altere os textos e as seções diretamente em `index.html`.
- Para adicionar um card de destaque, duplique um bloco `<article class="card">` na seção `id="projects"`.
- Edite `style.css` para ajustar a página inicial. As regras `@media` controlam a apresentação em telas menores.
- As páginas de projetos usam `css/projetos.css`; edite esse arquivo para alterar apenas o catálogo e o modelo de detalhe.
- Para trocar a logo, substitua `images/logo.jpeg` mantendo o nome, ou altere o caminho nas páginas HTML.
- `projetos.html` e `projeto-detalhe.html` são modelos: substitua nomes e textos de exemplo pelas informações oficiais fornecidas pelo NEPP.

## Publicação e acesso

O repositório no GitHub é privado. Convide colaboradores nas configurações de acesso do repositório para que possam visualizar ou editar os arquivos. O GitHub Pages não publica sites a partir de repositórios privados em todos os planos; para manter o acesso restrito, use o próprio repositório para compartilhar o código.
