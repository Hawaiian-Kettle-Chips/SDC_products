# setup script for postgresql server
source ../.env
sudo apt update -y
sudo apt install postgresql postgresql-contrib -y
sudo service postgresql start
sudo -U postgres psql -c "ALTER USER postgres WITH PASSWORD $PGPASSWORD"
# some fancy lines with GREP and CAT and ECHO to fix the login issues
# likewise to set the listen addresses

# is there a way to automate making the .env file, securely?
sudo psql -f schema.sql -p 5432 -U postgres

exit
