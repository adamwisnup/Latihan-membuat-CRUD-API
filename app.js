require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const pg = require('pg');

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.use(express.json());

app.post('/api/students', async (req, res, next) => {
    const { name, age, address, is_active } = req.body;
    try {
        const newStudent = await pool.query('INSERT INTO students (name, age, address, is_active) VALUES ($1, $2, $3, $4) RETURNING *', [name, age, address, is_active]);
        res.status(201).json({
            message: 'Student created successfully',
            student: newStudent.rows[0]
        });
    } catch (err) {
        next(err);
    }
});

app.get('/api/students', async (req, res, next) => {
    try {
        const allStudents = await pool.query('SELECT * FROM students');
        res.status(200).json({
            message: 'All Students successfully retrieved',
            students: allStudents.rows
        });
    } catch (err) {
        next(err);
    }
});

app.get('/api/students/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const student = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
        if (student.rows.length === 0) {
            res.status(404).json({
                message: 'Student not found'
            });
        } else {
            res.json({
                message: 'Student retrieved successfully',
                student: student.rows[0]
            });
        }
    } catch (err) {
        next(err);
    }
});

app.put('/api/students/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, age, address, is_active } = req.body;
    try {
        const updateStudent = await pool.query('UPDATE students SET name = $1, age = $2, address = $3, is_active = $4 WHERE id = $5 RETURNING *', [name, age, address, is_active, id]);
        res.json({
            message: 'Student updated successfully',
            student: updateStudent.rows[0]
        });
    } catch (err) {
        next(err);
    }
});

app.delete('/api/students/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM students WHERE id = $1', [id]);
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        next(err);
    }
});


app.use((err, req, res, next) => {
    res.status(500).json({ error: err.toString() });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});