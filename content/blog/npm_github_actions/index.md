---
title: package.jsonのバージョンからnpmパッケージを生成するGitHub Actions
category: tech
description: package.jsonのversionに書かれたバージョン番号をみて、新しくなっていたらnpmパッケージやgitタグ、リリースノートを生成するGitHub Actionsです。
date: "2021-05-29T10:00:00.000Z"
---

package.jsonのversionに書かれたバージョン番号をみて、新しくなっていたらnpmパッケージやgitタグ、リリースノートを生成するGitHub Actionsです。
多分これが一番楽だと思います。

サンプルのリポジトリがこれです。

https://github.com/rhythm191/npm-github-actions-example


これがGitHub Actionsのワークフローです。

```
name: main

env:
  CI: true
on:
  push:
    branches:
      - master

jobs:
  setup:
    name: setup
    runs-on: ubuntu-latest
    outputs:
      version: ${{ steps.package-version.outputs.version }}
      tag-name: v${{ steps.package-version.outputs.version }}
      is-pre-verion: ${{ steps.pre-version.outputs.pre-version }}
      tag-exist: ${{ steps.tag-exist.outputs.exists }}
    steps:
      - name: checkout
        uses: actions/checkout@v2
      - name: setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '14'
          registry-url: "https://npm.pkg.github.com"
      - name: set package version
        id: package-version
        run: node -p -e '`::set-output name=version::${require("./package.json").version}`'
      - name: check pre-release
        id: pre-version
        run: node -p -e '`::set-output name=pre-version::${require("./package.json").version.includes("-")}`'
      - name: check tag exists
        uses: mukunku/tag-exists-action@v1.0.0
        id: check-tag
        with: 
          tag: ${{ steps.package-version.outputs.version }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  publish:
    name: publish
    needs: setup
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v2
      - name: setup Node
        uses: actions/setup-node@v2
        with:
          node-version: 14.x
          registry-url: "https://npm.pkg.github.com"
      - name: Cache node modules
        uses: actions/cache@v2
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-modules-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-modules-
            ${{ runner.os }}-node-
            ${{ runner.os }}-
      # - name: install
      #   run: npm ci
      #   env:
      #     NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      # - name: build
      #   run: npm run build
      # まだpublishされていないバージョンならpublishする
      - name: publish
        run: |
          npx can-npm-publish --verbose && npm publish || echo "Does not publish"
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - name: package-version-to-git-tag
        uses: pkgdeps/git-tag-action@v2
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          github_repo: ${{ github.repository }}
          version: ${{ needs.setup.outputs.version }}
          git_commit_sha: ${{ github.sha }}
          git_tag_prefix: "v"

  release-note:
    name: release note
    needs: [setup, publish]
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v1
      - name: setup Node
        uses: actions/setup-node@v1
        with:
          node-version: 14.x
          registry-url: "https://npm.pkg.github.com"
      - name: set change log
        uses: scottbrenner/generate-changelog-action@master
        id: change-log
      - name: Create a GitHub release
        uses: actions/create-release@v1
        if:  needs.setup.outputs.tag-exist != 'true' && needs.setup.outputs.is-pre-verion != 'true'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ needs.setup.outputs.tag-name }}
          release_name: Release ${{ needs.setup.outputs.tag-name }}
          body: ${{ steps.change-log.outputs.changelog }}

```

