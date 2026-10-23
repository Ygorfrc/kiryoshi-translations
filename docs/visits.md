# Visitas e estimativas de visitantes

Em 23/10/2026, o responsável autorizou acrescentar visitas às páginas à conta GoatCounter existente. O site permanece SSG, com um script local e uma requisição independente por carregamento visível. Não há SDK remoto, backend, cookies, armazenamento local ou identificador persistente criado no navegador.

## Consultar o painel

Entre em [kiryoshi.goatcounter.com](https://kiryoshi.goatcounter.com). Selecione o período desejado. Caminhos como `/` e `/traducoes/soul-hackers/` representam páginas; `download:soul-hackers:...` são cliques e têm a indicação **event**. Use o filtro de caminhos para consultar páginas ou eventos separadamente. Não interprete o total misturado como pessoas e não some visitantes de páginas diferentes como visitantes únicos do site.

As sessões estavam ativas em **Settings → Data collection → Sessions** na inspeção autenticada de 23/10/2026; o painel estava privado e **Individual pageviews** desativado. Foi atualizado somente **Your site** para `https://kiryoshitranslations.com.br`, com confirmação “Saved!”. Não foram alteradas permissões, retenção ou outras categorias de dados. O e-mail da conta ainda pede verificação pelo responsável.

O provedor agrupa visitas usando IP/agente do navegador temporariamente em memória, por até oito horas. Uma recarga pode ser agrupada; troca de dispositivo, rede ou janela temporal pode resultar em outra sessão. Isso é uma estimativa, não uma contagem exata de pessoas. Não recupera acessos anteriores à ativação. Cliques mantêm `e=true` e `ns=true`, sem agrupamento, independentemente das sessões das visitas.

## Configuração

- Conta compartilhada: `site.downloadCounterUrl`; `PUBLIC_DOWNLOAD_COUNTER_URL` substitui o endereço e, quando explicitamente vazio, desativa visitas **e** cliques.
- Visitas: `site.visitCounterEnabled: true`; `PUBLIC_VISIT_COUNTER_ENABLED=true|false` substitui a opção. Vazio equivale a false. Valores inválidos falham no build.
- Coleta de visitas exige produção, `PUBLIC_SITE_URL`, `PUBLIC_NOINDEX` diferente de true e origem do navegador exatamente igual à origem configurada. Dev, preview no localhost, QA em outra origem e builds de prévia não enviam visitas.
- Refazer o build e publicar manualmente após mudanças. O workflow Pages continua exclusivamente manual. CSP existente permite somente a conta exata em `connect-src`; não libera scripts externos.

`VisitCounter.astro` no layout global envia caminho e título **estáticos**, sem query, hash, origem da visita, tamanho de tela ou URL de download. O 404 usa `/404/`, sem transmitir o endereço desconhecido digitado pelo visitante. A requisição omite credenciais e Referer; o parâmetro aleatório serve apenas para evitar cache, não é reutilizado como identidade. A automação WebDriver é sinalizada como bot (`b=153`), como na integração oficial. Uma navegação interna por âncora não dispara outro acesso. Não há novas contagens no evento de restauração pelo cache de navegação.

DNT e GPC impedem as duas coletas. Bloqueadores, JavaScript desativado ou falhas de rede podem reduzir os números, sem prejudicar conteúdo ou links. Não há contorno dessas preferências. O provedor recebe IP/UA pela conexão e pode derivar navegador, sistema e localização aproximada conforme sua configuração; veja a política pública de privacidade do site. O link oficial “disable for this browser”, baseado em `count.js`, não é implementado pelo script local: use DNT/GPC ou desative a integração no build.

## Validação

Vitest verifica privacidade e formato das requisições. Playwright intercepta o provedor para verificar uma visita sem parâmetros privados, separação dos cliques, DNT/GPC, desativação, origem incorreta, prévia local e falhas de rede. Testes não geram visitas reais. Receber um GIF HTTP 200 confirma transporte; somente a inspeção do painel confirma armazenamento. Consulte os resultados efetivamente medidos em [validação](validation.md).

Referências: [endpoint oficial](https://www.goatcounter.com/help/pixel), [sessões e visitantes](https://www.goatcounter.com/help/sessions), [privacidade](https://www.goatcounter.com/help/privacy) e [implementação oficial](https://github.com/arp242/goatcounter/blob/main/public/count.js).
