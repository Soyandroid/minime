create table "new_idz_profile"
(
    "id" integer primary key not null,
    "player_id" integer not null
        references "aime_player"("id")
            on delete cascade,
    "version" integer not null,
    "name" text not null,
    "lv" integer not null,
    "exp" integer not null,
    "fame" integer not null,
    "dpoint" integer not null,
    "mileage" integer not null,
    "register_time" timestamp not null,
    "access_time" timestamp not null,
    constraint "idz_profile_player_uq" unique ("player_id", "version")
);

create table "new_idz_team"
(
    "id" integer primary key not null,
    "version" integer not null,
    "ext_id" integer not null,
    "name" text not null,
    "name_bg" integer not null,
    "name_fx" integer not null,
    "register_time" timestamp not null,
    constraint "idz_team_uq" unique ("version", "ext_id")
);

create table "new_idz_team_auto"
(
    "id" integer primary key not null,
    "version" integer not null,
    "serial_no" integer not null,
    "name_idx" integer not null,
    constraint "idz_team_auto_uq" unique
    ("serial_no", "name_idx", "version")
);

create table "new_idz_ta_result"
(
    "id" integer primary key not null,
    "profile_id" integer not null
        references "idz_profile"("id")
            on delete cascade,
    "version" integer not null,
    "route_no" integer not null,
    "total_time" float not null,
    "section_times" text not null,
    "flags" integer not null,
    "grade" integer not null,
    "car_selector" integer not null,
    "timestamp" timestamp not null
);

create table "new_idz_ta_best"
(
    "id" integer primary key not null,
    "profile_id" integer not null
        references "idz_profile"("id")
            on delete cascade,
    "version" integer not null,
    "route_no" integer not null,
    "total_time" float not null,
    "section_times" text not null,
    "flags" integer not null,
    "grade" integer not null,
    -- TODO enum
    "car_selector" integer not null,
    "timestamp" timestamp not null,
    constraint "idz_ta_best_uq" unique ("profile_id", "route_no")
);

insert into "new_idz_profile"
    (
    "id",
    "player_id",
    "version",
    "name",
    "lv",
    "exp",
    "fame",
    "dpoint",
    "mileage",
    "register_time",
    "access_time"
    )
select
    x."id",
    x."player_id",
    1,
    x."name",
    x."lv",
    x."exp",
    x."fame",
    x."dpoint",
    x."mileage",
    x."register_time",
    x."access_time"
from "idz_profile" as "x";

insert into "new_idz_team"
    (
    "id",
    "version",
    "ext_id",
    "name",
    "name_bg",
    "name_fx",
    "register_time"
    )
select
    x."id",
    1,
    x."ext_id",
    x."name",
    x."name_bg",
    x."name_fx",
    x."register_time"
from "idz_team" as "x";

insert into "new_idz_team_auto"
    (
    "id",
    "version",
    "serial_no",
    "name_idx"
    )
select
    x."id",
    1,
    x."serial_no",
    x."name_idx"
from "idz_team_auto" as "x";

insert into "new_idz_ta_result"
    (
    "id",
    "profile_id",
    "version",
    "route_no",
    "total_time",
    "section_times",
    "flags",
    "grade",
    "car_selector",
    "timestamp"
    )
select
    x."id",
    x."profile_id",
    1,
    x."route_no",
    x."total_time",
    x."section_times",
    x."flags",
    x."grade",
    x."car_selector",
    x."timestamp"
from "idz_ta_result" as "x";

insert into "new_idz_ta_best"
    (
    "id",
    "profile_id",
    "version",
    "route_no",
    "total_time",
    "section_times",
    "flags",
    "grade",
    "car_selector",
    "timestamp"
    )
select
    x."id",
    x."profile_id",
    1,
    x."route_no",
    x."total_time",
    x."section_times",
    x."flags",
    x."grade",
    x."car_selector",
    x."timestamp"
from "idz_ta_best" as "x";

drop table "idz_profile";
drop table "idz_team";
drop table "idz_team_auto";
drop table "idz_ta_result";
drop table "idz_ta_best";

alter table "new_idz_profile" rename to "idz_profile";
alter table "new_idz_team" rename to "idz_team";
alter table "new_idz_team_auto" rename to "idz_team_auto";
alter table "new_idz_ta_result" rename to "idz_ta_result";
alter table "new_idz_ta_best" rename to "idz_ta_best";
