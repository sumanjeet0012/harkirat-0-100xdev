"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgres://chaiaurcode:chaiaurcode@localhost:5432/chaiDB"
});
function createTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const res = yield client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
        console.log(res);
        yield client.end();
    });
}
function addDataToTable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect(); // Ensure client connection is established
            // Use parameterized query to prevent SQL injection
            const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
            const values = ["suraj0012", "suraj0012@gmail", "12345678"];
            const res = yield client.query(insertQuery, values);
            console.log('Insertion success:', res); // Output insertion result
        }
        catch (err) {
            console.error('Error during the insertion:', err);
        }
        finally {
            yield client.end(); // Close the client connection
        }
    });
}
function getUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const res = yield client.query("SELECT * FROM users WHERE username = $1", ["sumanjeet0012"]);
            console.log(res.rows);
            yield client.end();
        }
        catch (err) {
            console.error(err);
        }
    });
}
// It is in relationship with the users table using the idof users table as foreign key.
function createAddressTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const res = yield client.query(`
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
    `);
        console.log(res);
        yield client.end();
    });
}
function addAddress() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const res = yield client.query(`
    INSERT INTO addresses (user_id, city, country, street, pincode) VALUES (1, 'Bokaro', 'India', 'Sector 6D', '827006');
    `);
        console.log(res);
        yield client.end();
    });
}
addAddress();
