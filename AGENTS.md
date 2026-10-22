# Instruções para agentes

## Escopo e arquitetura

- Preserve o portal Kiryoshi Translations, pt-BR, independente, gratuito e sem afiliação oficial.
- Astro SSG, TypeScript strict, Tailwind 4 e Content Collections. Não adicionar SSR, adaptador Cloudflare, banco, autenticação ou painel sem necessidade autorizada.
- Componentes Astro por padrão. Use React apenas se uma interação justificar hidratação; hoje não há dependência de React.
- Cloudflare Workers Static Assets serve `dist/` diretamente. Não transformar o 404 em fallback de SPA.
- Dependências fixadas e `package-lock.json` versionável. Use npm; valide compatibilidade e auditoria antes de atualizar a stack.

## Conteúdo e direitos

- Projetos são `src/content/translations/*.md`; devlogs e tutoriais são `src/content/devlogs/*.{md,mdx}`. Schemas ficam em `src/lib/schemas.ts`.
- Não inventar progresso, datas, versões, perfis, vídeos, assets, colaboradores ou links.
- Valor ausente não equivale a zero. Preserve as cinco etapas de progresso sem percentual geral calculado.
- `example: true` e `demo: true` indicam conteúdo demonstrativo e impedem indexação individual. Exemplos não entram no RSS. Não remova essas flags sem confirmação editorial.
- Nunca adicionar ROMs/ISOs/CIAs, arquivos proprietários completos ou patches sem autorização. Downloads exigem metadados reais, autorização e tutorial específico.
- Imagens reais exigem dimensões, alt, crédito e permissão. Preserve evidências em `docs/assets.md`. Placeholders sempre identificados.
- Markdown/MDX é confiável somente após revisão; MDX pode executar código no build.

## Design e acessibilidade

- A identidade aprovada pelo usuário é um clube de fãs acolhedor, com verde petróleo, creme e âmbar, Header pixelado e UI inspirada em JRPGs. Ela se aplica a todas as rotas pelo escopo `.club-theme` de `src/styles/home.css`. Consulte `docs/home-art-direction.md`. Não retorne ao tema roxo anterior.

- Estrutura e tokens base em `src/styles/global.css`; identidade atual e composições em `src/styles/home.css`; carrossel em `src/styles/showcase.css`. Preserve composição editorial, contraste e marca original.
- O carrossel prioriza projetos `Disponível`, confirmados (`example: false`) e com patch autorizado. Enquanto não houver concluídos, mostre os projetos atuais com seus status reais, conforme autorizado pelo usuário. Nunca rotule planejados como concluídos. Preserve pausa, teclado, reduced motion e pausa fora da viewport.
- Capas fornecidas pelo usuário ficam em `images/`, referenciadas por `cover.asset` no Markdown. Não altere os originais. SoulHackerscapa.jpeg é a imagem solicitada para a missão atual. Astro Image gera variantes responsivas sem cortar as artes.
- Preserve a ordem editorial por `displayOrder`: Soul Hackers, Devil Survivor Overclocked, Devil Survivor 2 Record Breaker, Strange Journey Redux, SMT IV: Apocalypse. Essa é a ordem inicial do carrossel e do catálogo, que ainda oferece nome e atualização como alternativas.
- Fonte local Space Grotesk em títulos; corpo usa fonte de sistema. Não carregar Google Fonts ou imagens externas automaticamente.
- Mobile-first, 320px a ultrawide, foco visível, semântica nativa, teclado, reduced motion e contraste AA.
- Um h1 por página. O corpo Markdown começa com h2. Não adicionar botões decorativos, embeds pesados ou anúncios.
- Conteúdo e navegação devem continuar disponíveis sem JavaScript. O menu é aprimoramento progressivo; filtros ocultos até inicialização.
- Não adicionar spinners falsos a operações estáticas síncronas. Estados vazios e falhas devem explicar a situação.

## SEO, privacidade e configuração

- Origem pública em `PUBLIC_SITE_URL`, validada por `src/config/url.mjs`. Sem origem real: noindex, robots bloqueado, sitemap vazio, RSS inativo. Nunca inserir domínio fictício como fallback indexável.
- Metadados compartilhados em SEOHead e layout base; breadcrumbs, headings e HTML estático legível.
- Canais, apoio, contato e vídeos em `src/config/site.ts`; vazios são estados válidos.
- Não adicionar tracking, cookies, pagamentos ou serviços externos sem escopo autorizado. Atualize privacidade e CSP antes de integrar terceiros.
- `_headers` deve acompanhar serviços efetivamente usados. Não alegar proteção validada em produção quando só houve teste local.
- GitHub Pages está apenas preparado. O plano da conta recusou Pages no repositório privado, e o usuário escolheu manter tudo privado. Preserve o workflow `pages.yml` exclusivamente manual; não altere visibilidade nem dispare deploy sem nova autorização.
- Use `withBase` para links e imagens locais; `PUBLIC_BASE_PATH` controla o subdiretório. O plugin nativo Sätteri cuida de URLs do Markdown/MDX. Preserve o padrão `/` do Cloudflare e não reescreva URLs externas ou âncoras.
- `PUBLIC_NOINDEX=true` mantém uma prévia sem indexação com URL real. `PUBLIC_HOSTING=github-pages` seleciona a privacidade correspondente. A CSP via meta deriva de `_headers`, sem `frame-ancestors`, que exige HTTP. Não alegue que o Pages aplica `_headers`.
- Preserve `script-src 'self'` e `script-src-attr 'none'`, sem `unsafe-inline`/`unsafe-eval` em scripts. O build usa `vite.build.assetsInlineLimit: 0` para gerar arquivos JS locais; o bootstrap síncrono do menu fica em `public/scripts/menu-init.js`. JSON-LD é metadado inerte, não motivo para liberar scripts inline. Estilos têm uma permissão separada para atributos do Markdown/MDX.

## Comandos e entrega

- `npm ci` para instalar; Node 24 LTS, npm 11.
- `npm run dev` para desenvolvimento; `npm run build` gera `dist/`; `npm run preview` serve o resultado.
- `npm run format`, `npm run lint`, `npm run check`, `npm test`, `npm run build`, `npm run test:links`, `npm run test:security`, `npm run test:seo`, `npm run test:e2e`.
- `npm run validate` executa a sequência completa. Playwright usa Edge por padrão; `PLAYWRIGHT_CHANNEL=chromium` usa Chromium instalado pelo Playwright.
- E2E inicia o Wrangler local em `127.0.0.1:8787` para aplicar `_headers`; não reutilize Astro preview nem libere a CSP para fazer testes passarem. A porta precisa estar livre. Testes não fazem login ou publicação.
- `npm run test:pages` integra `validate` e gera `.qa/pages/` com origem reservada; usa preview na porta 4322 para testar subdiretório e CSP meta sem headers Cloudflare. Nunca publicar `.qa/`. O workflow Pages gera e publica somente `dist-pages/` com URL/base reais lidas do GitHub.
- Após mudanças relevantes, rode as verificações correspondentes; no encerramento, execute os checks necessários e corrija falhas conhecidas. Não afirme resultados não medidos.
- `.qa/seo/` usa origem reservada somente para teste. Nunca publicar esse diretório. O deploy usa exclusivamente `dist/`.
- Atualize README e `docs/validation.md` quando comandos, arquitetura ou resultados mudarem.
- Não fazer commit, push ou deploy sem autorização. Dry-run do Wrangler não publica. Não solicitar nem registrar segredos em arquivos.
