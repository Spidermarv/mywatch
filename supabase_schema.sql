-- SQL Schema for Supabase

-- Media table
CREATE TABLE media (
    id BIGINT PRIMARY KEY, -- TMDB ID
    title TEXT NOT NULL,
    type TEXT NOT NULL, -- 'movie' or 'tv'
    overview TEXT,
    poster_path TEXT,
    backdrop_path TEXT,
    release_date DATE,
    vote_average FLOAT,
    genres JSONB,
    popularity FLOAT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trends table
CREATE TABLE trends (
    id SERIAL PRIMARY KEY,
    media_id BIGINT REFERENCES media(id) ON DELETE CASCADE,
    trend_type TEXT NOT NULL, -- 'trending_day', 'trending_week', 'popular'
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexing for fast search
CREATE INDEX idx_media_title ON media USING GIN (to_tsvector('english', title));
CREATE INDEX idx_media_type ON media(type);
CREATE INDEX idx_trends_type ON trends(trend_type);
