-- CREATE PERMISSIONS

-- users
CREATE ROLE p_users_read;
CREATE ROLE p_users_write;
CREATE ROLE p_users_delete;
GRANT SELECT ON users TO p_users_read;
GRANT INSERT, UPDATE ON users TO p_users_write;
GRANT USAGE ON SEQUENCE users_id_seq TO p_users_write;
GRANT DELETE ON users TO p_users_delete;

-- addresses
CREATE ROLE p_addresses_read;
CREATE ROLE p_addresses_write;
CREATE ROLE p_addresses_delete; 
GRANT SELECT ON addresses TO p_addresses_read;
GRANT SELECT (first_name, last_name) ON users TO p_addresses_read;
GRANT INSERT, UPDATE ON addresses TO p_addresses_write;
GRANT USAGE ON SEQUENCE addresses_id_seq TO p_addresses_write;
GRANT DELETE ON addresses TO p_addresses_delete;

-- products
CREATE ROLE p_products_read;
CREATE ROLE p_products_write;
GRANT SELECT ON products TO p_products_read;
GRANT INSERT, UPDATE ON products TO p_products_write;
GRANT USAGE ON SEQUENCE products_id_seq TO p_products_write;

-- carts
CREATE ROLE p_carts_read;
CREATE ROLE p_carts_write;
CREATE ROLE p_carts_delete;
GRANT SELECT ON carts TO p_carts_read;
GRANT INSERT, UPDATE ON carts TO p_carts_write;
GRANT USAGE ON SEQUENCE carts_id_seq, products_carts_id_seq TO p_carts_write;
GRANT DELETE ON carts TO p_carts_delete;

-- orders
CREATE ROLE p_orders_read;
CREATE ROLE p_orders_update_restricted;
CREATE ROLE p_orders_insert;
CREATE ROLE p_orders_update;
GRANT SELECT ON orders TO p_orders_read;
GRANT UPDATE (status) ON orders TO p_orders_update_restricted;
GRANT INSERT ON orders TO p_orders_insert;
GRANT UPDATE ON orders TO p_orders_update;
GRANT USAGE ON SEQUENCE orders_number_seq, products_orders_id_seq TO p_orders_update;

-- categories
CREATE ROLE p_categories_read;
CREATE ROLE p_categories_write; 
CREATE ROLE p_categories_delete;
GRANT SELECT ON categories TO p_categories_read;
GRANT INSERT, UPDATE ON categories TO p_categories_write;
GRANT DELETE ON categories TO p_categories_delete;

-- products_images
GRANT SELECT ON product_images TO p_products_read;
GRANT INSERT, UPDATE ON product_images TO p_products_write;
GRANT USAGE ON SEQUENCE product_images_id_seq TO p_products_write;

-- products_carts
GRANT SELECT ON products_carts TO p_carts_read;
GRANT INSERT, UPDATE ON products_carts TO p_carts_write;
GRANT DELETE ON products_carts TO p_carts_delete;

-- products_orders
GRANT SELECT ON products_orders TO p_orders_read;
GRANT INSERT ON products_orders TO p_orders_insert;
GRANT UPDATE ON products_orders TO p_orders_update;

-- users_addresses
GRANT SELECT ON users_addresses TO p_addresses_read, p_users_read;
GRANT INSERT, UPDATE ON users_addresses TO p_addresses_write, p_users_write;
GRANT DELETE ON users_addresses TO p_addresses_write, p_users_write;

-- CREATE GROUPS

-- g_user
CREATE ROLE g_users;
GRANT 
  p_users_read,
  p_users_write, 
  p_products_read, 
  p_addresses_read,
  p_addresses_write,
  p_addresses_delete,
  p_carts_read,
  p_carts_write,
  p_carts_delete,
  p_orders_read,
  p_orders_insert,
  p_categories_read
TO g_users;

-- g_staff
CREATE ROLE g_staff;
GRANT 
  g_users,
  p_products_write,
  p_categories_write,
  p_categories_delete,
  p_orders_update_restricted
TO g_staff;

-- g_admin
CREATE ROLE g_admin;
GRANT 
  g_staff,
  p_users_delete,
  p_orders_update
TO g_admin;

-- g_super
CREATE ROLE g_super;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO g_super;
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO g_super;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO g_super;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO g_super;
GRANT CREATE ON SCHEMA public TO g_super;

GRANT USAGE ON SCHEMA public TO g_users, g_staff, g_admin, g_super;

-- CREATE USERS
CREATE ROLE u_user_api WITH LOGIN;
GRANT g_users TO u_user_api;
CREATE ROLE u_staff_api WITH LOGIN;
GRANT g_staff TO u_staff_api;
CREATE ROLE u_admin WITH LOGIN;
GRANT g_admin TO u_admin;
CREATE ROLE u_super WITH LOGIN;
GRANT g_super TO u_super;