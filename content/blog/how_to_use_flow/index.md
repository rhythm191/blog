---
title: flowの覚書(flow 0.19.0)
category: tech
description: flowの覚書(flow 0.19.0)
date: "2012-01-05T10:00:00.000Z"
---

flow のバイナリ自体は型チェッカーだが、本質は JavaScript に静的型付けなコーディングスタイルを提供すること。
JavaScript の拡張言語と考えてもらえばよい。
実際の開発では babel の[プラグイン](https://www.npmjs.com/package/babel-plugin-transform-flow-strip-types)として設定し、babel のコンパイル時に型情報は消える。

flow は JavaScript の拡張言語として、静的型付けのコーディングスタイルを提供する。
そして、チェックする対象のソースコードに`/* @flow */`をつければ良い。
例えば、関数 double は number 型の値を引数に取ることを宣言できる。

```js
/* @flow */

function double(x: number) {
  return x * 2
}

double(2)
```

関数 double の引数を string 型にした場合、flow の型チェックでエラーが出力される。

```js
/* @flow */

function double(x: string) {
  return x * 2;
}

double('Hello world');

>flow check
  7:   return x * 2;
              ^ string. This type is incompatible with
  7:   return x * 2;
              ^^^^^ number
```

flow のチェック自体は型情報を付けなくても賢くチェックする。
例えば次の場合は、number 型に length プロパティがないとエラーが出力される。

```js
/* @flow */

function double(x) {
  return x.length * 2;
}

double(3);

>flow check
  7:   return x.length * 2;
                ^^^^^^ property `length`. Property not found in
  7:   return x.length * 2;
              ^ Number
```

その他、flow でできること

- 変数、関数の引数、戻り値、クラス変数に型をつける
- 型情報をパラメータ化してクラス渡せるジェネリクス(Array とか
- 複雑な型情報を定義するタイプエイリアス
- 型チェック、null チェックによる静的解析を行う

あとは、flow のホームページを読んでよ。
検索するとミュージシャンの方が出るのでリンクを貼っておくよ。

[http://flowtype.org/](http://flowtype.org/)
