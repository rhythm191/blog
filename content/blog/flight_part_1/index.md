---
title: JavaScriptフレームワークFlightでtodoリストを作ってみた bower編
category: tech
description: TwitterのJavaScriptフレームワークFlightを利用してTodoリストを作成していこうと思います
date: "2012-02-13T10:00:00.000Z"
---

Twitter の JavaScript フレームワーク Flight を利用して Todo リストを作成していこうと思います。ただ、その前に bower というパッケージマネージャについて簡単な紹介をしておこうと思います。

Bower は Web 開発向けのパッケージマネージャーです。これも Twitter 社が作成しています。

bower を利用することで、画像・CSS・JavaScript といったリソースのインストールや依存関係の解決だけでなく、 リソースのバージョンの管理も簡単に行うことができるようになります。

bower に関しては、 この辺を見てもらえれば、インストールと使い方は分かります。

- [http://qiita.com/items/ba952bdade627af99e93](http://qiita.com/items/ba952bdade627af99e93)
- [http://blog.mach3.jp/2013/01/bower.html](http://blog.mach3.jp/2013/01/bower.html)

じゃあ、さっそく Flight をインストールしてみましょう。

```
bower install flight
```

ね。簡単でしょ。

実際にモジュールがインストールされているか確認しましょう。

```
$ bower ls
bower discover Please wait while newer package versions are being discovered
/Users/rhythm/work/ftodo
├── es5-shim#2.0.0 (2.0.5 now available)
├─┬ flight#1.0.1
│ ├── es5-shim#2.0.0 (2.0.5 now available)
│ └── jquery#1.8.3 (1.9.1 now available)
└── jquery#1.8.3 (1.9.1 now available)
```

Flight に必要な jquery や es5-shim が一緒にインストールされていることが分かります。

インストールしたモジュールはデフォルトで components 以下に格納されます。確認してみましょう。

```
$ ls components
es5-shim flight jquery
```

この各モジュール名のディレクトリ配下に各モジュールのリソースとリソースの情報を表す component.json が格納されています。

試しに、jquery の component.json を見てみましょう。

```
$ cat components/jquery/component.json
{
  "name": "jquery",
  "version": "1.8.3",
  "main": "./jquery.js",
  "dependencies": {},
  "gitHead": "7d6149dea8a6cdd0d1fbeca8a189f4d464d6f0cd",
  "_id": "jquery@1.8.3",
  "readme": "ERROR: No README.md file found!",
  "description": "ERROR: No README.md file found!",
  "repository": {
    "type": "git",
    "url": "git://github.com/components/jquery.git"
  }
}
```

この component.json でリスースのバージョンや依存関係(dependencies)が管理されます。

だからファイル名にバージョン番号をつける必要がないです。

話がすこし脱線してしまいましたが、ついでに mustache と bootstrap、requirejs を入れてしまいましょう。

```
$ bower install mustache bootstrap requirejs
```

これで、tood リストを作成するリソースがそろいました。

ただ bower では、チーム全員がこのコマンドを律儀に打つ必要はありません。

component.json にプロジェクトに必要なリソースを記述し、プロジェクト直下に配置することでコマンド一発でリソースのインストールを行うことができます。

今回はこんな感じ

```json
{
  "name": "Todo list",
  "version": "1.0.0",
  "dependencies": {
    "flight": null,
    "mustache": null,
    "bootstrap": null,
    "requirejs": null
  }
}
```

先ほど作った components ディレクトリを削除してもう一度次のコマンドをうってみてください。

```
$ bower install
```

全てのモジュールが一発でインストールできましたよね。

bower を使うことで簡単にリソースの準備を行うことができました。

次回、実際に flight による todo リストの開発を行っていきます。
