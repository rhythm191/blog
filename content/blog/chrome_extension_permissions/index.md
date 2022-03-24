---
title: Chrome拡張機能のpermissions
category: tech
description: Chrome extension manifestに記載するpermissionsの内容を解説します。
date: "2022-03-24T10:00:00.000Z"
---


Chrome拡張機能のmanifestに記載するパーミッション（permissions）の内容を解説します。


## 許可のタイミング


まずパーミッションの指定方法には２つあり、

1. 拡張機能をインストールする際に許可をしてもらう必須のもの（permissions）
2. インストール時ではなく、実行時に許可のリクエストをするもの（optional_permissions）

前者はmanifestファイル内で `permissions` として指定し、後者は `optional_permissions` を指定します。

例えば、ストレージ必ずアクセスする必要があるが、ブックマークには実行時に許可をもらう場合、マニュフェストに次のように記述します。

```
"permissions": [
  "storage",
],
"optional_permissions": [
  "bookmarks"
],
```

また、 `permissions` で許可されたものはコード上でそのまま使えるが、`optional_permissions` で指定したものはコード上で許可をもらう必要があります。

```
// permissions の場合はそのまま使える
chrome.storage.local.set({'key': value}, function () {
  doSomething();
});


// optional_permissions の場合は許可をもらう必要がある
chrome.permissions.request({
  permissions: ['bookmarks'],
  origins: ['https://www.google.com/']
}, (granted) => {
  // コールバックの引数(granted)がtrueなら許可された
  if (granted) {
    doSomething();
  } else {
    doSomethingElse();
  }
});
```



## 許可の種類

許可が必要な全要素は次のページを参照するとよい。

https://developer.chrome.com/docs/extensions/mv3/declare_permissions/

基本的には `chrome.xxx` を使う場合は `xxx` のパーミッションの指定が必要になります。
ここからはそれ以外で特に重要なものを解説していきます。


### activeTab

`activeTab` はユーザーが拡張機能を実行した際に現在アクティブとなっているタブに対してアクセスする際にこの権限が必要になります。
例えばツールバー上の拡張機能を実行した際にアクティブなタブに対して何か実行したい場合にこれを指定します。

よくある使い方として、拡張機能のボタンを押したときに、アクティブなタブにJavaScriptを注入したい場合はこのように使います。

```
{
  "manifest_version": 3
  "permissions": ["activeTab"],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_title": "inject script"
  },
  // ...
```

```
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  });
});
```



### unlimitedStorage

拡張機能はローアルストレージの使用量を5MBと制限がされているが、この `unlimitedStorage` が許可されると制限がなくなります。
5MBでは足りない場合にこれを指定すると良い。
