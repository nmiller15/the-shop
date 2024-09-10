-- GRANT USAGE ON SCHEMA public TO groups
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
GRANT INSERT, UPDATE ON addresses to p_addresses_write;
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
GRANT USAGE ON SEQUENCE carts_id_seq TO p_carts_write;
GRANT DELETE ON carts TO p_carts_delete;


-- orders
CREATE ROLE p_orders_read;
CREATE ROLE p_orders_write_restricted;
CREATE ROLE p_orders_write;
GRANT SELECT ON orders TO p_orders_read;
GRANT UPDATE (status) ON orders TO p_orders_write_restricted;
GRANT INSERT, UPDATE ON orders TO p_orders_write;
GRANT USAGE ON SEQUENCE orders_number_seq TO p_orders_write;


-- categories
CREATE ROLE p_categories_read;
CREATE ROLE p_categories_write; 
CREATE ROLE p_categories_delete;
GRANT SELECT ON categories TO p_categories_read;
GRANT INSERT, UPDATE ON categories TO p_categories_write;
GRANT DELETE ON categories TO p_categories_delete;


-- products_images
GRANT SELECT ON products_images TO p_products_read;
GRANT INSERT, UPDATE ON products_images TO p_products_write;
GRANT USAGE ON SEQUENCE products_images_id_seq TO p_products_write;


-- products_carts
GRANT SELECT ON products_carts TO p_carts_read;
GRANT INSERT, UPDATE ON products_carts TO p_carts_write;
GRANT DELETE ON products_carts TO p_carts_delete;


-- products_orders
GRANT SELECT ON products_orders TO p_orders_read;
GRANT INSERT, UPDATE ON products_orders TO p_orders_write;


-- users_addresses
GRANT SELECT ON users_addresses TO p_addresses_read, p_users_read;
GRANT INSERT UPDATE ON users_addresses TO p_addresses_write, p_users_write;
GRANT DELETE ON users_addresses TO p_addresses_write, p_users_write;



-- CREATE GROUPS

-- g_user

-- g_staff

-- g_admin

-- g_super



-- User role
  -- read all products and related
  -- read own orders
  -- read and write and delete on own cart
  -- read and write and delete on own addresses
  -- read on own products_carts and products_orders
  -- read on own users_addresses
  -- delete on own user
 
-- Order fulfillment role
  -- all user permissions
  -- read all orders, write on status column
  -- read all addresses

-- Staff/Marketing role
  -- all order fulfillment
  -- read and write on products
  -- read on all carts
  -- read and write on all users
  -- read and write on addresses
  -- read and write on all orders

-- Admin role
  -- Staff/Marketing
  -- delete on users
  -- delete on addresses

-- Super User
  -- CRUD all

-- Add permissions on sequences for all write roles
-- Instead of doing row level security, I will protect at the api level
-- I will still use the groups to create different database connections for each type of user.