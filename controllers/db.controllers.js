const { Client, Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    min: 1,
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000
});

const query = (query) => {
    pool.connect(async(err, client, release) => {
        if (err) console.log(err);
        try {
            const res = await client.query(query);
            console.log(res.rows);
        } catch (error) {
            console.log(error);
        }
        release();
        pool.end();
    });
}

const createStudentDatabase = async(args) => {
    try {
        const text = `INSERT INTO students (rut, nombre, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *;`;
        const objQuery = {
            name: 'create-student',
            rowMode: 'array',
            text: text,
            values: args
        }
        query(objQuery);
    } catch (error) {
        console.log(error);
    }

}

const getStudents = async() => {
    try {
        const text = `SELECT * FROM students;`;
        const objQuery = {
            name: 'get-students',
            rowMode: 'array',
            text: text,
        }
        query(objQuery);
    } catch (error) {
        console.log(error);
    }
}

const getStudent = async(args) => {
    try {
        const text = `SELECT * FROM students WHERE rut = $1;`;
        const objQuery = {
            name: 'get-student',
            rowMode: 'array',
            text: text,
            values: args
        }
        query(objQuery);
    } catch (error) {
        console.log(error);
    }
}

const updateStudent = async(args) => {
    try {
        const text = `UPDATE students SET nombre = $2, curso = $3, nivel = $4 WHERE rut = $1 RETURNING *;`;
        const objQuery = {
            name: 'update-student',
            rowMode: 'array',
            text: text,
            values: args
        }
        query(objQuery);
    } catch (error) {
        console.log(error);
    }
}

const deleteStudent = async(args) => {
    try {
        const text = `DELETE FROM students WHERE rut = $1 RETURNING *;`;
        const objQuery = {
            name: 'delete-student',
            rowMode: 'array',
            text: text,
            values: args
        }
        query(objQuery);

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