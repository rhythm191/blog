---
title: vue.jsの単一コンポーネントでCSSを外出しする
category: tech
description: vue.jsの単一コンポーネントファイルないのCSSやSCSSを外出しする方法を解説します
date: "2020-01-13T10:00:00.000Z"
---

vue.js の単一コンポーネントファイルないの CSS や SCSS を外出しする方法を解説します。

CSS を別ファイルに分けるメリットは、エディタの補間（特に Emmet とか）が効きやすくなります。
やり方は簡単で単一コンポーネントファイルないの`style`タグの`src`属性でファイルを指定するだけです。

```html
<!-- CSSファイルの場合 -->
<style src="./style.css"></style>

<!-- SCSSファイルの場合 -->
<style lang="scss" src="./style.scss"></style>
```

もちろんスコープ付き CSS にも対応しています。

```html
<!-- CSSファイルの場合 -->
<style scoped src="./style.css"></style>

<!-- SCSSファイルの場合 -->
<style scoped lang="scss" src="./style.scss"></style>
```
