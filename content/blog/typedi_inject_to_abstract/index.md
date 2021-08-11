---
title: TypeDIを使ってインターフェースの型に具象インスタンスを注入する方法
category: tech
description: TypeDIを使ってインターフェースの型に具象インスタンスを注入する方法を解説します。
date: "2021-08-11T10:00:00.000Z"
---

TypeDIを使ってインターフェースの型に具象インスタンスを注入する方法として、`@inject`デコレータにコンストラクタを持つ具象クラスを渡す方法があります。
例えば次の通りです。



```
interface HogeInterface {
  play(): string;
}

class Hoge implements HogeInterface {
  public play() {
    return "hoge";
  }
}

// @Inject(typeFn: (type?: never) => Constructable<unknown>) で具象クラスを注入する
class Service() {
  constructor(@Inject(() => Hoge) private hoge: HogeInterface) {}
}
```


このクラスに対してモックインスタンスを注入する場合は次の通りです。

```
const HogeMock = Hoge as jest.Mock<Hoge>;
Container.set(Hoge, new HogeMock());
```


