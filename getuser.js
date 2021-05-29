const { Client } = require("pg");

const connectionString = process.env.DBURL;
console.log(connectionString);

const client = new Client({
  connectionString: connectionString,
});

async function getUser() {
  let script = `SELECT * FROM users`;

  let query = {
    text: script,
    values: [],
  };
  console.log(query);
  let res = await client.query(query);
  console.log(res.command);
  console.log(res.rowCount);
  console.log(res.rows);
  await client.end();
  console.log("disconnected from database");
}

getUser()
  .then(() => process.exit())
  .catch((err) => console.error(err));
