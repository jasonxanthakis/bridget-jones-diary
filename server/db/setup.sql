--
-- PostgreSQL database dump
--

DROP TABLE IF EXISTS entries;

CREATE TABLE entries (
    id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(30) NOT NULL,
    content VARCHAR(500),
    category VARCHAR(30) DEFAULT 'Other',
    created_at DATE NOT NULL,
    last_edited_at DATE NOT NULL
);

INSERT INTO entries (title, content, category, created_at, last_edited_at) 
VALUES ('Set Up Diary', 'You have now set up your diary!', 'Administrator', '2025-07-25', '2025-07-25');