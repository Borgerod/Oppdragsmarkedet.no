-- Create ENUMs
CREATE TYPE project_status AS ENUM ('draft', 'posted', 'in_progress', 'completed', 'cancelled');
CREATE TYPE transaction_source AS ENUM ('wallets', 'direct');
CREATE TYPE transaction_type AS ENUM ('incoming', 'outgoing');
CREATE TYPE user_type AS ENUM ('vendor', 'client');
CREATE TYPE user_role AS ENUM ('business', 'private', 'government');
CREATE DOMAIN org_number AS VARCHAR(9)
    CHECK (
        CASE
            WHEN VALUE IS NULL THEN TRUE
            WHEN LENGTH(VALUE) = 9 AND VALUE ~ '^[0-9]{9}$' THEN TRUE
            ELSE FALSE
        END
    );
CREATE INDEX org_number_idx ON vendor_profiles (org_number);
ALTER TABLE vendor_profiles ADD COLUMN org_validated_at TIMESTAMPTZ;
-- Create tables
-- Users table - core user information

CREATE TABLE user (
    id TEXT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE CHECK (LENGTH(username) >= 3 AND username ~ '^[a-zA-Z0-9_]+$'),
    password_hash VARCHAR(255) NOT NULL,
	    email VARCHAR(319) NOT NULL UNIQUE CHECK (
        email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
    ),
    user_type user_type NOT NULL,
    user_role user_role NOT NULL,
    date_joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    is_online BOOLEAN DEFAULT FALSE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    location TEXT,
    location_data POINT
);

-- Sessions table
CREATE TABLE sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES user(id),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- User profile data - personal information
CREATE TABLE user_profiles (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES user(id),
    first_name TEXT,
    last_name TEXT,
     first_name VARCHAR(100) NOT NULL CHECK (
        first_name ~ '^\p{L}+(?:[\s-]\p{L}+)*$' 
        AND LENGTH(first_name) BETWEEN 1 AND 100
    ),
    last_name VARCHAR(100) NOT NULL CHECK (
        last_name ~ '^\p{L}+(?:[\s-]\p{L}+)*$' 
        AND LENGTH(last_name) BETWEEN 1 AND 100
    ),
    phone VARCHAR(20) CHECK (
        phone ~ '^\+[1-9]\d{1,3}\s?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$'
        AND LENGTH(phone) BETWEEN 5 AND 20
    ),
    birth_date DATE CHECK (
        birth_date >= '1900-01-01' 
        AND birth_date <= CURRENT_DATE - INTERVAL '13 years'
    ),
    profile_image TEXT,
    
    -- Ratings
    client_reviews_rating INTEGER,
    client_reviews_count INTEGER DEFAULT 0,
    
    -- Profile tags
    verified_user BOOLEAN DEFAULT FALSE,
    verified_payment BOOLEAN DEFAULT FALSE,
    choice BOOLEAN DEFAULT FALSE,
    long_time_user BOOLEAN DEFAULT FALSE,
    fast_replyer BOOLEAN DEFAULT FALSE,
    slow_replyer BOOLEAN DEFAULT FALSE,
    given_complaints BOOLEAN DEFAULT FALSE,
    received_complaints BOOLEAN DEFAULT FALSE,
    insurance BOOLEAN DEFAULT FALSE,
    payment_insurance BOOLEAN DEFAULT FALSE,
    fast_worker BOOLEAN DEFAULT FALSE,
    slow_worker BOOLEAN DEFAULT FALSE
);



-- Projects table
CREATE TABLE projects (
    id TEXT PRIMARY KEY,
    client_id TEXT NOT NULL REFERENCES user(id),
    vendor_id TEXT REFERENCES user(id),
    
    -- Project details
    title TEXT NOT NULL,
    short_description TEXT,
    long_description TEXT,
    
    -- Location information
    location TEXT,
    address TEXT,
    
    -- Categorization
    category JSON,
    experience_requirements JSON,
    job_attributes JSON,
    
    -- Time tracking
    post_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    start_date TIMESTAMP,
    due_date TIMESTAMP,
    finish_date TIMESTAMP,
    estimated_time TEXT,
    
    -- Financial details
    budget INTEGER,
    currency TEXT DEFAULT 'NOK',
    payment_verification BOOLEAN DEFAULT FALSE,
    
    -- Status and metrics
    status project_status DEFAULT 'draft',
    favorited_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    purchase_count INTEGER DEFAULT 0,
    paid_listing BOOLEAN DEFAULT FALSE,
    listing_priority_score INTEGER DEFAULT 0,
    
    -- Ratings
    vendor_rating INTEGER,
    client_rating INTEGER
);

    -- org_number INTEGER,
