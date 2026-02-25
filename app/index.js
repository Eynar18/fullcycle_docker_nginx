const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 3000;

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

app.get("/", async (req, res) => {
  const connection = await mysql.createConnection(config);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255)
    )
  `);

  const name = "Usuário " + Math.floor(Math.random() * 1000);

  await connection.execute("INSERT INTO people(name) VALUES(?)", [name]);

  const [rows] = await connection.execute("SELECT name FROM people");

  let html = "<h1>Full Cycle Rocks!</h1>";
  html += "<ul>";

  rows.forEach(row => {
    html += `<li>${row.name}</li>`;
  });

  html += "</ul>";

  res.send(html);

  await connection.end();
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});