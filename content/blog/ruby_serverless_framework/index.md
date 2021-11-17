---
title: rubyのサーバーレスフレームワークの覚書
category: tech
description: rubyのサーバーレスフレームワークについて調べた時の覚書です。
date: "2021-11-17T10:00:00.000Z"
---

rubyのサーバーレスフレームワークについて調べた時の覚書です。
バックエンドAPIを作るときは重宝しそうな印象を受けた。

rubyのWebサービスをサーバーレスで運用するためのフレームワークには[Jets](https://rubyonjets.com/) と [SOULs](https://souls.elsoul.nl/ja/) がある。JetsはAWSのLambdaで動き、SOULsはGCPのCloud Runで動く。
どちらもRailsライクなフレームワークで、scaffoldでCRUD APIを作ったり、ActiveRecordなどのRailsのコア機能の恩恵を受けている。

[Jets](https://rubyonjets.com/)のアーキテクチャはまんまRailsだ。
Controllerがあり、Modelがあり、Routesがある。Railsの利用経験があるなら違和感なく使えるだろう。
Jetsは新規で構築することもできるし、既存のRailsをJetsのサーバーレスとしてデプロイする方法もあるようだ。<br />
https://rubyonjets.com/docs/rails-support/

また、バッチ処理だが、JetsではApplicationJobを使ったクラスを作ることで、Lambdaを生成し、CloudWatch eventsで定時起動を実現できる。
これは地味に嬉しい機能だ。

```
# app/jobs/hard_job.rb:
class HardJob < ApplicationJob
  class_timeout 300 # 300s or 5m, current Lambda max is 15m

  rate "10 hours" # every 10 hours
  def dig
    puts "done digging"
  end

  # Cron expression is AWS Cron Format and require 6 fields
  cron "0 */12 * * ? *" # every 12 hours
  def lift
    puts "done lifting"
  end
end
```

<br />

[SOULs](https://souls.elsoul.nl/ja/)はRailsを踏襲しつつも独自のアーキテクチャを採用している。
SOULsは Monorepo によるマルチアプリケーション構成で、１つのAPIアプリケーションと複数のワーカーアプリケーションで構成されている。
それぞれのアプリケーションは１つのRailsアプリケーションであり、複数のRailsアプリケーションを目的に応じて使い分けるイメージだ。
API は主にフロントエンドへデータ提供し、ワーカーは主にタスクの処理を行う。

```
souls-app（マザーディレクトリ）
├── apps
│   ├── api（サービスディレクトリ）
│   │     ├── app
│   │     │    ├── models
│   │     │    ├── graphql
│   │     ├── config
│   │     │    ├── database.yml
│   │ 
│   ├── worker1（サービスディレクトリ）
│   │    ├── app
│   │    │    ├── models
│   │    │    ├── graphql
│   │    ├── config
│   │    │    ├── database.yml
│   │    │    ├── souls.rb
│   │ 
│   ├── worker2（サービスディレクトリ）
│
├── config
├── sig
│    ├── api（RBS ディレクトリ）
│    ├── worker1（RBS ディレクトリ）
│    ├── worker2（RBS ディレクトリ）
```

また、SOULsではRuby 3.0 から登場した RBS/Steep を採用していて、型チェックが効くのでかなり開発しやすいと思われる。


<br />

サーバーレスフレームワークの独自の利点として、デプロイが簡単に行えることが挙げられる。
Jets、SOULsもどちらもデプロイ用のコマンドが用意されており、簡単にデプロイができる。
例えばJetsだと次のコマンドでデプロイできる。

```
jets deploy
```
