---
title: dependabotの使ってみた
category: tech
description: dependabotの使ってみた
date: "2019-11-16T10:00:00.000Z"
---

Dependabot は依存ライブラリのアップデートを監視し、自動的に更新用のプルリクエストを作ってくれるボットです。
さらに、設定次第でセキュリティアップデートを自動でマージすることもできます。
Github が無料で提供しています。（ありがてぇ

## インストール

[ここ](https://github.com/marketplace/dependabot-preview) からインストールして、利用するリポジトリを選択します。

## 設定ファイル

利用するリポジトリに `.dependabot/config.yml` で監視するライブラリやマージする条件を決めます。
[公式のドキュメント](https://dependabot.com/docs/config-file/)を参考に yaml ファイルを作成し、
[公式のバリデーター](https://dependabot.com/docs/config-file/validator/)でチェックすると良いです。

うちの rails プロジェクトはこんな感じ。

```
version: 1

update_configs:
  - package_manager: "ruby:bundler"
    directory: "/"
    update_schedule: "daily" # "live" or "daily", "weekly", "monthly" が選べる
    target_branch: "master"
    # default_reviewers:
    #  - "rhythm191"
    # default_assignees:
    #  - "rhythm191"
    allowed_updates:
      - match:
          dependency_type: "development"
          # Supported dependency types:
          # - "development"
          #   Development dependency group (supported by some package managers)
          # - "production"
          #   Production dependency group (supported by some package managers)
          # - "direct"
          #   Direct/top-level dependencies
          # - "indirect"
          #   Indirect/transient/sub-dependencies
          # - "all"
          update_type: "all"
          # Supported update types:
          # - "security"
          # - "all"
      - match:
          dependency_type: "production"
          update_type: "security"
      - match:
          dependency_name: "holiday_jp"
    automerged_updates:
      - match:
          dependency_name: "holiday_jp"
          update_type: "semver:minor"

  - package_manager: "javascript"
    directory: "/"
    update_schedule: "daily"
    target_branch: "master"
    automerged_updates:
      - match:
          dependency_type: "development"
          # Supported dependency types:
          # - "development"
          # - "production"
          # - "all"
          update_type: "all"
          # Supported updates to automerge:
          # - "security:patch"
          #   SemVer patch update that fixes a known security vulnerability
          # - "semver:patch"
          #   SemVer patch update, e.g. > 1.x && 1.0.1 to 1.0.3
          # - "semver:minor"
          #   SemVer minor update, e.g. > 1.x && 2.1.4 to 2.3.1
          # - "in_range"
          #   matching the version requirement in your package manifest
          # - "all"
```

設定の勘所だけど、

- update_schedule: "live" はちょっと頻度が多すぎると思う。結局人が確認してマージするからライブラリの量によっては大変だと思う
- default_reviewers, default_assignees は正直通知がうっとおしい w
- dependency_type: "development" あたりはテストさえしっかりしてればマージしてしまっても良いと思う。

## bot の動作設定

[dependabot のホームページ](https://app.dependabot.com/)から "Setting"を選択して、bot の動作設定をします。
特に一番下の "Allow auto-merging to be enabled on projects" をチェックをつけないと自動マージが有効になりません。
後、時間が UTC なので日本時間との時差に注意が必要です。（10:00~17:00 に動かしたいなら 01:00〜08:00 に設定が必要です）
