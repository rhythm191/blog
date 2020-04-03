---
title: herokuのpostgresqlのバックアップについて
category: tech
description: herokuのpostgresqlのバックアップについて
date: "2015-05-02T10:00:00.000Z"
---

Heroku の postgresql のバックアップを行う pgbackups プラグラインがいつの間にか本体に組み込まれていたので、その使い方を簡単に記録しておく。

Heroku postgres が導入されていれば、バックアップに特別な準備は不要だ。
Heroku 上にバックアップをとるには次のコマンドを実行する。

```
# appnameはそれぞれのアプリケーション名を指定する
$ heroku pg:backups capture —app appname
```

現在のバックアップの確認は次の通り。
Hobby Dev プランなら最大 2 個のバックアップが保存される。

```
$ heroku pg:backups —app appname
=== Backups
ID Backup Time Status Size Database
---- ------------------------- ---------------------------------- ------ --------
b002 2015-04-26 11:48:56 +0000 Finished 2015-04-26 11:48:57 +0000 8.48kB VIOLET

=== Restores
! No restores found. Use `heroku pg:backups restore` to restore a backup
```

リストアも次のコマンドで可能だ。

```
$ heroku pg:backups restore —app appname
```

バックアップをローカルにダウンロードしたい場合は次のコマンドを実行して、バックアップ ID の URL を確認する。

```
$ heroku pg:backups public-url b002 —app appname
```

自動バックアップの設定もできる。これはマニュアルバックアップとは別に保存される。
Hobby Dev プランなら 1 週間分保存される。
自動バックアップのスケジュールの設定は次のコマンドを実行する。

```
# データベースURLはheroku configの環境変数を指定する(DBが1個だけなら”DATABASE_URL”でよいはず)
$ heroku pg:backups schedule DATABASE_URL --at '01:00 Asia/Tokyo’ —app appname
```

スケジュールを確認するには次のコマンドを実行する。

```
heroku pg:backups schedules —app appname
=== Backup Schedules
$ HEROKU_POSTGRESQL_VIOLET_URL: daily at 1:00 (Asia/Tokyo)
```

スケジュールの削除は次のコマンドを実行する。

```
$ heroku pg:backups unschedule DATABASE_URL —app appname
```

あとは次の URL を参照してくれ

[https://devcenter.heroku.com/articles/heroku-postgres-backups](https://devcenter.heroku.com/articles/heroku-postgres-backups)
