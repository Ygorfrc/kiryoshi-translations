# Decisões de arquitetura

## Renderização e cliente

O conteúdo é renderizado em HTML no build. Não há runtime Node de produção. Os scripts de interface são menu acessível, filtros com ordenação e URL sincronizada, carrossel com controles e pausa e compartilhamento por API do navegador com fallback. Não existe motivo para instalar React neste MVP.

Busca e filtros operam sobre um índice JSON pequeno, serializado em atributo HTML escapado pelo Astro. Os cards já estão no HTML, de forma que ausência de JavaScript não remove conteúdo. A busca trata acentos e todos os termos, combina filtros e desempata ordenações por nome. Datas desconhecidas ficam ao final. Resultados e estado vazio têm anúncio acessível.

Menu móvel é disclosure, sem comportamento de modal ou armadilha de foco. Abre pelo botão, fecha por Escape ou clique externo e devolve foco ao botão ao usar Escape. Sem JavaScript, a navegação permanece visível.

## Conteúdo

Loaders glob descobrem novos arquivos no build. Zod valida enums, dados opcionais, imagens, links HTTPS e releases. `example` e `demo` separam dados editoriais iniciais de material aprovado para indexação. Rascunhos não geram rotas. Tutoriais pertencem ao devlog com categoria própria.

Não há percentual geral: extração, tradução, revisão, reinserção e testes são valores independentes opcionais. Exibição de “Não informado” preserva a diferença entre desconhecido e zero. `Disponível` exige release autorizada válida.

Validação de URL, hash e flag de autorização não prova titularidade nem confiabilidade externa. O mantenedor revisa conteúdo, permissões e arquivos antes de cadastrar um patch. Links externos não são verificados com downloads automáticos.

## Visual e orçamento

Tokens CSS e Tailwind 4 compartilham a estrutura. A identidade aprovada usa verde petróleo, creme e âmbar em todas as páginas; Silkscreen no Header, Georgia em títulos editoriais e Space Grotesk nos componentes. Capas fornecidas pelo usuário são referenciadas por `cover.asset` e processadas por Astro Image, sem alterar os originais. O tema fica no escopo `.club-theme`. Breakpoints principais: 640, 800 e 1088px, com ajustes a 580 e 1100px e largura máxima 1248px. O objetivo é preservar leitura e composição entre 320 e 2560px.

Controles têm foco visível. Animações se limitam a transições curtas e respeitam reduced motion. Operações síncronas não exibem carregamentos artificiais. Busca vazia, coleções vazias, vídeos ausentes, patches ausentes, 404 e falha de compartilhamento têm estados explícitos.

## SEO e origem pública

`PUBLIC_SITE_URL` é uma variável de build. A configuração Astro e os endpoints estáticos leem a mesma origem. Sem ela, não há canonicals ou links absolutos de domínio inventado; robots e meta robots impedem indexação. Sitemap e RSS são endpoints próprios pequenos para controlar a exclusão de exemplos e rascunhos sem integração adicional.

Dados estruturados usam WebSite, WebPage com referência VideoGame, BreadcrumbList e BlogPosting apenas para artigos reais. Não há AggregateRating, Offer ou progresso fictício. JSON-LD é escapado antes de inserir no HTML.

## Deploy e segurança

Wrangler publica exclusivamente assets de `dist/`, com tratamento de HTML e 404 nativo. Nenhum adaptador ou Worker de aplicação foi instalado. Os cabeçalhos de `public/_headers` são processados pelo Cloudflare Static Assets. `script-src 'self'` permite somente scripts externos locais, sem `unsafe-inline` ou `unsafe-eval`; `script-src-attr 'none'` bloqueia handlers HTML. `base-uri 'none'` impede redefinir a URL base. JSON-LD é metadado inerte, escapado, e não precisa de permissão para executar JavaScript inline.

O build Vite usa `assetsInlineLimit: 0` para impedir que scripts Astro pequenos sejam embutidos no HTML. A classe antecipada do menu é aplicada por `public/scripts/menu-init.js`, síncrono no head, preservando o menu sem mudança de layout. Não há geração de hashes nem etapas de pós-processamento: os scripts publicados ficam em arquivos locais, e o build é validado por `test:security`, incluindo a saída SEO isolada. Estilos mantêm `unsafe-inline` apenas em `style-src` para conteúdo Markdown/MDX com atributos de estilo, como realce de código. Conteúdo MDX deve ser revisado como código.

Playwright usa o emulador Wrangler local em `127.0.0.1:8787`, aplicando os headers reais sobre os assets estáticos. Astro preview não interpreta `_headers`; por isso não é usado como servidor E2E. Os testes verificam navegação e interações sob a CSP, além de tentativas controladas de execução inline, handlers e scripts de terceiros. Nenhuma dessas tentativas é gravada no conteúdo do site ou enviada a servidores externos. A entrega efetiva na Cloudflare continua dependendo de verificação após deploy autorizado.

Não há sessão, endpoint de envio, banco ou cookies de aplicação. A hospedagem pode processar dados técnicos de requisição; a política registra a necessidade de confirmar a configuração efetiva no lançamento. Apoio e canais são links opcionais, sem scripts de terceiros ou checkout.

CI executa qualidade sem publicar. Credenciais e domínios são responsabilidade da conta do usuário; nenhuma conta ou conexão é presumida. Build SEO isolado usa `.test`, nunca `dist/` e nunca produção.
