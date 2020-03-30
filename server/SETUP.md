Ensure node and Postgres are installed.

Create database name (anything works) and put it in the .env file. This name will be unique to the developer.
    - Create throught the command line "psql" command on Windows.
Create a table in said database with the name user_emails(uid, username, email). uid is the PRIMARY_KEY.
    (Optional) Insert some values into the table. Can be done:
        - Through the command line "psql" command on Windows.
        - Through the actual program itself.

Install express and node-postgres(pg) to be able to connect to Postgres:
    >npm i express pg

Update .env file with DATABASE_URL, where DATABASE_URL=postgres://{username}:{password}@{host}:{port}/{database name}
    - to be changed according to developer's own credentials

Terminal Testing Commands using CURL:
    ADD: curl --data "name=TonyStank&email=tstank@example.com" http://localhost:3000/user_emails
    UPDATE: curl -X PUT -d "name=StephRogers" -d "email=srogers@example.com" http://localhost:3000/user_emails/1
    DELETE: curl -X "DELETE" http://localhost:3000/user_emails/1
        - where 3000 is just the port number initialized before