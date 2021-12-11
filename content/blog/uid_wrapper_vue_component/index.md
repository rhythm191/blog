---
title: <input>要素のためにユニークなIDを生成するラッパーコンポーネントを作ると便利
category: tech
description: input要素と関連するlabel要素のために、ユニークなIDを生成するラッパーコンポーネントを作ると便利です。
date: "2021-12-11T10:00:00.000Z"
---

`<input>`要素と関連する`<label>`要素のために、ユニークなIDを生成するラッパーコンポーネントを作ると便利です。
例えば`<form-control>`ラッパーコンポーネントを作成し、次のように使います。

```
<form-control v-slot="{ uid }">
  <label :for="uid">test1</label>
  <input :id="uid" type="text" v-model="hoge" />
</form-control>

<form-control v-slot="{ uid }">
  <label :for="`text_${uid}`">test2</label>
  <input :id="`text_${uid}`" type="text" v-model="fuga" />
</form-control>
```

ユニークなUIDを生成するために[vue-uid](https://www.npmjs.com/package/vue-uid)を使っています。インストールは次のようにします。

```
$ yarn add vue-uid
```

ラッパーコンポーネントは次のように定義します。

```
<template>
  <div class="form-control">
    <slot :uid="$_uid"></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { vueUidMixin } from "vue-uid";

export default Vue.extend({
  name: "FormControl",
  mixins: [vueUidMixin],
});
</script>
```


