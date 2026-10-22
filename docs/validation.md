# Validação local — 22/10/2026

Resultados obtidos após aplicar a identidade aprovada, as cinco capas fornecidas e a ordem editorial: Soul Hackers, Devil Survivor Overclocked, Devil Survivor 2 Record Breaker, Strange Journey Redux e SMT IV: Apocalypse.

## Ambiente e comandos executados

Windows, Node 24.13.0, npm 11.6.2, Astro 7.4.2. A validação mais recente, após preparar o GitHub Pages, utilizou os assets estáticos no emulador Wrangler local em `127.0.0.1:8787`, com os cabeçalhos de `public/_headers` aplicados, e uma suíte adicional em `4322` para testar subdiretório e CSP meta. O Astro preview em `4321` foi usado nas medições Lighthouse anteriores.

`npm run validate` concluiu com código 0:

| Verificação                         | Resultado                                                                                          |
| ----------------------------------- | -------------------------------------------------------------------------------------------------- |
| Prettier (`npm run lint`)           | Aprovado                                                                                           |
| Astro/TypeScript (`npm run check`)  | 67 arquivos; zero erros, avisos ou hints                                                           |
| Vitest (`npm test`)                 | 24 testes aprovados, em quatro arquivos                                                            |
| Build (`npm run build`)             | 23 páginas HTML geradas                                                                            |
| Links (`npm run test:links`)        | 715 referências internas, assets e âncoras válidas                                                 |
| Segurança (`npm run test:security`) | 23 páginas e 51 referências a scripts externos locais; nenhum JavaScript executável inline         |
| SEO (`npm run test:seo`)            | Metadados, canonicals, JSON-LD, sitemap e RSS verificados                                          |
| Pages (`npm run test:pages`)        | Build isolado de 23 páginas; 761 referências válidas; quatro testes de navegador aprovados em 6,7s |
| Playwright (`npm run test:e2e`)     | 41 aprovados, um ignorado, zero falhas; 45,6s                                                      |

O teste ignorado evita repetir, no projeto mobile, a varredura de telas maiores já executada pelo projeto desktop. Foram verificados Home, catálogo e página Soul Hackers em 320, 580, 768, 1024, 1440, 1920 e 2560px, além de navegação em páginas representativas, filtros combinados e persistência na URL, ordem editorial, teclado, FAQ, menu, 404 e funcionamento sem JavaScript. O carrossel foi testado com controles manuais, rotação, pausa e movimento reduzido. O axe verificou regras WCAG A/AA nas rotas representativas.

O navegador local dos testes foi o Microsoft Edge em modo headless. O Chromium baixado pelo Playwright não iniciou neste ambiente Windows (`spawn UNKNOWN`); GitHub Actions está configurado para usar Chromium no Linux. Os resultados remotos são independentes das medições locais apresentadas aqui.

O teste de SEO gera uma saída isolada em `.qa/seo/`, usando a origem reservada `https://kiryoshi.validation.test`. Verificou títulos e descrições únicos, canonicals e metadados absolutos, JSON-LD válido e exclusão de conteúdo demonstrativo do RSS e sitemap. Esse diretório não é publicado; `dist/` mantém a configuração segura sem domínio público.

`npm run deploy:check` concluiu o dry-run atualizado do Wrangler, sem bindings. Uma tentativa anterior não pôde gravar logs globais por restrição do sandbox; a execução com permissão para esses logs concluiu com código 0. Nenhum deploy foi realizado. A auditoria `npm audit --json` da revisão de segurança retornou zero vulnerabilidades, incluindo desenvolvimento. O processador Sätteri existente foi declarado como dependência direta na mesma versão 0.4.5 para configurar o plugin nativo de caminhos; a instalação também retornou zero vulnerabilidades, sem novos pacotes. A instalação reproduzível com `npm ci` foi executada durante a implementação.

## CSP e testes de segurança

`script-src 'self'` substituiu a permissão de JavaScript inline. `script-src-attr 'none'` bloqueia handlers HTML, e `base-uri 'none'` bloqueia redefinições da URL base. Scripts pequenos deixaram de ser embutidos pelo build; o bootstrap antecipado do menu passou para um arquivo local síncrono. JSON-LD continua inerte e escapado. Não foi necessário adicionar dependências, servidor de aplicação ou geração manual de hashes.

Quatro verificações E2E de segurança (duas por viewport) confirmaram os headers reais em Home, catálogo, Soul Hackers, devlog e 404, com execução do bootstrap legítimo sem violações. Respostas de teste modificadas apenas em memória confirmaram o bloqueio de um script inline, um handler `onclick` e um script de domínio externo. As demais interações — menu, filtros e carrossel — também passaram sob a mesma CSP. O servidor de testes é encerrado automaticamente.

