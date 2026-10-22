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

`SoulHackerscapa.jpeg` foi a escolha inicial para a missão atual e permanece como capa no catálogo, carrossel e página individual. Posteriormente, o usuário forneceu e autorizou `images/Soulhckers-banner.webp` (1280×720) para substituir somente a imagem da seção “Toda jornada tem um começo” na Home. Trata-se de arte promocional do jogo, não de screenshot da tradução; os direitos continuam com os respectivos titulares. O original foi preservado, incluindo seus créditos, e Astro Image gera variantes responsivas sem cortar a arte.

`images/Soul Hackers.webp` (1600×800) e `images/SoulHackersUS.jpg` (256×229) são outras variantes fornecidas e preservadas.

Em 22/10/2026, o usuário substituiu a capa anterior `DeSu2.jpeg` por `Desu2.jpg` e autorizou explicitamente a atualização. O novo original foi conferido e preservado sem edição; o site gera suas variantes WebP com Astro Image.

O componente GameCover resolve `cover.asset` a partir dessa pasta, gera WebP responsivo e preserva a proporção. Os originais não foram editados. Projetos sem capa continuam com o fallback tipográfico identificado; ele não é usado nos cinco projetos atuais.

## Banner editado da missão atual

Em 22/10/2026, o usuário pediu ampliar o banner até as bordas do painel e remover “COMING APRIL 16, 2013”. A ferramenta integrada **ImageGen**, em modo de edição, gerou `src/assets/soul-hackers-banner-edited.png` (1672×941) a partir de `images/Soulhckers-banner.webp`. O original de 1280×720 foi preservado. A cópia mantém a composição promocional e os créditos no topo; não é uma screenshot da tradução. Os direitos da arte continuam com os respectivos titulares (Index Corp. / ATLUS, conforme os créditos da imagem), sem licença aberta presumida.

O painel usa enquadramento com `object-fit: cover` e foco à direita para atender à área marcada pelo usuário, sem distorcer a imagem. Parte das laterais fica fora do enquadramento; a cópia completa continua preservada. A legenda identifica o crédito e a edição visual com IA. Astro Image gera somente as variantes WebP necessárias para exibição.

Prompt utilizado na ferramenta integrada, sem CLI ou API key:

> Use case: precise-object-edit. Edit target: the supplied 1280x720 promotional artwork. Make exactly one local correction: remove the release-date text 'COMING APRIL 16, 2013' in the lower left, directly below the SOUL HACKERS logo, and reconstruct the surrounding blue halftone/graphic background naturally. Preserve the same 16:9 image framing, all characters and their faces, clothing, proportions and positions, all other artwork, game logos, speech bubbles, all other text, and the small copyright/attribution line along the upper edge. Do not remove the copyright line. Do not crop, recompose, add subjects, restyle or redraw the image. Only remove the date announcement. Return the edited artwork alone, with opaque background.

## Redesign da Home

- `src/assets/fan-room-original.png`: ilustração original produzida pela ferramenta ImageGen integrada, sem personagens ou screenshot de jogos existentes. Foi substituída pelo carrossel a pedido do usuário e está preservada para uso futuro, sem ser carregada pela Home. O prompt está em `docs/home-art-direction.md`.
- `src/components/Campfire.astro`: ícone de fogueira em SVG original sobre grade de pixels.
- `src/assets/cursors/jrpg-arrow.svg` e `jrpg-pointer.svg`: setinhas vetoriais originais de 32×32, criadas para a interface, sem assets de franquias.
- Silkscreen: pacote `@fontsource/silkscreen`, licença OFL incluída no pacote, fonte local do Header em todas as rotas.

Ao adicionar um asset, registre aqui seu caminho, titular, URL de origem, licença ou evidência verificável da autorização, restrições e crédito exibido. A propriedade `permission: authorized` é um controle editorial, não uma licença automática.

O SVG da imagem social é fonte editável; o PNG é a versão compatível com serviços de compartilhamento. Para regenerar após editar o SVG, utilize uma ferramenta de rasterização local e confira visualmente dimensões e texto. Não busque capas automaticamente sem analisar direitos.
