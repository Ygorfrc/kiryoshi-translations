# Validação local — 22/10/2026

## Validação completa para envio ao GitHub

Após o usuário autorizar enviar a atualização, `npm run validate` foi executado integralmente e concluiu com código 0: formatação e tipos aprovados, 24 testes unitários, build de 23 páginas, 720 referências internas válidas, segurança e SEO aprovados, quatro testes de Pages em 7,6s e 41 E2E em 42,0s. Um teste foi ignorado por duplicar a varredura desktop no projeto mobile. A saída isolada do Pages validou 766 referências com o subdiretório configurado. Log local: `.qa/validation-github-banner-release.log`.

O envio inclui os avisos sobre auxílio de IA e revisão humana, o banner preenchendo o painel, sua cópia editada sem a chamada de lançamento e o original fornecido pelo usuário. A publicação usa o workflow manual existente do GitHub Pages, que repete as verificações antes do deploy. Os registros de validação local anteriores abaixo permanecem como histórico.

## Painel preenchido e remoção da chamada de lançamento

O usuário marcou a área desejada e pediu remover “COMING APRIL 16, 2013”. A ferramenta integrada ImageGen produziu uma cópia editada em `src/assets/soul-hackers-banner-edited.png`; o original fornecido permanece intacto. O painel agora usa toda a largura e a altura útil entre rótulo e legenda, com `object-fit: cover` focado nos personagens; no mobile, a área é 4:3. A legenda identifica os titulares indicados na arte e a edição visual com IA. Prompt e procedência estão em `docs/assets.md`.

Validação final: Astro/TypeScript com 67 arquivos e zero erros, avisos ou hints; build de 23 páginas; 720 referências internas válidas; formatação e `git diff --check` aprovados. A suíte focada da Home e de larguras responsivas aprovou três testes em 7,9s; um foi ignorado por duplicar a varredura desktop. Foram inspecionados o resultado de edição, o painel no navegador local e a captura mobile em 320px. Sem nova medição Lighthouse, suíte completa, commit, push ou publicação. Log: `.qa/validation-full-panel-banner-final.log`.

## Banner da missão atual

O usuário forneceu `images/Soulhckers-banner.webp` (1280×720) para a seção “Toda jornada tem um começo” da Home. A arte horizontal é exibida integralmente, com dimensões explícitas, WebP responsivo, lazy loading, alt e identificação como arte promocional. Catálogo, carrossel e página individual continuam usando a capa cadastrada. Foram preservadas as informações de auxílio de IA e revisão humana da alteração anterior.

Validações: Astro/TypeScript com 67 arquivos e zero erros, avisos ou hints; build de 23 páginas; 720 referências internas válidas; formatação e `git diff --check` aprovados. Playwright com o filtro `rota, acessibilidade e largura: /$|layout entre tablet` aprovou três testes em 27,2s; um foi ignorado para não duplicar a varredura desktop. Cobriu acessibilidade da Home em desktop/mobile e larguras de 320 a 2560px nas páginas representativas. A primeira execução de check foi interrompida após ficar sem resposta no terminal; a repetição concluiu com sucesso. Houve inspeção visual da Home local após recarregar o build. Não houve commit, push ou publicação desta alteração. Log: `.qa/validation-soul-banner.log`.

## Transparência sobre auxílio de IA e revisão humana

A pedido do usuário, foram adicionadas informações sobre auxílio de IA e revisão humana na nota da missão atual da Home, em uma seção de Sobre e no resumo e FAQ de todas as páginas de tradução. O texto descreve o processo do projeto, sem alterar status, percentuais ou afirmar que a revisão de um título já terminou. Não foram presumidos modelos ou serviços utilizados.

Validação desta alteração editorial: Astro/TypeScript com 67 arquivos e zero erros, avisos ou hints; build de 23 páginas; 720 links/assets/âncoras válidos; segurança estática aprovada; formatação e `git diff --check` aprovados. A suíte existente foi executada com o filtro `rota, acessibilidade e largura|layout entre tablet`: 23 testes aprovados, um ignorado por duplicar a varredura desktop, em 27,9s. Cobriu as 11 rotas representativas em desktop/mobile com axe e larguras de 320 a 2560px. Não foi executada novamente a suíte completa. Houve inspeção visual local; nenhuma publicação, commit ou push foi feito nesta alteração. Log local: `.qa/validation-ai-transparency.log`.

## Paleta aprovada e cursor da referência

O usuário aprovou azul noturno, creme e coral, autorizou publicar a versão no GitHub Pages e forneceu a referência do cursor: preenchimento escuro, borda clara e halo azul. O cursor foi implementado com dois SVGs locais de 32×32 e CSS, sem JavaScript adicional. A imagem social SVG/PNG e o favicon acompanham a paleta aprovada.

