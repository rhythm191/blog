---
title: VTL(Velocity Template Language)の構文
category: tech
description: GAEのためにVLT(Velocity Template Language)の構文を勉強したのでメモ
date: "2011-02-24T10:00:00.000Z"
---

GAE のために VLT(Velocity Template Language)の構文を勉強したのでメモ

### コメント

コメントは多くのプログラミング言語にあるようなコメントがあるよ

```
## これが1行コメント

#*
　　これもコメント
```

### 変数

変数を使う時は変数名の前に”\$”をつける

変数の表現方法には大きく二通りあり，それぞれ値が設定されてないときの動作が違う

```
$変数名　　##値が設定してないと"変数名"が出力される
$!変数名　　##値が設定してないと何も表示されない
```

### set 文(変数の設定)

変数の値は”set”で設定する

```
set($rhythm = "maneater")
set($maneater = "$rhythm") ##変数が解析され"maneater"が代入される
set($maneater = '$rhythm') ##変数が解析されず"$rhythm"が代入される
```

### if 文

これも一般的な if-elseif-else が使える．

```
#if (条件)
  文
#elseif (条件)
  文
#else
  文
#end
```

### foreach 文

foreach も使える

```
#foreach($value in $list)
  文
#end
```

参考リンク

[Velocity | TECHSCORE(テックスコア)](http://www.techscore.com/tech/ApacheJakarta/Velocity/index.html)
