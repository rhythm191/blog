---
title: FastifyのJSONスキーマからOpenAPIのスペックファイルを生成する方法
category: tech
description: FastifyのJSONスキーマからOpenAPIのスペックファイルを生成する方法を解説します。
date: "2021-08-09T10:00:00.000Z"
---

FastifyのJSONスキーマからOpenAPIのスペックファイルを生成する方法を解説します。<br />
サンプルプログラムはこちらです。

https://github.com/rhythm191/fastify-oas-example


## fastifyのJSONスキーマとは

FastifyではAPIのリクエストやレスポンス、ヘッダーをJSON Schemaを定義することができます。
この定義をすることで、リクエストのバリデーションやアウトプットのシリアライズの高速化に寄与します。

例えば、id, name, tagのフィールドを持つ `/pets` APIを定義するには次の通りです。

```
fastify.get(
    "/",
    {
        schema: {
            description: "post some data",
            tags: ["pets"],
            response: {
                200: {
                    description: "Successful response",
                    type: "array",
                    items: {
                        type: "object",
                        required: ["id", "name", "tag"],
                        properties: {
                            id: { type: "number" },
                            name: { type: "string" },
                            tag: { type: "string" },
                        },
                    },
                },
            },
        },
    },
    (req, reply) => {
        reply.send([
            { id: 1, name: "dog", tag: "animal" },
            { id: 2, name: "cat", tag: "animal" },
        ]);
    },
);
```

## JSONスキーマからOpenAPIを生成する

この定義を使ってOpenAPI Specificationを作成するのが [fastify-swagger](https://github.com/fastify/fastify-swagger) です。
fastify-swaggerでOpenAPIの基本的な定義をしつつ、`fastify.swagger()`メソッドを呼び出すことで、`/documentation`にSwagger UIページを生成することができます。
例えば次のような設定をすれば、`http://localhost/documentation`でOpenAPIの情報を見ることができます。

```
fastify.register(swagger, {
    routePrefix: "/docs",
    openapi: {
        info: {
            title: "Petstore",
            description: "Testing the Fastify swagger API",
            version: "0.2.1",
        },
        servers: [
            {
                url: "http://localhost",
            },
        ],
    },
    uiConfig: {
        docExpansion: "full",
        deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true,
});

fastify.ready((err) => {
    if (err) throw err;
    fastify.swagger();
});
```

<br />
また、`fastify.swagger()`の戻り値自体はOpenAPI Specificationの形式となっているので、このデータをファイルに保存することで、スペックファイルを生成できます。


```
// generate sjon
const responseJson = await server.inject("/docs/json");
fs.writeFileSync("docs/openapi.json", responseJson.payload);

// generate yaml
const responseYaml = await server.inject("/docs/yaml");
fs.writeFileSync("docs/openapi.yaml", responseYaml.payload);
```


<br />
このスペックファイルを使って、OpenAPI generatorを使ってクライアントライブラリを作ったり、Prismでモックサーバを作ることができます。
[サンプルプログラム](https://github.com/rhythm191/fastify-oas-example)では、この仕組みをhuskyを使ってコミット前に自動生成するようにしています。