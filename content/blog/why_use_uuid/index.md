---
title: UUIDの使い所
category: tech
description: ここ最近UUIDやULIDが採用されるケースについて考えてみた。
date: "2022-06-21T10:00:00.000Z"
---

ここ最近、IDを数値連番だけでなく、UUIDやULIDが採用されるケースが増えてきている。
大きく２つの理由があるのではないだろうか？


１つ目に、DDD（ドメイン駆動開発）の普及が考えられる。
DDDにおけるドメインエンティティが"常に有効なエンティティ"であるために、IDをアプリケーション側で生成する必要がある。
IDに`auto_increament`や`serial`などのDBで付与する連番整数を採用すると、DBに保存するまでは”有効なエンティティであること”が崩れてしまう。
例外的な状況を作らずにシンプルな一意のIDを生成するためにUUIDやULIDが採用されるというわけだ。

２つ目に、分散DB（Spanner, CockroachDB, TiDB, YugaByteDB）が現実的な選択肢として現れたことが挙げられる。
分散DBでは、そもそもDBがID生成をせず、アプリケーション側で分散率の高いID生成が求められる。
そのため、UUIDのような非シーケンシャルなIDが必要になっている。

今まで数値連番のIDが担っていた役割には、

1. サロゲートキーとして一意の値
2. データの生成順でソートできた

があるが、UUIDを採用することで2の方は別のカラム(例えばcreated_at)で賄う必要がある。


参考資料

- [https://zenn.dev/mpyw/articles/rdb-ids-and-timestamps-best-practices](https://zenn.dev/mpyw/articles/rdb-ids-and-timestamps-best-practices)
- [https://techblog.raccoon.ne.jp/archives/1627262796.html](https://techblog.raccoon.ne.jp/archives/1627262796.html)
- [https://qiita.com/tzkoba/items/5316c6eac66510233115](https://qiita.com/tzkoba/items/5316c6eac66510233115)