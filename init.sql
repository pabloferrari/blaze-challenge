-- -------------------------------------------------------------
-- TablePlus 5.6.6(520)
--
-- https://tableplus.com/
--
-- Database: challenge
-- Generation Time: 2023-12-28 18:30:00.9790
-- -------------------------------------------------------------
DROP TABLE IF EXISTS "public"."matches";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS matches_id_seq;

-- Table Definition
CREATE TABLE "public"."matches" (
    "id" int4 NOT NULL DEFAULT nextval('matches_id_seq'::regclass),
    "match_id" int4 NOT NULL,
    "team_home_id" int4 NOT NULL,
    "team_away_id" int4 NOT NULL,
    "league_name" text,
    "match_date" timestamp(3) NOT NULL,
    "match_hometeam_score" int4 NOT NULL,
    "match_awayteam_score" int4 NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."players";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS players_id_seq;
DROP TYPE IF EXISTS "public"."Position";
CREATE TYPE "public"."Position" AS ENUM ('Goalkeepers', 'Defenders', 'Midfielders', 'Forwards');

-- Table Definition
CREATE TABLE "public"."players" (
    "id" int4 NOT NULL DEFAULT nextval('players_id_seq'::regclass),
    "player_key" varchar NOT NULL,
    "player_name" text NOT NULL,
    "player_number" int4,
    "team_id" int4 NOT NULL,
    "player_type" "public"."Position" NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."teams";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS teams_id_seq;

-- Table Definition
CREATE TABLE "public"."teams" (
    "id" int4 NOT NULL DEFAULT nextval('teams_id_seq'::regclass),
    "team_key" int4 NOT NULL,
    "team_name" varchar(255) NOT NULL,
    "venue" varchar(255) NOT NULL,
    PRIMARY KEY ("id")
);

ALTER TABLE "public"."matches" ADD FOREIGN KEY ("team_away_id") REFERENCES "public"."teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."matches" ADD FOREIGN KEY ("team_home_id") REFERENCES "public"."teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."players" ADD FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
