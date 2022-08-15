import _default from "react-redux/es/components/connect"

let initialState={
    games:[],
    allGames:[],
    genres:[],
    platforms:[],
    render:[],
    details:{}
}

export default function reducers(state=initialState,action){
    switch(action.type){
        case 'GET_GAMES':
            return{
                ...state,
                games:action.payload,
                allGames:action.payload
            }
        case 'GET_GENRES':
            return{
                ...state,
                genres:action.payload
            }
        case 'GET_PLATFORMS':
            return{
                ...state,
                platforms:action.payload
            }    
        case 'SEARCH_GAME':
            return{
                ...state,
                games:action.payload
            }
        case 'CLEAR':
            return{
                ...state,
                details:{},
            }    
        case 'ALPHABETICAL_ORDER':
            let sorted=state.games;
            if (action.payload==="A-Z"){
                sorted=state.games.sort((a,b)=>{
                    if (a.name<b.name){return -1}
                    if (a.name>b.name){return 1}
                })
            }    
            if (action.payload==="Z-A"  ){
                sorted=state.games.sort((a,b)=>{
                    if (a.name<b.name){return 1}
                    if (a.name>b.name){return -1}
                })
            }
            return{
                ...state,
                games:sorted,
                render:[1].concat(1)
            }
        case 'SORT_BY_RATING':{
            let sortedR=state.games;
            if (action.payload==='asc'){
                sortedR=state.games.sort((a,b)=>{
                    if (a.rating<b.rating){return 1}
                    if (a.rating>b.rating){return -1}
                })
            }
            if (action.payload==='des'){
                sortedR=state.games.sort((a,b)=>{
                    if (a.rating<b.rating){return -1}
                    if (a.rating>b.rating){return 1} 
                })
            }
            return{
                ...state,
                games:sortedR,
                render:[1].concat(1)
            }
        }    
        case 'FILTER_BY_GENRE':
            let filter=state.allGames.filter(e=>{
               return e.genres?.includes(action.payload)||e.Genres?.map(e=>{return e.name}).includes(action.payload)
            })
            if (action.payload==='all'){
                filter=state.allGames
            }
            return{
                ...state,
                games:filter
            }
        case 'FILTER_CREATED':
            let filterC=state.allGames;
            if (action.payload==='created'){
                filterC=state.allGames.filter(e=>{return (e.created)})
            }
            if (action.payload==='existent'){
                filterC=state.allGames.filter(e=>{return (!e.created)})
            }
            return {
                ...state,
                games:filterC
            }
        case 'GET_DETAILS':
            return{
                ...state,
                details:action.payload
            }
        case 'POST':
            return{
                state,
            }
        default:return state    
    }
    
}