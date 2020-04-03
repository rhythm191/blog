---
title: JavaScriptフレームワークFlightでtodoリストを作ってみた Flight編
category: tech
description: JavaScriptフレームワークFlightでtodoリストを作ってみた Flight編
date: "2012-02-14T10:00:00.000Z"
---

[前回](/flight_part_1)， bower により必要なモジュールがそろったので， 今回から実際に Todo リストをくみ上げていきます．

で，できたのがこれ (ソースはこれ. Flight のデモ を参考にしました)

さっそく解説していきたいと思います．

まずは， JavaScript フレームワーク Flight の特徴について簡単に紹介しておきます．

Flight は”コンポーネント”をベースとしたフレームワークです．

この”コンポーネント”の動作は主に次の 3 つです．

- DOM または，document オブジェクトにコンポーネントを登録する
- DOM または，document オブジェクトにイベントを発火させる
- DOM または，document オブジェクトで発火したイベントをハンドリングし，処理を実行する

というかこれだけ． (他に mixin の機能とか，Logger とかもあるが…)

Flight では， コンポーネント同士や画面要素とコンポーネント間の依存性をほとんど排除し，

それらの間でのイベントによるメッセージパッシングでアプリケーションを構築していきます．

これは Backbone.js や Spine.js に代表される MVC フレームワークが明確に役割が定まったモジュールを組み合わせていく方法とはかなり様相が異なります．

では，実際にソースコードをみていきましょう．

まずは，コンポーネントを定義します．

コンポーネントは Flight のライブラリの component.js に依存します．

コンポーネントは機能を定義したコンストラクタを作成し，defineComponent 関数に渡すことで作成します．

````js
define(['components/flight/lib/component'],
  function(defineComponent) {

  return defineComponent(todoItems);

  function todoItems() {}
})
```js

なにもしないコンポーネントができました．

ここからここに”画面描画イベントが発生したら画面にレンダリングする”機能を実装していきます．

まず，イベントが発生したらメソッドを呼び出す部分を作成します．

コンポーネントは初期化時に”initilize”イベントが発生するのでその後に， 上記の機能を持つイベントハンドリングを登録します．

そのとき， afterというメソッドを利用します．

イベントハンドラーの登録はjQueryと大体同じです．

```js
define(['components/flight/lib/component'],
  function(defineComponent) {
    return defineComponent(todoItems);
    function todoItems() {}
  }
});
````

コンポーネントを DOM 要素に登録した場合， コンポーネントは登録 Element の jQuery オブジェクトを$nodeプロパティとして保持します．画面描画する際はこの$node に対して html の書き換えを行います．

```js
define(["components/flight/lib/component"], function(defineComponent) {
  return defineComponent(todoItems)

  function todoItems() {
    // イベントハンドラー
    this.render = function(ev, data) {
      this.$node.html("hove")
    }
    this.after("initialize", function() {
      // uiItemsRender'イベントが発火したらrenderをよびだす．
      this.on(document, "uiItemsRender", this.render)
    })
  }
})
```

最後にこのコンポーネントを DOM に登録します．

アプリケーションの初期化を行うモジュールで先ほど作ったコンポーネントの登録処理を行います．

登録には attachTo メソッドを使います．

```js
define(["app/components/todo_items"], function(TodoItems) {
  function initialize() {
    TodoItems.attachTo("#todo-list")
  }
  return initialize
})
```

これで， 別のコンポーネントが’uiItemsRender’イベントを発火させると， 画面に描画を行うコンポーネントの作成ができました．

Flight では，こんな感じで様々なコンポーネントを作成し，イベントによるメッセージパッシングを行っていくことでアプリケーションを作成していきます．

### まとめ， というか感想

Flight ではコンポーネントベースの開発により，依存性の少ない再利用可能なパーツを作成できます．

ただ，チームで作成する場合は，コンポーネントの設計・分割方針，イベント名の規約などきっちり押さえておかないと，

Backbone や Spine に比べテキトーに作ると後で悲惨な末路をたどるような懸念を感じます．

その辺は，Flight での実装例が増えれば解決する問題なのかも知れません．

あるいは MVC と組み合わせるといいのかも？

まだよくわからないのでもう少し，研究してみようと思います．
