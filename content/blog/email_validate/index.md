---
title: ひたすら楽するemailのバリデーション
category: tech
description: ブラウザ側にバリデーションを投げてしまおうというお話
date: "2019-05-17T10:00:00.000Z"
---

email のバリデーション処理ってクソ難しく、ググって出てくる正規表現はだいたい問題を抱えているので、
今回はブラウザ側にバリデーションを投げてしまおうというお話です。

## TLTR

`type="email"`を使ってバリデーションしよう。以上。

```
<input type="email">
```

## form で"novalidate"を指定した場合

ブラウザ標準のエラーメッセージが気に入らないなどの理由で、form で"novalidate"を指定した場合は JavaScript 側で制約検証 API を使う必要があります。

例えばこのようは HTML があるとして、

```
<form id="form" novalidate>
  <p>
    <label for="mail">
      <span>Email</span>
      <input type="email" id="mail" name="mail">
      <span class="error" aria-live="polite"></span>
    </label>
  </p>
  <button>Submit</button>
</form>
```

JavaScript で制約検証 API で email の検証をします。

```
var form  = document.getElementById('form');
var email = document.getElementById('mail');
var error = document.querySelector('.error');

email.addEventListener("input", function (event) {
  if (email.validity.valid) {
    error.innerHTML = "";
    error.className = "error";
  }
}, false);
form.addEventListener("submit", function (event) {
  if (!email.validity.valid) {
    error.innerHTML = "Emailのフォーマットが異なっています。";
    error.className = "error active";
    event.preventDefault();
  }
}, false);
```

サーバー側でももちろんチェックスする必要がありますが、
ブラウザ標準に任せればベンダーがきっと直してくれる（はず）なので、脳死してブラウザに任せよう。
