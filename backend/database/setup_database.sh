#!/bin/bash

# Database connection parameters
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="your_database_name"
DB_USER="your_database_user"
DB_PASSWORD="your_database_password"

# Export the password so that psql can use it
export PGPASSWORD=$DB_PASSWORD

# Check if the SQL files exist
if [ ! -f create_tables.sql ]; then
  echo "Error: create_tables.sql not found!"
  exit 1
fi

if [ ! -f create_roles.sql ]; then
  echo "Error: create_roles.sql not found!"
  exit 1
fi

# Run SQL files
echo "Running create_tables.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f create_tables.sql

echo "Running create_roles.sql..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f create_roles.sql

# Collect passwords for the users
read -sp "Enter password for the user API connection: " USER_API_PASS
echo
read -sp "Enter password for the staff API connection: " STAFF_API_PASS
echo
read -sp "Enter password for the admin user, u_admin: " ADMIN_PASS
echo 
read -sp "Enter password for the super user, u_super: " SUPER_PASS
echo


echo "Database setup completed."
