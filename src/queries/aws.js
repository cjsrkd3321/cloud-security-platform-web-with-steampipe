// Account

// IAM
export const IAM_NO_MFA_USER = `
  SELECT 
    user_arn, 
    password_enabled, 
    mfa_active 
  FROM 
    aws.aws_iam_credential_report 
  WHERE mfa_active IS false
`;

// VPC
export const VPC_SG_INGRESS_ANY_OPEN = `
  SELECT 
    group_name, 
    group_id, 
    vpc_id, 
    owner_id, 
    ip_protocol, 
    from_port, 
    to_port, 
    cidr_ip, 
    cidr_ipv6
  FROM 
    aws.aws_vpc_security_group_rule 
  WHERE 
    type = 'ingress' 
    and (cidr_ip = '0.0.0.0/0' or cidr_ipv6 = '::/0')
`;

// EC2
export const EC2_OPTIONAL_IMDS = `
  SELECT
    arn, 
    instance_id, 
    metadata_options ->> 'HttpTokens' as HttpTokens, 
    metadata_options ->> 'HttpPutResponseHopLimit' as HopLimit 
  FROM 
    aws.aws_ec2_instance
  WHERE
    metadata_options ->> 'HttpEndpoint' = 'enabled'
`;

export const EC2_PUBLIC_IP = `
  SELECT 
    arn, 
    instance_id, 
    private_ip_address, 
    public_ip_address 
  FROM 
    aws.aws_ec2_instance 
  WHERE 
    public_ip_address IS NOT null
`;
