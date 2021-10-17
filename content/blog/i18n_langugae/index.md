---
title: 国際化対応の言語情報の持ち方について
category: tech
description: 国際化対応(internationalization)や多言語対応での言語情報の持ち方について考察しました。
date: "2021-10-17T10:00:00.000Z"
---

国際化対応(internationalization)や多言語対応での言語情報の持ち方について考察しました。

## TLTR

ブラウザのAccept-Languageに従って、`ja`や`en`の形式を使い、リージョン情報が必要な場合のみ`zh-TW`のように記述する。


## ブラウザの場合

ブラウザの国際化対応では多くの場合Accept-Languageの仕様に従ったライブラリが多い。railsやlaravelもこのAccept-Languageの仕様に従っている。
Accept-Languageは[RFC 7231](https://datatracker.ietf.org/doc/html/rfc7231#section-5.3.5) で定められている通り、言語を表す2～3文字の基本言語タグと、任意で追加のサブタグを'-'で区切って続ける。
基本的には`ja`や`en`の２文字の基本言語タグが使われ、中国語などの地域によって言語が違うもの（簡体字と繁体字）は`zh-CH`や`zh-TW`と、リージョンの情報が追加される。


## iOSの場合

iOSは[ISO 639](https://ja.wikipedia.org/wiki/ISO_639-1%E3%82%B3%E3%83%BC%E3%83%89%E4%B8%80%E8%A6%A7)に従っているのでlanguageCodeとしては`ja`、`en`の２文字を返す。iOSにはpreferredLanguagesというものがあり、これは`language - region` または`language - script - region`を返すので、`en-US`や`zh-Hans-US`みたいな値が返ってくる


## Androidの場合

Androidの場合はIETF BCP 47（現在は [RFC 5646](https://datatracker.ietf.org/doc/html/rfc5646) と[RFC 4647](https://datatracker.ietf.org/doc/html/rfc4647e)に従っている。
これもブラウザの仕様に近く、基本的には`ja`や`en`の２文字の基本言語タグが使われ、中国語などの地域によって言語が違うもの（簡体字と繁体字）は`zh-CH`や`zh-TW`と、リージョンの情報が追加される。ただし、`zh-Hant-US`みたいな表現もとりうる。

## 参考リンク

* https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Accept-Language
* https://qiita.com/uhooi/items/a9c9d8b923005028ce4e
* https://developer.android.com/reference/java/util/Locale


