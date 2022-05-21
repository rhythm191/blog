---
title: TypeORMのv0.2からv0.3での大きな変更とか
category: tech
description: TypeORMのv0.2からv0.3で大きく考え方が変わった部分やいくつかのメソッドがdeprecatedされているので主要なものを紹介したいと思います。
date: "2022-05-21T22:00:00.000Z"
---

TypeORMのv0.2からv0.3で大きく変わった部分やいくつかのメソッドがdeprecatedされているので主要なものを紹介したいと思います。
今回紹介するのは次の３つ。

1. DBへのコネクションの接続に`DataSource`クラスの追加
2. `findOne`メソッドの引数と返却値の変更
3. `find*`系のメソッドの引数の形式の変更

全ての変更を追いたい場合は[Release 0.3.0](https://github.com/typeorm/typeorm/releases/tag/0.3.0)をみると良いです。


## DBへのコネクションの接続方法の変更

v0.3でのアップデートでインパクトの大きい変更が、DBへのコネクションの接続方法の変更です。<br />
v0.2までは`createConnection`によって`Connection`のインスタンスを生成してDBの接続を管理していましたが、
v0.3からは`DataSource`クラスによってDBの接続を管理します。<br />
この変更によって`createConnection`や`Connection`はdeprecatedになっています。

**v0.2**

```
const config = await getConnectionOptions();

const connection: Connection = await createConnection({
    ...config
});
```
<br />

**v0.3**

```
const dataSource = new DataSource({
    type: "mysql",
    // some config
});

await dataSource.initialize();
```

またこれによってTypeDIとの連携をしていた[typeorm-typedi-extensions](https://www.npmjs.com/package/typeorm-typedi-extensions)がうまく機能しなくなります。
TypeDIと連携したい場合は`DataSource`クラスのインスタンスをDIコンテナで渡せば良さそうです。

```
const dataSource = new DataSource({
    // some config
});

await dataSource.initialize();

Container.set(DataSource, dataSource);

// some repository
const dataSource = Container.get(DataSource);
const repository = dataSource.getRepository(User);
```


## `findOne`メソッドの引数と返却値の変更

v0.3でのアップデートで、もう１つインパクトの大きい変更が`findOne`の変更です。 <br />
v0.2では`findOne`メソッドは第１引数でプライマリキーを、第２引数でオプションを指定していましたが、
v0.3では`FindOptionsWhere`型の引数にまとめられており、プライマリキーはwhere句で指定するようになりました。<br />
また、値がなかった場合の返却値は`undefined`から`null`に変更されています。

**v0.2**

```
const repository = getRepository(User);
const user: User | undefined = await repository.findOne(id, { relations: ["photo"] });
```
<br />

**v0.3**


```
const repository = dataSource.getRepository(User);
const user: User | null = await repository.findOne({ where: { id: id }, relations: { photo: true } });
```


## `find*`系のメソッドの引数の形式の変更

`find*`系のメソッドのオプションの指定方法が大きく変わりました。
v0.2でselectやrelationsの指定は文字列で行なっていましたが、v0.3ではオブジェクトでの指定に統一されました。
また、これによってrelations先のカラムの指定やソートが行えるようになりました。


**v0.2**

```
const users = await repository.find({
    select: ["firstName", "lastName"]
    where: {
      { firstName: "john", lastName: "jeo" },
    },
    relations: ["project"],
    order: {
        id: "DESC",
        firstName: "ASC",
    },
});
```
<br />

**v0.3**


```
const users = await repository.find({
    select: {
        id: true,
        firstName: true,
        lastName: true,
        project: {
            id: true,
            name: true,
            importance: true,
        }
    }
    where: {
        project: { name: "TypeORM", initials: "TORM" },
    },
    relations: { project: true }
    order: {
        id: "DESC",
        project: { importance: "ASC" }
    },
});
```

