# Kiryoshi Translations

**Traduzindo mundos. Conectando jogadores.**

Portal brasileiro independente de traduções gratuitas de JRPGs. O primeiro projeto é **Shin Megami Tensei: Devil Summoner – Soul Hackers**, para Nintendo 3DS. O site reúne catálogo, acompanhamento por etapa, devlog, informações do projeto e canais configuráveis.

O MVP funciona inteiramente como site estático. Não há autenticação, banco de dados, pagamentos ou serviços pagos obrigatórios. Não contém jogos, patches não autorizados, analytics nem embeds automáticos.

## Stack e decisões

- Astro **7.4.2** em SSG; TypeScript strict e `noUncheckedIndexedAccess`.
- Tailwind CSS **4**, com plugin oficial de Vite e tokens CSS centralizados.
- Astro Content Collections com schemas Zod; Markdown e MDX para publicações.
- Lucide para ícones; Space Grotesk variável auto-hospedada, com `font-display: swap` e subsets Unicode.
- Identidade de clube de fãs: verde petróleo, creme e âmbar; Header pixelado com Silkscreen local e elementos de UI inspirados abstratamente em JRPGs.
- TypeScript no cliente apenas para menu, filtros, carrossel acessível e compartilhamento. React não foi instalado porque nenhuma interação precisa de hidratação de framework.
- Vitest, Playwright com Edge/Chromium e axe para validação proporcional ao projeto.
- Cloudflare Workers **Static Assets** com Wrangler. Sem adaptador Cloudflare, SSR ou Worker JavaScript próprio.

Astro 6 foi avaliado, mas sua última versão disponível apresentou alertas na auditoria npm. A versão 7 estável, permitida pelo escopo, foi escolhida com integrações compatíveis. As dependências diretas são fixadas; `package-lock.json` permite instalação reproduzível com `npm ci`.

