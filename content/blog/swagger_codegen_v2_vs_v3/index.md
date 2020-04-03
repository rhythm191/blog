---
title: Swagger Codegen と OpenAPI generatorの比較(2020/02版)
category: tech
description: Swagger(OpenAPI)で API を作り、Swagger Codegen や OpenAPI generator で API のスタブを自動生成する場合の対応言語のの違いをまとめてみました
date: "2020-02-20T10:00:00.000Z"
---

Swagger(OpenAPI)で API を作り、Swagger Codegen や OpenAPI generator で API のスタブを自動生成する場合の対応言語のの違いをまとめてみました。
基本的に OpenAPI Specification v3 で YAML/JSON のファイルを作成し、OpenAPI generator でコード生成するのが良いと思いました。

[William](https://github.com/wing328) さんにいろいろ教えてもらいました。ありがとうございます。

対象としているライブラリのバージョンは次のとおりです。

- Swagger Codegen v2: 2.4.12
- Swagger Codegen v3: 3.0.16
- OpenAPI generator v4: 4.2.3

サーバー側のコードです。Swagger Codegen と OpenAPI generator で異なる名称の場合はかっこ書きしています。

|                                       | Swagger Codegen v2   | Swagger Codegen v3 | OpenAPI generator v4         |
| ------------------------------------- | -------------------- | ------------------ | ---------------------------- |
| ada-server                            | ○                    | ×                  | ○                            |
| aspnetcore                            | ○                    | ○                  | ○                            |
| pistache-server / cpp-pistache-server | ○ ( pistache-server) | ×                  | ○ (cpp-pistache-server)      |
| cpp-qt5-qhttpengine-server            | ×                    | ×                  | ○                            |
| restbed / cpp-restbed-server          | ○ (restbed)          | ×                  | ○ (cpp-restbed-server)       |
| nancyfx / csharp-nancyfx              | ○ (nancyfx)          | ×                  | ○ (csharp-nancyfx)           |
| erlang-server                         | ○                    | ×                  | ○                            |
| fsharp-functions (beta)               | ×                    | ×                  | ○                            |
| fsharp-giraffe-server (beta)          | ×                    | ×                  | ○                            |
| go-gin-server                         | ×                    | ×                  | ○                            |
| go-server                             | ○                    | ○                  | ○                            |
| graphql-nodejs-express-server         | ×                    | ×                  | ○                            |
| haskell                               | ○                    | ×                  | ○                            |
| inflector / java-inflector            | ○ (inflector)        | ○ (inflector)      | ○ (java-inflector)           |
| msf4j / java-ms4j                     | ○ (msf4j)            | ×                  | ○ (java-ms4j)                |
| java-pkmst                            | ○                    | ○                  | ○                            |
| java-play-framework                   | ○                    | ○                  | ○                            |
| undertow / java-undertow-server       | ○ (undertow)         | ×                  | ○ (java-undertow-server)     |
| java-vertx                            | ○                    | ×                  | ○                            |
| java-vertx-web (beta)                 | ×                    | ×                  | ○                            |
| jaxrs                                 | ○                    | ×                  | ×                            |
| jaxrs-cxf                             | ○                    | ○                  | ○                            |
| jaxrs-cxf-cdi                         | ○                    | ○                  | ○                            |
| jaxrs-cxf-extended                    | ×                    | ×                  | ○                            |
| jaxrs-jersey                          | ×                    | ○                  | ○                            |
| jaxrs-resteasy                        | ○                    | ○                  | ○                            |
| jaxrs-resteasy-eap                    | ○                    | ○                  | ○                            |
| jaxrs-spec                            | ○                    | ○                  | ○                            |
| kotlin-server                         | ○                    | ○                  | ○                            |
| kotlin-spring                         | ×                    | ×                  | ○                            |
| kotlin-vertx (beta)                   | ×                    | ×                  | ○                            |
| nodejs-server                         | ○                    | ○                  | △ (nodejs-server-deprecated) |
| nodejs-express-server (beta)          | ×                    | ×                  | ○                            |
| php-laravel                           | ×                    | ×                  | ○                            |
| lumen / php-lumen                     | ○ (lumen)            | ×                  | ○ (php-lumen)                |
| php-silex                             | ○                    | ×                  | ○                            |
| slim                                  | ○                    | ×                  | △ (php-slim-deprecated)      |
| php-slim4                             | ×                    | ×                  | ○                            |
| php-symfony                           | ○                    | ×                  | ○                            |
| ze-ph / php-ze-ph                     | ○ (ze-ph)            | ×                  | ○ (php-ze-ph)                |
| python-aiohttp                        | ×                    | ×                  | ○                            |
| python-blueplanet                     | ×                    | ×                  | ○                            |
| python-flask                          | ○                    | ○                  | ○                            |
| rails5 / ruby-on-rails                | ○ (rails5)           | ×                  | ○ (ruby-on-rails)            |
| sinatra / ruby-sinatra                | ○ (sinatra)          | ×                  | ○ (ruby-sinatra)             |
| rust-server                           | ○                    | ×                  | ○                            |
| finch / scala-finch                   | ○ (finch)            | ×                  | ○ (scala-finch)              |
| scala-lagom-server                    | ×                    | ×                  | ○                            |
| scala-play-server                     | ×                    | ×                  | ○                            |
| scalatra                              | ○                    | ×                  | ○                            |
| scala-akka-http-server                | ×                    | ○                  | ×                            |
| spring                                | ○                    | ○                  | ○                            |

クライアント側のコードです。

|                                    | Swagger Codegen v2 | Swagger Codegen v3 | OpenAPI generator v4            |
| ---------------------------------- | ------------------ | ------------------ | ------------------------------- |
| ada                                | ○                  | ×                  | ○                               |
| android                            | ○                  | ×                  | ○                               |
| apex                               | ○                  | ×                  | ○                               |
| bash                               | ○                  | ×                  | ○                               |
| c                                  | ×                  | ×                  | ○                               |
| clojure                            | ○                  | ×                  | ○                               |
| qt5cpp / cpp-qt5-client            | ○ (qt5cpp)         | ×                  | ○ (cpp-qt5-client)              |
| cpprest / cpp-restsdk              | ○ (cpprest)        | ×                  | ○ (cpp-restsdk)                 |
| tizen / cpp-tizen                  | ○ (tizen)          | ×                  | ○ (cpp-tizen)                   |
| csharp                             | ○                  | ○                  | ○                               |
| csharp-dotnet2                     | ○                  | ○                  | △ ※deprecated                   |
| csharp-netcore                     | ×                  | ×                  | ○                               |
| dart                               | ○                  | ×                  | ○                               |
| dart-dio                           | ×                  | ×                  | ○                               |
| dart-jaguar                        | ○                  | ×                  | ○                               |
| eiffel                             | ○                  | ×                  | ○                               |
| elixir                             | ○                  | ×                  | ○                               |
| elm                                | ○                  | ×                  | ○                               |
| erlang-client                      | ○                  | ×                  | ○                               |
| erlang-proper                      | ×                  | ×                  | ○                               |
| flash                              | ○                  | ×                  | ○                               |
| go                                 | ○                  | ×                  | ○                               |
| go-experimental (experimental)     | ×                  | ×                  | ○                               |
| groovy                             | ○                  | ×                  | ○                               |
| haskell-http-client                | ○                  | ×                  | ○                               |
| java                               | ○                  | ○                  | ○                               |
| javascript                         | ○                  | ○                  | ○                               |
| javascript-closure-angular         | ○                  | ×                  | ○                               |
| javascript-flowtyped               | ×                  | ×                  | ○                               |
| jaxrs-cxf-client                   | ○                  | ○                  | ○                               |
| jmeter                             | ○                  | ×                  | ○                               |
| kotlin                             | ○                  | ○ (kotlin-clinet)  | ○                               |
| lua                                | ○                  | ×                  | ○                               |
| nim (beta)                         | ×                  | ×                  | ○                               |
| objc                               | ○                  | ×                  | ○                               |
| ocaml                              | ×                  | ×                  | ○                               |
| perl                               | ○                  | ×                  | ○                               |
| php                                | ○                  | ○                  | ○                               |
| powershell                         | ○                  | ×                  | ○                               |
| python                             | ○                  | ○                  | ○                               |
| python-experimental (experimental) | ×                  | ×                  | ○                               |
| r                                  | ○                  | ×                  | ○                               |
| ruby                               | ○                  | ×                  | ○                               |
| rust                               | ○                  | ×                  | ○                               |
| scala                              | ○                  | ○                  | △ (scala-httpclient-deprecated) |
| akka-scala / scala-akka            | ○ (akka-scala)     | ×                  | ○ (scala-akka)                  |
| scala-gatling                      | ○                  | ×                  | ○                               |
| scalaz                             | ○                  | ×                  | ○                               |
| swift                              | ○                  | ×                  | △ (swift-deerecated)            |
| swift3                             | ○                  | ○                  | △ (swift3-deprecated)           |
| swift4                             | ○                  | ○                  | ○                               |
| swift5                             | ○                  | ○                  | ○                               |
| typescript-angular                 | ○                  | ○                  | ○                               |
| typescript-angularjs               | ○                  | ×                  | ○                               |
| typescript-aurelia                 | ○                  | ×                  | ○                               |
| typescript-axios                   | ×                  | ×                  | ○                               |
| typescript-fetch                   | ○                  | ×                  | ○                               |
| typescript-inversify               | ○                  | ×                  | ○                               |
| typescript-jquery                  | ○                  | ×                  | ○                               |
| typescript-node                    | ○                  | ×                  | ○                               |
| typescript-redux-query             | ×                  | ×                  | ○                               |
| typescript-rxjs                    | ×                  | ×                  | ○                               |