Após o ajuste final do cursor, `npm run validate` concluiu com código 0: formatação aprovada; Astro/TypeScript com 67 arquivos e zero erros, avisos ou hints; 24 testes unitários; build de 23 páginas; 715 referências internas válidas; verificações de segurança e SEO aprovadas; quatro testes de Pages em 7,9s; 41 E2E aprovados e um ignorado em 31,8s. O teste ignorado continua sendo a varredura duplicada de telas maiores no projeto mobile.

O navegador da prévia local confirmou os cursores normal e clicável com hotspot 10×7, usando URLs locais em `/_astro/`. O SVG final respondeu HTTP 200 com `image/svg+xml`, e sua rasterização foi inspecionada visualmente. Touch e forced colors ficam fora da regra do cursor personalizado. Houve inspeção da Home, do PNG social e das capturas desktop/mobile. Não houve nova medição Lighthouse; os números históricos abaixo não descrevem uma nova auditoria. Log completo local: `.qa/validation-final-cursor.log`, ignorado pelo Git. A publicação remota usa o workflow manual existente e seus próprios checks.

No ajuste posterior solicitado pelo usuário, o halo do cursor sobre links e controles passou de azul para coral `#FF7864`. Foram repetidos build, formatação, links e segurança. A inspeção do DOM local não encontrou um overlay de cursor do site; as únicas setas de seleção presentes no conteúdo são as duas do menu de caminhos. O cursor CSS usa o mecanismo nativo do navegador e permanece nas coordenadas da tela durante o scroll com o mouse parado. A captura enviada pelo usuário não permite verificar movimento do mouse ou diagnosticar um eventual cursor preso no navegador interno.

No refinamento seguinte, o contorno branco da variante clicável também passou para `#FF7864`, mantendo o centro escuro. Build de 23 páginas, formatação e `git diff --check` aprovados; o SVG rasterizado foi inspecionado, e foi confirmada sua referência no CSS de produção. A alteração é exclusivamente visual; não foram criados novos testes para essa troca de cor. O workflow de publicação repete a validação completa antes de publicar.

## Teste inicial de azul noturno, creme e coral

Após a troca experimental de paleta, foram executados novamente `npm run lint` (aprovado), `npm run check` (67 arquivos, zero erros, avisos ou hints), `npm run build` (23 páginas) e `npm run test:e2e` (41 aprovados, um ignorado, zero falhas; 32,8s). O teste ignorado evita duplicar a varredura de telas maiores no projeto mobile. O axe não apontou violações WCAG A/AA nas 11 rotas verificadas em desktop e mobile; a suíte também cobriu navegação, filtros, carrossel, CSP e ausência de overflow entre 320 e 2560px. Isso não equivale a uma auditoria manual completa de acessibilidade.

A execução inicial do E2E não iniciou o servidor por restrição de escrita nos logs e registro globais do Wrangler. A repetição com acesso a esses diretórios concluiu com sucesso. Houve inspeção visual da Home local e captura mobile gerada pelo Playwright. O preview em `127.0.0.1:4321` foi atualizado com o novo build. Não houve nova medição Lighthouse, commit, push ou deploy dessa paleta. Os resultados abaixo descrevem as validações anteriores e não foram apresentados como novas medições.

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
| Pages (`npm run test:pages`)        | Build isolado de 23 páginas; 761 referências válidas; quatro testes de navegador aprovados em 7,9s |
| Playwright (`npm run test:e2e`)     | 41 aprovados, um ignorado, zero falhas; 30,4s                                                      |

O teste ignorado evita repetir, no projeto mobile, a varredura de telas maiores já executada pelo projeto desktop. Foram verificados Home, catálogo e página Soul Hackers em 320, 580, 768, 1024, 1440, 1920 e 2560px, além de navegação em páginas representativas, filtros combinados e persistência na URL, ordem editorial, teclado, FAQ, menu, 404 e funcionamento sem JavaScript. O carrossel foi testado com controles manuais, rotação, pausa e movimento reduzido. O axe verificou regras WCAG A/AA nas rotas representativas.

O navegador local dos testes foi o Microsoft Edge em modo headless. O Chromium baixado pelo Playwright não iniciou neste ambiente Windows (`spawn UNKNOWN`); GitHub Actions está configurado para usar Chromium no Linux. Os resultados remotos são independentes das medições locais apresentadas aqui.

O teste de SEO gera uma saída isolada em `.qa/seo/`, usando a origem reservada `https://kiryoshi.validation.test`. Verificou títulos e descrições únicos, canonicals e metadados absolutos, JSON-LD válido e exclusão de conteúdo demonstrativo do RSS e sitemap. Esse diretório não é publicado; `dist/` mantém a configuração segura sem domínio público.

