---
title: Sonarqube雑感
category: tech
description: Sonarqubeの導入検討時にわかったことや期待できることを残しました。
date: "2021-04-19T10:00:00.000Z"
---

Sonarqubeを導入検討していた際に分かったことや期待できることを残します。


* バグやコードスメルなどの静的解析はいい感じだと思った。
  * プルリクエストの差分だけをチェックできるのは良いと思った
  * コードの品質部分をプルリクエストの際に機械的に打ち取れると人間が本質的なレビューに集中できそう
  * ただし、マイナーなライブラリには対応していない
    * そもそもこれはマイナーなライブラリを使うこと自体のリスクをちゃんと考えるべき
* 品質をA~Eのレーティングで表示しているので、非エンジニアにも状況を説明しやすい
* Cognitive Complexityの概念が面白い
* テストカバレッジも同時に見えるのでシステムの品質がわかりやすい
* コードのどの行に問題が出ているのか表示されるのでわかりやすい
* 問題をissueとしてリストアップされるので管理しやすい
* sonarqubeのdockerが扱いづらい
  * 検証のためにECSにあげようとしたら、ulimitsの設定とかメモリの設定とか起動時の引数の設定とかでつまづいた
    * 素直にSaaS版で検証したほうが良かったかもしれん
* アップロードするコードの量で課金されるので、継続的に開発するものに絞れば良いと思う