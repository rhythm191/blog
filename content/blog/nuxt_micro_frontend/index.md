---
title: ひとつのドメインに複数のNuxt.jsアプリケーションを載せる方法
category: tech
description: 複数の機能を持つ管理画面などをマイクロフロントエンドとして開発するために、ひとつのドメインに複数のNuxt.jsアプリケーションを載せる方法を紹介します。
date: "2020-07-11T10:00:00.000Z"
---

複数の機能を持つ管理画面などをマイクロフロントエンドとして開発するために、ひとつのドメインに複数の Nuxt.js アプリケーションを載せる方法を紹介します。
この方法によって書く機能ごとにリポジトリを分けることができるため、機能ごとに独立して開発したり、リリースすることができます。

サンプルは Github で公開しています。<br />
https://github.com/rhythm191/micro-frontends-example

## 解説

やっていることは単純で、ベースとなるアプリケーションを Nuxt.js で SSG(Server side generator) し、 その生成物のサブディレクトリをサブアプリケーションの生成物でオーバーライドします。

今回の例ではベースとなる Nuxt.js アプリケーションを SSG した場合、生成物は次のようになっています。

```
dist
├── 200.html
├── README.md
├── _nuxt/...
├── favicon.ico
└── index.html
```

その生成物に対して、別の Nuxt.js アプリケーションを SSG してサブディレクトリに配置することで、
サブディレクトリ配下を別のリポジトリで管理することができるようになります。

```
dist
├── 200.html
├── README.md
├── _nuxt/...
├── favicon.ico
├── hoge
│   ├── 200.html
│   ├── README.md
│   ├── _nuxt/...
│   ├── favicon.ico
│   └── index.html
└── index.html
```

この時、nuxt.config.json は全て、SSG を行う設定をする必要があります。

```
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',

```

また、サブアプリケーションはどのサブディレクトリに配置するかを nuxt.config.js に記述する必要があります。

```
  /*
   ** Routings
   */
  router: {
    base: "/hoge/"
  },
```

あとは、 `nuxt build && nuxt export` した結果を生成物ディレクトリに適切に配置します。
このサンプルではひとつのリポジトリ内に全て集約しましたが、生成物をコピーするだけなので、
デプロイ時にマージすることでサブアプリケーションは別のリポジトリに分割することが可能です。
