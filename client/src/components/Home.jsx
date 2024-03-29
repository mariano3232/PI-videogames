import React from "react";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import {getGames,getGenres,clear} from "../actions";
import { Link } from "react-router-dom";
import Card from "./HomeComponents/Card";
import SearchBar from "./HomeComponents/SearchBar";
import Alphabetical from "./HomeComponents/Alphabetical";
import Rating from "./HomeComponents/Rating";
import FilterGenre from "./HomeComponents/FilterGenre";
import FilterCreated from "./HomeComponents/FilterCreated";
import Buttons from "./HomeComponents/Buttons";
import styles from './Home.module.css'
import loading from './Icons/Loading.svg'

export default function Home(){

    const dispatch=useDispatch()
    const games=useSelector(state=>state.games)
    const genres=useSelector(state=>state.genres)
    const render=useSelector(state=>state.render)
    //indices:
    const [currentPage,setCurrentPage]=useState(1)
    const gamesPerPage=15;                                
    const first=((currentPage*gamesPerPage)-gamesPerPage);
    const last=(first+gamesPerPage);                      
    const currentGames=games.slice(first,last)
    console.log('currentGames :',currentGames)

    const setPage=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getGames())
        dispatch(getGenres())
        dispatch(clear())
    },[dispatch])

    return(
        <div className={styles.body}>
            <div className={styles.top}>
                <SearchBar/>
                <Link to='/Post'><button className={styles.createButton}>Create game</button></Link>
            </div>
        
            <header className={styles.header}>
             <Alphabetical/>
             <Rating/>
             <FilterGenre setPage={setPage}/>
             <FilterCreated setPage={setPage}/>
             <button onClick={e=>{e.preventDefault(); dispatch(getGames())}} className={styles.reload}>Reload games</button>
            </header>
            <div className={styles.cards}>
            {
                currentGames.length?
                currentGames.map(e=>{
                   return <Card 
                     name={e.name}
                     image={e.image}
                     genres={e.genres} 
                     Genres={e.Genres} 
                     id={e.id} 
                     key={e.id}
                    />
                }):
                <img src={loading} alt="" className={styles.loading} />
            }
            </div>
            
             <footer className={styles.footer}>
                <h3 className={styles.more}> More games :</h3>
                <Buttons allGames={games.length} setPage={setPage} currentPage={currentPage} gamesPerPage={gamesPerPage} className={styles.buttons}/>
                <h3 className={styles.pag}>Pag.{currentPage}</h3>
             </footer>
        </div>
    )
}