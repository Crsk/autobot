CREATE DATABASE nodeflow;
CREATE SCHEMA nodeflow;
SET search_path TO nodeflow;

CREATE EXTENSION vector;

CREATE TABLE node (
  id VARCHAR(38) NOT NULL PRIMARY KEY,
  code TEXT NULL,
  description VARCHAR(256) NULL,
  embbeddings vector(1536),
  name VARCHAR(100) NOT NULL,
  x FLOAT NOT NULL,
  y FLOAT NOT NULL,
  parent_id VARCHAR(38),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES node(id)
);

CREATE TABLE connection (
  id SERIAL PRIMARY KEY,
  parent_id VARCHAR(38),
  child_id VARCHAR(38),
  FOREIGN KEY (parent_id) REFERENCES node(id) ON DELETE CASCADE,
  FOREIGN KEY (child_id) REFERENCES node(id) ON DELETE CASCADE
);

INSERT INTO node (id, name, x, y, parent_id, created_at) VALUES
  ('1', 'Node 1', 100, 200, NULL, '2023-04-05 10:15:32'),
  ('2', 'Node 2', 300, 400, '1', '2023-04-05 10:15:42'),
  ('3', 'Node 3', 50, 500, '1', '2023-04-05 10:15:52');

INSERT INTO connection (parent_id, child_id) VALUES
  ('1', '2');
