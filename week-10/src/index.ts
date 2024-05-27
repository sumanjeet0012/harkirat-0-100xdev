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

async function getUser() {
    try {
        await client.connect();
        const res = await client.query("SELECT * FROM users WHERE username = $1", ["sumanjeet0012"]);
        console.log(res.rows);
        await client.end();
    } catch (err) {
        console.error(err);
    }
}

// It is in relationship with the users table using the idof users table as foreign key.
async function createAddressTable() {
    await client.connect();
    const res = await client.query(`
    CREATE TABLE addresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        street VARCHAR(255) NOT NULL,
        pincode VARCHAR(20),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    `)

    console.log(res);
    await client.end();
    
}

async function addAddress() {
    await client.connect();
    const res = await client.query(`
    INSERT INTO addresses (user_id, city, country, street, pincode) VALUES (1, 'Bokaro', 'India', 'Sector 6D', '827006');
    `)
    console.log(res);
    await client.end();
}

async function getAddress() {
    try {
        await client.connect();
        const res = await client.query("SELECT * FROM addresses WHERE user_id = 1");
        console.log("normal res",res);
        console.log("res.rows",res.rows);
        await client.end();
    } catch (err) {
        console.error(err);
    }
}

getAddress();
