// Account
export const awsAccount = `
    SELECT 
      organization_id, 
      organization_master_account_id, 
      organization_master_account_email, 
      account_id 
    FROM 
      aws.aws_account
  `;

// IAM
export const awsIamPolicy = `
    SELECT 
      account_id,
      create_date,
      title,
      is_attachable,
      is_attached
    FROM 
      aws.aws_iam_policy 
    WHERE 
      is_aws_managed IS false
  `;
export const awsIamRole = `
    SELECT 
      account_id, 
      name, 
      path 
    FROM 
      aws.aws_iam_role 
    WHERE 
      path NOT LIKE '/aws-%'
  `;
