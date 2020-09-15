-- This adds the story object fields that were added in Ongeki Summer.

alter table "mu3_user_story" add column "jewel_count" integer;
alter table "mu3_user_story" add column "last_play_music_id" integer;
alter table "mu3_user_story" add column "last_play_music_category" integer;
alter table "mu3_user_story" add column "last_play_music_level" integer;
