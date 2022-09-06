const express = require('express');
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const Pokemon = require('./models/pokemon');
const app = express();
const port = 3000;

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));

//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride("_method"))


app.listen(port, () => {
    console.log("epic")
})

// INDEX
app.get('/Pokedex', (req, res) => {
    res.render('index.ejs', { data: Pokemon });
});

// NEW
app.get("/Pokedex/new", (req, res) => {
    res.render("new.ejs")
})


// DELETE

app.delete("/Pokedex/:id", (req, res) => {
    Pokemon.splice(req.params.id, 1) //remove the item from the array
    res.redirect("/Pokedex") //redirect back to index route
})

// U
app.get("/Pokedex/:id/edit/", (req, res) => {
    res.render("edit.ejs", {
      editPoke: Pokemon[req.params.id],
      index: req.params.id,
    }
    )
  })


// CREATE
app.post("/Pokedex", (req, res) => {
    // make an array for type
    let typeArray = req.body.type.split(',')

    // create new object
    const newPoke = {
        name: req.body.name,
        img: req.body.img,
        id: req.body.id,
        type: typeArray,
        stats: {
            hp: "0",
            attack: "0",
            defense: "0",
            spattack: "0",
            spdefense: "0",
            speed: "0"
        },
        damages: {
            normal: "0",
            fire: "0",
            water: "0",
            electric: "0",
            grass: "0",
            ice: "0",
            fight: "0",
            poison: "0",
            ground: "0",
            flying: "0",
            psychic: "0",
            bug: "0",
            rock: "0",
            ghost: "0",
            dragon: "0",
            dark: "0",
            steel: "0"
        },
        misc: {
            classification: req.body.classification
        }

    };
    Pokemon.push(newPoke)
    res.redirect("/Pokedex")
})

// E
app.put("/Pokedex/:id", (req, res) => {
    let typeArray = req.body.type.split(',')

    // create new object to match keys in original data
    const editPoke = {
        name: req.body.name,
        img: req.body.img,
        id: req.body.id,
        type: typeArray,
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            spattack: req.body.spattack,
            spdefense: req.body.spdefense,
            speed: req.body.speed
        },
        damages: {
            normal: req.body.normal,
            fire: req.body.fire,
            water: req.body.water,
            electric: req.body.electric,
            grass: req.body.grass,
            ice: req.body.ice,
            fight: req.body.fight,
            poison: req.body.poison,
            ground: req.body.ground,
            flying: req.body.flying,
            psychic: req.body.psychic,
            bug: req.body.bug,
            rock: req.body.rock,
            ghost: req.body.ghost,
            dragon: req.body.dragon,
            dark: req.body.dark,
            steel: req.body.steel
        },
        misc: {
            classification: req.body.classification
        }

    };
    Pokemon[req.params.id] = editPoke 
    res.redirect("/Pokedex/"+req.params.id) //redirect to the index page
    , {}
  })

// SHOW
app.get('/Pokedex/:id', (req, res) => {
    res.render('show.ejs', { data: Pokemon[req.params.id], indexOf: req.params.id});
});

