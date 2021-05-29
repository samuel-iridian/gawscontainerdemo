const { Client } = require("pg");

const connectionString = process.env.DBURL;
console.log(connectionString);

const client = new Client({
  connectionString: connectionString,
});

async function migrate() {
  try {
    console.log("migration initialized");

    await client.connect();
    console.log("connected to database");

    let script = `
    CREATE TABLE IF NOT EXISTS  "users" (
        "id" serial primary key,
        "username" varchar(255) unique not null,
        "password" varchar(60) not null,
        "created_at" timestamp with time zone default current_timestamp
    );
    
    insert into users (username, password) values ('admin', '123' ) ON CONFLICT (username) DO NOTHING;
    
    `;

    let query = {
      text: script,
      values: [],
    };

    let res = await client.query(query);
    console.log(res.command);
    console.log(res.rowCount);
    await client.end();
    console.log("disconnected from database");
    console.log("migration ran successfully");
  } catch (e) {
    console.log(e);
    console.error("error occured \ncould not run migration successfully");
    console.log(e.message);
    process.exit(1);
  }
}

migrate()
  .then(() => process.exit())
  .catch((err) => console.error(err));
