import React from 'react'
import {Link} from 'react-router-dom'

export default function Landing(){
    return(
        <div>
            <h1>VideoGames app</h1>
            <Link to='/Home'><button>Ingresar</button></Link>
        </div>
    )
}