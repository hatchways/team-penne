Windows SETUP:
[Alternatively, follow instructions in link: https://dev.to/nedsoft/getting-started-with-sequelize-and-postgres-emp] - Install PostgreSQL for Windows by clicking on the link below and following the instructions.
https://www.postgresql.org/download/windows/ - Before continuing, ensure a username/password and port number for PostgreSQL have all been set up during installation. - Open the Command Prompt. Ignore "Mac SETUP" section, and continue to Section 3: Running PostgreSQL.

Mac SETUP: - Follow Instructions in link below until section 3. Start Using PostgreSQL.
https://medium.com/@viviennediegoencarnacion/getting-started-with-postgresql-on-mac-e6a5f48ee399

Running PostgreSQL - type 'psql' in the terminal - Depending on setup, you might have to type 'psql -U postgres' - If it doesn't work, postgres might not be properly set up.
  
 ##
RECOMMENDED: - For first time users of psql, setup a username and password using:
CREATE ROLE newuser WITH LOGIN PASSWORD 'password';
ALTER ROLE newuser CREATEDB;
Replacing "newuser" with your own username and likewise with "password" ##

    - Now you'll need to create the database which the server uses:
            CREATE DATABASE dealsmate_devdb;
            CREATE DATABASE dealsmate_testdb;
    - type \l to ensure your databases were created successfully.
        - You should see dealsmate_devdb and dealsmate_testdb in the table.
    - type \q to leave psql.

In the IDE SETUP: - Required on first time only: - in the terminal, run "npm run setupDB" while in the server folder.
