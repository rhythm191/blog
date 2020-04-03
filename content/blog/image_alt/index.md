---
title: 画像のalt属性
category: tech
description: アクセシビリティの観点で画像のalt属性をつけましょう
date: "2019-09-29T10:00:00.000Z"
---

アクセシビリティの観点で画像の alt 属性をつけましょう。
alt 属性をつけることによって目の不自由な人がスクリーンリーダーで読み上げたり、点字に変換して認識することができるようになります。

alt 属性には"それだけで説明できるようなテキスト"を入れましょう。

例えば、

- ロゴ -> ロゴのテキストを入れる
- バナー -> バナーないのテキストを入れる
- フローチャートなど -> 可能な限り説明しましょう。（本文で説明するべきなので `aria-labelledby` を使うことを検討しましょう

## alt="" のケース

装飾が目的の画像の場合は CSS で背景画像にしてしまうか、 `alt=""` をつけましょう。
(alt をつけないとスクリーンリーダーはファイル名を読み上げることになるため）

## aria-labelledby="something-id" のケース

画像に関する説明が本文でも行われている場合は重複が発生するため、 `aria-labelledby` を利用しましょう。

```
<img src="dinosaur.png" aria-labelledby="dino-label">

<p id="dino-label">The Mozilla red Tyrannosaurus ... </p>
```

## 参考

[https://developer.mozilla.org/ja/docs/Learn/Accessibility/HTML#Text_alternatives](https://developer.mozilla.org/ja/docs/Learn/Accessibility/HTML#Text_alternatives)
