create table "aime_subcard" (
    "luid" text primary key not null,
    "aime_id" integer not null
            references "aime_player"("id")
            on delete cascade
);
