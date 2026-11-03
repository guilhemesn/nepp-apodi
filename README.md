# NEPP — IFRN Campus Apodi

Site institucional inicial do Núcleo de Extensão e Prática Profissional do IFRN Campus Apodi. Esta versão utiliza apenas HTML e CSS, sem dependências ou etapas de compilação.

## Arquivos do site

- `index.html`: estrutura e conteúdo da página inicial.
- `style.css`: estilos, cores, disposição dos elementos e regras para telas menores.
- `logo.jpeg`: imagem exibida no cabeçalho.

Os três arquivos devem permanecer na mesma pasta, pois o HTML referencia `style.css` e `logo.jpeg` por caminhos relativos.

## Como visualizar

1. Baixe ou clone o repositório para o computador.
2. Abra a pasta no Visual Studio Code.
3. Abra `index.html` no navegador. Não é necessário instalar pacotes.

Para atualizar a página automaticamente enquanto edita, é possível usar a extensão **Live Server** do Visual Studio Code: clique com o botão direito em `index.html` e escolha **Open with Live Server**.

## Como editar o conteúdo

- Abra `index.html` e altere os textos das seções Hero, Projetos, Equipe ou Contato.
- Para cadastrar outro card, duplique um bloco `<article class="card">` dentro da seção `id="projects"` e atualize o título e a descrição.
- O menu usa links para as seções da página. Ao renomear um `id`, atualize também o `href` correspondente no menu.
- Para trocar a logo, substitua `logo.jpeg` por outra imagem mantendo esse nome e a mesma pasta, ou ajuste o caminho no atributo `src` em `index.html`.
- Edite `style.css` para mudar a aparência. As regras `@media` no final do arquivo controlam o layout em telas menores.

## Observação sobre o conteúdo

Os nomes e as descrições dos projetos, assim como as informações da equipe e os canais de contato, ainda são espaços reservados. Substitua-os pelos dados oficiais fornecidos e validados pelo NEPP.

## Compartilhamento

O repositório está configurado como privado. Para que outra pessoa possa visualizar ou editar os arquivos no GitHub, ela precisa ser adicionada como colaboradora nas configurações de acesso do repositório.
