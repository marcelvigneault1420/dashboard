CREATE TABLE IF NOT EXISTS post(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS clock(
    id SERIAL PRIMARY KEY,
    in_time TIMESTAMP NOT NULL,
    out_time TIMESTAMP
);

CREATE INDEX IF NOT EXISTS in_time_recent ON clock ( in_time DESC);
CREATE INDEX IF NOT EXISTS in_time_range ON clock ( date(in_time) DESC);
CREATE INDEX IF NOT EXISTS out_time_null ON clock ( out_time ) WHERE (out_time IS NULL);

CREATE TABLE IF NOT EXISTS account(
    id SERIAL PRIMARY KEY,
    email VARCHAR(200),
    password VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS email_search ON account ( email );