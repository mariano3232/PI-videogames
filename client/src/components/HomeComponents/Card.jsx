import React from "react";
import {Link} from 'react-router-dom'
export default function Card({name,image,genres,Genres,id}){
    return(
        <div>
           <Link to={'/Home/'+id}> <h2>{name}</h2></Link>
            {
                genres?.map(e=>{return <p key={e}>{e}</p>})
            }
            {
                Genres?.map(e=>{return <p key={e.id}>{e.name}</p>})
            }
            <Link to={'/Home/'+id}><img src={image} alt="Not found :(" width='200px'/></Link>
        </div>
    )
}