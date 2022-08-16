import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getDetails,clear } from "../actions";
import { Link } from "react-router-dom";
import styles from './Details.module.css'
import loading from './Icons/Loading.svg'
import star from './Icons/Star.png'

export default function Details(){
    const id=useParams().id;
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getDetails(id))
    },[dispatch])

    const game=useSelector(state=>state.details)
    console.log('gameDetails :',game)
    
    return(
        game.name?
        <div className={styles.container}>
            <Link to='/Home'><button  className={styles.home }>Home</button></Link>
            <div/>
            {
                game.image?<img src={game.image} className={styles.img}/>:<img src='https://www.lifeder.com/wp-content/uploads/2018/10/question-mark-2123967_640.jpg' className={styles.img}/>
            }

            <div className={styles.principal}>
                <h1 className={styles.title}>{game.name}</h1>
                <div>
                    <span className={styles.rating}>{game.rating}</span>
                    <img src={star} alt="" height="80px" />
                </div>
                
                <p className={styles.genres}>Genres :</p>
            {
                game.genres?.map(e=>{
                    return <span key={e} className={styles.genres}>{e} </span>
                })
            }
            {
                game.Genres?.map(e=>{
                   return <span key={e} className={styles.genres}>{e.name} </span>
                })
            }
            </div>

            <div className={styles.line}/>

            <div className={styles.description}>
                <h2>Description</h2>
                <div dangerouslySetInnerHTML={{__html:game.description}}/>
            </div>

            <div className={styles.line}/>
            
            <div className={styles.bot}>
                <h2>Details</h2>
                <label>Release date :</label>
                <span className={styles.detail}>{game.released}</span>
                <div/>
                <label>Platforms : </label>
                {
                    game.platforms?.map(e=>{
                    return <p key={e} className={styles.detail}> - {e} </p>
                    })
                }
            </div>   
        </div>
        : 
        <div>
            <img src={loading} alt="" className={styles.loading} />
            <Link to='/Home'><button  className={styles.home }>Home</button></Link>
        </div>
    )
}