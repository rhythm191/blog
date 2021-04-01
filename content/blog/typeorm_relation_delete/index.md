---
title: TypeORMで子エンティティへの削除処理の伝搬について
category: tech
description: TypeORMでエンティティの削除処理を行う際に関係する子エンティティに対して伝搬する方法がいくつかありますが、ケースによってアプローチが異なるので解説します。
date: "2021-04-01T10:00:00.000Z"
---

TypeORMでエンティティの削除処理を行う際に関係する子エンティティに対して伝搬する方法がいくつかありますが、ケースによってアプローチが異なるので解説します。
物理削除と論理削除の組み合わせとして次の４つが考えられます。

* 親エンティティを物理削除し、子エンティティを物理削除するケース
* 親エンティティを物理削除し、子エンティティを論理削除するケース
* 親エンティティを論理削除し、子エンティティを物理削除するケース
* 親エンティティを論理削除し、子エンティティを論理削除するケース

以下の例では UserとPostエンティティが１対多の関係の例を紹介します。


## deleteとremoveの違いについて

まず初めに解説することとして、deleteとremoveの挙動の違いです。
removeはlistenersやsubscribersがキックされますが、deleteはキックされず、エンティティの削除用のSQLのみ発行されます。
この違いのため、以降の話はremoveを使った時の挙動となります。

## 親エンティティを物理削除し、子エンティティを物理削除するケース

この場合は`@OneToMany` や `@OneToOne`でcascadeを使うと良いです。このカスケードを指定することで削除時に紐づいている子エンティティを一緒に削除することができます。

cascadeは"insert"、"update"、"remove"、"soft-remove"、"recover"を配列で指定できます。
また、"true"を指定した場合は全てをカスケードの対象とすることができます。

```
@Entity()
export class User {
    @OneToMany(() => Post, (post) => post.user, { cascade: ["remove"]})
    @JoinColumn()
    posts: Post[];
}
```

## 親エンティティを論理削除し、子エンティティを論理削除するケース  

このケースもcascadeを使うことで解決することができます。cascadeで"soft-remove"を指定することで親エンティティを論理削除した際に子エンティティを論理削除できます。


```
@Entity()
export class User {
    @OneToMany(() => Post, (post) => post.user, { cascade: ["soft-remove"]})
    @JoinColumn()
    posts: Post[];
}
```



## 親エンティティを物理削除し、子エンティティを論理削除するケース

このケースの場合はlisteners機能を使って物理削除の前に、子エンティティを削除すると良いです。


```
@Entity()
export class User {
    @OneToMany(() => Post, (post) => post.user)
    @JoinColumn()
    posts: Post[];

    @BeforeRemove()
    beforeRemove() {
        getManager().softRemove(this.posts);
    }
}
```

## 親エンティティを論理削除し、子エンティティを物理削除するケース

このケースは特殊な処理が必要です。まず、論理削除はdeleted_atなど削除フラグが更新される処理なので、"Remove"ではなく"Update"のイベントが発行されます。そのため、親エンティティのUpdateを監視する必要があります。
また、Updateのイベントをサブスクライブするため、他の更新処理と区別できる必要があります。

そこで、EventSubscriberの機能でUpdateのイベントを拾いつつ、softRemoveする際にその情報を付与することで解決します。

まず、EventSubscriberは次のように作ります。

```
@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface {
    listenTo() {
        return User;
    }

    beforeUpdate(event: UpdateEvent<User>) {
        // softRemoveする際にdataパラメータで"softRemove: true"を渡した時だけ子エンティティを削除する
        if (event.queryRunner.data.softRemove) {
            event.manager.delete(Post, { userId: event.entity.id });
        }
    }
}
```

親エンティティを削除する際は、次のように論理削除の情報を付与します。

```
await repository.softRemove(userEntity, { data: { softRemove: true } });
```





