---
title: Steam(Linux)でWindows用ゲームが起動後即クラッシュした
date: '2024-04-09'
tag:
  - Linux
  - EndeavourOS
  - Steam
---

### 状況
[xz-utilsの件](https://gist.github.com/thesamesam/223949d5a074ebc3dce9ee78baad9e27)で環境のチェックやアップデートなどを終えたタイミングでsteam(proton)で動かしてるwindows向けのゲームが起動後、画面も立ち上がらないままクラッシュしてしまうようになった。ちなみにタイトルはエルデンリングです。


### 環境
|               |                                   |
|:--------------|:----------------------------------|
| OS     　     | EndeavourOS Linux x86_64          |
| WM            | i3                                |
| CPU    　     | AMD Ryzen 7 7745HX (オンボード)   |
| GPU           | ASUS Radeon RX 7600 OC  8GB       |



### トラブルシューティング
Steamのログの取り方は各ゲームの「管理」>「プロパティ」>「一般」>「起動オプション」のテキストフォームに
```
PROTON_LOG=1 %command%
```
と入力する。そしてゲームを起動するとホームディレクトリにsteam-{game-id}.logファイルができる。

```
~~~~~~
3600.766:012c:0190:trace:seh:NtGetContextThread 0xfffffffe: eax=000000e2 ebx=00000001 ecx=00000000 edx=00000000 esi=00000001 edi=0621f5a8
3600.766:012c:0190:trace:seh:NtGetContextThread 0xfffffffe: ebp=0621f6b8 esp=0621f578 eip=7bf4c8ec cs=0023 ss=002b flags=00000246
3600.766:012c:0190:trace:seh:NtGetContextThread 0xfffffffe: ds=002b es=002b fs=0063 gs=006b
3600.766:012c:0148:trace:seh:handle_syscall_fault code=c0000005 flags=0 addr=0xeaf11209 ip=eaf11209
3600.766:012c:0148:trace:seh:handle_syscall_fault  info[0]=00000000
3600.766:012c:0148:trace:seh:handle_syscall_fault  info[1]=000000b0
3600.766:012c:0148:trace:seh:handle_syscall_fault  eax=0000000a ebx=ed220538 ecx=03fbf595 edx=000000ac esi=00000000 edi=0000000a
3600.766:012c:0148:trace:seh:handle_syscall_fault  ebp=eb89dec8 esp=028f7c90 cs=0023 ds=002b es=002b fs=0063 gs=006b flags=00010206
3600.766:012c:0148:warn:seh:handle_syscall_fault backtrace: --- Exception 0xc0000005 at 0xeaf11209: /usr/lib/pressure-vessel/overrides/lib/i386-linux-gnu/vulkan/amdvlk32.so + 0x290d209.
3600.766:012c:0148:trace:seh:handle_syscall_fault returning to user mode ip=7a1dba0a ret=c0000005
3600.766:012c:0148:err:msvcrt:_wassert (L"!status && \"vkCreateGraphicsPipelines\"",L"../src-wine/dlls/winevulkan/loader_thunks.c",2934)
3600.766:012c:0148:trace:seh:raise (22)
3600.790:0030:0198:warn:threadname:NtSetInformationThread Thread renamed to L"wine_threadpool_worker"
3600.790:0030:019c:warn:threadname:NtSetInformationThread Thread renamed to L"wine_threadpool_worker"
3600.790:0030:01a0:warn:threadname:NtSetInformationThread Thread renamed to L"wine_threadpool_worker"
pid 122815 != 122814, skipping destruction (fork without exec?)
```

protonのバージョンを古すぎるものにしなければ、いくら設定を変えて試してもこのようなログになった。


### 対処方法
ログを自分なりに解釈すると、wineというwindowsアプリ互換を提供するアプリケーションのamdグラフィックス用のプログラムの部分が動いてなさそう。  
なので、wine等を依存としてインストールしていたsteamを一旦依存とともにアンインストール
```sh
$ sudo pacman -Rs steam
```

そしてもう一度インストール
```sh
$ sudo pacman -S steam
```
![pacmanインストール](https://i.gyazo.com/d21c04fe1d4c66589b30bd9803dff017.png)

前回まではデフォルトとされていたamdvlkとlib32-amdvlkをインストールしていたが、他のやつで自分の環境にあっていそうなvulkan-radeonとlib32-vulkan-radeonを選択してインストール。

これで無事起動できました。


### 参考文献
- [xz-utils backdoor situation (CVE-2024-3094)](https://gist.github.com/thesamesam/223949d5a074ebc3dce9ee78baad9e27)
- [Where does Steam Linux save its game crash logs? : r/linux_gaming](https://www.reddit.com/r/linux_gaming/comments/15c6t32/where_does_steam_linux_save_its_game_crash_logs/)
- [Steam/トラブルシューティング - ArchWiki](https://wiki.archlinux.jp/index.php/Steam/%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0)