`npm run deploy:check` concluiu o dry-run atualizado do Wrangler, sem bindings. Uma tentativa anterior não pôde gravar logs globais por restrição do sandbox; a execução com permissão para esses logs concluiu com código 0. Nenhum deploy na Cloudflare foi realizado. A auditoria `npm audit --json` da revisão de segurança retornou zero vulnerabilidades, incluindo desenvolvimento. O processador Sätteri existente foi declarado como dependência direta na mesma versão 0.4.5 para configurar o plugin nativo de caminhos; a instalação também retornou zero vulnerabilidades, sem novos pacotes. A instalação reproduzível com `npm ci` foi executada durante a implementação.

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

- A publicação no Pages é uma prévia temporária autorizada. HTTPS, recursos, navegação, CSP e status 404 precisam ser conferidos no endereço retornado pelo deploy. Os headers específicos do Cloudflare não são aplicados pelo Pages. Os resultados acima são de validação local; execuções do CI remoto são consultadas na aba Actions do repositório.
- Faltam domínio público, canais de contato/redes, vídeos publicados, dados confirmados de progresso e eventuais patches autorizados. Não existem pagamentos integrados.
- Os cinco projetos são configurações iniciais identificadas como exemplos; os três devlogs são exemplos editoriais sem datas de publicação inventadas.
- As capas fornecidas estão registradas em `docs/assets.md`; não há screenshots de traduções ou arquivos de jogos distribuídos.
- Testes automatizados e inspeção visual local não substituem testes com leitor de tela, dispositivos físicos e usuários.

## Versionamento no GitHub

O usuário autorizou o primeiro commit e envio do projeto em 22/10/2026. O destino inicial foi o repositório privado [Ygorfrc/kiryoshi-translations](https://github.com/Ygorfrc/kiryoshi-translations), na branch `main`. Arquivos `.env`, dependências, builds, logs e relatórios locais ficam fora do Git. O workflow de qualidade executa as verificações sem publicar o site ou acessar credenciais de deploy.

## Preparação do GitHub Pages

A tentativa inicial de habilitar Pages no repositório privado retornou HTTP 422. Após a preparação do workflow manual, o usuário autorizou explicitamente tornar o repositório público e publicar o site em 22/10/2026. O resultado da publicação e sua URL são confirmados pela execução GitHub Pages (manual) e pelo ambiente github-pages no GitHub. A publicação permanece manual, sem deploys por push.

Foram preparados `PUBLIC_BASE_PATH`, links de componentes e de conteúdo Markdown/MDX, metadados e imagens para o subdiretório. O build isolado `.qa/pages/` usa uma origem reservada e `noindex`, e nunca é publicado. O workflow Pages é somente manual, valida antes de gerar `dist-pages/` com URL/base reais lidas do GitHub e não faz deploy em pushes.

Os quatro testes adicionais passaram em desktop e mobile: navegação, carrossel, busca, imagem carregada, link Markdown, metadados com base, privacidade e feeds de prévia, além do bloqueio de JavaScript inline pela CSP meta sem header HTTP. A suíte principal continua validando os headers reais no emulador Cloudflare. O teste da busca detectou um problema no evento `change` ao perder foco, que podia interromper cliques em resultados; ele foi corrigido e recebeu cobertura nas duas suítes.

O Pages não aplica o arquivo `_headers`. A CSP meta deriva dele, excetuando `frame-ancestors`, que exige header HTTP; não foi alegada equivalência com todos os headers do Cloudflare. A política de privacidade do build Pages identifica o GitHub como hospedagem. A autorização explícita para habilitar o serviço, tornar o repositório público e publicar foi recebida; futuras alterações de automação continuam fora desse escopo.

## Atualização da capa e publicação autorizada

Em 22/10/2026, `images/Desu2.jpg` (1334×1334) substituiu a capa anterior por solicitação do usuário. A autorização também incluiu tornar público todo o repositório e publicar no GitHub Pages. A validação completa foi repetida com a nova imagem: 67 arquivos sem erros de tipos, 24 testes unitários, quatro testes de Pages e 41 testes da aplicação aprovados, com uma repetição de viewport ignorada conforme documentado. O primeiro teste do Pages encontrou o lock da prévia local aberta; a suíte passou a usar uma instância isolada com `--ignore-lock`, sem parar a prévia da pessoa usuária. A execução completa posterior terminou com código 0. Nenhum segredo foi identificado nos arquivos revisados; `.env`, caches, builds e relatórios continuam ignorados. O estado e a URL efetiva do deploy devem ser conferidos na execução manual do GitHub, sem alegar publicação com base apenas no commit.
