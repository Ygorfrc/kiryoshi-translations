# Registro de assets

| Asset                               | Origem e direitos                                                                               | Uso                                                           |
| ----------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Marca geométrica K                  | SVG original criado para este projeto                                                           | Header, footer, hero e favicon                                |
| Capas tipográficas                  | HTML/CSS/SVG originais; nomes usados para identificar os jogos                                  | Placeholders explicitamente identificados, sem capas oficiais |
| Grafismos dos devlogs               | CSS e caracteres tipográficos; composição original                                              | Ilustração editorial, sem screenshots                         |
| `public/images/social.svg` e `.png` | Composição vetorial original, rasterizada localmente                                            | Compartilhamento 1200×630; fonte de sistema no PNG            |
| Space Grotesk                       | Pacote `@fontsource-variable/space-grotesk`, licença OFL incluída em `node_modules/.../LICENSE` | Fonte variável local, com `font-display: swap`                |
| Lucide                              | Pacote `@lucide/astro`, licença ISC incluída no pacote                                          | Ícones consistentes e estáticos                               |

As capas abaixo foram fornecidas pelo usuário na pasta `images/`, com autorização explícita para uso neste site na conversa de 22/10/2026. Os direitos das artes dos jogos continuam com seus respectivos titulares; essa autorização de uso pelo responsável não é apresentada como licença aberta nem afiliação oficial. Não há screenshots de traduções ou thumbnails remotas cadastradas.

| Projeto                         | Arquivo original                      | Dimensões |
| ------------------------------- | ------------------------------------- | --------- |
| Soul Hackers                    | `images/SoulHackerscapa.jpeg`         | 500×500   |
| Devil Survivor Overclocked      | `images/DeSu1.jpg`                    | 1402×1406 |
| Devil Survivor 2 Record Breaker | `images/Desu2.jpg`                    | 1334×1334 |
| SMT IV: Apocalypse              | `images/boxart_smt_iv_apocalypse.jpg` | 638×640   |
| Strange Journey Redux           | `images/Strange-Journey-boxart.jpg`   | 959×960   |

`SoulHackerscapa.jpeg` é a imagem escolhida explicitamente pelo usuário para a missão atual. `images/Soul Hackers.webp` (1600×800) e `images/SoulHackersUS.jpg` (256×229) são variantes fornecidas e preservadas, sem substituir a escolha solicitada.

Em 22/10/2026, o usuário substituiu a capa anterior `DeSu2.jpeg` por `Desu2.jpg` e autorizou explicitamente a atualização. O novo original foi conferido e preservado sem edição; o site gera suas variantes WebP com Astro Image.

O componente GameCover resolve `cover.asset` a partir dessa pasta, gera WebP responsivo e preserva a proporção. Os originais não foram editados. Projetos sem capa continuam com o fallback tipográfico identificado; ele não é usado nos cinco projetos atuais.

## Redesign da Home

- `src/assets/fan-room-original.png`: ilustração original produzida pela ferramenta ImageGen integrada, sem personagens ou screenshot de jogos existentes. Foi substituída pelo carrossel a pedido do usuário e está preservada para uso futuro, sem ser carregada pela Home. O prompt está em `docs/home-art-direction.md`.
- `src/components/Campfire.astro`: ícone de fogueira em SVG original sobre grade de pixels.
- `src/assets/cursors/jrpg-arrow.svg` e `jrpg-pointer.svg`: setinhas vetoriais originais de 32×32, criadas para a interface, sem assets de franquias.
- Silkscreen: pacote `@fontsource/silkscreen`, licença OFL incluída no pacote, fonte local do Header em todas as rotas.

Ao adicionar um asset, registre aqui seu caminho, titular, URL de origem, licença ou evidência verificável da autorização, restrições e crédito exibido. A propriedade `permission: authorized` é um controle editorial, não uma licença automática.

O SVG da imagem social é fonte editável; o PNG é a versão compatível com serviços de compartilhamento. Para regenerar após editar o SVG, utilize uma ferramenta de rasterização local e confira visualmente dimensões e texto. Não busque capas automaticamente sem analisar direitos.
