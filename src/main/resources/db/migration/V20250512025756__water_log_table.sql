CREATE TABLE water_log
(
    id           BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    water_amount DOUBLE PRECISION                        NOT NULL,
    date         date,
    CONSTRAINT pk_waterlog PRIMARY KEY (id)
);