data "aws_iam_policy_document" "ec2-assume-role-policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ec2-role" {
  name                = "cspw2s_role"
  assume_role_policy  = data.aws_iam_policy_document.ec2-assume-role-policy.json
  managed_policy_arns = ["arn:aws:iam::aws:policy/ReadOnlyAccess", "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"]

  inline_policy {
    name = "GenerateCredentialReportPolicy"

    policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Action   = ["iam:GenerateCredentialReport"]
          Effect   = "Allow"
          Resource = "*"
        },
      ]
    })
  }
}
