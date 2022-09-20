CREATE TYPE status AS ENUM ('created', 'approved', 'active', 'completed');

CREATE TABLE request (
    request_id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    type_id INTEGER NOT NULL,
    activity_id INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    country_id INTEGER,
    city_id INTEGER,
    create_dttm TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modify_dttm TIMESTAMP WITH TIME ZONE,
    status status DEFAULT 'created'::status
);

CREATE INDEX request_user_id_idx ON request (user_id);
CREATE INDEX request_type_id_idx ON request (type_id);
CREATE INDEX request_activity_id_idx ON request (activity_id);
CREATE INDEX request_city_id_idx ON request (city_id);
CREATE INDEX request_create_dttm_idx ON request (create_dttm);
-- Необходимо понимать, как будет работать фильтр и поиск, чтобы навесить нужные индексы, Пока добавил те, по которым, как кажется, точно будет поиск

COMMENT ON TABLE request IS 'Таблица запросов';
COMMENT ON COLUMN request.request_id IS 'Первичный ключ';
COMMENT ON COLUMN request.user_id IS 'Ид. пользователя, который создал запрос';
COMMENT ON COLUMN request.type_id IS 'Ид. типа запроса';
COMMENT ON COLUMN request.activity_id IS 'Ид. сферы';
COMMENT ON COLUMN request.title IS 'Заголовок';
COMMENT ON COLUMN request.description IS 'Описание';
COMMENT ON COLUMN request.country_id IS 'Ид. страны';
COMMENT ON COLUMN request.city_id IS 'Ид. города';
COMMENT ON COLUMN request.create_dttm IS 'Время создания';
COMMENT ON COLUMN request.modify_dttm IS 'Время последнего изменения';
COMMENT ON COLUMN request.status IS 'Статус';

CREATE TABLE request_user (
    request_user_id UUID PRIMARY KEY,
    request_id UUID
        CONSTRAINT request_user_request_request_id_fkey
    	REFERENCES request (request_id)
    	ON UPDATE CASCADE ON DELETE RESTRICT,
    user_id UUID NOT NULL,
    create_dttm TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modify_dttm TIMESTAMP WITH TIME ZONE,
    status status DEFAULT 'created'::status
);

CREATE INDEX request_user_request_id_idx ON request_user (request_id);
CREATE INDEX request_user_user_id_idx ON request_user (user_id);

COMMENT ON TABLE request_user IS 'Отклики на запросы';
COMMENT ON COLUMN request_user.request_user_id IS 'Первичный ключ';
COMMENT ON COLUMN request_user.request_id IS 'Ид. запроса';
COMMENT ON COLUMN request_user.user_id IS 'Ид. пользователя, который ответил на запрос';
COMMENT ON COLUMN request_user.create_dttm IS 'Время создания';
COMMENT ON COLUMN request_user.modify_dttm IS 'Время последнего изменения';
COMMENT ON COLUMN request_user.status IS 'Статус';