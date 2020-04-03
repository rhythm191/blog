---
title: Alfred workflowを簡単に作れるalfyの紹介
category: tech
description: Alfred workflowをJavaScriptで簡単に作れるalfyを紹介します
date: "2020-02-06T10:00:00.000Z"
---

Alfred workflow を JavaScript で簡単に作れる [alfy](https://github.com/sindresorhus/alfy) を紹介します。

## alfy とは何者か？

Alfred workflow を作るための JavaScript フレームワークです。
この alfy を使うことで、入出力や cache、データのフェッチ、workflow のインストールを簡単にできるようになります。

## Alfred workflow の作り方

alfy を使った Alfred workflow を作る手順は次のとおりです。

1. Alfred workflow の画面でブランクの workflow を作成します。(左下のプラスボタンね)

![alfred-step1-1]({{site.baseurl}}/images/alfred-workflow/alfred-step1-1.png)

名前とかは適当に決めれば良い。

![alfred-step2-1]({{site.baseurl}}/images/alfred-workflow/alfred-step1-3.png)

2. `Script Filter`を追加する

右クリック -> `Inputs` -> `Script Filter` で`Script Filter`を追加し、 `Language` を `/bin/bash` に設定し、次のスクリプトを設定します。

```
./node_modules/.bin/run-node index.js "$1"
```

![alfred-step2-1]({{site.baseurl}}/images/alfred-workflow/alfred-step2-1.png)

3. keyword には実行する際のコマンドを設定します。

4. workflow が格納されているディレクトリを開きます。

サイドバーのワークフローを右クリックをして `Open in Finder`を選択します。

5. Node.js の設定をします。

```
$ npm init
$ npm install --save alfy
```

6. package.json に scripts を設定してください。

`scripts` の `postinstall` と `preuninstall` に alfy のコマンドを記述することで、npm パッケージをインストール時に Alfred workflow に登録することができます。

```
{
	"name": "alfred-unicorn",
	"version": "1.0.0",
	"description": "My awesome unicorn workflow",
	"author": {
		"name": "Jane Doe",
		"email": "janedoexxxxxxxx@gmail.com",
		"url": "janedoexxxxxxxx.com"
	},
	"scripts": {
		"postinstall": "alfy-init",
		"preuninstall": "alfy-cleanup"
	},
	"dependencies": {
		"alfy": "*"
	}
}
```

7. index.js にコードを書きます。

## サンプルプログラム

サンプルとして qiita のタグ取得 API を叩いて、引数にマッチングするタグを検索するサンプルプログラムです。

```
const alfy = require('alfy');

const data = await alfy.fetch('https://qiita.com/api/v2/tags?page=1&per_page=10&sort=count');

const items = alfy
	.inputMatches(data, 'id')
	.map(element => ({
		title: element.id,
		subtitle: element.items_count,
		arg: `https://qiita.com/tags/${element.id}`
	}));

alfy.output(items);
```
