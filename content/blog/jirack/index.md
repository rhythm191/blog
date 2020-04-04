---
title: jirack(jira and slack manipulate tool)
category: tech
description: JIRAをコンソール上から操作しつつ、更新した情報をslackに投げるツールを作りました。
date: "2018-03-04T10:00:00.000Z"
---

JIRA をコンソール上から操作しつつ、更新した情報を slack に投げるツールを作りました。

[jirack](https://github.com/rhythm191/jirack)

## なぜ作ったし

JIRA の更新が面倒になったからです。
なんでわざわざマウスでチケットの移動させないといけないんだぁ？と思ったので作りました。
slack のメッセージ投稿は社内で需要がありそうなので作りました。

## 使い方

    $ gem install
    $ jira config # ここでjiraの設定とかslackのwebhookアドレスとかを入力

設定が完了したら

    $ jira list
    $ jira forward 9999 -m "リリースしたよ！"

## 言い訳

config 時に聞かれる workflow の status ID のリストなんですが、
現状 JIRA REST API には workflow の transitions のリストを取得する方法がないため、
ユーザーが気合いで status の ID リストを登録してもらう必要があります。

本当に申し訳ない。
