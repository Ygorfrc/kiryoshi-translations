# Home — clube de fãs de JRPG

Direção aprovada pelo usuário: **azul noturno, creme e coral**, com Header pixelado e elementos de interface de JRPG. A paleta e o Header se aplicam a todas as rotas. Essa direção substitui a versão anterior em verde petróleo, creme e âmbar.

## Paleta aprovada — 22/10/2026

A paleta usa **azul noturno `#111B34`, creme `#F2EEE4` e coral `#FF7864`**. O azul estrutura Header, hero, janelas e comunidade; o creme mantém as áreas de leitura acolhedoras; o coral marca cursores, destaques e ações. Textos de destaque sobre superfícies claras usam coral escuro `#A63E35` para preservar contraste. Cores auxiliares do carrossel usam coral suave, azul claro e areia.

Foram preservados layout, tipografia, capas e interações. Tokens principais estão no início de `home.css`; os nomes antigos `--forest`, `--forest-deep` e `--honey` são aliases da nova paleta, para manter as composições existentes. O favicon, a imagem social e a cor da interface do navegador acompanham a identidade. Após o teste local, o usuário aprovou a paleta e autorizou atualizar o GitHub Pages.

## Cursor personalizado

Conforme a referência fornecida pelo usuário, a setinha original de 32×32 usa preenchimento escuro, contorno claro e halo azul suave. Links e controles clicáveis recebem uma variante com halo mais intenso, sem animação. Os SVGs em `src/assets/cursors/` são processados pelo Vite para respeitar o subdiretório do Pages. A aplicação usa somente CSS, com hotspot em 10×7 e fallback nativo; não há elemento seguindo o mouse, animação ou código adicional no cliente. Touch e modos de cores forçadas preservam o comportamento nativo; inputs de texto e controles desabilitados mantêm cursores próprios.

## Interface

- Silkscreen auto-hospedada no Header; fontes locais, sem chamadas ao Google Fonts.
- Tipografia editorial em Georgia para títulos da Home, com texto de corpo em fonte de sistema.
- Menu de caminhos com cursor triangular e links reais.
- Janelas com borda dupla, cursores de seleção, recortes diagonais e tipografia expressiva no carrossel.
- Diário de missões para Soul Hackers e estante para os títulos de interesse futuro.
- Fogueira vetorial original como ponto de encontro da comunidade.
- Sem níveis, membros, porcentagens ou conquistas inventadas.

Tokens e estilos ficam em `src/styles/home.css`, sob o escopo `.club-theme`, com composições específicas da Home. O layout base aplica o tema e a fonte pixelada a todas as páginas.

## Carrossel e capas

O usuário pediu substituir a ilustração da TV por um slideshow de projetos, com inspiração abstrata em Persona. A composição usa recortes diagonais, tipografia inclinada e cores da própria marca, sem copiar uma interface oficial.

Não há projetos concluídos confirmados no conteúdo inicial. O usuário autorizou exibir os projetos atuais com status reais até haver concluídos. `selectShowcase` passa a priorizar os concluídos quando houver entradas `Disponível`, sem flag de exemplo e com releases autorizadas.

Rotação a cada 6,5 segundos, controles anterior/próximo e seleção direta, pausa explícita, navegação por setas e respeito a reduced motion. Pausa também ao receber foco, hover, sair da viewport ou ocultar a aba. Sem JavaScript, o primeiro destaque e o link ao catálogo continuam acessíveis.

As capas agora são os arquivos fornecidos pelo usuário em `images/`. A missão atual utiliza exatamente `SoulHackerscapa.jpeg`. `GameCover.astro` usa Astro Image para WebP responsivo e preserva a proporção de cada original.

## Ilustração

Ferramenta: **ImageGen integrada**, sem CLI ou API key. Arquivo preservado no repositório: `src/assets/fan-room-original.png`, 1536×1024. A pedido do usuário, essa ilustração foi substituída pelo carrossel e não é mais carregada pela Home. Ela é mantida como arte original disponível para uso futuro.

A arte é identificada como ilustração original criada com IA. Não representa uma screenshot nem incorpora personagens de franquias.

### Prompt final usado

Use case: illustration-story. Asset type: original website hero artwork for a welcoming Brazilian JRPG fan translation community named Kiryoshi. Create a sophisticated hand-painted illustration, landscape 3:2 composition, no text or logos. A cozy lived-in gaming nook at dusk: an old small CRT television on a wooden low shelf, its screen shows an entirely original lush tiny fantasy landscape with a path and glowing distant castle, a wired retro controller resting naturally on a cream floor cushion, a generic clamshell handheld console nearby, a stack of unbranded game cases and dog-eared notebooks, houseplants, warm tea mug, amber desk lamp, curtains and a rounded window with distant stars. The room feels like the place a JRPG fan comes home to after a long day, personal, inviting and a little magical. Visual hierarchy: CRT and its glowing world are the focal point, objects cohesive and arranged naturally, landscape on screen is clearly imagined original art not a real screenshot. Medium: textured gouache and delicate colored-pencil edges, contemporary Japanese-inspired editorial background art with rich painterly details, subtle grain and beautiful controlled lighting, premium artisan quality, not flat vector. Palette: deep petrol teal shadows, forest green, warm ivory cream, honey amber, muted terracotta; very little purple, no electric cyan. Slightly elevated intimate three-quarter interior view; fill the illustration, no large white border. No people, no readable words, no letters, no brand marks, no real game characters, no familiar franchise monsters, no weapons, no watermark, no duplicated controllers, no mockup UI. This is an original atmospheric illustration, not a screenshot.
