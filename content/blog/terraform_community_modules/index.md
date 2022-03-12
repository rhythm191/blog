---
title: Terraformのコミュニティモジュールのススメ
category: tech
description: Terraformのコミュニティモジュールを使うとインフラのコードの可読性や変更容易性が上がります。
date: "2022-03-12T10:00:00.000Z"
---

Terraformでは多くのコミュニティモジュールが公開されており、
これらのモジュールを使うことで、簡単で、可読性の高いインフラコードを作ることができます。

例えば、VPCとそれに関連するサブネットやゲートウェイを作るには[terraform-aws-mofule/vpc](https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws/latest) を使うことで簡単に実現できます。
また、関連するサブネットやゲートウェイがまとまっているため可読性も高いです。


```
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "my-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["apne1-az1", "apne1-az2", "apne1-az4"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  enable_vpn_gateway = true

  tags = {
    Terraform = "true"
    Environment = "dev"
  }
}
```


コミュニティモジュールでは[Inputs](https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws/latest?tab=inputs)や[Outputs](https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws/latest?tab=outputs)がしっかり定義されているので、moduleのインプットを設計し柔軟にインフラを作ることができるし、後工程で`vpc_id`を指定することも簡単にできます。


AWSに関して言えば、[Awesome Terraform](https://github.com/shuaibiyy/awesome-terraform#community-modules) で紹介されているような
[Terraform AWS modules製](https://github.com/terraform-aws-modules)や[Cloud Posse製](https://github.com/cloudposse)が人気のようです。