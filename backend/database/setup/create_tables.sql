CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "username" varchar UNIQUE,
  "password" varchar,
  "first_name" varchar,
  "last_name" varchar,
  "date_created" timestamp,
  "role" varchar,
);

CREATE TABLE "addresses" (
  "id" serial PRIMARY KEY,
  "user_id" integer,
  "street_one" varchar,
  "street_two" varchar,
  "city" varchar,
  "state" varchar,
  "zip" integer
);

CREATE TABLE "products" (
  "id" serial PRIMARY KEY,
  "name" varchar,
  "description" text,
  "category_id" varchar,
  "rating" numeric (2, 1),
  "price" money,
  "active" boolean
);

CREATE TABLE "carts" (
  "id" serial PRIMARY KEY,
  "username" varchar
);

CREATE TABLE "orders" (
  "number" serial PRIMARY KEY,
  "date_created" timestamp,
  "status" varchar DEFAULT 'submitted',
  "billing_address_id" integer,
  "shipping_address_id" integer,
  "customer_id" varchar
);

CREATE TABLE "categories" (
  "id" varchar PRIMARY KEY,
  "category_string" varchar
);

CREATE TABLE "product_images" (
  "id" serial PRIMARY KEY,
  "sequence" integer,
  "product_id" integer,
  "path" varchar UNIQUE
);

CREATE TABLE "products_carts" (
  "id" serial PRIMARY KEY,
  "product_id" integer,
  "cart_id" integer,
  "quantity" integer NOT NULL DEFAULT 1
);

CREATE TABLE "products_orders" (
  "id" serial PRIMARY KEY,
  "product_id" integer,
  "order_number" integer,
  "quantity" integer NOT NULL DEFAULT 1,
  UNIQUE (product_id, order_number)
);

CREATE TABLE "users_addresses" (
  "user_id" integer,
  "address_id" integer,
  PRIMARY KEY (user_id, address_id)
);
ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "carts" ADD FOREIGN KEY ("username") REFERENCES "users" ("username");

ALTER TABLE "orders" ADD FOREIGN KEY ("customer_id") REFERENCES "users" ("username");

ALTER TABLE "orders" ADD FOREIGN KEY ("address_id") REFERENCES "addresses" ("id");

ALTER TABLE "product_images" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "products_carts" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "products_carts" ADD FOREIGN KEY ("cart_id") REFERENCES "carts" ("id");

ALTER TABLE "products_orders" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "products_orders" ADD FOREIGN KEY ("order_number") REFERENCES "orders" ("number");

ALTER TABLE "users_addresses" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "users_addresses" ADD FOREIGN KEY ("address_id") REFERENCES "addresses" ("id");
