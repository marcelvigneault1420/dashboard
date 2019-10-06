CREATE TABLE IF NOT EXISTS posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS clocks(
    id SERIAL PRIMARY KEY,
    clock_in TIMESTAMP NOT NULL,
    clock_out TIMESTAMP
);

CREATE INDEX IF NOT EXISTS clocks_in_recent ON clocks ( clock_in DESC);
CREATE INDEX IF NOT EXISTS clocks_in_range ON clocks ( date(clock_in) DESC);
CREATE INDEX IF NOT EXISTS clocks_out_null ON clocks( clock_out ) WHERE (clock_out IS NULL);