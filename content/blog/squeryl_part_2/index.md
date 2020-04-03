---
title: Play2.0と学ぶsqueryl (2) OneToManyの関係の定義
category: tech
description: Play2.0と学ぶsqueryl (2) OneToManyの関係の定義
date: "2012-10-18T10:00:00.000Z"
---

前回、Play1.x のチュートリアルにそって YABE の User クラスを定義しました。

今回は Post クラスの実装を通じて、squeryl での OneToMany の関連の定義の仕方を学びます。

まずは Post クラスを定義します。app/models/Post.scala を作成して以下のように記述します。

```scala
package models

import org.squeryl.KeyedEntity
import org.squeryl._
import org.squeryl.dsl._
import org.squeryl.PrimitiveTypeMode._
import java.util.Date

case class Post(title: String, postedAt: Date, content: String, author_id: Long = 0) extends KeyedEntity[Long] {
  val id: Long = 0
}
```

スキーマのインスタンスである YabeDB.scala も修正します。

```scala
package models

import org.squeryl.PrimitiveTypeMode._
import org.squeryl._
import org.squeryl.annotations.Column
import org.squeryl.dsl._

object YabeDB extends Schema {

  val users = table[User]("user_tb")

  val posts = table[Post]

  on(posts)(p => declare(
    p.content is (dbType("text"))))

}
```

on メソッドによってインデックスやユニークキー、DB の定義を細かく指定することができます。

ここでは、@Lob アノテーションを使っていた部分を dbType 関数を利用して、投稿の内容を保持する大きな文字列型データベースを使用します。
OneToMany の関連

User クラスと Post クラスの関連情報を定義します。

それぞれの Post は 1 つの User によって所有され、各 User は複数の Post インスタンスを所有することができるという関連情報を持たせます。

squeryl では stateless な関連と stateful な関連を持つことができます。ここでは関連情報の定義の方法だけに注力するために stateless な関連の定義だけやります。

stateless と stateful の違いは次回以降で解説します(すると思います)。

まずはスキーマのインスタンスに関連情報を定義するために YabeDB.scala を修正します。

```scala
package models

import org.squeryl.PrimitiveTypeMode._
import org.squeryl._
import org.squeryl.annotations.Column
import org.squeryl.dsl._

object YabeDB extends Schema {

  val users = table[User]("user_tb")

  val posts = table[Post]

  on(posts)(p => declare(
    p.content is (dbType("text"))))

  val usersPosts =
    oneToManyRelation(users, posts).via((u, p) => u.id === p.author_id)

}
```

スキーマのインスタンスに oneToManyRelation メソッドを利用して、インスタンス同士のどのフィールドによって関連付けを行うかを定義します。

User クラスと Post クラスからそれぞれの情報が取得できるようにフィールドを定義します。

```scala
package models

import org.squeryl.KeyedEntity
import org.squeryl._
import org.squeryl.dsl._
import org.squeryl.PrimitiveTypeMode._

case class User(email: String, password: String, fullname: String, isAdmin: Boolean) extends KeyedEntity[Long] {
  val id: Long = 0

  lazy val posts: OneToMany[Post] = YabeDB.usersPosts.left(this)

}
```

```scala
package models

import org.squeryl.KeyedEntity
import org.squeryl._
import org.squeryl.dsl._
import org.squeryl.PrimitiveTypeMode._
import java.util.Date

case class Post(title: String, postedAt: Date, content: String, author_id: Long = 0) extends KeyedEntity[Long] {
  val id: Long = 0

  lazy val user: ManyToOne[User] = YabeDB.usersPosts.right(this)

}
```

もちろんテストも書きます。

User と Post との関連付けは associate メソッドを使います。

associate メソッドを使うことにより、Post インスタンスへ User インスタンスの関連する id を設定できるとともに DB への保存も行われます。

```scala
package models

import play.api.test._
import play.api.test.Helpers._
import org.specs2.mutable.Specification
import org.squeryl._
import org.squeryl.PrimitiveTypeMode._
import java.util.Date

class PostSpec extends Specification {

  "Post" should {

    "creat new Post" in {
      running(FakeApplication()) {

        inTransaction {

          val user: User = YabeDB.users.insert(User("bob@gmail.com", "secret", "Bob", false))

          YabeDB.posts.size must beEqualTo(0)

          val post: Post = Post("My first post", new Date(), "Hellow world")

          // UserとPostを関連づける
          user.posts.associate(post)

          YabeDB.posts.size must beEqualTo(1)

          val bobPosts: List[Post] = YabeDB.posts.where(p => p.author_id === user.id).toList

          bobPosts.size must beEqualTo(1)

          // Postインスタンスを直接とってきたものの検証
          val firstPost = bobPosts(0)

          firstPost must not be null
          firstPost.author_id must beEqualTo(user.id)
          firstPost.title must beEqualTo("My first post")
          firstPost.content must beEqualTo("Hellow world")

          // Userインスタンスから取得したPostインスタンスの検証
          val bob: User = YabeDB.users.where(u => u.id === user.id).head
          val firstPost2: Post = bob.posts.toList(0)

          firstPost2 must not be null
          firstPost2.author_id must beEqualTo(user.id)
          firstPost2.title must beEqualTo("My first post")
          firstPost2.content must beEqualTo("Hellow world")

        }
      }
    }
  }
}
```

次回は ManyToMany とか stateless, stateful な関係の違いとかをまとめる予定。
