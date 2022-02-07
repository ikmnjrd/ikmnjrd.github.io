---
title: kali linuxでVNCサーバーにnovncで接続する
date: '2021-10-31'
layout: layouts/post.njk
scheduled: '2021-10-31'
---
[公式](https://www.kali.org/docs/general-use/novnc-kali-in-browser/)にやり方も書いてあるがこの通りだとエラーが出た。

`$ sudo apt install -y x11vnc`

以下の部分をそのまま実行するとエラーが出る。
$ x11vnc -display :0 -autoport -localhost -nopw -bg -xkb -ncache -ncache_cr-quiet -forever
```bash
31/10/2021 20:23:07 passing arg to libvncserver: -ncache_cr-quiet
31/10/2021 20:23:07 x11vnc version: 0.9.16 lastmod: 2019-01-05  pid: 2173
31/10/2021 20:23:07 Using X display :0
31/10/2021 20:23:07 rootwin: 0x764 reswin: 0x3800001 dpy: 0x1dc24970
31/10/2021 20:23:07 
31/10/2021 20:23:07 ------------------ USEFUL INFORMATION ------------------
31/10/2021 20:23:07 X DAMAGE available on display, using it for polling hints.
31/10/2021 20:23:07   To disable this behavior use: '-noxdamage'
31/10/2021 20:23:07 
31/10/2021 20:23:07   Most compositing window managers like 'compiz' or 'beryl'
31/10/2021 20:23:07   cause X DAMAGE to fail, and so you may not see any screen
31/10/2021 20:23:07   updates via VNC.  Either disable 'compiz' (recommended) or
31/10/2021 20:23:07   supply the x11vnc '-noxdamage' command line option.
31/10/2021 20:23:07 
31/10/2021 20:23:07 Wireframing: -wireframe mode is in effect for window moves.
31/10/2021 20:23:07   If this yields undesired behavior (poor response, painting
31/10/2021 20:23:07   errors, etc) it may be disabled:
31/10/2021 20:23:07    - use '-nowf' to disable wireframing completely.
31/10/2021 20:23:07    - use '-nowcr' to disable the Copy Rectangle after the
31/10/2021 20:23:07      moved window is released in the new position.
31/10/2021 20:23:07   Also see the -help entry for tuning parameters.
31/10/2021 20:23:07   You can press 3 Alt_L's (Left "Alt" key) in a row to 
31/10/2021 20:23:07   repaint the screen, also see the -fixscreen option for
31/10/2021 20:23:07   periodic repaints.
31/10/2021 20:23:07 
31/10/2021 20:23:07 XFIXES available on display, resetting cursor mode
31/10/2021 20:23:07   to: '-cursor most'.
31/10/2021 20:23:07   to disable this behavior use: '-cursor arrow'
31/10/2021 20:23:07   or '-noxfixes'.
31/10/2021 20:23:07 using XFIXES for cursor drawing.
31/10/2021 20:23:07 GrabServer control via XTEST.
31/10/2021 20:23:07 
31/10/2021 20:23:07 Scroll Detection: -scrollcopyrect mode is in effect to
31/10/2021 20:23:07   use RECORD extension to try to detect scrolling windows
31/10/2021 20:23:07   (induced by either user keystroke or mouse input).
31/10/2021 20:23:07   If this yields undesired behavior (poor response, painting
31/10/2021 20:23:07   errors, etc) it may be disabled via: '-noscr'
31/10/2021 20:23:07   Also see the -help entry for tuning parameters.
31/10/2021 20:23:07   You can press 3 Alt_L's (Left "Alt" key) in a row to 
31/10/2021 20:23:07   repaint the screen, also see the -fixscreen option for
31/10/2021 20:23:07   periodic repaints.
31/10/2021 20:23:07 
31/10/2021 20:23:07 Client Side Caching: -ncache mode is in effect to provide
31/10/2021 20:23:07   client-side pixel data caching.  This speeds up
31/10/2021 20:23:07   iconifying/deiconifying windows, moving and raising
31/10/2021 20:23:07   windows, and reposting menus.  In the simple CopyRect
31/10/2021 20:23:07   encoding scheme used (no compression) a huge amount
31/10/2021 20:23:07   of extra memory (20-100MB) is used on both the server and
31/10/2021 20:23:07   client sides.  This mode works with any VNC viewer.
31/10/2021 20:23:07   However, in most you can actually see the cached pixel
31/10/2021 20:23:07   data by scrolling down, so you need to re-adjust its size.
31/10/2021 20:23:07   See http://www.karlrunge.com/x11vnc/faq.html#faq-client-caching.
31/10/2021 20:23:07   If this mode yields undesired behavior (poor response,
31/10/2021 20:23:07   painting errors, etc) it may be disabled via: '-ncache 0'
31/10/2021 20:23:07   You can press 3 Alt_L's (Left "Alt" key) in a row to 
31/10/2021 20:23:07   repaint the screen, also see the -fixscreen option for
31/10/2021 20:23:07   periodic repaints.
31/10/2021 20:23:07 X FBPM extension not supported.
31/10/2021 20:23:07 X display is capable of DPMS.
31/10/2021 20:23:07 --------------------------------------------------------
31/10/2021 20:23:07 
31/10/2021 20:23:07 Default visual ID: 0x21
31/10/2021 20:23:07 Read initial data from X display into framebuffer.
31/10/2021 20:23:07 initialize_screen: fb_depth/fb_bpp/fb_Bpl 24/32/7680
31/10/2021 20:23:07 *** unrecognized option(s) ***
31/10/2021 20:23:07     [1]  -ncache_cr-quiet
31/10/2021 20:23:07 For a list of options run: x11vnc -opts
31/10/2021 20:23:07 or for the full help: x11vnc -help
31/10/2021 20:23:07 
31/10/2021 20:23:07 Here is a list of removed or obsolete options:
31/10/2021 20:23:07 
31/10/2021 20:23:07 removed: -hints, -nohints
31/10/2021 20:23:07 removed: -cursorposall
31/10/2021 20:23:07 removed: -nofilexfer, now the default.
31/10/2021 20:23:07 
31/10/2021 20:23:07 renamed: -old_copytile, use -onetile
31/10/2021 20:23:07 renamed: -mouse,   use -cursor
31/10/2021 20:23:07 renamed: -mouseX,  use -cursor X
31/10/2021 20:23:07 renamed: -X,       use -cursor X
31/10/2021 20:23:07 renamed: -nomouse, use -nocursor
31/10/2021 20:23:07 renamed: -old_pointer, use -pointer_mode 1
```

そのため以下のように実行
$ x11vnc -display :0 -autoport -localhost -nopw -bg -xkb -ncache -forever


起動確認

`$ ss -antp | grep vnc`

```bash
LISTEN    0         32                127.0.0.1:5900            0.0.0.0:*        users:(("x11vnc",pid=8056,fd=8))
LISTEN    0         32                    [::1]:5900               [::]:*        users:(("x11vnc",pid=8056,fd=9))
kali@kali:~$
```




ここでもエラーが出る。
$ /usr/share/novnc/utils/launch.sh --listen 8081 --vnc localhost
```bash
Warning: could not find self.pem
Using installed websockify at /usr/bin/websockify
Starting webserver and WebSockets proxy on port 8081
Usage: 
    websockify [options] [source_addr:]source_port [target_addr:target_port]
    websockify [options] [source_addr:]source_port -- WRAP_COMMAND_LINE

websockify: error: Error parsing target
Failed to start WebSockets proxy
```
[novnc公式のIssue](https://github.com/novnc/noVNC/issues/1443)でも似た症状が報告されてた。


`$ cd ~`
`$ git clone https://github.com/novnc/noVNC.git`
`$ cd noVnc/utils/novnc_proxy --vnc localhost:5900`



サーバー側の別のターミナルでsshを有効にする（？）
`$ sudo systemctl enable ssh --now`


クライアントのターミナルからポートフォワーディング。sshでログインした状態になればOK。
`ssh kali@192.168.0.140 -L 6080:localhost:6080`


クライアントのWebブラウザで以下のようにアクセスする。
http://localhost:6080/vnc.html