Documentação consultada: [Astro](https://docs.astro.build/en/install-and-setup/), [Astro 7](https://docs.astro.build/en/guides/upgrade-to/v7/), [Content Collections](https://docs.astro.build/en/guides/content-collections/), [Tailwind no Astro](https://docs.astro.build/en/guides/styling/), [Cloudflare Static Assets](https://developers.cloudflare.com/workers/static-assets/) e [Wrangler](https://developers.cloudflare.com/workers/wrangler/configuration/).

## Pré-requisitos e instalação

Use Node **24 LTS** (desenvolvimento validado em 24.13.0), npm 11 e Git. O requisito mínimo das dependências é Node 22.23.4; versões ímpares do Node não são recomendadas pelo Astro.

```sh
npm ci
npm run dev
```

Abra o endereço impresso, normalmente `http://127.0.0.1:4321`. A primeira instalação precisa de acesso ao registro npm. O wrapper `scripts/astro.mjs` desativa a telemetria do CLI Astro, sem alterar configurações globais.

## Comandos

| Comando                 | Função                                                                              |
| ----------------------- | ----------------------------------------------------------------------------------- |
| `npm run dev`           | Desenvolvimento com atualização automática                                          |
| `npm run check`         | Schemas das collections e diagnósticos Astro/TypeScript                             |
| `npm test`              | Funções de filtro, schemas e utilitários                                            |
| `npm run build`         | Gera `dist/` estático                                                               |
| `npm run preview`       | Serve o build localmente                                                            |
| `npm run test:links`    | Valida links, assets, âncoras, h1, idioma e rotas em `dist/`                        |
| `npm run test:seo`      | Build isolado em `.qa/seo/` para validar metadados com domínio reservado de teste   |
| `npm run test:security` | Verifica a CSP e ausência de JavaScript inline no build                             |
| `npm run test:e2e`      | Navegação, filtros, teclado, responsividade, axe e CSP no emulador Cloudflare local |
| `npm run lint`          | Convenções de formatação de todos os arquivos com Prettier                          |
| `npm run format`        | Aplica a formatação                                                                 |
| `npm run validate`      | Executa a sequência de validação completa                                           |
| `npm run deploy:check`  | Dry-run de empacotamento do Wrangler, sem publicar                                  |
| `npm run deploy`        | Faz build e publica; executar somente com autorização do responsável                |

O comando `lint` cobre formatação; diagnósticos estáticos e tipos são responsabilidade de `check`. Não há uma segunda camada redundante de linting de código.

## Estrutura

```text
public/                 Assets originais, favicon e headers do Cloudflare
images/                 Capas fornecidas pelo responsável pelo projeto
scripts/                CLI local, verificação de links e SEO
src/
  components/           Navegação, cards, progresso, filtros e seções
  config/               Dados públicos, rotas e validação da origem pública
  content/
    translations/       Um Markdown por projeto
    devlogs/            Markdown ou MDX por publicação
  content.config.ts     Loaders das Content Collections
  layouts/              Documento base com SEO e navegação
  lib/                  Schemas, filtros e funções compartilhadas
  pages/                Rotas Astro, XML e robots.txt estáticos
  styles/global.css     Tokens, componentes e breakpoints
tests/
  unit/                 Vitest
  e2e/                  Playwright + axe
.github/workflows/      CI de qualidade sem deploy automático
docs/                   Decisões e relatório de verificação
```

## Dados públicos e domínio

1. Copie `.env.example` para `.env`.
2. Preencha `PUBLIC_SITE_URL` somente com a origem HTTPS real, sem caminho, query ou fragmento. Não use domínio de exemplo como domínio definitivo.
3. Faça novo build. Canonicals, OG URLs, sitemap, RSS e JSON-LD usam a mesma origem.

Sem essa variável, o site funciona em prévia: **todas as páginas recebem `noindex, nofollow`**, robots bloqueia indexação, sitemap é vazio e o RSS fica inativo, sem itens. A origem local não é apresentada como endereço público.

Artigos `demo: true` e projetos `example: true` continuam com `noindex` e fora do sitemap mesmo após configurar o domínio. Retire essas flags somente depois de revisão editorial dos respectivos dados. Exemplos nunca entram no RSS.

Em `src/config/site.ts`, configure apenas informações fornecidas e confirmadas:

- `channels`: lista de `{ label, url }` com HTTPS para GitHub, YouTube, Discord e outros canais.
- `contactEmail`: endereço público opcional; quando ausente não há botão de e-mail.
- `support`: `{ label, url, description }` para plataformas externas autorizadas; não inclui checkout nem cobrança no site.
- `videos`: veja a seção de YouTube.

Arrays vazios são estados esperados e mostram explicações úteis, sem links fictícios.

## Cadastrar uma tradução

Crie `src/content/translations/nome-do-jogo.md`. O nome do arquivo vira o slug: `/traducoes/nome-do-jogo/`. Use nomes em minúsculas, sem acentos, separados por hífen.

```yaml
---
title: 'Título completo'
shortTitle: 'Título curto'
description: 'Descrição factual, com até 250 caracteres.'
platform: Nintendo 3DS
status: Planejado
example: true
accent: purple
---
## Sobre esta tradução

Descreva somente o escopo confirmado.
```

Não é necessário criar uma página Astro: a rota é gerada por `getStaticPaths()` no build. A plataforma é livre; novas plataformas aparecem automaticamente no filtro. Os status aceitos são **Planejado**, **Em desenvolvimento**, **Em revisão**, **Em testes**, **Disponível** e **Pausado**.

`displayOrder` define a ordem editorial na Home, no carrossel e no catálogo inicial (padrão 100 quando ausente). A sequência solicitada é Soul Hackers (1), Devil Survivor Overclocked (2), Devil Survivor 2 Record Breaker (3), Strange Journey Redux (4) e SMT IV: Apocalypse (5). A busca também permite ordenar por nome e por atualização.

### Campos do projeto

| Campo                                                      | Regra                                                                     |
| ---------------------------------------------------------- | ------------------------------------------------------------------------- |
| `title`, `shortTitle`, `description`, `platform`, `status` | Obrigatórios                                                              |
| `example`                                                  | Padrão `true`; cadastro inicial sujeito a confirmação; controla indexação |
| `featured`                                                 | Padrão `false`; marque apenas um projeto para destaque                    |
| `accent`                                                   | `purple`, `cyan`, `orange`, `green` ou `red`                              |
| `developer`, `publisher`, `genre`, `updated`               | Opcionais; ausentes exibem “Não informado”                                |
| `progress`                                                 | Etapas independentes, de 0 a 100; sem média geral                         |
| `cover`                                                    | Asset local autorizado com metadados de imagem                            |
| `screenshots`                                              | Lista de imagens reais autorizadas, vazia por padrão                      |
| `video`                                                    | Um vídeo opcional com ID YouTube válido                                   |
| `releases`                                                 | Histórico de patches; vazio por padrão                                    |
| `credits`                                                  | Lista de `{ name, role }`                                                 |
| `faq`                                                      | Lista de `{ question, answer }`; há FAQ básica quando vazia               |
| `requirements`                                             | Lista de requisitos confirmados                                           |

Datas devem ser ISO, como `YYYY-MM-DD`, **somente se conhecidas**. São formatadas com UTC para evitar alteração do dia pelo fuso. Não use a data do build como data de atualização editorial.

### Atualizar progresso

As chaves são `extraction`, `translation`, `review`, `reinsertion` e `testing`. Preencha apenas as etapas com percentuais confirmados. Ausência significa **desconhecido**, não zero. O valor 0 é válido quando confirmado. O valor 100 em tradução não implica conclusão do patch.

Não há barra de progresso geral. As cinco etapas aparecem separadas; desconhecidas recebem “Não informado” e um trilho neutro, sem semântica numérica fictícia.

### Imagens autorizadas

Para capas de projetos, mantenha o original em `images/` e use `cover` com `asset` (nome exato do arquivo, incluindo extensão), `alt`, `credit` e `permission: authorized`. Não é preciso informar dimensões nessa variante: Astro Image lê o arquivo e gera WebP responsivo no build. Um arquivo referenciado ausente interrompe o build com uma mensagem clara. As artes são exibidas inteiras, com proporção preservada.

As capas atuais foram fornecidas e seu uso no site foi autorizado pelo usuário. Soul Hackers usa `SoulHackerscapa.jpeg`, conforme solicitado. O registro de origem fica em `docs/assets.md`.

O carrossel da Home usa os projetos atuais com status reais enquanto não há concluídos. Assim que houver projetos `Disponível`, confirmados (`example: false`) e com releases autorizadas, passa a mostrá-los. Controles, pausa, teclado e reduced motion são nativos e leves. Não invente um status de conclusão para preencher esse espaço.

Para imagens de artigos, screenshots, thumbnails e capas na variante de caminho público, use a estrutura abaixo.

Coloque o arquivo em `public/images/` e use o objeto:

```text
src: caminho iniciado por /images/
alt: descrição específica da imagem
width, height: dimensões numéricas reais
credit: titular, origem e referência da licença/autorização
permission: authorized
```

Registre evidência de autorização em `docs/assets.md`. Prefira AVIF/WebP otimizados e dimensões adequadas à exibição. As imagens têm largura fluida, dimensões explícitas e lazy loading fora da área principal. Os placeholders são vetoriais responsivos produzidos pelo site. Não apresente arte gerada como captura real.

## Publicar um devlog ou tutorial

Crie `src/content/devlogs/meu-artigo.md` ou `.mdx`:

```yaml
---
title: 'Título da publicação'
description: 'Resumo único de até 220 caracteres.'
category: Comunidade
demo: true
draft: false
---
## Primeiro tópico

Conteúdo em Markdown.
```

Este exemplo é demonstrativo. Para uma publicação real, use `demo: false` e **adicione `published` com a data real**. `updated` é opcional e não pode anteceder a publicação. `draft: true` exclui a publicação das listas, das rotas, do sitemap e do RSS.

Categorias: Atualizações, Traduções, Engenharia reversa, Ferramentas, Tutoriais e Comunidade. Tutoriais usam a mesma collection e a categoria correspondente, evitando duplicação de estrutura. As seis páginas de categoria funcionam sem JavaScript e possuem estado vazio.

Use `translation: soul-hackers` para relacionar o artigo ao slug do projeto. A capa opcional usa os mesmos metadados de imagem. O corpo começa com `##`, pois o layout já fornece o único `h1`. Links internos devem usar a rota completa, com barra final. Markdown e MDX são conteúdo confiável do repositório: não aceite contribuições não revisadas, pois MDX pode executar código durante o build.

Artigos têm compartilhamento nativo ou cópia de link, navegação anterior/próxima e relacionados. Não invente autoria, datas ou relatos de avanço para substituir os exemplos.

## Vincular vídeos do YouTube

Adicione a `videos` em `src/config/site.ts`, ou ao campo `video` de um projeto:

```text
id: ID real do vídeo com 11 caracteres
title: título descritivo
thumbnail: objeto de imagem local autorizada (opcional)
```

Sem thumbnail, aparece uma área de reprodução gráfica original. Nenhum embed ou thumbnail remoto é carregado automaticamente. O link abre o vídeo no YouTube somente após o clique. Adicione o canal confirmado a `channels` separadamente.

## Configurar downloads

Cadastre um item em `releases` somente quando o patch tiver sido fornecido e sua distribuição autorizada. Campos obrigatórios:

- `version`: identificador real da versão.
- `date`: data real de lançamento.
- `format`: formato real do patch.
- `sizeBytes`: tamanho real em bytes.
- `url`: link HTTPS confiável para o arquivo autorizado.
- `authorized: true`: declaração editorial, que não substitui a verificação humana.
- `changelog`: lista não vazia das mudanças.
- `tutorial`: rota interna real com instruções específicas.
- `sha256`: opcional; 64 caracteres hexadecimais quando conhecido.

Você pode usar a âncora `/traducoes/slug/#instalacao` se as instruções completas estiverem nessa seção, ou publicar um tutorial em Markdown. Não basta vincular a uma página com “instruções ainda não fornecidas”. Informe região, versão compatível, requisitos e procedimento antes de liberar o download.

`status: Disponível` exige ao menos uma release válida. O site lista todas as versões em ordem decrescente de lançamento e não inventa tamanho ou hash. Para obter o hash de um patch autorizado no PowerShell, use `Get-FileHash -Algorithm SHA256 -LiteralPath caminho-do-patch`.

Nunca inclua ROMs, CIAs, ISOs, chaves de descriptografia ou arquivos proprietários completos. Armazene patches autorizados separadamente do site quando apropriado. Atualize a documentação legal e de privacidade se integrar terceiros.

## Testes e qualidade

```sh
npm run validate
```

Por padrão, o Playwright usa o Microsoft Edge já instalado. Para usar o Chromium do Playwright, instale-o e defina `PLAYWRIGHT_CHANNEL=chromium`. No PowerShell:

```powershell
npx playwright install chromium
$env:PLAYWRIGHT_CHANNEL = 'chromium'
npm run test:e2e
```

Linux CI usa `npx playwright install --with-deps chromium`. Os testes iniciam e encerram o Wrangler em modo inteiramente local, em `127.0.0.1:8787`, sem login nem publicação. Essa porta deve estar livre. Não reutilizam o servidor de desenvolvimento: o Astro preview não aplica o arquivo `_headers`, e os testes precisam da CSP real. O desenvolvimento continua em `4321`.

Testes cobrem filtros combinados, ordenação, persistência na URL, desconhecidos no progresso, proteção dos dados editoriais, rotas, FAQ, menu móvel, teclado, ausência de JavaScript e 404. O axe verifica WCAG A/AA em páginas representativas. Há verificação de ausência de overflow a 320, 580, 768, 1024, 1440, 1920 e 2560px. Os testes de segurança confirmam os cabeçalhos recebidos, a ausência de violações nas páginas e o bloqueio de scripts inline, handlers HTML e scripts de terceiros introduzidos somente em respostas de teste.

`test:seo` usa a origem reservada `kiryoshi.validation.test` **apenas** em `.qa/seo/`, ignorado pelo Git. Esse build nunca é o diretório de deploy. Verifica metadados com origem absoluta, títulos/descrições únicos, JSON-LD válido e exclusão de exemplos do RSS/sitemap, preservando `dist/`.

Screenshots e traces ficam em `test-results/`; o relatório navegável fica em `playwright-report/`. Não entram no Git. Resultados e limitações reais estão em `docs/validation.md`. Testes automáticos não substituem revisão manual com teclado, leitor de tela e dispositivos reais.

## Cloudflare Workers e domínio

O arquivo `wrangler.jsonc` usa exclusivamente `assets.directory: ./dist`, `force-trailing-slash` e `404-page`. Não há `main`, binding de servidor ou fallback de SPA. `public/_headers` configura cabeçalhos de segurança e cache imutável para arquivos com hash. A CSP permite somente recursos locais; novas integrações devem revisá-la.

JavaScript executável é servido em arquivos locais: `script-src 'self'` e `script-src-attr 'none'` bloqueiam scripts inline e handlers como `onclick`. `vite.build.assetsInlineLimit: 0` impede que o Astro volte a embutir scripts pequenos. A inicialização antecipada do menu está em `public/scripts/menu-init.js`, carregada antes do corpo para evitar mudança de layout. JSON-LD permanece como metadado inerte, escapado e validado; não exige permitir JavaScript inline.

Estilos continuam com `style-src 'self' 'unsafe-inline'`, para compatibilidade com atributos de estilo de conteúdo Markdown/MDX, como blocos de código formatados. Essa permissão é específica de CSS, não autoriza scripts. Não adicione `unsafe-inline` ou `unsafe-eval` a `script-src`. `base-uri 'none'` impede alterações da URL base; `frame-ancestors 'none'` impede incorporar o site em frames. As verificações locais usam o emulador do Cloudflare; HTTPS e configurações da conta ainda exigem revisão na hospedagem real.

Publicação **não executada pelo agente**. Quando autorizada:

1. Configure `PUBLIC_SITE_URL` com o domínio público real e revise conteúdo, contato e políticas.
2. Execute `npm ci` e `npm run validate`.
3. Execute `npx wrangler login` na sua própria conta; nunca salve credenciais no repositório.
4. Execute `npm run deploy:check` para verificar o pacote sem publicar.
5. Após autorização do responsável, execute `npm run deploy`.
6. Na conta Cloudflare, associe um domínio personalizado ao Worker em **Settings → Domains & Routes**, usando um domínio sob seu controle e DNS configurado na Cloudflare.
7. Verifique HTTPS, o 404 com status 404, redirects, CSP, cache, `robots.txt`, canonicals e `sitemap.xml` no domínio final. Nenhuma rota de domínio fictício foi pré-configurada.

`workers_dev: true` permite o endereço fornecido pela Cloudflare quando você publicar. Se usar esse endereço como URL pública inicial, configure-o e faça novo build. Ao migrar para `.com.br`, atualize a variável, refaça o build e configure o redirecionamento do endereço anterior conforme sua estratégia de domínio. Não publique `dist/` de prévia esperando que a variável mude em runtime: ela é aplicada **no build**.

### GitHub e CI/CD

O repositório privado do projeto é [Ygorfrc/kiryoshi-translations](https://github.com/Ygorfrc/kiryoshi-translations), com branch principal `main`. O workflow `quality.yml` valida push/PR e pode ser disparado manualmente. Não possui etapa de deploy nem precisa de segredos. Consulte os resultados remotos na aba **Actions**; os resultados de validação local estão em `docs/validation.md`.

Para obter uma cópia do projeto, use `git clone https://github.com/Ygorfrc/kiryoshi-translations.git` com uma conta autorizada e siga a instalação acima. Para Cloudflare Workers Builds, conecte o repositório autorizado na conta Cloudflare, configure build `npm ci && npm run build`, deploy `npx wrangler deploy` e a variável de build `PUBLIC_SITE_URL`. Configure Node 24 e restrinja a branch de produção.

Essa conexão pode ativar deploys por push: habilite-a somente quando desejar esse comportamento. Alternativamente, adicione um workflow manual de deploy após autorização, com token e account ID em GitHub Secrets, ambiente protegido e dependência do workflow de qualidade. Não use tokens no código nem publique ambientes de preview com conteúdo indexável por acidente.

## Atualizar o site

1. Crie ou edite os arquivos de conteúdo, configuração ou componentes.
2. Visualize localmente e revise fatos, permissões e licenças.
3. Execute `npm run format` e `npm run validate`.
4. Revise o diff e, quando autorizado, faça commit/push no seu repositório.
5. Publique somente pelo fluxo autorizado da conta responsável.

## Pendências editoriais e externas

- Domínio público, conta Cloudflare e eventual automação de deploy.
- Canais públicos, e-mail, redes sociais e plataformas de apoio.
- Screenshots das traduções com permissão, vídeos reais e eventuais patches autorizados; as cinco capas do catálogo já foram fornecidas.
- Desenvolvedora, publicadora, gênero, progresso e datas editoriais confirmadas de cada projeto.
- Substituição dos três artigos demonstrativos por publicações reais.
- Revisão da política de privacidade conforme configuração efetiva da hospedagem no lançamento.

Todas essas ausências são tratadas no site sem links falsos, números estimados ou botões de ação sem destino.
