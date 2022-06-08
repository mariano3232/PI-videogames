import React from 'react'
import {Link} from 'react-router-dom'
import styles from './Landing.module.css'

export default function Landing(){
    return(
        <div className={styles.div}>
            <h1 className={styles.title}>VideoGames app</h1>
            <p>Proyecto individual de Henry, single page app de videojuegos:</p>
            <Link to='/Home'><button className={styles.button}>Ingresar!</button></Link>
        </div>
    )
}