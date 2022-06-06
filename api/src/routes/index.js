const { Router } = require('express');
const axios=require('axios');
const {Videogame,Genre}=require('../db')
require('dotenv').config();
const {YOUR_API_KEY}=process.env

const router = Router();

const apiGames= async ()=>{
    const allGames=[]
    let url='https://api.rawg.io/api/games?key='+YOUR_API_KEY;
    for (let i=0;i<5;i++){
     let allData=await axios(url);
     let filter=allData.data.results.map(e=>{
        return{
            id:e.id,
            name:e.name,
            image:e.background_image,
            genres:e.genres.map(e=>{
                return e.name
            }),
            rating:e.rating,
            released:e.released,
            platforms:e.platforms.map(e=>{
                return e.platform.name
            })
        }
    })
    allGames.push(filter)
    url=allData.data.next
    }
    return allGames.flat();
}
const dbGames=async ()=>{
    const db=await Videogame.findAll({
        include:{
            model:Genre,
            attributes:['name']
        },
    });
    return db;
}
const getGames=async ()=>{
    const api=await apiGames();
    const db=await dbGames();
    const games=api.concat(db);
    return games
}

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames',async (req,res)=>{
    let query=req.query.name
    let games=await getGames()
    let response=games;
    if (query){
        response=games.filter(e=>{
           return (e.name.toLowerCase().split(' ').includes(query.toLowerCase()))
        })
    }
    res.status(200).send(response)
})

// __Ruta de detalle de videojuego__: debe contener
// - [ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
// - [ ] Descripción
// - [ ] Fecha de lanzamiento
// - [ ] Rating
// - [ ] Plataformas

router.get('/videogames/:id',async (req,res)=>{
    const params=req.params;
    let games=await getGames()
    let game=games.filter(e=>{return (e.id==params.id)})[0]
    if (!game.description){
    var allDetails=await axios(`https://api.rawg.io/api/games/${params.id}?key=${YOUR_API_KEY}`);
    var description=allDetails?.data?.description;
    }
    if (game.description){
        description=game.description
    }
    let response={
        name:game.name,
        image:game.image,
        genres:game.genres,
        Genres:game.Genres,
        description,
        released:game.released,
        rating:game.rating,
        platforms:game.platforms
    }
    res.status(200).send(response)
})

router.get('/genres',async (req,res)=>{
    let genresApi=await axios('https://api.rawg.io/api/genres?key='+YOUR_API_KEY);
    let genres=genresApi.data.results.map(async e=>await Genre.findOrCreate({where:{name:e.name}}))
    let response=await Genre.findAll()
    res.status(200).send(response)
})

router.post('/videogame',async (req,res)=>{
   const {name,description,released,rating,platforms,genres}=req.body
   const data={
       name,
       description,
       released,
       rating,
       platforms,
   }
   let newGame=await Videogame.create(data)
   let dbGenres=await Genre.findAll({where:{name:genres}})
   
   await newGame.addGenre(dbGenres)
   res.status(200).send('Game created  :)')
})

module.exports = router;
