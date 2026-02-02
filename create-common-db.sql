-- Connect to CommonDB and create the tenants table
CREATE TABLE IF NOT EXISTS tenants (
    tenant_id SERIAL PRIMARY KEY,
    tenant_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    connection_uri TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample tenant records
INSERT INTO tenants (tenant_name, slug, connection_uri) VALUES 
('Sample Company 1', 'company1', 'postgresql://postgres:root@localhost:5432/company1'),
('Sample Company 2', 'company2', 'postgresql://postgres:root@localhost:5432/company2')
ON CONFLICT (slug) DO NOTHING;

-- Verify the data
SELECT * FROM tenants;