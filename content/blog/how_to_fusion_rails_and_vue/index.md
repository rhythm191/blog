---
title: RailsとVue.js（とjQuery）をうまく共存させる方法
category: tech
description: RailsとVue.js（とjQuery）をうまく共存させる方法
date: "2019-11-02T10:00:00.000Z"
---

既存の Rails プロダクトに Vue.js を導入しようとすると大きな障壁にぶつかることがある。
jQuery で作られた資産があまりにも大きく、全てを Vue.js に置換するにはあまりに工数がかかるのだ。
そこで Rails と Vue.js と jQuery をうまく同居させる方法を模索してみた。

この環境での考えです。

- Rails 5.2
- Vue.js 2.5
- jQuery 3.3
- Bootstrap 4.1
- Bootstrap-vue 2.0

## TLTR

だいたいこれに従ってる。これを読め
[https://qiita.com/midnightSuyama/items/efc5441a577f3d3abe74](https://qiita.com/midnightSuyama/items/efc5441a577f3d3abe74)

## 方針

- 基本的に Bootstrap-vue でできることは、HTML 上にそれを書いて済ませる
- ページ内で特殊なことは app/javascripts/packs の js を呼び出す
- Vue.js で頑張りすぎず、既存の jQuery のコードで十分なところはそれを残す

## Vue.js の呼び出しコード

だいたい [これ](https://qiita.com/midnightSuyama/items/efc5441a577f3d3abe74) と同じでいいやと思ったけど、
直接 bootstrap-vue を呼び出したい部分があるので、追加で `data-vue-template` を記載したコンテナは Vue テンプレートとして解釈するようにした。

```
// application javascript

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueAssignModel from 'vue-assign-model';

Vue.use(BootstrapVue);
Vue.use(VueAssignModel);

setPlugin(Vue);

var vms = [];
var pages = {};
var requireContext = require.context('./pages', true, /\.js$/);
requireContext.keys().forEach(key => {
  let name = key.substring(2, key.length - 3);
  pages[name] = requireContext(key).default;
});

document.addEventListener('DOMContentLoaded', () => {

  // data-vueを付与したコンテナ以下は/pages 配下のjsを呼び出す
  let assignPoints = document.querySelectorAll('[data-vue]');
  for (let el of assignPoints) {
    if (pages[el.dataset.vue]) {
      let vm = new Vue(Object.assign(pages[el.dataset.vue], { el }));
      vms.push(vm);
    } else {
      console.error('Vue component does not exist:', el.dataset.vue);
    }
  }

  // data-vue-template を付与したコンテナ以下はvueテンプレートとして解釈する
  let templates = document.querySelectorAll('[data-vue-template]');
  for (let el2 of templates) {
    let vm2 = new Vue({ el: el2 });
    vms.push(vm2);
  }
});

```

## 参考

[https://qiita.com/midnightSuyama/items/efc5441a577f3d3abe74](https://qiita.com/midnightSuyama/items/efc5441a577f3d3abe74)
