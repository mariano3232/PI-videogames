import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getDetails } from "../actions";
import { Link } from "react-router-dom";

export default function Details(){
    const id=useParams().id;
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getDetails(id))
    },[dispatch])

    const game=useSelector(state=>state.details)
    console.log('gameDetails :',game)
    
    return(
        <div>
            <Link to='/Home'><button>Home</button></Link>
            <div/>
            <h1>{game.name}</h1>
            <img src={game.image} alt="not found ):" width='300px' />
            <div/>
            <label>Genres :</label>
            {
                game.genres?.map(e=>{
                    return <span key={e}>{e} </span>
                })
            }
            {
                game.Genres?.map(e=>{
                   return <span key={e}>{e.name} </span>
                })
            }
            <div/>
            <label>Description :</label>
            <div dangerouslySetInnerHTML={{__html:game.description}}/>
            <div/>
            <label>Release date :</label>
            <span>{game.released}</span>
            <div/>
            <label>Rating :</label>
            <span>{game.rating}</span>
            <div/>
            <label>Platforms : </label>
            {
                game.platforms?.map(e=>{
                   return <span key={e}>{e} </span>
                })
            }
        </div>
    )
}