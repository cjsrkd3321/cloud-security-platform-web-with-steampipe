resource "aws_instance" "ssh-instance-with-otp" {
  ami           = "ami-0b1d3b1941f23c7d5" // ap-northeast-2
  instance_type = "t2.micro"

  subnet_id                   = data.aws_subnet.this.id
  availability_zone           = "ap-northeast-2a"
  associate_public_ip_address = true

  iam_instance_profile = "ec2-role-test"

  user_data = <<-EOF
    #!/bin/bash
    yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
    yum install google-authenticator.x86_64 -y
    cp /etc/pam.d/su /etc/pam.d/su.bak
    awk '{if (NR==2) { print "auth required pam_google_authenticator.so nullok"; print $0 } else { print $0 } }' /etc/pam.d/su.bak > /etc/pam.d/su
  EOF
}