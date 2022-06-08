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
           <Link to={'/Home/'+id}> <h3 className={styles.title}>{name}</h3></Link>
            {
                genres?.map(e=>{return <span key={e}>{e}  </span>})
            }
            {
                Genres?.map(e=>{return <span key={e.id}>{e.name}  </span>})
            }
           
        </div>
    )
}