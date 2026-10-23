# Validação local

## Remoção da seção de estatísticas — 23/10/2026

O responsável solicitou expressamente retirar o título “Estatísticas de uso” e todo o texto sobre o GoatCounter da página de privacidade. A seção e seus imports foram removidos, e a descrição SEO foi ajustada ao conteúdo restante. Os contadores continuam ativos; a documentação técnica foi preservada e não foi adicionada uma alegação de ausência de métricas.

Formatação, build de 23 páginas, 759 referências internas e segurança com 79 referências a scripts locais foram aprovados. Os dois E2E existentes da página passaram em desktop e mobile em 7,1s, incluindo acessibilidade e largura. Logs ignorados: `.qa/build-privacy-remove-stats.log` e `.qa/e2e-privacy-remove-stats.log`.

O workflow manual [40028547747](https://github.com/Ygorfrc/kiryoshi-translations/actions/runs/40028547747), commit `2c85fb861c6841937a2415f50a9b0c369e84fdf9`, aprovou a validação completa no CI e publicou com sucesso. A inspeção do domínio em 1440×1000 e 360×800 confirmou ausência de toda a seção e dos textos removidos, três títulos restantes, contador de visitas ativo, sem overflow ou erros de página. As requisições de QA foram interceptadas, sem registros reais no GoatCounter. Capturas ignoradas: `.qa/privacy-removed-{1440,360}.png`.

## Privacidade resumida — 23/10/2026

O responsável aprovou retirar o excesso de detalhes técnicos da página pública. O texto foi reduzido a navegação, estatísticas de uso, hospedagem e links externos/contato, preservando finalidade das métricas, GoatCounter, informações da conexão, sessões de até oito horas, DNT/GPC e ausência de cookies. O funcionamento dos contadores e a documentação técnica foram preservados.

Prettier, tipos (79 arquivos sem diagnósticos), build de 23 páginas, 759 referências internas e segurança com 79 referências a scripts locais foram aprovados. Os dois E2E existentes da página passaram em desktop e mobile em 7,2s, incluindo acessibilidade e largura. Logs ignorados: `.qa/check-privacy-short.log`, `.qa/build-privacy-short.log` e `.qa/e2e-privacy-short.log`.

O workflow manual [40025894328](https://github.com/Ygorfrc/kiryoshi-translations/actions/runs/40025894328), commit `75d5f46c465e48c929acf8516d497da119360902`, repetiu `npm run validate` no CI e concluiu a publicação com sucesso. No domínio real, Edge em 1440×1000 e 360×800 confirmou as quatro seções resumidas, ausência dos antigos detalhes de desenvolvimento, informações essenciais preservadas, sem overflow ou erros de página. Uma requisição do contador foi interceptada em cada viewport, sem enviar visitas de QA à conta. Capturas ignoradas em `.qa/privacy-short-{1440,360}.png`.

## Visitas no GoatCounter — 23/10/2026

O responsável ampliou o escopo de cliques para visitas às páginas. A integração usa script local, metadados estáticos e o endpoint existente, respeita DNT/GPC e omite cookies, referrer, query e hash. Origem exata, build de produção e ausência de modo prévia são obrigatórios. O painel autenticado confirmou sessões ativas, histórico de um clique Azahar e um Luma3DS, acesso privado e exportação de pageviews individuais desativada. Somente o endereço do site foi atualizado para o domínio próprio, com confirmação “Saved!”. Isso não comprova recepção das novas visitas antes da publicação.

A primeira validação restrita encontrou EPERM nos arquivos locais do Wrangler e a prévia de QA não encerrou automaticamente; apenas os processos de QA foram finalizados e a suíte foi repetida com as permissões locais necessárias. Os testes iniciais detectaram um erro no fixture: o Astro serializa atributos vazios sem `=""`, impedindo a ativação simulada. Corrigido o fixture, os 14 E2E específicos passaram em desktop e mobile, sem enviar coleta real. A implementação de produção não exigiu mudança para essa correção.

`npm run validate` concluiu com código 0: formatação aprovada, 79 arquivos sem diagnósticos de tipos, 33 testes unitários em seis arquivos, build de 23 páginas, 759 referências internas, segurança com 79 referências a scripts locais e SEO aprovados. O pacote Pages validou 805 referências e quatro E2E em 8,3s; a suíte principal passou 65 E2E em 1,3min, com uma repetição de viewport ignorada. Os 14 testes específicos também passaram isoladamente em 23,6s. Logs ignorados: `.qa/validate-visits-approved.log` e `.qa/e2e-visits-fixed.log`. Consulte [configuração e limites](visits.md).

O workflow manual [40022898949](https://github.com/Ygorfrc/kiryoshi-translations/actions/runs/40022898949), commit `6feb979e5319c617b2cd97e92f1414d6a12d34d6`, repetiu a validação completa no CI e concluiu build/deploy com sucesso. No domínio real, Edge em 1440×1000 e 360×800 confirmou uma requisição de visita por página na Home, Soul Hackers e privacidade; caminho correto, ausência de query/hash/referrer/cookies, sessões habilitadas no protocolo e sinalização de automação. A verificação preservou quatro links de download e indexação da Home, sem erros de página/CSP ou overflow. Todas as seis requisições foram interceptadas: **zero visitas de QA enviadas à conta real**. Capturas ignoradas: `.qa/visits-live-{1440,360}.png`; configuração autenticada em `.qa/goatcounter-settings-visits.png`. Isso confirma o código publicado e a emissão pelo navegador, sem alegar que essas visitas interceptadas foram armazenadas no painel. A conta ainda solicita confirmação de e-mail pelo responsável.

## Liberação editorial para buscadores — 23/10/2026

A publicação manual [40015420424](https://github.com/Ygorfrc/kiryoshi-translations/actions/runs/40015420424), commit `3f809ce9d0eab1f73250a3715ae8a23daa141593`, concluiu com sucesso. A checagem HTTP do domínio real confirmou Home e Soul Hackers com `index, follow`, as quatro páginas planejadas e arquivos demonstrativos conferidos com `noindex, nofollow`, canonicals corretos, robots liberado e sitemap com oito URLs aprovadas. Os quatro links de download e o endpoint GoatCounter foram preservados. O TXT de propriedade do Google foi salvo no DNS e encontrado nos resolvedores públicos Google/Cloudflare; o verificador do Search Console ainda não o reconheceu nas tentativas iniciais, motivando a alternativa de metatag para a propriedade HTTPS.

Posteriormente, o Search Console confirmou a propriedade HTTPS pelo TXT, processou o sitemap com oito páginas e aprovou o teste ao vivo de Soul Hackers como disponível e indexável, incluindo breadcrumb válido. As solicitações de indexação de Soul Hackers e da Home foram aceitas em fila prioritária, uma vez por URL. Isso não equivale a indexação concluída ou posição garantida na busca. A metatag alternativa foi validada localmente por tipos (74 arquivos, sem diagnósticos), build SEO de 23 páginas e checker de segurança/SEO; resultados finais do deploy complementar são registrados em `docs/search.md`.

O deploy complementar [40016448715](https://github.com/Ygorfrc/kiryoshi-translations/actions/runs/40016448715), commit `db56b0860203b1dfa131f7dba8c7f23d177ee17c`, concluiu com sucesso, incluindo `npm run validate` no CI. A metatag foi conferida no HTML público. Os checks finais validaram dez rotas públicas quanto a canonical/indexação, robots e sitemap com oito URLs; o Edge aprovou Home, catálogo, Soul Hackers e 404 em 1440px e 360px, sem overflow, imagens quebradas ou erros de página, preservando quatro links de download. A propriedade de domínio completo no Search Console também exibiu proprietário verificado e sitemap processado com oito páginas. Uma execução anterior foi cancelada antes do deploy para corrigir uma formatação detectada; a verificação posterior passou. Não foram editadas publicações externas nem alegados resultados de ranking.

O responsável aprovou liberar as páginas reais para indexação e cadastrar o domínio no Search Console. Soul Hackers passou a `example: false`, com título que inclui PT-BR e Nintendo 3DS e descrição da prévia Azahar/Luma3DS. Status, progresso, limitações, downloads e créditos foram preservados. O workflow manual passou a `PUBLIC_NOINDEX=false`. Os quatro planejados, os três devlogs demonstrativos e os arquivos de devlog sem artigos reais continuam com noindex e fora do sitemap. RSS permanece sem itens inventados.

`npm run validate` concluiu com código 0: 74 arquivos sem erros de tipos; 30 testes unitários em cinco arquivos; 23 páginas; 736 referências internas; segurança em 23 páginas e 56 referências a scripts locais; SEO aprovado com novas asserções de inclusão/exclusão; QA Pages com 782 referências e quatro E2E em 8,4s; 51 E2E principais aprovados em 45,8s e uma repetição de viewport ignorada. O QA de SEO força origem reservada, base raiz e indexação habilitada, sem depender das variáveis do shell. O QA Pages continua em modo prévia, cobrindo o subdiretório. Log ignorado: `.qa/validate-indexing.log`. Resultados de publicação e Search Console são documentados separadamente em `docs/search.md`; esses testes não comprovam indexação pelo Google.

## Barras de progresso de Soul Hackers — 23/10/2026

O responsável informou extração 100%, tradução 79,59% e reinserção 79,59%. Os valores foram cadastrados por etapa, mantendo revisão fina e testes completos sem valor informado e sem calcular conclusão geral. Home e barras exibem percentuais em pt-BR; os elementos nativos preservam `79.59` numericamente e oferecem `79,59%` como texto acessível. Os metadados Atlus, gênero e data solicitados anteriormente foram preservados.

`npm run validate` concluiu com código 0: formatação e tipos aprovados em 74 arquivos; 30 testes unitários; build de 23 páginas; 736 referências internas; segurança e SEO aprovados; quatro E2E Pages em 8,6s, com 782 referências no pacote de QA; 51 E2E principais em 54,3s e uma repetição de viewport ignorada. Os testes conferem as três barras, valores decimais e os dois estados desconhecidos, além de navegação, responsividade e acessibilidade. Log: `.qa/validate-progress-release.log`.

## Metadados de Soul Hackers — 23/10/2026

Por solicitação do responsável, o projeto recebeu desenvolvedora Atlus, publicadora Atlus, gênero “RPG / Dungeon Crawler” e atualização editorial `2026-10-23`. A formatação foi aprovada e o build gerou 23 páginas com sucesso. A inspeção do HTML confirmou os quatro campos, com a data de 23 de outubro de 2026 preservada em UTC. Nenhum percentual, status ou data de lançamento foi alterado. Log: `.qa/build-soul-metadata.log`.

## Validação para publicação autorizada — 23/10/2026

O responsável solicitou o envio das alterações pendentes ao GitHub. A versão reúne os downloads Soul Hackers v38 para Azahar/Luma3DS com Drive principal e MediaFire alternativo, contador de cliques GoatCounter, guia após “Antes de instalar” e remoção do SHA-256 da interface.

`npm run validate` terminou com código 0: formatação aprovada; Astro/TypeScript em 74 arquivos sem diagnósticos; 29 testes unitários; 23 páginas geradas; 736 referências internas válidas; segurança e SEO aprovados; Pages com 782 referências e quatro E2E em 17,5s; suíte principal com 51 E2E aprovados em 1,0min e uma repetição de viewport ignorada. Log: `.qa/validate-v38-publish.log`. O envio deve incluir somente fontes e documentação, sem ZIPs, `.qa/`, builds ou credenciais. O workflow Pages permanece manual; seu resultado e a versão servida devem ser conferidos no GitHub antes de afirmar que a atualização está publicada.

## Verificação de comunicação real — 23/10/2026

Ao relatar o painel vazio, o responsável confirmou ter apenas aberto a página, sem clicar em downloads. Isso não dispara eventos pela especificação da integração. Nenhuma contagem automática de visitas foi adicionada.

Foi feito um único clique de diagnóstico em Edge headless sobre a prévia local, com a navegação ao Drive interceptada e o evento substituído por `diagnostico:contador`, título “Diagnóstico de integração — não é download”. A requisição real à conta GoatCounter respondeu HTTP 200 com `image/gif`, sem erros de navegador ou CSP. Os quatro botões e o endpoint correto estavam presentes. Esse resultado confirma a comunicação, não o armazenamento ou a exibição no painel privado; o serviço pode filtrar navegadores automatizados. O evento não foi enviado com o identificador dos downloads. Nenhum patch foi baixado nessa verificação e nenhum deploy foi realizado.

## Remoção do SHA-256 da interface — 23/10/2026

Por solicitação do responsável, o SHA-256 saiu dos cards e da menção no guia público; os hashes verificados permanecem nos metadados e na documentação interna do repositório. A configuração GoatCounter e os quatro botões foram preservados. O contador registra eventos para consulta no painel externo, sem número público na interface.

Formatação, build de 23 páginas, 736 referências locais, segurança e dez E2E de downloads/contador (19,3s) passaram. A inspeção do HTML confirmou ausência de “SHA-256”, quatro botões e o endpoint da conta configurada. Os testes interceptaram a coleta e não confirmam a recepção no painel real. Não houve publicação. Log do build: `.qa/build-hide-checksum.log`.

## Ordem do guia de instalação — 23/10/2026

O guia de Soul Hackers foi movido para a collection `installationGuides` e vinculado pelo campo `installationGuide`. O HTML segue a ordem “Antes de instalar” → “Aplicação do patch” → “Instalar no Azahar” → “Instalar no Luma3DS” → “Remover ou voltar à versão anterior”. As âncoras dos downloads foram preservadas. Não há duplicação dos passos na apresentação do projeto.

Foram aprovados: Prettier; Astro/TypeScript em 74 arquivos sem diagnósticos; 29 testes unitários; build de 23 páginas; 736 referências locais; segurança com 56 referências a scripts locais; dez E2E de downloads/contador em 17,2s, incluindo a ordem dos títulos e sua localização dentro de `#instalacao`; quatro testes Pages em 9,8s. A suíte completa não foi repetida nesta reorganização. Os testes não enviam cliques reais e nenhum deploy foi realizado. Logs de check/build e Pages estão em `.qa/*-installation-order.log`.

## Downloads Soul Hackers v38 — 23/10/2026

Foram cadastrados os dois pacotes fornecidos pelo usuário, Azahar e Luma3DS, com Google Drive principal, MediaFire alternativo e contagem em todos os quatro botões. `LEIA-ME.txt` e `V38_CHANGELOG.md` fundamentam os requisitos USA/Title ID e os tutoriais específicos. Cada par de provedores foi baixado e comparado por tamanho e SHA-256, com identidade confirmada; detalhes em [downloads cadastrados](downloads.md). Nenhum arquivo dos ZIPs foi executado ou incluído no Git/build. A data de upload não foi convertida em data de lançamento; o projeto continua em desenvolvimento e os pacotes são identificados como prévias parciais.

`npm run validate` concluiu com código 0: Prettier aprovado; 74 arquivos sem erros, avisos ou hints de Astro/TypeScript; 29 testes unitários; 23 páginas geradas; 736 referências internas válidas; segurança e SEO aprovados; build Pages com 782 referências e quatro testes aprovados em 13,1s; suíte principal com 51 E2E aprovados em 1,1min e uma repetição de viewport ignorada. Log: `.qa/validate-v38-downloads.log`.

Os testes de downloads abrem os quatro botões em destinos interceptados localmente, confirmam a prioridade dos provedores, a contagem por versão/variante e as âncoras de instalação. Não geram eventos reais no GoatCounter. A suíte também verifica falha de rede sem bloquear navegação, GPC, responsividade, teclado, WCAG A/AA e conteúdo sem JavaScript. A inspeção visual adicional confirmou dois cards sem overflow em 320px e 1440px; capturas em `.qa/v38-downloads-{mobile,desktop}.png`. A prévia local foi reiniciada em `127.0.0.1:4321` para essa inspeção. Nenhum commit, push ou deploy foi executado; a recepção no painel real e o funcionamento do patch no jogo não foram medidos.

## Conta GoatCounter fornecida pelo responsável

O usuário forneceu `https://kiryoshi.goatcounter.com`, agora configurada em `site.downloadCounterUrl`. O build usa essa conta quando não há override de ambiente; um override explicitamente vazio continua desativando a coleta. A CSP libera somente essa origem em `connect-src`, preservando scripts locais, e a privacidade passa a descrever a integração. Os testes simulam o provedor sem registrar eventos reais. Ainda não há patches ou botões reais de download; não houve commit, envio ou publicação nesta alteração. A recepção no painel real e as permissões de acesso a ele não foram verificadas.

`npm run validate` foi repetido com a conta configurada e concluiu com código 0: formatação aprovada; 73 arquivos sem diagnósticos Astro/TypeScript; 28 testes unitários; 23 páginas geradas; 733 referências locais válidas; segurança e SEO aprovados; Pages com 779 referências e quatro testes em 9,9s; suíte principal com 49 E2E aprovados em 51,3s e uma repetição de viewport ignorada. A inspeção do HTML confirmou o endpoint `/count` da conta fornecida e a seção de privacidade ativa. Log local: `.qa/validate-goatcounter-account.log`.

## Contador opcional de cliques em downloads

Na primeira preparação, anterior ao fornecimento da conta acima, a integração GoatCounter estava desativada: nenhuma conta conectada e nenhum patch cadastrado. Não houve publicação nessa etapa. Consulte [configuração e limites](download-clicks.md).

`npm run validate` terminou com código 0: Prettier aprovado; Astro/TypeScript sem erros, avisos ou hints em 73 arquivos; 28 testes unitários em cinco arquivos; build de 23 páginas; 733 referências internas válidas; segurança com 56 referências a scripts locais; SEO aprovado. O build de QA Pages validou 779 referências e quatro testes de navegador em 9,4s. A suíte principal aprovou 49 E2E em 57,9s, com uma repetição de viewport ignorada. Log local: `.qa/validate-download-counter.log`.

O provedor foi simulado somente nas respostas dos testes, sem enviar eventos reais. A cobertura verifica ausência de coleta automática, configuração desativada, clique com navegação preservada, ausência de cookies/referrer, falha de rede e Global Privacy Control, em desktop e mobile. A recepção e os totais no painel real ainda dependem da conta e deverão ser conferidos após ativação. Nenhuma medição Lighthouse nova foi feita nesta alteração.

Após ajustar o parâmetro de eventos sem sessão para contar cliques repetidos separadamente, os 28 testes unitários, o build e os oito testes específicos do contador foram executados novamente e passaram (E2E em 9,0s). O teste confirma dois eventos com identificadores de requisição diferentes ao clicar duas vezes, sem armazenamento persistente.

## Validação completa para publicar os rótulos

Após autorização para enviar os ajustes ao GitHub, `npm run validate` concluiu com código 0: formatação e tipos aprovados (68 arquivos); 24 testes unitários; build de 23 páginas; 728 referências internas válidas; segurança e SEO aprovados; quatro testes de Pages em 6,6s; 41 E2E em 31,4s, com um ignorado por duplicar a varredura desktop. O build isolado do Pages validou 774 referências. Log local: `.qa/validation-labels-release.log`.

O envio reúne a legenda apenas com o crédito da arte, o rótulo “MISSÃO ATUAL” ampliado e o numeral 3 de 3DS vermelho nos textos visuais da interface. O workflow de publicação permanece manual e repete as verificações antes do deploy.

## Legenda, missão atual e numeral vermelho de 3DS

A pedido do usuário, a legenda do banner passou a exibir somente “Arte: Index Corp. / ATLUS”; a procedência da edição continua documentada em `docs/assets.md`. “MISSÃO ATUAL” aumentou de 0,49rem para 0,72rem, com ícone de 18px. O novo componente Astro `PlatformText` destaca o 3 de 3DS em vermelho nos rótulos visuais e menções relevantes, com variantes para fundos claros/escuros. Dados, metadados e opções nativas dos filtros mantêm texto simples. Os avisos sobre auxílio de IA na tradução e revisão humana foram preservados.

Validação local: Astro/TypeScript com 68 arquivos e zero erros, avisos ou hints; build de 23 páginas; 728 referências internas válidas; formatação e `git diff --check` aprovados. A suíte existente de rotas, axe e larguras responsivas aprovou 23 testes em 22,8s; um foi ignorado por duplicar a varredura desktop. Não foi repetida a suíte completa. A inspeção do navegador confirmou o rótulo em 11,52px, a legenda atualizada e os vermelhos calculados em fundos claros e escuros. Nenhum commit, push ou deploy desta alteração. Log: `.qa/validation-platform-labels.log`.

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
- A ativação do domínio adquirido está documentada em `docs/domain.md`. Canais de contato/redes e vídeos publicados continuam pendentes. Soul Hackers já tem os dados de progresso confirmados e os patches parciais autorizados documentados em `docs/downloads.md`. Não existem pagamentos integrados.
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

## Validações adicionais e publicações autorizadas

### Preparação do domínio próprio — 23/10/2026

O build isolado `.qa/custom-domain/` foi gerado com `PUBLIC_SITE_URL=https://kiryoshitranslations.com.br`, base `/`, `PUBLIC_HOSTING=github-pages` e `PUBLIC_NOINDEX=true`. Foram geradas 23 páginas, com 782 referências internas válidas. A verificação de segurança aprovou as 23 páginas e 56 referências a scripts locais, sem JavaScript executável inline. As asserções de conteúdo confirmaram canonical da Home e de Soul Hackers no domínio novo, ausência do antigo subdiretório nos links internos, preservação do noindex, do endpoint GoatCounter e dos quatro botões reais de download. Isso valida o pacote; a ativação externa de DNS, certificado e publicação é registrada separadamente em `docs/domain.md`. Não houve alteração da aplicação, de dependências ou da automação manual de publicação.

Na prévia local desse pacote, o Edge headless validou Home, catálogo, Soul Hackers e 404 nas larguras de 1440px e 360px. Não foram encontrados erros de página, recursos internos com falha, imagens quebradas ou overflow horizontal nessas rotas. Os canonicals e os quatro links de download também foram conferidos sem enviar eventos reais ao contador. Uma primeira execução do script de QA usou um seletor inexistente; o seletor foi corrigido para o atributo real do componente e a execução completa passou.

### Publicação no domínio próprio

Na ativação externa, o DNS público confirmou os quatro registros A e o CNAME após gravação no Registro.br. O Pages aceitou o domínio personalizado. Como a API inicialmente informa a origem HTTP durante o provisionamento do certificado, o workflow passou a compor a origem HTTPS com o `host` real retornado por `configure-pages`; a base continua lida do serviço e a publicação continua exclusivamente manual. O parser da aplicação continua rejeitando origens HTTP. Essa adaptação não habilita nem comprova o certificado, verificado separadamente.

O workflow manual [40011550895](https://github.com/Ygorfrc/kiryoshi-translations/actions/runs/40011550895) concluiu build e deploy com sucesso no commit `fe1f76d403ceb4bd785639385ca17f7c768d7cc0`. A execução remota aprovou `npm run validate`, incluindo tipos, testes unitários, build, links, segurança, SEO e testes de navegador, além da validação do pacote com base raiz. Na primeira checagem pública, o domínio retornou HTTP 200 e github.io redirecionou para ele, mas HTTPS ainda apresentou `ERR_TLS_CERT_ALTNAME_INVALID`. O teste público em HTTP não foi considerado aprovado: a CSP atualiza recursos para HTTPS e as imagens aguardavam o certificado. Após reinício do vínculo autorizado explicitamente, a checagem oficial do GitHub aprovou o DNS dos dois nomes. A validação HTTPS é independente do sucesso do deploy e deve ser confirmada ao vivo.

O certificado foi posteriormente aprovado para raiz e `www`, e ambos passaram na validação TLS real. Após isso, `https_enforced=true` foi ativado e confirmado pela API do Pages. A raiz HTTPS retornou 200; HTTP e `www` redirecionaram para a raiz HTTPS com 301. O Edge headless aprovou as quatro rotas públicas em HTTPS nas larguras 1440px e 360px, com imagens, canonicals, quatro links de download e ausência de overflow e erros de página. A Home também foi inspecionada visualmente no navegador com estilos e imagens carregados. Essa validação substitui a pendência HTTPS registrada durante o provisionamento, sem alterar CSP, conteúdo ou flags de indexação.

### Publicação anterior da capa

Em 22/10/2026, `images/Desu2.jpg` (1334×1334) substituiu a capa anterior por solicitação do usuário. A autorização também incluiu tornar público todo o repositório e publicar no GitHub Pages. A validação completa foi repetida com a nova imagem: 67 arquivos sem erros de tipos, 24 testes unitários, quatro testes de Pages e 41 testes da aplicação aprovados, com uma repetição de viewport ignorada conforme documentado. O primeiro teste do Pages encontrou o lock da prévia local aberta; a suíte passou a usar uma instância isolada com `--ignore-lock`, sem parar a prévia da pessoa usuária. A execução completa posterior terminou com código 0. Nenhum segredo foi identificado nos arquivos revisados; `.env`, caches, builds e relatórios continuam ignorados. O estado e a URL efetiva do deploy devem ser conferidos na execução manual do GitHub, sem alegar publicação com base apenas no commit.
