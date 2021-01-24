---
title: docker-compose.ymlを使って５ステップでAmazon ECS環境を構築する方法
category: tech
description: Docker ComposeとAmazon ECSの統合により、docker-compose.ymlから環境を構築することができるようになりました。この機能を使って５ステップでwordpressの環境を構築していきます。
date: "2021-01-24T10:00:00.000Z"
---

Docker ComposeとAmazon ECSの統合により、docker-compose.ymlから環境を構築することができるようになりました。
ここではwordpressのシンプルな環境を５ステップで構築できることを紹介していきます。


## ステップ１ - Dockerのコンテキスト情報を作る

Amazon ECS環境へデプロイするために、ECS環境をターゲットとしたDockerコンテキストを作成します。
ここでは「wordpress-dev」という名前でECS用のコンテキストを作成します。
コマンド実行後にAWSのアカウント情報やアクセスキーの情報はご自身のものを入力してください。

```
docker context create ecs wordpress-dev
```

`docker context ls`でコンテキストができているか確認します。（defaultは今までローカルで使っていたやつ

```
$ docker context ls
NAME                   TYPE                DESCRIPTION                               DOCKER ENDPOINT               KUBERNETES ENDPOINT                                 ORCHESTRATOR
default                moby                Current DOCKER_HOST based configuration   unix:///var/run/docker.sock   https://kubernetes.docker.internal:6443 (default)   swarm
wordpress-dev *        ecs                 (ap-northeast-1)
```

## ステップ２ - DockerのコンテキストをECSのものに切り替える

Dockerのコンテキストを今までローカルで使っていたものではなく、ECS用のものに切り替えます。

```
docker context use wordpress-dev
```


## ステップ３ - wordpress用のDockerファイルを用意する。

wordpress用のDockerファイルを用意します。
wordpressのイメージは私がカスタムしたものを使っていますが、(標準のもの)[https://hub.docker.com/_/wordpress]を使っても良いです。
ただし、標準のものはファイルのアップロード制限が厳しく、テーマがアップロードできなかったのでカスタムしたものを使用しました。

```
version: "3.2"

services:
  wordpress:
    image: rhythm191/wordpress-dev:latest
    restart: always
    ports:
      - 80:80
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
    depends_on:
      - db
    links:
      - db
    volumes:
      - wordpress:/var/www/html

  db:
    image: mysql:5.7
    command: mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
    environment:
      MYSQL_ROOT_PASSWORD: wordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
    volumes:
      - db_data:/var/lib/mysql
    ports:
      - 3306:3306
volumes:
  wordpress:
  db_data:
```


## ステップ４ - wordpressを立ち上げる。

`docker comopse`コマンドでECSに環境を立ち上げます。（`docker-compose`コマンドとは異なるので注意

```
docker compose up
```


## ステップ５ - 立ち上がった環境を確認する。

`docker compose ps`を行うことで立ち上がった環境のURL等を確認することができます。
これで立ち上がった環境にアクセスできます。
（下の例ではURLパス等は変えてあります）

```
$ docker compse ps
ID                                               NAME                REPLICAS            PORTS
wordpredd-dev-DbService-zK9GBBBBBBBBBBBB         db                  1/1                 dev-LoadB-1EGSXXXXXHUNTS-f19e4c2xxxxxxx88.elb.ap-northeast-1.amazonaws.com:3306->3306/tcp
dev-WordpressService-XOJJJEOKKKKKKADWDDDDDDSSS   wordpress           1/1                 dev-LoadB-1EGSXXXXXHUNTS-f19e4c2xxxxxxx88.elb.ap-northeast-1.amazonaws.com:80->80/tcp
```


## おまけ - 環境の落とし方

次のコマンドで綺麗さっぱり環境を削除することができます。

```
docker compose down
```
