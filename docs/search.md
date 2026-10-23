# Indexação e Search Console

Em 23/10/2026, o responsável aprovou a preparação e publicação do site para buscas como “Soul Hackers tradução PT-BR”, além do cadastro no Google Search Console. A origem é `https://kiryoshitranslations.com.br`, com base `/`.

## Conteúdo aprovado

- A publicação manual Pages usa `PUBLIC_NOINDEX=false`.
- Soul Hackers usa `example: false`, título com tradução PT-BR e plataforma, e descrição que informa a prévia para Azahar/Luma3DS.
- O projeto continua em desenvolvimento, com prévias parciais sem acentos. Progresso, instruções, créditos e links não foram alterados para sugerir uma tradução completa.
- Os outros quatro projetos continuam com `example: true`; os três artigos continuam com `demo: true`. Permanecem com noindex e fora do sitemap/RSS.
- O índice do devlog e suas categorias ficam com noindex quando não têm artigos reais; categorias vazias ou apenas demonstrativas não entram no sitemap.
- Sem origem pública, o build continua seguro: noindex, robots bloqueado e sitemap vazio. `PUBLIC_NOINDEX=true` também continua disponível para prévias; os testes isolados de Pages mantêm essa configuração.

## Verificação e envio ao Google

1. Entre no Search Console na conta do responsável e adicione uma propriedade de **Domínio** para `kiryoshitranslations.com.br`.
2. Use o TXT realmente fornecido pelo Google. No Registro.br, adicione-o na raiz, com o campo Nome vazio; preserve os quatro registros A e o CNAME `www` existentes.
3. Após a propagação, use **Verificar** no Search Console. Mantenha o TXT para verificações futuras. A verificação do Google é independente da verificação de domínio do GitHub.
4. Após o deploy indexável, envie `https://kiryoshitranslations.com.br/sitemap.xml` em **Sitemaps**.
5. Inspecione `https://kiryoshitranslations.com.br/traducoes/soul-hackers/`, execute o teste ao vivo e solicite indexação. Faça o mesmo para a Home se necessário.
6. Acompanhe os relatórios de indexação e desempenho. Uma solicitação aceita não comprova que a página já entrou no índice ou que terá determinada posição.

Não é necessário instalar Analytics, pixels ou scripts Google no site para usar a verificação DNS do Search Console. Não há novos cookies, coleta de visitas ou alteração no contador de cliques por causa desse cadastro. Credenciais e códigos de login não entram no repositório. O TXT de verificação fica na zona DNS.

### Alternativa enquanto o verificador DNS propaga

O TXT foi salvo na raiz e conferido nos resolvedores públicos do Google e Cloudflare, mas o verificador do Search Console ainda retornou ausência do registro nas primeiras tentativas. Foi adicionada também a propriedade de prefixo `https://kiryoshitranslations.com.br/`, usando a alternativa **Tag HTML** fornecida pelo próprio Google. O token público real fica em `site.googleSiteVerification`, validado por schema e renderizado como metatag pelo SEOHead. Ele não é script, cookie, senha ou chave de API e deve ser preservado após a verificação. Não foi criado arquivo HTML de verificação ou página adicional; a metatag mantém o site inteiramente estático. A propriedade de domínio pode ser confirmada pelo TXT quando o verificador reconhecer a propagação.

Durante a espera da publicação complementar, o verificador DNS passou a reconhecer o TXT. A propriedade de prefixo HTTPS foi confirmada pelo método **Provedor do nome de domínio**, com a mensagem “Propriedade verificada”. Portanto a verificação efetivamente concluída usou DNS; a metatag preparada funciona como alternativa, sem substituir o TXT. O sitemap foi enviado nessa propriedade e o Google exibiu **Processado**, com **8 páginas encontradas**. O teste ao vivo de Soul Hackers retornou **O URL está disponível para o Google** e **É possível indexar a página**, com um item de breadcrumb válido. Isso confirma elegibilidade técnica, sem comprovar inclusão nos resultados.

As solicitações de indexação de **Soul Hackers** e da **Home** foram aceitas, com a mensagem **Indexação solicitada** e inclusão em fila de rastreamento prioritário. Foi feita somente uma solicitação por URL; não repetir para tentar ganhar prioridade. Na inspeção inicial, ambas estavam detectadas e ainda não indexadas. Nenhuma posição, prazo ou inclusão efetiva nos resultados foi presumida. Capturas locais de QA, fora do Git: `.qa/search-console-sitemap.png` e `.qa/search-console-soul-hackers-solicitado.png`.

**Estado final confirmado:** a propriedade de domínio `sc-domain:kiryoshitranslations.com.br` também ficou acessível e suas Configurações exibiram **Você é um proprietário verificado**. O mesmo sitemap aparece nessa propriedade como **Processado**, com oito páginas; não houve segundo envio ou nova solicitação das mesmas URLs. Captura final: `.qa/search-console-domain-sitemap.png`. A propriedade de prefixo HTTPS também foi mantida.

A metatag alternativa foi publicada no commit `db56b0860203b1dfa131f7dba8c7f23d177ee17c`, execução [40016448715](https://github.com/Ygorfrc/kiryoshi-translations/actions/runs/40016448715), com build, validação completa e deploy aprovados. Uma execução anterior foi cancelada antes do deploy para corrigir formatação; não houve publicação com falha conhecida. A execução final demorou na instalação do navegador de testes, mas concluiu com sucesso. A checagem pública confirmou a metatag real, robots, sitemap e os estados de indexação; Edge aprovou Home, catálogo, Soul Hackers e 404 em 1440px e 360px, com imagens, canonicals e quatro links de download preservados. Os testes não enviaram cliques reais ao contador.

## Links nos posts existentes

Texto sugerido para o responsável acrescentar aos próprios posts públicos, onde as regras da comunidade permitirem:

> Atualizações, progresso e downloads da tradução estão na página do projeto: https://kiryoshitranslations.com.br/traducoes/soul-hackers/
>
> A tradução está em desenvolvimento. Já existe uma prévia parcial para Azahar e Luma3DS, com instruções e limitações descritas na página.

Não foram editados posts de Facebook ou Reddit nesta etapa. Não foram fornecidos os endereços específicos dessas publicações. Evite chamar o patch de tradução oficial do jogo ou prometer uma posição na busca.

## Validação

`npm run test:seo` gera um build reservado em `.qa/seo/` com indexação habilitada somente para QA. Confere a inclusão de Soul Hackers, a exclusão de exemplos e arquivos sem artigos reais, robots, canonicals, metadados e RSS. `npm run test:pages` continua verificando o comportamento de prévia no subdiretório. Artefatos `.qa/` nunca são publicados.

Referências: [guia de SEO do Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [verificação de propriedade](https://support.google.com/webmasters/answer/9008080?hl=pt-BR) e [solicitação de rastreamento](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).
