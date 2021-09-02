const { Client } = require('pg');
require('dotenv').config();

const config = new Client({
    user: 'postgres',
    host: 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

config.connect();

const createStudentDatabase = async(args) => {
    try {
        const [rut, nombre, curso, nivel] = args;
        const query = `INSERT INTO students (rut, nombre, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *;`;
        const values = [rut, nombre, curso, nivel];
        const { rows } = await config.query(query, values);
        config.end();
        return rows[0];
    } catch (error) {
        console.log(error);
    }

}

const getStudents = async() => {
    try {
        const query = `SELECT * FROM students;`;
        const { rows } = await config.query(query);
        config.end();
        return rows;

    } catch (error) {
        console.log(error);
    }
}

const getStudent = async(args) => {
    try {
        const [rut] = args;
        const query = `SELECT * FROM students WHERE rut = $1;`;
        const values = [rut];
        const { rows } = await config.query(query, values);
        config.end();
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

const updateStudent = async(args) => {
    try {
        const [rut, nombre, curso, nivel] = args;
        const query = `UPDATE students SET nombre = $2, curso = $3, nivel = $4 WHERE rut = $1 RETURNING *;`;
        const values = [rut, nombre, curso, nivel];
        const { rows } = await config.query(query, values);
        config.end();
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

const deleteStudent = async(args) => {
    try {
        const [rut] = args;
        const query = `DELETE FROM students WHERE rut = $1 RETURNING *;`;
        const values = [rut];
        const { rows } = await config.query(query, values);
        config.end();
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createStudentDatabase,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent
}