# NEPP — IFRN Campus Apodi

Site responsivo do Núcleo de Extensão e Prática Profissional do IFRN Campus Apodi. O projeto usa HTML, CSS e JavaScript nativos, sem bibliotecas obrigatórias ou compilação.

## Estrutura

- `index.html`: página inicial.
- `projetos.html`: catálogo de projetos.
- `projeto-detalhe.html`: página individual reutilizável, recebe o projeto pelo parâmetro `id`.
- `data/site.json`: textos institucionais, objetivos, contato e cadastro dos projetos.
- `js/site.js`: carrega o JSON e monta as seções e cartões.
- `style.css`: identidade visual, layout responsivo e estilos compartilhados.
- `images/logo.jpeg`: logo do NEPP.

## Executar localmente

Como os dados são carregados com `fetch`, abra o site por um servidor local, não diretamente pelo endereço `file://`.

1. Abra esta pasta no Visual Studio Code.
2. Instale a extensão **Live Server**, se ainda não estiver instalada.
3. Clique com o botão direito em `index.html` e selecione **Open with Live Server**.
4. Use o menu Projetos para acessar o catálogo e abrir um projeto de exemplo.

Também é possível servir a pasta com Python: no terminal, execute `python -m http.server 8000` e abra `http://localhost:8000` no navegador.

## Editar textos e projetos

A maior parte do conteúdo é mantida em `data/site.json`. Abra esse arquivo e edite os valores entre aspas sem remover vírgulas, chaves ou colchetes.
- Em `site`, altere título, chamada principal, apresentação, objetivos, equipe, contato e créditos.
- Em `projects`, cada objeto representa um projeto. Atualize `title`, `area`, `summary`, `description`, `objectives`, `methodology`, `responsible`, `period` e `status`.
- Para cadastrar outro projeto, copie um objeto completo dentro do array `projects`, separe-o do anterior por vírgula e escolha um `id` único, simples e sem espaços, por exemplo `horta-comunitaria`.
- O catálogo e as páginas individuais são gerados automaticamente com os dados do JSON; não é necessário duplicar HTML para cada projeto.
- O site usa `textContent` para inserir os textos do JSON. Evite colocar marcação HTML dentro desses campos.

Exemplo de projeto:

```json
{
  "id": "horta-comunitaria",
  "title": "Horta comunitária",
  "area": "Agroecologia",
  "summary": "Resumo curto para o cartão do projeto.",
  "description": "Apresentação completa do projeto.",
  "objectives": ["Primeiro objetivo", "Segundo objetivo"],
  "methodology": "Como as atividades são realizadas.",
  "responsible": "Nome da pessoa responsável",
  "period": "2026",
  "status": "Em andamento"
}
```

A página inicial mostra os três primeiros projetos. O catálogo mostra todos. Para trocar a logo, substitua `images/logo.jpeg` mantendo o nome ou atualize os caminhos `src` nos três arquivos HTML.

## Responsividade e acessibilidade

O layout adapta o menu, as colunas e o espaçamento para telas de celular, tablet e desktop. O menu móvel pode ser aberto pelo botão do cabeçalho; a navegação também suporta teclado e respeita a preferência por movimento reduzido do dispositivo.

## Publicar atualizações

Depois de editar, salve os arquivos, teste no Live Server e envie suas alterações à branch `main` pelo Git. O repositório é privado; convide colaboradores nas configurações de acesso do GitHub.
