---
title: play1.*でサードパーティのjarを追加する方法
category: tech
description: play1.*でサードパーティのjarを追加する方法
date: "2012-01-05T10:00:00.000Z"
---

表題の件。調べるのに時間がかかったのでメモ。

dependencies.yml に以下のものを追加

```
require:
    - provided -> evernote-api 1.20

repositories:
    - provided:
        type:       local
        artifact:   "${application.path}/jar/[module]-[revision].jar"
        contains:
            - provided -> *
```

そして、アプリケーションフォルダの直下に jar フォルダを作成し、

必要なサードパーティ製 jar を追加していくという寸法

(evernote-api-1.20.jar を入れている)
