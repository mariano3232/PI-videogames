import axios from 'axios'

export function getGames(){
    return async (dispatch)=>{
        let allGames= await axios.get('/videogames').catch(function(error){console.log('error de axios :',error)})
        return dispatch({
            type:'GET_GAMES',
            payload:allGames.data
        })
    }    
}

export function getGenres(){
    return async (dispatch)=>{
        let allGenres= await axios ('/genres')
        let allGenresClean=allGenres.data.map(e=>{return e.name})
        return dispatch({
            type:'GET_GENRES',
            payload:allGenresClean
        })
    }
}
export function getPlatforms(){
    return async (dispatch)=>{
        let allGames= await axios('/videogames')
        let uniquePlatforms=[];
        allGames?.data.map(e=>{return e.platforms}).flat().map(e=>{
            if (!uniquePlatforms.includes(e)){
                uniquePlatforms.push(e)
            }
        })
        return dispatch({
            type:'GET_PLATFORMS',
            payload:uniquePlatforms
        })
    }
}
export function searchGame(input){
    return async (dispatch)=>{
        let results=await axios('/videogames?name='+input)
        return dispatch({
            type:'SEARCH_GAME',
            payload:results.data
        })
    }
}
export function alphabeticalOrder(input){
    return (dispatch)=>{
        return dispatch({
            type:'ALPHABETICAL_ORDER',
            payload:input
        })
    }
}
export function sortByRating(input){
    return (dispatch)=>{
        return dispatch({
            type:'SORT_BY_RATING',
            payload:input
        })
    }
}
export function filterByGenre(input){
    return (dispatch)=>{
        return dispatch({
            type:'FILTER_BY_GENRE',
            payload:input
        })
    }
}
export function filterCreated(input){
    return (dispatch)=>{
        return dispatch({
            type:'FILTER_CREATED',
            payload:input
        })
    }
}
export function getDetails(id){
    return async (dispatch)=>{
        const gameData=await axios('/videogames/'+id)
        console.log('gameDetails(action) :',gameData)
        return dispatch({
            type:'GET_DETAILS',
            payload:gameData.data
        })
    }
}
export function clear(){
    return (dispatch)=>{
        return dispatch({
            type:'CLEAR',
        })
    }
}
export function Post(input){
    return async (dispatch)=>{
        console.log('input(action) :',input)
        const response=await axios.post('/videogame',input)
        console.log('respose :',response)
        return{
            type:'POST',
            payload:response,
        }
    }
}