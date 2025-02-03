const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config(); 
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist')); 

app.get('/', (req, res) => {
    res.send('Default endpoint');
});

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server runing on ${PORT}`);
});
