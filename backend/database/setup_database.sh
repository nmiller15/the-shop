#!/bin/bash

# Default database connection parameters
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="the_shop"
DB_USER="postgres"
DB_PASSWORD="postgres"

echo "Beginning database setup..."
echo

while [[ "$#" -gt 0 ]]; do
  case "$1" in
    -p|--port)
      DB_PORT="$2"
      echo "--port: $2"
      shift 2
      ;;
    -h|--hostname)
      DB_HOST="$2"
      echo "--hostname: $2"
      shift 2
      ;;
    -d|--database-name)
      DB_NAME="$2"
      echo "--database-name: $2"
      shift 2
      ;;
    -u|--database-user)
      DB_USER="$2"
      echo "--database-user: $2"
      shift 2
      ;;
    -o|--database-password)
      DB_PASSWORD="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      echo
      echo "-p  --port                Port number for psql"
      echo "-h  --hostname            Host for psql"
      echo "-d  --database-name       Name of database"
      echo "-u  --database-user       Username for psql"
      echo "-o  --database-password   Password for psql"
      echo
      echo "Please use with approved options."
      exit 1
      ;;
  esac
done

###########################################
#
# Make sure that psql is installed
# This will only work on Ubuntu or 
# other apt compatible systems
#
###########################################

if command -v psql &> /dev/null; then
  echo "psql installed"
  install="false"
else
  install="true"
  echo "psql not installed"
  echo "Updating apt..."
  sudo apt update
  echo
  echo "Upgrading apt..."
  sudo apt upgrade -y
  echo
  echo "Installing psql..."
  sudo apt install -y postgresql
fi

echo "Enabling PostgreSQL service..."
sudo systemctl enable postgresql
echo "Starting PostgreSQL service..."
sudo systemctl start postgresql

# Set the postgres superuser password if db_user is postgres and the script installed psql
if [ "$install" == "true" ]; then
  if [ "$DB_USER" == "postgres" ]; then
    read -sp "Enter a password for the postgres superuser: " POSTGRES_PASSWORD
    sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '${POSTGRES_PASSWORD}';"
    DB_PASSWORD=$POSTGRES_PASSWORD
  fi
else 
  read -sp "Enter the password for your postgres superuser: " CUSTOM_POSTGRES_PASS
  DB_PASSWORD=$CUSTOM_POSTGRES_PASS
fi

# Export the password so that psql can use it
export PGPASSWORD=$DB_PASSWORD

echo "Creating $DB_NAME database..."
sudo -u postgres psql -c "CREATE DATABASE ${DB_NAME};" --echo-all

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
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f create_tables.sql --echo-all

echo "Running create_roles.sql..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f create_roles.sql --echo-all

# Collect passwords for the users
read -sp "Enter password for the user API connection: " USER_API_PASS
read -sp "Enter password for the staff API connection: " STAFF_API_PASS
read -sp "Enter password for the admin user, u_admin: " ADMIN_PASS
read -sp "Enter password for the super user, u_super: " SUPER_PASS

# Set user passwords
echo "Setting passwords for database roles..."
sudo -u postgres psql -c "ALTER ROLE u_user_api WITH PASSWORD '${USER_API_PASS}';"
sudo -u postgres psql -c "ALTER ROLE u_staff_api WITH PASSWORD '${STAFF_API_PASS}';"
sudo -u postgres psql -c "ALTER USER u_admin WITH PASSWORD '${ADMIN_PASS}';"
sudo -u postgres psql -c "ALTER USER u_super WITH PASSWORD '${SUPER_PASS}';"

echo "Setting environment variables for API access..."
export USER_API_PASS
export STAFF_API_PASS
export DB_HOST
export DB_PORT
unset POSTGRES_PASSWORD

echo "Creating a backup of pg_hba.conf..."
PG_HBA_CONF="/etc/postgresql/16/main/pg_hba.conf"
sudo cp "$PG_GBA_CONF" "${PG_HBA_CONF}.bak"
echo "Backup created $PG_HBA_CONF.bak"

echo "Adjusting permissions for u_user_api..."
sudo echo "host $DB_NAME u_user_api 0.0.0.0/0 md5" >> $PG_HBA_CONF
sudo echo "local $DB_NAME u_user_api 0.0.0.0/0 md5" >> $PG_HBA_CONF

echo "Adjusting permissions for u_staff_api..."
sudo echo "host $DB_NAME u_staff_api 0.0.0.0/0 md5" >> $PG_HBA_CONF
sudo echo "local $DB_NAME u_staff_api 0.0.0.0/0 md5" >> $PG_HBA_CONF

echo "Adjusting permissions for u_admin..."
sudo echo "local $DB_NAME u_admin 0.0.0.0/0 md5" >> $PG_HBA_CONF

echo "Adjusting permissions for u_super..."
sudo echo "local $DB_NAME u_super 0.0.0.0/0 md5" >> $PG_HBA_CONF

echo "Database setup completed."
