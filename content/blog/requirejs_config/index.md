---
title: requirejsのconfigを調べてみた
category: tech
description: 毎回見直しにいくのもめんどいのでrequirejsのconfigオプションで指定できるものをまとめてみました．この記事ではバージョン2.1のrequirejsを対象としています
date: "2013-02-19T10:00:00.000Z"
---

毎回見直しにいくのもめんどいので requirejs の config オプションで指定できるものをまとめてみました．この記事ではバージョン 2.1 の requirejs を対象としています．

requirejs の config オプションの指定する方法は 2 つあります．

ひとつは requirejs を読み込んだ後に，require.config メソッドを呼び出す方法．

もうひとつは requrejs を読み込む前に，”var requre = {…}”で require オブジェクトを作成する方法

config オプションで指定できるものは次の 6 つです．

- baseUrl : 依存解決のルートディレクトリを指定
- paths: baseUrl 配下にないモジュールを個別に指定できる
- shim: AMD の形式でないモジュールを AMD の形式に定義する
- map: 特定のモジュールが読み込むモジュールに
- config: モジュールに注入する設定
- packages: CommonJS パッケージから設定を読み出す
- waitSecconds: スクリプトロードのタイムアウト
- context: コンテキスト名(同じモジュールの複数のバージョンを呼び出す際に使用する)
- deps: 依存関係の配列
- callback: deps を読み込んだ後に実行するコールバック
- enforceDefine: true なら AMD 形式でないスクリプトを読み込んだときにエラーを投げる
- xhtml: true ならスクリプトエレメントを document.createNS()を利用する
- urlArgs: リソースを取得する url につけるパラメータ(キャッシュ切りに利用する)
- scriptType: スクリプトエレメントに記載する type を定義

以下ではいくつかのパラメータの補足をしておきます．

### baseUrl

baseUrl はモジュールのルートディレクトリを定義します．

例えば，baseUrl で”path/to”を指定した場合に define([ “my/module” ] …” と定義した場合は，”path/to/my/module.js”をロードします．

requirejs を読み込む際に何も指定しない場合は，読み出した html のディレクトリを baseUrl とします．

requirejs を読み込むスクリプトに data-main を指定した場合は，そのスクリプトのディレクトリがルートディレクトリになります．

baseUrl は絶対パス．相対パスのどちらでも指定できますが，相対パスを利用した場合は，読み出した html のディレクトリを起点としたパスになります．

### pahts

paths は baseUrl 配下にないモジュールのマッピングを定義します．

paths にはディレクトリ，またはモジュール単体を定義することができます．

ディレクトリを定義した場合は，モジュール名の先頭に paths のキーを指定します．

paths のバリューは絶対パス，または baseUrl からの相対パスを指定することができます．

例えば，

```js
require.config({
  baseUrl: "some",
  paths: {
    lib: "js/lib",
    jquery: "/hoge/jquery",
  },
})
```

のように定義すると，

“some/js/lib/backbone”を参照したい場合は”lib/backbone”と指定し，

“jquery”を指定した場合は，”/home/jquery”を参照します．

### shim

shim は AMD の形式にない Javascript を AMD の形式(依存関係とモジュールの返り値が定まった形式)に再定義します．

例えば Backboen.js ならば次のように記述します．

deps に記述するモジュールは baseUrl 等のパスに影響します．

```js
requirejs.config({
  shim: {
    backbone: {
      // deps にはモジュールの依存関係を記述
      deps: ["underscore", "jquery"],
      // exports にはモジュールの返り値を記載
      exports: "Backbone",
      // init にはモジュールの初期化を記載(省略可能)
      // noConflictメソッドを呼び出すときに利用する
      //init: function(backbone){}
    },
  },
})
```

jquery のプラグインなど出力がなく，jquery オブジェクトを拡張するのみのモジュールなどは次のように記述します．

requirejs.config({
shim: {
'jquery.scroll': ['jquery']
}
});

### map

map はある特定パスのモジュールが読み込むモジュールを再定義することができます．
例えば，“some/old/a.js”が読み込む jquery をバージョン 1.7 にし，その他のモジュールが読み込む jquery を 1.8 にしたい場合，
map オプションを利用して次のように記述します．

```js
requirejs.config({
  map: {
    "*": {
      jquery: "lib/jquery-1.8",
    },
    "some/old/a": {
      jquery: "lib/jquery-1.7",
    },
  },
})
```

### config

config オプションを使うことでモジュールに対して設定値を定義することができる
config オプションはハッシュ形式でモジュール名をキー，バリーに設定値を記述する．
例えば，bar.js に対して設定値を定義したい場合は

```js
requirejs.config({
  config: {
    bar: {
      size: "large",
    },
  },
})

//bar.js, 特別なモジュール名として"module"を呼び出す
define(["module"], function(module) {
  var size = module.config().size
})
```

### context

同じモジュールの複数のバージョンを呼び出す際に，名前かぶりをさけるために利用する．

下の例の通り，require.config の戻り値を利用してそれぞれのモジュールを呼び出す．

```js
var reqOne = require.config({
  context: "version1",
  baseUrl: "version1",
})

reqOne(["require", "alpha", "beta"], function(require, alpha, beta) {
  log("alpha version is: " + alpha.version) //prints 1
  log("beta version is: " + beta.version) //prints 1
  setTimeout(function() {
    require(["omega"], function(omega) {
      log("version1 omega loaded with version: " + omega.version) //prints 1
    })
  }, 100)
})

var reqTwo = require.config({
  context: "version2",
  baseUrl: "version2",
})

reqTwo(["require", "alpha", "beta"], function(require, alpha, beta) {
  log("alpha version is: " + alpha.version) //prints 2
  log("beta version is: " + beta.version) //prints 2
  setTimeout(function() {
    require(["omega"], function(omega) {
      log("version2 omega loaded with version: " + omega.version) //prints 2
    })
  }, 100)
})
```
