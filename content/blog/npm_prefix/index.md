---
title: npm run command --prefix directory でサブディレクトリのコマンドを実行する。
category: tech
description: npm run command --prefix directory でサブディレクトリのコマンドを実行することができます。例えば同じgitでフロントエンドとバックエンドを管理することができます。
date: "2021-05-13T10:00:00.000Z"
---

npm run コマンドで`--prefix`を使うことによって、サブディレクトリのpackage.jsonのコマンドを実行することができます。
このテクニックを使うことで、フロントエンドとバックエンドのコードをひとつのリポジトリで管理するなど、複数のビルド環境をまとめることができます。

例えば、`frontend`、`backend`ディレクトリがあり、

```
.
├── frontend
│   └── package.js
└── backend
    └── package.json
```

<br/>

`frontend/package.json`にビルドコマンドが登録されている場合、

```
  "scripts": {
    "build": "nuxt-ts build"
  }
```

<br/>

次のコマンドでfrontendのビルドコマンドを呼び出すことができます。

```
npm run build --prefix frontend
```
