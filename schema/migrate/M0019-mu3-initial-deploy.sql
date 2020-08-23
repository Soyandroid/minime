create table if not exists "mu3_user_data" (
    "id" integer primary key not null,
    "player_id" integer not null
            references "aime_player"("id")
            on delete cascade,
    "access_code" text not null,
    "user_name" text not null,
    "level" integer not null,
    "reincarnation_num" integer not null,
    "exp" integer not null,
    "point" integer not null,
    "total_point" integer not null,
    "play_count" integer not null,
    "jewel_count" integer not null,
    "total_jewel_count" integer not null,
    "player_rating" integer not null,
    "highest_rating" integer not null,
    "battle_point" integer not null,
    "nameplate_id" integer not null,
    "trophy_id" integer not null,
    "card_id" integer not null,
    "character_id" integer not null,
    "tab_setting" integer not null,
    "tab_sort_setting" integer not null,
    "card_category_setting" integer not null,
    "card_sort_setting" integer not null,
    "played_tutorial_bit" integer not null,
    "first_tutorial_cancel_num" integer not null,
    "sum_tech_high_score" integer not null,
    "sum_tech_basic_high_score" integer not null,
    "sum_tech_advanced_high_score" integer not null,
    "sum_tech_expert_high_score" integer not null,
    "sum_tech_master_high_score" integer not null,
    "sum_tech_lunatic_high_score" integer not null,
    "sum_battle_high_score" integer not null,
    "sum_battle_basic_high_score" integer not null,
    "sum_battle_advanced_high_score" integer not null,
    "sum_battle_expert_high_score" integer not null,
    "sum_battle_master_high_score" integer not null,
    "sum_battle_lunatic_high_score" integer not null,
    "event_watched_date" text,
    "first_game_id" text not null,
    "first_rom_version" text not null,
    "first_data_version" text not null,
    "first_play_date" text not null,
    "last_game_id" text not null,
    "last_rom_version" text not null,
    "last_data_version" text not null,
    "compatible_cm_version" text not null,
    "last_play_date" text not null,
    "last_place_id" integer not null,
    "last_place_name" text not null,
    "last_region_id" integer not null,
    "last_region_name" text not null,
    "last_all_net_id" integer not null,
    "last_client_id" text not null,
    "last_used_deck_id" integer not null,
    "last_play_music_level" integer not null
);

create table if not exists "mu3_user_activity" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "mu3_user_data"("id")
            on delete cascade,
    "kind" integer not null,
    -- This is just called "id" on the wire, but we already have an "id"
    -- column up there ^
    "activity_id" integer not null,
    "sort_number" integer not null,
    "param1" integer not null,
    "param2" integer not null,
    "param3" integer not null,
    "param4" integer not null,
    constraint "mu3_user_activity_uq" unique (
        "profile_id",
        "kind",
        "activity_id"
    )
);

create table if not exists "mu3_user_bp_base" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "mu3_user_data"("id")
            on delete cascade,
    "music_id" integer not null,
    "difficult_id" integer not null,
    "rom_version_code" integer not null,
    "score" integer not null,
    constraint "mu3_user_bp_base_uq" unique (
        "profile_id",
        "music_id",
        "difficult_id"
    )
);

create table if not exists "mu3_user_card" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "mu3_user_data"("id")
            on delete cascade,
    "card_id" integer not null,
    "digital_stock" integer not null,
    "analog_stock" integer not null,
    "level" integer not null,
    "max_level" integer not null,
    "exp" integer not null,
    "print_count" integer not null,
    "use_count" integer not null,
    "is_new" boolean not null,
    "kaika_date" text,
    "cho_kaika_date" text,
    "skill_id" integer not null,
    "is_acquired" boolean not null,
    "created" text not null,
    constraint "mu3_user_card" unique ("profile_id", "card_id")
);

create table if not exists "mu3_user_chapter" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "mu3_user_data"("id")
            on delete cascade,
    "chapter_id" integer not null,
    "jewel_count" integer not null,
    "last_play_music_category" integer not null,
    "last_play_music_id" integer not null,
    "is_story_watched" boolean not null,
    "is_clear" boolean not null,
    "skip_timing1" integer not null,
    "skip_timing2" integer not null,
    constraint "mu3_user_chapter_uq" unique ("profile_id", "chapter_id")
);

create table if not exists "mu3_user_character" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "mu3_user_data"("id")
            on delete cascade,
    "character_id" integer not null,
    "play_count" integer not null,
    "intimate_level" integer not null,
    "intimate_count" integer not null,
    "intimate_count_rewarded" integer not null,
    "intimate_count_date" text,
    "is_new" boolean not null,
    constraint "mu3_user_character_uq" unique ("profile_id", "character_id")
);

create table if not exists "mu3_user_deck" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "mu3_user_data"("id")
            on delete cascade,
    "deck_id" integer not null,
    "card_id1" integer not null,
    "card_id2" integer not null,
    "card_id3" integer not null,
    constraint "mu3_user_deck_uq" unique ("profile_id", "deck_id")
);

create table if not exists "mu3_user_event_point" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "mu3_user_data"("id")
            on delete cascade,
    "event_id" integer not null,
    "point" integer not null,
    "is_ranking_rewarded" boolean not null,
    constraint "mu3_user_event_point_uq" unique ("profile_id", "event_id")
);

create table if not exists "mu3_user_item" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "mu3_user_data"("id")
            on delete cascade,
    "item_kind" integer not null,
    "item_id" integer not null,
    "stock" integer not null,
    "is_valid" text not null,
    constraint "mu3_user_item_uq" unique ("profile_id", "item_kind", "item_id")
);

