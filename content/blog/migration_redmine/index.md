---
title: redmineの移行記録
category: tech
description: redmineの移行の仕方をメモ
date: "2011-07-01T10:00:00.000Z"
---

自宅のサーバをさくら VPS に移行中(※暑いから

redmine の移行の仕方をメモっておく．

基本はここの通りにしておけば OK
新サーバに Redmine をインストール

こことか見ておいてよ．
新サーバに旧サーバのデータを移行する

まずは，mysql からデータを吸い出し．

redmine という名前のデータベースからデータを吸い出し，redmine.sql に保存する

```
mysqldump -u root -p redmine &amp;#62; redmine.sql
```

このファイルを新サーバに持っていき，次のコマンドでデータを適用する

(redmine という名前のデータベースへ適応する事を想定)

```
mysql -u root -p redmine &amp;#60; redmine.sql
```

データベース更新の通知

あとは，redmine にデータベース更新を促してやる．

```
rake config/initializers/session_store.rb
rake db:migrate RAILS_ENV=&amp;#34;production&amp;#34;
```

これで，データが移行されているはずだ．
