import React from "react";
import {Link} from 'react-router-dom'
import styles from './Card.module.css'

export default function Card({name,image,genres,Genres,id}){
    return(
        <div className={styles.container}>
            {
            image?<Link to={'/Home/'+id}><img src={image} className={styles.img}/></Link>:
            <Link to={'/Home/'+id}><img src='https://www.lifeder.com/wp-content/uploads/2018/10/question-mark-2123967_640.jpg' className={styles.img}/></Link>
            }
           <Link to={'/Home/'+id} className={styles.title}> <h3>{name}</h3></Link>
           <div className={styles.line}/>
           <div className={styles.genres}>
                  <label className={styles.genre}>Genres :</label>
                {
                    genres?.map(e=>{return <span key={e} className={styles.genre}>{e}  </span>})
                }
                {
                    Genres?.map(e=>{return <span key={e.id} className={styles.genre}>{e.name}  </span>})
                }
           </div>
           <div className={styles.line}/>
           
    
        </div>
    )
}