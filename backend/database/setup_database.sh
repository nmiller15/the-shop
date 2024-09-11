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

echo

###########################################
#
# Make sure that psql is installed
# This will only work on Ubuntu or 
# other apt compatible systems
#
###########################################

if command -v psql &> /dev/null; then
  echo "... psql installed"
  install="false"
else
  install="true"
  echo "... updating apt"
  sudo apt update
  echo
  echo "... upgrading apt"
  sudo apt upgrade -y
  echo
  echo "... installing psql"
  sudo apt install -y postgresql
fi

echo
echo "... enabling PostgreSQL service"
sudo systemctl enable postgresql
echo
echo "... starting PostgreSQL service"
sudo systemctl start postgresql

# Set the postgres superuser password if db_user is postgres and the script installed psql
if [ "$install" == "true" ]; then
  if [ "$DB_USER" == "postgres" ]; then
    echo
    read -sp "Enter a password for the postgres superuser: " POSTGRES_PASSWORD
    echo
    sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '${POSTGRES_PASSWORD}';"
    DB_PASSWORD=$POSTGRES_PASSWORD
  fi
fi

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
echo
echo "Running create_tables.sql..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f create_tables.sql --echo-all

echo
echo "Running create_roles.sql..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f create_roles.sql --echo-all

# Collect passwords for the users
echo
read -sp "Enter password for the user API connection: " USER_API_PASS
echo
read -sp "Enter password for the staff API connection: " STAFF_API_PASS
echo
read -sp "Enter password for the admin user, u_admin: " ADMIN_PASS
echo
read -sp "Enter password for the super user, u_super: " SUPER_PASS
echo

# Set user passwords
echo "... setting passwords for database roles."
sudo -u postgres psql -c "ALTER ROLE u_user_api WITH PASSWORD '${USER_API_PASS}';"
sudo -u postgres psql -c "ALTER ROLE u_staff_api WITH PASSWORD '${STAFF_API_PASS}';"
sudo -u postgres psql -c "ALTER USER u_admin WITH PASSWORD '${ADMIN_PASS}';"
sudo -u postgres psql -c "ALTER USER u_super WITH PASSWORD '${SUPER_PASS}';"
echo

echo "... setting environment variables for API access."
export USER_API_PASS
export STAFF_API_PASS
export DB_HOST
export DB_PORT
unset POSTGRES_PASSWORD

echo "Database setup completed."
