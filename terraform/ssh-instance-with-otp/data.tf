data "aws_vpc" "this" {}

data "aws_subnet" "this" {
  vpc_id            = data.aws_vpc.this.id
  availability_zone = "ap-northeast-2a"
}