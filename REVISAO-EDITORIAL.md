# Revisão de conteúdo e apresentação — 04/11/2026

Escopo: páginas principais, dados publicados, CSS compartilhado, renderização em JavaScript e organização local do projeto. Este documento é de manutenção e não tem link nas páginas do site.

Não é um laudo de detecção. Padrões de linguagem ou design não comprovam autoria por IA. A revisão procura problemas de clareza, especificidade e utilidade, sem inventar relatos pessoais, resultados ou credenciais.

## Achados e alterações

| Achado | Exemplo anterior | Alteração |
| --- | --- | --- |
| Slogan que poderia pertencer a qualquer instituição | “Conhecimento que se conecta com a comunidade.” | “Extensão e prática profissional em Apodi.” |
| Associação vaga sem explicar o trabalho | “Conexões que transformam”, “Saberes que se encontram” | Retirados; abertura mostra atividades e projetos identificáveis. |
| Ornamentação sem relação específica com o núcleo | Órbitas, forma orgânica e símbolos decorativos na abertura | Substituídos por links para Jovem extensionista, saneantes e gastronomia. É uma escolha de design, não um sinal conclusivo de IA. |
| Repetição de explicações abstratas | Aproximar, conectar e fortalecer usados em várias seções para descrever o mesmo papel | Textos passam a mencionar oficinas, residências técnicas, produtos e públicos atendidos. |
| Cabeçalhos redundantes | “Nosso propósito” antes de “Objetivos do NEPP”; “Quem faz acontecer” antes da equipe | Removidos os rótulos que não acrescentavam informação. |
| Chamada genérica de parceria | “Uma ideia pode ser o começo de uma parceria.” | Orientação direta para dúvidas e propostas de parceria. |
| Títulos administrativos muito longos nos cards | Título completo do projeto de agroecologia e inclusão digital | Campo `cardTitle` permite título curto para navegação; `title` continua completo na página de detalhe. |
| Resumos com o mesmo tom institucional | Expressões como “formação integral”, “desenvolvimento territorial sustentável” sem explicar a atividade | Resumos descrevem ações concretas existentes nos dados recebidos. |
| Descrições de equipe com linguagem de divulgação repetitiva | Coordenação apresentada com “aproximando” e “conectando” | Função e atuação de cada integrante, sem currículo presumido. |
| Numeração decorativa em conteúdos que não são etapas | 01, 02 e 03 nos objetivos | Retirada a numeração; mantida a organização em três temas, que tem utilidade real. |
| Vestígios de alterações acumuladas | CSS da antiga ilustração e da seção substituída | Removidos os seletores sem uso correspondentes. |
| Proporção incorreta no HTML da logo | Dimensões de 60 × 60 para imagem de 1600 × 533 | Dimensões corrigidas nas três páginas; tamanho visual continua responsivo no CSS. |

## Estrutura e limites

- HTML semântico, JSON, funções utilitárias, nomes de classes, grids e bordas arredondadas não identificam autoria por IA. Foram mantidos quando úteis.
- Não foram encontrados marcadores de citação de chatbot no conteúdo das páginas revisadas. A documentação de pesquisa fica fora da navegação pública.
- A pasta `neep_site`, ignorada pelo Git, e `css/projetos.css`, sem referência nas páginas principais, são material paralelo ou antigo. Isso exige organização de manutenção, mas não comprova geração por IA; não foram apagados.
- Iniciais nos perfis continuam como recurso visual. Não há fotos reais da equipe fornecidas; não foram criados retratos ou depoimentos.
- Títulos oficiais podem ter linguagem burocrática. Foram preservados nos detalhes por fidelidade aos registros, com versões curtas apenas para os cards.
- A revisão não confirma resultados alcançados nem atualiza automaticamente situações administrativas dos projetos.
- Não há promessa de passar em detectores. A revisão não inclui uma auditoria visual em navegador.

## Referências consultadas

- [Wikipédia: Sinais de texto gerado por inteligência artificial](https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:Sinais_de_texto_gerado_por_intelig%C3%AAncia_artificial) — ensaio voltado à Wikipédia; observações de redação foram consideradas com esse limite.
- [Microsoft Research: Decoding the AI Pen](https://www.microsoft.com/en-us/research/publication/decoding-the-ai-pen-techniques-and-challenges-in-detecting-ai-generated-text/) — limitações da identificação de texto gerado.
- [Digital.gov: Design for understanding](https://digital.gov/guides/plain-language/design) — clareza dos títulos, hierarquia e organização para leitura.
- [Government of British Columbia: Writing web content](https://www2.gov.bc.ca/gov/content/governments/services-for-government/service-experience-digital-delivery/web-content-development-guides/web-style-guide/writing-guide/writing-web-content) — foco nas necessidades do público e na finalidade de cada página.
