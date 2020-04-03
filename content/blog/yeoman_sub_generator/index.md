---
title: Yeomanのsub-generatorが強力という話
category: tech
description: Yeomanのsub-generatorが強力という話
date: "2015-07-07T10:00:00.000Z"
---

Yeoman について勘違いをしていたのだが、
Yeoman の真の力はボイラープレートの生成ではなく、subgenerator のファイル生成機能にある。

Rails で例えるなら、
rails new で生成されるボイラープレートよりも
rails generate で生成するファイル生成のワークフローが実際スゴイ。

rails generate では、ファイル名、パス、クラス名、関連のファイルなど機能を追加するために必要なファイル生成をまとめて行ってくれる。
ここで生成されるものは”けっして少なくない”作業だし、規約によって束縛するべき対象だ。
それをやるのが Yeoman というわけだ。

試しに、[FLOCSS スタイル](https://github.com/hiloki/flocss)で Sass を書く [generator-flocss](https://github.com/rhythm191/generator-flocss) を作成してみた。
この generator は FLOCSS でのファイル生成のワークフローをコントロールする。

例えば、button のコンポーネントを作成する場合

```
yo flocss:component button
```

で、`object/compoennt/_button.scss` を生成する。

Sass ファイルをまとめてインポートするインポートファイルを生成するジェネレータも用意した。

```
yo flocss:import # _import.scss を生成する
```
