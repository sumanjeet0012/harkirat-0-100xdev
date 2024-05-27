import { Client } from "pg";

const client = new Client({
    connectionString: "postgres://chaiaurcode:chaiaurcode@localhost:5432/chaiDB"
});

async function createTable() {
    await client.connect();
    const res = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
    console.log(res);
    await client.end();
}

async function addDataToTable() {
    try {
        await client.connect(); // Ensure client connection is established
        // Use parameterized query to prevent SQL injection
        const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
        const values = ["suraj0012", "suraj0012@gmail", "12345678"];
        const res = await client.query(insertQuery, values);
        console.log('Insertion success:', res); // Output insertion result
      } catch (err) {
        console.error('Error during the insertion:', err);
      } finally {
        await client.end(); // Close the client connection
      }
}

addDataToTable();
