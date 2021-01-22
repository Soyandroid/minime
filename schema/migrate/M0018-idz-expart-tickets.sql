create table "idz_free_expart"
(
    "id" integer primary key not null
        references "idz_profile"("id")
            on delete cascade,
    "valid_from" timestamp not null,
    "ticket_amount" integer not null
    -- Expiry cannot be controlled by the server
);


