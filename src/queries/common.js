export const isPluginExists = (cloud) => `
    SELECT 
        table_catalog,
        table_schema
    FROM 
        information_schema.columns 
    WHERE 
        table_catalog = 'steampipe' and
        table_schema = '${cloud}' limit 1
`;
