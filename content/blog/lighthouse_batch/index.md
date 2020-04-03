---
title: lighthouseで複数ページを測定する方法
category: tech
description: ページの高速化対応のためにたくさんのページの性能測定をしたい場合のtipsを紹介します
date: "2019-10-09T10:00:00.000Z"
---

ページの高速化対応のためにたくさんのページの性能測定をしたい場合の tips を紹介します。
紹介するコードは mac 環境の lighthouse の 3.0.3 で検証しました。

## 環境構築

まずは環境構築します。

```
$ npm init
```

必要なモジュールをインストールします。

```
$ npm install chrome-launcher commander csv-parse lighthouse puppeteer request
```

## 実行コード

URL を記載した CSV ファイルをロードして lighthouse を回すコードが次の通り。

CSV は`uid,url,(mobile|desktop),(auth|noauth)``の形式とする。

user_id, password だけ変えてくれ〜

```
const chromeLauncher = require('chrome-launcher');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const request = require('request');
const util = require('util');
const program = require('commander');

const login_url = 'https://hoge.example.com/login'
const logout_url = 'https://hoge.example.com/logout'
const user_id = 'hogehoge@example.com'
const password = 'password'

const mobile_agent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1t'
const desktop_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36'

(async() => {

  program
    .version('1.0.0')
    .option('-q, --quit', 'lighthouse quit mode')
    .option('-m, --mode <mobile|desktop>', 'mobile or desktop', 'mobile')
    .parse(process.argv);

  if (process.argv.length < 3) {
    program.help();
    return
  }

  const csv_path = program.args[0];

  const opts = {
    chromeFlags: ['--headless'],
    logLevel: 'error',
    output: 'json'
  };

  // quit mode
  if (program.quit) {
    opts.quit = true
  }

  // user_agent
  opts.extraHeaders = {
    "User-Agent": program.mode === 'mobile' ? mobile_agent : desktop_agent
  }

  // Launch chrome using chrome-launcher.
  const chrome = await chromeLauncher.launch(opts);
  opts.port = chrome.port;

  // Connect to it using puppeteer.connect().
  const resp = await util.promisify(request)(`http://localhost:${opts.port}/json/version`);
  const {webSocketDebuggerUrl} = JSON.parse(resp.body);
  const browser = await puppeteer.connect({browserWSEndpoint: webSocketDebuggerUrl});

  // read csv
  const fs = require('fs');
  const csvSync = require('csv-parse/lib/sync'); // requiring sync module

  let sites = csvSync(fs.readFileSync(csv_path));


  console.log("id,url,performance_score,pwa_score,accessibility_score,best_practices_score,seo_score");

  for(let i = 0; i < sites.length; i++) {
    let site = sites[i]
    opts.extraHeaders = {
      "User-Agent": site[2] === 'mobile' ? mobile_agent : desktop_agent
    }

    if (site[3] === 'auth') {

      // ログイン処理の部分。適時修正をする。
      const page = await browser.newPage();
      await page.goto(login_url)
      await page.type('#email', user_id)
      let inputElement = await page.$('#password')
      await inputElement.type(password)
      await inputElement.press('Enter')
    } else {
      const page = await browser.newPage();
      await page.goto(logout_url)
    }

    let result = await lighthouse(site[1], opts, null);
    let lhr = result.lhr
    output_array = [
      site[0],
      lhr.finalUrl,
      lhr.categories.performance.score * 100,
      lhr.categories.pwa.score * 100,
      lhr.categories.accessibility.score * 100,
      lhr.categories['best-practices'].score * 100,
      lhr.categories.seo.score * 100
    ];
    console.log(output_array.join(','))
  }

  await browser.disconnect();
  await chrome.kill();

})();
```

こんな感じで使う。

```
node batch.js -q sites.csv > output_20181012.csv
```