O checker estático também foi executado nas 23 páginas da saída SEO isolada, incluindo JSON-LD. Estilos mantêm a autorização específica de `style-src` para atributos Markdown/MDX; ela não libera JavaScript inline. A política do ambiente de desenvolvimento Astro não é evidência de proteção: os testes de enforcement usam o emulador Cloudflare sobre o build.

## Lighthouse medido

Lighthouse 13.5.0, Edge headless, uma medição por página em 22/10/2026 entre 18:09 e 18:10 UTC, antes da externalização dos scripts para endurecer a CSP. Não houve nova medição Lighthouse após essa alteração. Perfil mobile de 412×823px, escala 1,75, throttling simulado com RTT de 150ms, throughput de 1638,4Kbps e CPU 4×. Os resultados são locais, não medições da hospedagem Cloudflare ou de dispositivos físicos.

| Página       | Performance | Acessibilidade | Boas práticas | SEO |  LCP |   CLS |
| ------------ | ----------: | -------------: | ------------: | --: | ---: | ----: |
| Home         |         100 |            100 |           100 |  66 | 1,6s |     0 |
| Catálogo     |         100 |             98 |           100 |  63 | 1,2s | 0,002 |
| Soul Hackers |         100 |            100 |           100 |  66 | 1,4s |     0 |

O objetivo de SEO 95+ ainda não foi validado em produção. A saída local bloqueia indexação intencionalmente com `noindex, nofollow` e `robots.txt`, pois `PUBLIC_SITE_URL` não está configurada com um domínio real; conteúdo demonstrativo também permanece fora da indexação. Não foram alteradas essas proteções para elevar a pontuação. Após configurar o domínio e revisar o conteúdo editorial, refaça a auditoria na publicação real.

Relatórios locais HTML/JSON estão em `.qa/lighthouse/*-final.report.*`; screenshots e traces dos testes ficam em `test-results/`. Esses artefatos são ignorados pelo Git.

## Limites e pendências reais

- Nenhum deploy do site foi realizado. HTTPS, headers, cache, redirects e status 404 precisam ser conferidos na hospedagem efetiva. Os resultados acima são de validação local; execuções do CI remoto são consultadas na aba Actions do repositório.
- Faltam domínio público, canais de contato/redes, vídeos publicados, dados confirmados de progresso e eventuais patches autorizados. Não existem pagamentos integrados.
- Os cinco projetos são configurações iniciais identificadas como exemplos; os três devlogs são exemplos editoriais sem datas de publicação inventadas.
- As capas fornecidas estão registradas em `docs/assets.md`; não há screenshots de traduções ou arquivos de jogos distribuídos.
- Testes automatizados e inspeção visual local não substituem testes com leitor de tela, dispositivos físicos e usuários.

## Versionamento no GitHub

O usuário autorizou o primeiro commit e envio do projeto em 22/10/2026. O destino é o repositório privado [Ygorfrc/kiryoshi-translations](https://github.com/Ygorfrc/kiryoshi-translations), na branch `main`. Arquivos `.env`, dependências, builds, logs e relatórios locais ficam fora do Git. O workflow de qualidade executa as verificações sem publicar o site ou acessar credenciais de deploy.

## Preparação do GitHub Pages

A tentativa de habilitar Pages pela API retornou HTTP 422: o plano atual não suporta Pages neste repositório privado. O usuário escolheu manter tudo privado e somente preparar o commit. Nenhuma visibilidade foi alterada, repositório público criado, plano contratado ou workflow de deploy executado. Não existe URL publicada confirmada.

Foram preparados `PUBLIC_BASE_PATH`, links de componentes e de conteúdo Markdown/MDX, metadados e imagens para o subdiretório. O build isolado `.qa/pages/` usa uma origem reservada e `noindex`, e nunca é publicado. O workflow Pages é somente manual, valida antes de gerar `dist-pages/` com URL/base reais lidas do GitHub e não faz deploy em pushes.

Os quatro testes adicionais passaram em desktop e mobile: navegação, carrossel, busca, imagem carregada, link Markdown, metadados com base, privacidade e feeds de prévia, além do bloqueio de JavaScript inline pela CSP meta sem header HTTP. A suíte principal continua validando os headers reais no emulador Cloudflare. O teste da busca detectou um problema no evento `change` ao perder foco, que podia interromper cliques em resultados; ele foi corrigido e recebeu cobertura nas duas suítes.

O Pages não aplica o arquivo `_headers`. A CSP meta deriva dele, excetuando `frame-ancestors`, que exige header HTTP; não foi alegada equivalência com todos os headers do Cloudflare. A política de privacidade do build Pages identifica o GitHub como hospedagem. O workflow de publicação depende da habilitação futura do serviço e de nova autorização do responsável.
