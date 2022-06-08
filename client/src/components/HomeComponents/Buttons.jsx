import React from "react";
import styles from './Buttons.module.css'

export default function Buttons({allGames,setPage,gamesPerPage}){

    let numbers=[];
    for (let i=1; i<=Math.ceil(allGames/gamesPerPage);i++){
        numbers.push(i)
    }
    console.log('numbers :',numbers)
    return(
        <div>
            {
                numbers.map(e=>{
                    return <button key={e} onClick={()=>setPage(e)} className={styles.buttons}>{e}</button>
                })
            }
        </div>
    )
}