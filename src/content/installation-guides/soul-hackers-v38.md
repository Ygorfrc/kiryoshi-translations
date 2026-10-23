---
title: 'Instalação de Soul Hackers v38'
---

## Aplicação do patch

As instruções abaixo seguem o `LEIA-ME.txt` incluído nos pacotes v38 fornecidos por Kiryoshi. Escolha o ZIP correspondente ao seu ambiente na seção [Downloads e versões](#downloads).

Antes de instalar, feche o jogo e o emulador ou console. Faça backup do save e da pasta de mods anterior. Não desinstale o jogo nem apague seus saves. Prefira saves feitos pelo menu do jogo; save states podem manter recursos antigos em memória.

Se já usou protótipos de acentos ou outros mods, guarde a pasta anterior e teste somente com esta tradução ativa. O pacote não restaura fontes ou patches de código de outros mods.

### Instalar no Azahar

1. Na lista de jogos do Azahar, clique com o botão direito em Soul Hackers e escolha **Open Mods Location / Abrir local dos mods**. O nome pode variar conforme a interface.
2. Feche o Azahar. Extraia o ZIP para uma pasta temporária e copie a pasta `romfs` para o diretório de mods desse título, aberto no passo anterior. Substitua arquivos antigos somente depois do backup.
3. Confira que existem caminhos como `romfs/app_bin/btl_talk/TK_MDT.BIN` e `romfs/event/EVENT.BIN` dentro do diretório de mods do título. Não crie `romfs/romfs`.
4. Abra o Azahar e o jogo. Se a tradução não aparecer, confira o carregamento de mods e se outro mod está sobrescrevendo os mesmos arquivos.

Use o diretório de mods da instalação do Azahar que você realmente utiliza. Este ZIP não contém uma pasta `luma` e não deve ser colocado na pasta de saves.

### Instalar no Luma3DS

1. Com o console desligado, extraia o ZIP para uma pasta temporária e copie a pasta `luma` para a raiz do cartão SD. Faça backup antes de substituir arquivos de uma versão anterior.
2. Confira o Title ID `00040000000C5600`. Os caminhos no SD devem incluir `/luma/titles/00040000000C5600/romfs/app_bin/btl_talk/TK_MDT.BIN` e `/luma/titles/00040000000C5600/romfs/event/EVENT.BIN`. Evite `luma/luma` ou `romfs/romfs`.
3. Ligue o console segurando **SELECT**, habilite **Enable game patching** nas configurações do Luma3DS e salve.
4. Abra o jogo normalmente. Esta instalação pressupõe um console já preparado com Luma3DS; não requer desinstalar o jogo ou apagar o save.

### Remover ou voltar à versão anterior

Com o Azahar fechado ou o console desligado, restaure o backup anterior ou remova somente os 18 arquivos relacionados em `manifest.json` do pacote. Os caminhos desse manifesto são relativos à pasta `romfs`. Preserve outros mods e seus saves.

Em cada variante, Google Drive e MediaFire entregaram arquivos idênticos na verificação de 23/10/2026.
