---
title: RedmineでPOP before SMTP で通知メールを送るための設定
category: tech
description: RedmineでPOP before SMTP で通知メールを送るための設定
date: "2012-01-05T10:00:00.000Z"
---

Redmine は標準で POP before SMTP に対応していない？し、

ググってみたけど、結局綺麗にヒットするのがなかったので、やり方を保存。

解決方法は、”Mailer モデルを改変してメールを送る前に認証をする”

具体的には、

まず、”app\models\Mailer.rb”の 19 行目～ 28 行目で接続先の SMTP サーバの設定を行う。

```ruby
require 'net/pop'

ActionMailer::Base.delivery_method = :smtp # デフォルトSMTPらしいのでいらないかも
ActionMailer::Base.smtp_settings = {
  :address => 'smtp.hoge.fuga.com', # SMTPサーバのアドレス
  :port => 25,
  :domain => 'localhost', # メールを送信する自身のドメイン
  :authentication => 'none' # 認証はなし
}
```

さらに、95 行目からの reminder メソッド内で POP 認証を行う。

### POP before SMTP の設定

`Net::POP3.auth_only('pop-b.css.fujitsu.com', 110, 'ユーザ名', 'パスワード')``

おわり。
