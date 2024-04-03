require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');
const port = process.env.PORT || 3000;

const v1Router = require('./routes/v1/index');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//swagger
const file = fs.readFileSync('./api-docs.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);
app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', v1Router);


app.use((err, req, res, next) => {
    res.status(500).json({ error: err.toString() });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});