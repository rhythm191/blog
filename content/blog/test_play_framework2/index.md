---
title: play2.5のtestに関するtips
category: tech
description: play2.5 でテストを書く場合の細かなtipsを記載する
date: "2016-11-10T10:00:00.000Z"
---

play2.5 でテストを書く場合の細かな tips を記載する。

### CSRF を使ったフォームをテストする場合

CSRF の token をフォームに埋め込んでいる場合、リクエストの tags に代わりのトークンに入れる

```scala
FakeRequest().copyFakeRequest(tags = Map("CSRF_TOKEN" -> "FakeCSRFToken", "CSRF_TOKEN_NAME" -> "csrfToken")
```

### ExcecutionContext が必要な場合

ExcecutionContext は実際のアプリで利用するものにあわせないと mock を作るときに問題が発生する

```scala
// こっちを使う
import play.api.libs.concurrent.Execution.Implicits.defaultContext
// こっちはだめだ
//import scala.concurrent.ExecutionContext.Implicits.global
```

### org.mockito.exceptions.misusing.InvalidUseOfMatchersException がでる。

mock で設定したメソッドのパラメータの形態がおかしい時にでる。
たいていは implicit paramter を渡していないとか、変な implicit paramater が分かっているかのどちらか

### DI する場合

DI する場合は次のようにする。

```scala
val mockMessageApi = (new GuiceApplicationBuilder).injector.instanceOf[MessagesApi]

// または

  "hogehoge" in new WithApplication {
    val mockMessageApi = app.injector.instanceOf[MessagesApi]
```

### mockito のスタブメソッド

mockito のスタブメソッドは in の中で定義した場合 in の外には影響しない
