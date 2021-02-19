---
title: TypeScriptでGoogle APIsを使おう
category: tech
description: TypeScriptでGoogle APIsを使う方法（フロントエンド、バックエンドの）を解説します。
date: "2021-02-19T10:00:00.000Z"
---

TypeScriptの型システムを有効に使いながらGoogle APIs安全に使っていく方法を解説します。
フロントエンドとバックエンドで使用するライブラリが異なります。


## フロントエンドの場合


フロントエンドでGoogle APIsを使う場合は次の２つ方法があります。

* HTMLにGoogle APIsのロードをインラインで記述する
* Google APIsのJavaScriptを動的にロードするライブラリを使う

どちらの場合もGoogle APIsの型情報を別に用意する必要があるので、npmパッケージから次の型宣言パッケージを追加します。


```
npm i -D @types/google.maps
```


次に、`tsconfig.json` ファイルにGoogle APIsの型をインクルードするように指定します。

```
{
  "compilerOptions": {
    "types": ["google.maps"]
  }
}
```

そしてGoogle APIsをロードしてきます。
HTMLにインラインで記述する場合は次のように書きます。

```
<script async
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY">
</script>
```

または、ライブラリ（[@googlemaps/js-api-loader](https://www.npmjs.com/package/@googlemaps/js-api-loader)）を使って動的にロードすることもできます。


```
npm install @googlemaps/js-api-loader
```

このパッケージは次のように使います。

```
import { Loader } from "@googlemaps/js-api-loader"

const loader = new Loader({
  apiKey: "YOUR_API_KEY",
  version: "weekly",
  // something additional options
});

loader.load().then(() => {
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ address: "東京都千代田区" }, (results, status) => {
    if (status == "OK" && results![0].geometry?.location !== undefined) {
      console.log(results![0].geometry?.location);
    }
  });
});

```


## バックエンドの場合

バックエンドの場合は[@googlemaps/google-maps-services-js](https://www.npmjs.com/package/@googlemaps/google-maps-services-js)を使うと良いです。
このライブラリはTypescriptで作成されており、型情報を持つのでそのまま開発できます。


```
import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

const reuslt = await client.geocode({ params: { address: "東京都千代田区", key: "YOUR_API_KEY" } });

console.log(reuslt.data.results[0].geometry.location)
```



## 参考リンク

* https://developers.google.com/maps/documentation/javascript/using-typescript
* https://developers.google.com/maps/documentation/javascript/overview#Loading_the_Maps_API