create table if not exists "mu3_user_login_bonus" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "mu3_user_data"("id")
            on delete cascade,
    "bonus_id" integer not null,
    "bonus_count" integer not null,
    constraint "mu3_user_login_bonus_uq" unique ("profile_id", "bonus_id")
);

create table if not exists "mu3_user_mission_point" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "mu3_user_data"("id")
            on delete cascade,
    "event_id" integer not null,
    "point" integer not null,
    constraint "mu3_user_mission_point_uq" unique ("profile_id", "event_id")
);

create table if not exists "mu3_user_music" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "mu3_user_data"("id")
            on delete cascade,
    "music_id" integer not null,
    "level" integer not null,
    "play_count" integer not null,
    "tech_score_max" integer not null,
    "tech_score_rank" integer not null,
    "battle_score_max" integer not null,
    "battle_score_rank" integer not null,
    "max_combo_count" integer not null,
    "max_over_kill" integer not null,
    "max_team_over_kill" integer not null,
    "is_full_bell" boolean not null,
    "is_full_combo" boolean not null,
    "is_all_breake" boolean not null,
    "is_lock" boolean not null,
    "clear_status" integer not null,
    "is_story_watched" boolean not null,
    constraint "mu3_user_music_uq" unique ("profile_id", "music_id", "level")
);

create table if not exists "mu3_user_music_item" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "mu3_user_data"("id")
            on delete cascade,
    "music_id" integer not null,
    "status" integer not null,
    constraint "mu3_user_music_item_uq" unique ("profile_id", "music_id")
);

create table if not exists "mu3_user_option" (
    "id" integer primary key not null
            references "mu3_user_data"("id")
            on delete cascade,
    "option_set" integer not null,
    "speed" integer not null,
    "mirror" integer not null,
    "judge_timing" integer not null,
    "abort" integer not null,
    "tap_sound" integer not null,
    "vol_guide" integer not null,
    "vol_all" integer not null,
    "vol_tap" integer not null,
    "vol_cr_tap" integer not null,
    "vol_hold" integer not null,
    "vol_side" integer not null,
    "vol_flick" integer not null,
    "vol_bell" integer not null,
    "vol_enemy" integer not null,
    "vol_skill" integer not null,
    "vol_damage" integer not null,
    "color_field" integer not null,
    "color_lane_bright" integer not null,
    "color_lane" integer not null,
    "color_side" integer not null,
    "effect_damage" integer not null,
    "effect_pos" integer not null,
    "judge_disp" integer not null,
    "judge_pos" integer not null,
    "judge_break" integer not null,
    "judge_hit" integer not null,
    "matching" integer not null,
    "disp_player_lv" integer not null,
    "disp_rating" integer not null,
    "disp_bp" integer not null,
    "headphone" integer not null
);

create table if not exists "mu3_user_playlog" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "mu3_user_data"("id")
            on delete cascade,
    "sort_number" integer not null,
    "place_id" integer not null,
    "place_name" text not null,
    "play_date" text not null,
    "user_play_date" text not null,
    "music_id" integer not null,
    "level" integer not null,
    "play_kind" integer not null,
    "event_id" integer not null,
    "event_name" text not null,
    "event_point" integer not null,
    "played_user_id1" integer not null,
    "played_user_id2" integer not null,
    "played_user_id3" integer not null,
    "played_user_name1" text not null,
    "played_user_name2" text not null,
    "played_user_name3" text not null,
    "played_music_level1" integer not null,
    "played_music_level2" integer not null,
    "played_music_level3" integer not null,
    "card_id1" integer not null,
    "card_id2" integer not null,
    "card_id3" integer not null,
    "card_level1" integer not null,
    "card_level2" integer not null,
    "card_level3" integer not null,
    "card_attack1" integer not null,
    "card_attack2" integer not null,
    "card_attack3" integer not null,
    "boss_chara_id" integer not null,
    "boss_level" integer not null,
    "boss_attribute" integer not null,
    "clear_status" integer not null,
    "tech_score" integer not null,
    "tech_score_rank" integer not null,
    "battle_score" integer not null,
    "battle_score_rank" integer not null,
    "max_combo" integer not null,
    "judge_miss" integer not null,
    "judge_hit" integer not null,
    "judge_break" integer not null,
    "judge_critical_break" integer not null,
    "rate_tap" integer not null,
    "rate_hold" integer not null,
    "rate_flick" integer not null,
    "rate_side_tap" integer not null,
    "rate_side_hold" integer not null,
    "bell_count" integer not null,
    "total_bell_count" integer not null,
    "damage_count" integer not null,
    "over_damage" integer not null,
    "is_tech_new_record" boolean not null,
    "is_battle_new_record" boolean not null,
    "is_over_damage_new_record" boolean not null,
    "is_full_combo" boolean not null,
    "is_full_bell" boolean not null,
    "is_all_break" boolean not null,
    "player_rating" integer not null,
    "battle_point" integer not null
);

create table if not exists "mu3_user_ratinglog" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "mu3_user_data"("id")
            on delete cascade,
    "data_version" text not null,
    "highest_rating" integer not null,
    constraint "mu3_user_ratinglog_uq" unique ("profile_id", "data_version")
);

create table if not exists "mu3_user_story" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "mu3_user_data"("id")
            on delete cascade,
    "story_id" integer not null,
    "last_chapter_id" integer not null,
    constraint "mu3_user_story_uq" unique ("profile_id", "story_id")
);

create table if not exists "mu3_user_training_room" (
    "id" integer primary key not null,
    "profile_id" integer not null
            references "mu3_user_data"("id")
            on delete cascade,
    "auth_key" text not null,
    "user_id" integer not null,
    "room_id" integer not null,
    "card_id" integer not null,
    "value_date" text,
    constraint "mu3_user_training_room_uq" unique ("profile_id", "room_id")
);
