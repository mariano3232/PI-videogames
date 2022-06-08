import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getDetails } from "../actions";
import { Link } from "react-router-dom";
import styles from './Details.module.css'

export default function Details(){
    const id=useParams().id;
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getDetails(id))
    },[dispatch])

    const game=useSelector(state=>state.details)
    console.log('gameDetails :',game)
    
    return(
        <div className={styles.container}>
            <Link to='/Home'><button className={styles.home }>Home</button></Link>
            <div/>
            <h1 className={styles.title}>{game.name}</h1>
            {
                game.image?<img src={game.image} className={styles.img}/>:<img src='https://www.lifeder.com/wp-content/uploads/2018/10/question-mark-2123967_640.jpg' className={styles.img}/>
            }
            <div className={styles.description}>
            <h2>Description</h2>
             <div dangerouslySetInnerHTML={{__html:game.description}}/>
            </div>
            
            <label>Release date :</label>
            <span>{game.released}</span>
            <div>
                <h2>Rating :</h2>
                <span className={styles.rating}>{game.rating}</span>
            </div>
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
            <label>Platforms : </label>
            {
                game.platforms?.map(e=>{
                   return <span key={e}>{e} </span>
                })
            }
        </div>
    )
}