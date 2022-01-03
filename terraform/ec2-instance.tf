resource "aws_instance" "cspw2s" {
  ami           = "ami-0eb14fe5735c13eb5" // ap-northeast-2
  instance_type = "t2.medium"

  subnet_id                   = data.aws_subnet.this.id
  availability_zone           = "ap-northeast-2a"
  associate_public_ip_address = true
  vpc_security_group_ids      = [aws_security_group.this.id]

  iam_instance_profile = aws_iam_instance_profile.this.name

  user_data = <<-EOF
    #!/bin/bash
    sudo yum update -y
    sudo yum install -y git
    sudo amazon-linux-extras install docker
    sudo service docker start
    sudo curl -L https://github.com/docker/compose/releases/download/v2.2.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/bin/docker-compose
  EOF
}

resource "aws_iam_instance_profile" "this" {
  name = "cspw2s_profile"
  role = aws_iam_role.ec2-role.name
}

resource "aws_security_group" "this" {
  name        = "cspw2s_sg"
  description = "Allow TCP 2000 port for service"
  vpc_id      = data.aws_vpc.this.id

  ingress {
    from_port   = 2000
    to_port     = 2000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}