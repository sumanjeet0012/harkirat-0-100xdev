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
    await client.connect();
    const res = await client.query(`
    INSERT INTO users (username, email, password)
    VALUES ('sumanjeet0012', 'sumanjeet0012@gmail.com', '12345678');
    `)
}

addDataToTable();
