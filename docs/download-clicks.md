# Cliques em downloads

O site pode registrar cliques em “Baixar patch” no GoatCounter. O arquivo continua no Drive, MediaFire ou outro endereço HTTPS cadastrado na release. Não há banco, servidor ou painel próprio: os números são consultados no painel do serviço.

A conta **https://kiryoshi.goatcounter.com**, fornecida pelo responsável em 22/10/2026, está configurada em `site.downloadCounterUrl` de `src/config/site.ts`. Nenhum patch de exemplo foi publicado. Não há requisição ao serviço ao abrir uma página, nem contagem de visitas ou navegação. A configuração local não significa que esta versão já foi publicada no GitHub Pages.

## Configurar ou trocar a conta

1. Crie sua própria conta no [GoatCounter](https://www.goatcounter.com/) e mantenha o painel privado nas configurações de acesso. O serviço oferece hospedagem gratuita; confira as condições vigentes ao cadastrar-se.
2. Copie apenas o endereço público HTTPS da conta. Não forneça senha ou chave de API ao site.
3. Em `public/_headers`, acrescente **somente a origem exata dessa conta** à diretiva `connect-src`, após `'self'`. Preserve todas as outras diretivas. Não libere curingas, scripts externos ou `unsafe-inline` em scripts.
4. Atualize `site.downloadCounterUrl` em `src/config/site.ts`. Esse endereço público acompanha o repositório e é usado nos builds locais e no workflow manual do Pages. Opcionalmente, `PUBLIC_DOWNLOAD_COUNTER_URL` no ambiente de build substitui essa configuração; um valor explicitamente vazio desativa a coleta. Não é necessário criar uma variável no GitHub para a conta atual.
5. Execute as validações e refaça o build. A política de privacidade passa a descrever a integração automaticamente. Publique pelo fluxo manual autorizado quando estiver pronto.

O build rejeita uma conta inválida ou cuja origem não esteja na CSP. No Pages, a mesma política é aplicada pela meta CSP; `_headers` não é interpretado pelo GitHub. As variáveis são aplicadas no build, não em runtime.

Para desligar permanentemente, remova `downloadCounterUrl` de `site.ts` e qualquer variável de ambiente que o substitua, retire a origem da CSP e gere/publique outro build. Para uma prévia local sem coleta, use `PUBLIC_DOWNLOAD_COUNTER_URL=` no `.env`. O histórico já registrado permanece sob gestão da sua conta no serviço.

## Registrar um patch

Cadastre uma release autorizada normalmente, conforme [Configurar downloads](../README.md#configurar-downloads). Não é necessário alterar o componente a cada versão. O botão recebe os identificadores da tradução e da versão automaticamente.

No painel, os eventos têm a forma `download:SLUG:VERSÃO`. Consulte o **total de eventos/cliques**, e não visitantes únicos. Não existe contador público na interface. O identificador enviado não contém o endereço do arquivo ou seus parâmetros de compartilhamento.

Quando existe `target`, o rótulo do evento inclui a variante: `download:soul-hackers:v38 · Azahar` ou `download:soul-hackers:v38 · Luma3DS`. Em cada variante, Google Drive e MediaFire somam no mesmo evento: um clique em qualquer um dos dois botões conta uma vez. Clicar nos dois conta dois cliques. Os links e instruções fornecidos para a prévia v38 foram cadastrados em 23/10/2026; isso não significa que a atualização já foi publicada. Veja [verificação dos pacotes](downloads.md).

## O que o número representa

- Cliques registrados no botão do site, incluindo cliques repetidos. Não confirma transferência concluída nem representa pessoas únicas.
- Downloads pelo link direto, fora do site, não entram na contagem.
- JavaScript desativado, bloqueadores, falhas de rede, Do Not Track ou Global Privacy Control podem impedir o registro. O link continua funcionando.
- Não há cookies, armazenamento local, identificação persistente ou scripts de terceiros nesta integração. Como destinatário da conexão, o provedor recebe dados técnicos como IP e agente do navegador; consulte sua política de privacidade.

## Painel sem dados

Abrir a página não envia nenhum evento. Em 23/10/2026, o responsável confirmou que apenas havia aberto a página ao ver “No data received”; isso é esperado para esta integração de cliques. Para verificar, clique em um botão “Baixar” da versão atualizada e atualize o painel após alguns segundos. O serviço informa atualização das estatísticas a cada dez segundos na [FAQ](https://www.goatcounter.com/help/faq). A versão publicada só contará esses cliques depois que a atualização for publicada; builds locais e serviços de hospedagem são instâncias distintas.

Se o painel continuar vazio após clicar, verifique a configuração do endpoint/CSP e as preferências de privacidade do navegador. Não contorne bloqueadores, DNT ou GPC. Confirme o e-mail quando solicitado pelo painel, sem presumir que esse aviso explique sozinho a ausência de dados.

O evento usa uma requisição independente que não bloqueia a navegação. Não há tentativas de contornar bloqueadores ou rastrear a pessoa. Os testes simulam o provedor localmente; não fazem requisições de contagem reais. A recepção no painel deverá ser conferida após configurar uma conta real.

Referências: [endpoint de coleta](https://www.goatcounter.com/help/pixel), [eventos](https://www.goatcounter.com/help/events), [implementação oficial do parâmetro de eventos sem sessão](https://github.com/arp242/goatcounter/blob/main/public/count.js) e [privacidade do provedor](https://www.goatcounter.com/help/privacy).
