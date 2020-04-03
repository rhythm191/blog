---
title: VeeValidateでVueのバリデーションをしよう
category: tech
description: VeeValidateでVueのバリデーションをしよう
date: "2019-12-09T10:00:00.000Z"
---

Vue.js でバリデーションを行うためのライブラリとして、[VeeValidate](https://logaretm.github.io/vee-validate/) があります。
使い方等を簡単に紹介します。
バージョンは v3.1.3 を対象としています。

## v2 から v3 へ

ひとつ重要な注意点があります。
この記事は 2019/12 に書かれていますが、多くの日本語記事では v2 を対象としていて、現在の v3 では動作しません。
それは、2019/8 の v3 への更新によって破壊的な変更が発生し、それまで `v-validate` ディレクティブを用いていましたが、v3 では `ValidationProvider` を使うようになったからです。

v2 ではメールの入力必須条件を `v-validate` を使い、以下のように書いていました。

```
<input v-validate="'required|email'" name="email" type="text">
<span>{{ errors.first('email') }}</span>
```

v3 では `ValidationProvider` を使い、次のように書きます。

```
<ValidationProvider rules="required|email" v-slot="{ errors }">
  <input v-model="email" type="text">
  <span>{{ errors[0] }}</span>
</ValidationProvider>
```

お使いのバージョンを確認して読んでください。

## Getting Started

VeeValidate をインストールします。

```
$ yarn add vee-validate
or
$ npm install vee-validate --save
```

実際に日本語で使用するためには、バリデーションのルールのロードとエラーメッセージの定義が必要です。
メッセージの定義は [こちら](https://github.com/logaretm/vee-validate/blob/master/locale/ja.json) を参考にして、プロダクトごとに調整すれば良いです。

```
import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import ja from './locale/ja.json';


for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: ja.messages[rule] // add its message
  });
}
```

## 基本の使い方

バリデーションは `ValidationProvider` コンポーネントを利用し、バリデーションのルールは `rules` ディレクティブに記載します。
ルールの記載は String または Object を指定します。

```
<ValidationProvider rules="required|email" v-slot="{ errors }">
  <input v-model="email" type="email">
  <span>{{ errors[0] }}</span>
</ValidationProvider>
```

または、

```
<ValidationProvider :rules="{ required: true, email: true }" v-slot="{ errors }">
  <input v-model="email" type="email">
  <span>{{ errors[0] }}</span>
</ValidationProvider>
```

組み込みのルールの定義は [こちら](https://logaretm.github.io/vee-validate/guide/rules.html#rules)

## 複数のバリデーションの管理

複数のバリデーションをパスしたことを管理するには `ValidationObserver` を使います。
例えば、ログイン画面で email と password が入力されたことを管理するためには、
email と password の`ValidationProvider`の状態を`ValidationObserver`で管理します。

```
<ValidationObserver v-slot="{ invalid, passes }">
  <form @submit.prevent="passes(submitEmail)" novalidate>
    <ValidationProvider rules="required|email" v-slot="{ errors }">
      <input v-model="email" type="email">
      <span>{{ errors[0] }}</span>
    </ValidationProvider>

    <ValidationProvider rules="required" v-slot="{ errors }">
      <input v-model="password" type="password">
      <span>{{ errors[0] }}</span>
    </ValidationProvider>
  </form>
</ValidationObserver>
```

この例だと、ふたつのバリデーションが通った時、passes 関数が渡したメソッドを実行するようになります。
