import React from "react";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import {getGames,getGenres} from "../actions";
import { Link } from "react-router-dom";
import Card from "./HomeComponents/Card";
import SearchBar from "./HomeComponents/SearchBar";
import Alphabetical from "./HomeComponents/Alphabetical";
import Rating from "./HomeComponents/Rating";
import FilterGenre from "./HomeComponents/FilterGenre";
import FilterCreated from "./HomeComponents/FilterCreated";
import Buttons from "./HomeComponents/Buttons";

export default function Home(){

    const dispatch=useDispatch()
    const games=useSelector(state=>state.games)
    const genres=useSelector(state=>state.genres)
    const render=useSelector(state=>state.render)
    //indeces:
    const [currentPage,setCurrentPage]=useState(1)
    const gamesPerPage=15;                                  console.log('currentPage :',currentPage)
    const first=((currentPage*gamesPerPage)-gamesPerPage); console.log('first :',first)
    const last=(first+gamesPerPage);                      console.log('last :',last)
    const currentGames=games.slice(first,last)
    console.log('currentGames :',currentGames)

    const setPage=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getGames())
        dispatch(getGenres())
    },[dispatch])

    // console.log('games(Home) :',games)
    // console.log('genres(Home) :',genres)
    return(
        <div>
            <h1>Home</h1>
            <Link to='/Post'>Add a new game</Link>
            <button onClick={e=>{e.preventDefault(); dispatch(getGames())}}>Reload games</button>
            <SearchBar/>
            <Alphabetical/>
            <Rating/>
            <FilterGenre/>
            <FilterCreated/>
            <Buttons allGames={games.length} setPage={setPage} gamesPerPage={gamesPerPage}/>
            {
                currentGames?.map(e=>{
                   return <Card 
                     name={e.name}
                     image={e.image}
                     genres={e.genres} 
                     Genres={e.Genres} 
                     id={e.id} 
                     key={e.id}
                    />
                })
            } 
        </div>
    )
}