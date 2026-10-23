# Domínio próprio

Domínio solicitado pelo responsável em 23/10/2026: **kiryoshitranslations.com.br**, como endereço principal sem `www`. O provedor DNS identificado publicamente é Registro.br (`a.auto.dns.br` e `b.auto.dns.br`). A hospedagem continua no GitHub Pages do repositório `Ygorfrc/kiryoshi-translations`.

## Configuração DNS

Na zona DNS do Registro.br, cadastre estes registros. O campo raiz pode aparecer vazio ou como `@`, conforme a interface. Preserve registros de e-mail e outros serviços existentes.

| Tipo  | Nome | Valor             |
| ----- | ---- | ----------------- |
| A     | @    | 185.199.108.153   |
| A     | @    | 185.199.109.153   |
| A     | @    | 185.199.110.153   |
| A     | @    | 185.199.111.153   |
| CNAME | www  | ygorfrc.github.io |

O CNAME não inclui protocolo, barra ou nome do repositório. Não troque os servidores DNS: os registros são inseridos na zona já existente. A propagação e a emissão do certificado são verificações separadas; cadastrar registros não confirma que HTTPS já esteja pronto.

## GitHub Pages e build

1. Em **Settings → Pages → Custom domain**, configure `kiryoshitranslations.com.br` quando o DNS estiver pronto para o corte. O domínio altera o destino do endereço antigo, portanto coordene a mudança com a configuração DNS.
2. O workflow manual usa `actions/configure-pages@v5` para obter o host e a base reais do Pages. A origem dos metadados é sempre `https://` mais o host retornado, inclusive enquanto a API informa HTTP durante a emissão inicial do certificado. Isso não ativa HTTPS no serviço nem dispensa a conferência do certificado. Com domínio próprio, a origem será `https://kiryoshitranslations.com.br` e a base será `/`, sem `/kiryoshi-translations/`. Não fixe o subdiretório antigo em links ou imagens.
3. Execute **GitHub Pages (manual)** na branch `main`. Publique somente `dist-pages/` gerado com essa configuração; não publique `.qa/`.
4. Confira os registros DNS, a emissão do certificado e **Enforce HTTPS**. Se o certificado ainda estiver em processamento, aguarde e verifique novamente; não desative validação de certificados para simular sucesso.
5. Confira Home, catálogo, downloads, guias, imagens, canonical, CSP e 404 no domínio novo. Verifique também o redirecionamento do endereço antigo e de `www`.

Como o Pages usa GitHub Actions, um arquivo `CNAME` no build não é necessário e não substitui a configuração do domínio no serviço. A origem do deploy é lida do próprio GitHub, evitando duplicar configurações no workflow. `.env.example` contém os valores do domínio real para builds locais; não altera o serviço por si só.

A ativação inicial manteve `PUBLIC_NOINDEX=true` e as flags editoriais. Posteriormente, em 23/10/2026, o responsável aprovou explicitamente liberar as páginas reais para os buscadores: a publicação Pages passou a `PUBLIC_NOINDEX=false` e apenas Soul Hackers passou a `example: false`. Os demais exemplos continuam fora da indexação. Consulte `search.md`. O contador GoatCounter permanece na mesma conta e os eventos não dependem do domínio do site; não há necessidade de trocar sua URL de coleta.

## Ativação e verificações

Em 23/10/2026, as consultas DNS por HTTPS retornaram o domínio registrado, com NS do Registro.br, mas sem A/AAAA no domínio raiz e sem CNAME/A em `www`. A consulta DNS nativa do ambiente recusou conexões e não foi usada como evidência de inexistência do domínio. A configuração inicial do Pages ainda estava no endereço `https://ygorfrc.github.io/kiryoshi-translations/`, sem domínio personalizado.

Após autenticação feita pelo próprio responsável, o modo avançado do DNS foi habilitado para permitir os quatro registros A e o CNAME. O Registro.br entrou em transição e bloqueou temporariamente a inclusão dos registros, mostrando “Domínio em transição. Por favor, aguarde alguns minutos e tente novamente”. A zona ainda estava vazia. O painel também informou uma janela de aproximadamente duas horas para delegação de servidores externos; isso não confirma o momento exato em que o editor será liberado. Não foram alterados contatos, dados cadastrais ou servidores manualmente, nem cadastrados registros de outros serviços.

Após o término da transição, os quatro registros A e o CNAME `www` foram salvos no Registro.br e conferidos ao reabrir o editor. A consulta pública DNS por HTTPS confirmou todos os cinco registros. O domínio foi vinculado ao repositório pelo Pages, com `cname=kiryoshitranslations.com.br`. No primeiro retorno, o GitHub ainda não disponibilizava certificado e informava `https_enforced=false`; a exigência de HTTPS só deve ser ativada após confirmação do certificado. O deploy deve usar a origem HTTPS e base raiz. O build do domínio já foi validado localmente; os resultados estão em `docs/validation.md`.

A publicação manual [40011550895](https://github.com/Ygorfrc/kiryoshi-translations/actions/runs/40011550895), commit `fe1f76d403ceb4bd785639385ca17f7c768d7cc0`, terminou com sucesso, incluindo `npm run validate` e a validação do pacote na raiz. O domínio responde no Pages e o endereço github.io redireciona para ele. O primeiro teste de navegador público em HTTP encontrou imagens bloqueadas pela ausência do certificado, pois a CSP preserva `upgrade-insecure-requests`; essa proteção não foi relaxada.

Após vários minutos sem certificado, o responsável autorizou explicitamente remover e cadastrar imediatamente o mesmo domínio no Pages, conforme a orientação de troubleshooting do GitHub. O vínculo foi restabelecido e a checagem oficial passou a confirmar os dois nomes como válidos, servidos pelo Pages e elegíveis para HTTPS. A conclusão do certificado e o redirecionamento seguro permanecem sujeitos à verificação ao vivo.

**Estado final confirmado em 23/10/2026:** certificado `approved` para `kiryoshitranslations.com.br` e `www.kiryoshitranslations.com.br`, com validade informada até 21/01/2027 nesta emissão. Os dois nomes passaram em requisições HTTPS com validação TLS normal, sem ignorar erros. Somente após essa confirmação foi ativado `https_enforced=true` no Pages. A raiz HTTPS retornou 200; HTTP e `www` retornaram 301 para a raiz HTTPS. O endereço antigo github.io redireciona para o domínio próprio; uma resposta em cache ainda apontou para HTTP, que por sua vez redireciona para HTTPS.

O Edge headless validou o site real em HTTPS nas larguras 1440px e 360px: Home, catálogo, Soul Hackers e 404, com imagens, quatro links de download, canonicals, ausência de overflow e de erros de página. A inspeção visual no navegador também confirmou a Home com estilos e imagens carregados. A migração está concluída; os estados de certificado pendente descritos acima registram o histórico de provisionamento. A emissão e renovação são gerenciadas pelo GitHub Pages; não há certificado ou chave privada no repositório.

Referências: [domínio personalizado no GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) e [verificação de propriedade](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).
