---
title: Nuxt.jsでjestとcypressでテストしまくる。with Typescript
category: tech
description: Typescriptを使ってNuxt.jsで開発をしながら、各々のコンポーネントのテストをjestで、e2eテストやインテグレーションテストをcypressで行う方法を解説します。
date: "2021-01-31T10:00:00.000Z"
---

Typescript を使って Nuxt.js で開発をしながら、各々のコンポーネントのテストを jest で、e2e テストやインテグレーションテストを cypress で行う方法を紹介します。
jest と cypress の型情報のバッティング部分に罠があるのでその辺りを特に解説します。

サンプルは Github で公開しています。<br />
https://github.com/rhythm191/nuxt-typescript-jest-cypress

## 準備

`npx create-nuxt-app` で Typescript・jest を使う Nuxt.js アプリケーションを作成しましょう。
その後、cypress のセットアップをします。

```
npm i -D cypress @types/cypress eslint-plugin-cypress
```

その後、`npx cypress open`で初期設定をします。
cypress のアプリが立ち上がってきた後、cypress のフォルダを作成するようにします。
この時できる`cypress/integration`フォルダがテストスクリプトの格納フォルダになります。

また、`cypress.json`を編集し、アクセスする URL を明示しましょう。

```
{
  "baseUrl": "http://localhost:3000"
}
```

jest と cypress の型情報が欲しいので、tsconfig.json の include に型情報を追加します。

```diff
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "ESNext",
    "moduleResolution": "Node",
    "lib": [
      "ESNext",
      "ESNext.AsyncIterable",
      "DOM"
    ],
    "esModuleInterop": true,
    "allowJs": true,
    "sourceMap": true,
    "strict": true,
    "noEmit": true,
    "experimentalDecorators": true,
    "baseUrl": ".",
    "paths": {
      "~/*": [
        "./*"
      ],
      "@/*": [
        "./*"
      ]
    },
    "types": [
      "@nuxt/types",
      "@types/node",
+     "jest",
+     "cypress"
    ]
  },
  "exclude": [
    "node_modules",
    ".nuxt",
    "dist"
  ]
}

```

`eslintrc.json`のプラグインに`plugin:cypress/recommended`を追加する。

```diff
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
+   "cypress/globals": true,
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "prettier",
    "prettier/vue",
+   "plugin:cypress/recommended",
    "plugin:prettier/recommended",
    "plugin:nuxt/recommended",
  ],
+ plugins: ["cypress", "prettier"],
  // add your custom rules here
  rules: {},
};
```

そして、cypress のテストコマンドを実行して、テストができることを確認します。
（このコマンドは package.json に入れても良い）

```
npx cypress run
```

### エラーメッセージ「Property 'toBeTruthy' does not exist on type 'Assertion'.ts(2339) 」

jest のテストスクリプト側でで上記のようなエラ〜メッセージが出た場合は、tsconfig.json に exclude に`cypress`を追加すれば良いです。

```diff
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "ESNext",
    "moduleResolution": "Node",
    "lib": [
      "ESNext",
      "ESNext.AsyncIterable",
      "DOM"
    ],
    "esModuleInterop": true,
    "allowJs": true,
    "sourceMap": true,
    "strict": true,
    "noEmit": true,
    "experimentalDecorators": true,
    "baseUrl": ".",
    "paths": {
      "~/*": [
        "./*"
      ],
      "@/*": [
        "./*"
      ]
    },
    "types": [
      "@nuxt/types",
      "@types/node",
      "jest",
      "cypress"
    ]
  },
  "exclude": [
    "node_modules",
    ".nuxt",
    "dist",
+   "cypress"
  ]
}


```