-- Vendor profile extensions
CREATE TABLE vendor_profiles (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES user(id),
    org_number org_number NOT NULL UNIQUE,
    company_name TEXT,
    fields_of_work JSON,
    specializations JSON,
    certificates JSON,
    description TEXT,
    logo VARCHAR(2048) CHECK (
    logo ~* '^https?://[^\s/$.?#].[^\s]*$' 
    AND logo ~* '\.(jpe?g|png|gif|webp|avif|svg)$'
)
);

-- Social media links
CREATE TABLE social_media (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES user(id),
    facebook VARCHAR(2048) CHECK (
        facebook ~* '^https?://(www\.)?facebook\.com(/.*)?$'
        ),
    tiktok VARCHAR(2048) CHECK (
        tiktok ~* '^https?://(www\.)?tiktok\.com(/.*)?$'
        ),
    linkedin VARCHAR(2048) CHECK (
        linkedin ~* '^https?://(www\.)?linkedin\.com(/.*)?$'
        ),
    twitter VARCHAR(2048) CHECK (
        twitter ~* '^https?://(www\.)?twitter\.com(/.*)?$'
        ),
    instagram VARCHAR(2048) CHECK (
        instagram ~* '^https?://(www\.)?instagram\.com(/.*)?$'
        ),
    homepage VARCHAR(2048) CHECK (
        homepage ~* '^https?://(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z]{2,6}(/.*)?$'
        ),
    proff VARCHAR(2048) CHECK (
        proff ~* '^https?://(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z]{2,6}(/.*)?$'
        )

);

-- Project favorites
-- CREATE TABLE project_favorites (
CREATE TABLE favorite_projects (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES user(id),
    project_id TEXT NOT NULL REFERENCES projects(id),
    date_saved TIMESTAMP DEFAULT CURRENT_TIMESTAMP

url VARCHAR(2048) CHECK (
    url ~* '^https?://(www\.)?oppdragsmarkedet\.no/oppdrag/\?prosjekt_id=p[^\s]*$'
)

);

-- Saved search filters
CREATE TABLE saved_filters (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES user(id),
    save_name TEXT,
    url VARCHAR(2048) CHECK (
    url ~* '^https?://(www\.)?oppdragsmarkedet\.no(/.*)?$'
)
    date_saved TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Followed clients
CREATE TABLE followed_clients (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES user(id),
    client_id TEXT NOT NULL REFERENCES user(id),
    date_saved TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wallet information
CREATE TABLE wallets (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES user(id),
    balance INTEGER DEFAULT 0,
    currency TEXT DEFAULT 'NOK',
    is_balance_valid BOOLEAN DEFAULT TRUE
);

-- Financial transactions
CREATE TABLE financial_transactions (
    id TEXT PRIMARY KEY,
    wallet_id TEXT NOT NULL REFERENCES wallets(id),
    user_id TEXT NOT NULL REFERENCES user(id),
    transaction_type TEXT NOT NULL,
    amount INTEGER NOT NULL,
    currency TEXT DEFAULT 'NOK',
    description TEXT,
    status TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Wallet transactions
CREATE TABLE wallet_transactions (
    id TEXT PRIMARY KEY,
    sender_wallet_id TEXT NOT NULL REFERENCES wallets(id),
    receiver_wallet_id TEXT NOT NULL REFERENCES wallets(id),
    sender_id TEXT NOT NULL REFERENCES user(id),
    receiver_id TEXT NOT NULL REFERENCES user(id),
    amount INTEGER NOT NULL,
    currency TEXT DEFAULT 'NOK',
    status TEXT NOT NULL,
    description TEXT,
    project_id TEXT REFERENCES projects(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Financial statistics
CREATE TABLE financial_stats (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES user(id),
    total_earned INTEGER DEFAULT 0,
    total_spent INTEGER DEFAULT 0,
    average_project_value INTEGER,
    currency TEXT DEFAULT 'NOK',
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_efficiency INTEGER
);

-- Add indexes for performance (on commonly queried fields)
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_vendor_id ON projects(vendor_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_vendor_profiles_user_id ON vendor_profiles(user_id);
CREATE INDEX idx_wallets_user_id ON wallets(user_id);