const express = require('express');
const app = express();
const Pokemon = require('./models/pokemon');
const port = 3000;
app.listen(port, () => {
    console.log("epic")
})

// INDEX
app.get('/', (req, res) => {
res.render('index.ejs', { data: Pokemon });
});


// SHOW
app.get('/:id', (req, res) => {
res.render('show.ejs', { data: Pokemon[req.params.id] });
});

