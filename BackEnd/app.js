const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({success: "Bonjour, vous êtes sur l'api M2L"});
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});