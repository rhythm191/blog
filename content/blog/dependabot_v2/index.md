---
title: Dependabot v2について
category: tech
description: Dependabot v2について調べました
date: "2020-08-03T10:00:00.000Z"
---

Dependabot は依存ライブラリのアップデートを監視し、自動的に更新用のプルリクエストを作ってくれるボットです。
以前バージョン１について[ここ](/dependabot)で紹介しました。バージョン２でGitHubネイティブな機能になり、設定が変わったので紹介します。


## バージョン１との違い

Githubネイティブになったことで、GithubのInsightsにDepdendabotのステータスが表示されるようになりました。
ただし、バージョン１からいくつか機能削除が行われています。
例えば、`dependency_type` でproduction用の依存関係とdevelopment用の依存関係を分けて記述できていましたが、バージョン２では使えません。
また、プルリクエストを自動でマージする機能も削除されています。
この記事は2020/08に書いているので今後機能追加されるかもしれません。


## 設定

Dependabotの設定は`.github/dependabot.yml`に設定ファイルを作成するだけです。
例えば次のような設定をします。
その他の設定項目は[ここ](https://docs.github.com/ja/github/administering-a-repository/configuration-options-for-dependency-updates) を参照してください。


```
# 2 つのパッケージマネージャーの最低限の設定を含む
# 基本的な dependabot.yml ファイル

version: 2
updates:
  # npm のバージョン更新を有効にする
  - package-ecosystem: "npm"
    # 「root」ディレクトリで「package.json」と「lock」ファイルを探す
    directory: "/"
    # npm レジストリの更新を毎日（平日）チェックする
    schedule:
      interval: "daily"

  # Docker のバージョン更新を有効にする
  - package-ecosystem: "docker"
    # 「root」ディレクトリで「Dockerfile」を探す
    directory: "/"
    # 週に 1 回更新を確認する
    schedule:
      interval: "weekly"

```
