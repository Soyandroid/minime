alter table "idz_settings" add column "driving_style" integer NOT NULL DEFAULT '0';

create table "idz_stamp_unlock" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "idz_profile"("id")
            on delete cascade,
    "stamp_no" integer not null,
    constraint "idz_stamp_unlock_uq" unique (
            "profile_id",
            "stamp_no"
    )
);

create table "idz_stamp_selection" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "idz_profile"("id")
            on delete cascade,
    "stamp_01" integer not null,
    "stamp_02" integer not null,
    "stamp_03" integer not null,
    "stamp_04" integer not null,
    constraint "idz_stamp_selection_uq" unique (
            "profile_id"
    )
);

create table "idz_mychara_unlock"
(
    "id" integer primary key not null,
    "profile_id" integer not null
        references "idz_profile"("id")
            on delete cascade,
    "mychara_no" integer not null,
    constraint "idz_stamp_unlock_uq" unique (
            "profile_id",
            "mychara_no"
    )
);

alter table "idz_story_cell_state" add column "c" integer NOT NULL DEFAULT '0';

create table "idz_weekly_missions"
(
    "id" integer primary key not null,
    "profile_id" integer not null
        references "idz_profile"("id")
            on delete cascade,
    "weekly_reset" timestamp not null,
    "mission_left" integer not null,
    "progress_left" integer not null,
    "params_left" integer not null,
    "mission_right" integer not null,
    "progress_right" integer not null,
    "params_right" integer not null,
    constraint "idz_weekly_missions_uq" unique ( "profile_id" )
);
