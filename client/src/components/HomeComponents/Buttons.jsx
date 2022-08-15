import React from "react";
import styles from './Buttons.module.css'

export default function Buttons({allGames,setPage,gamesPerPage,currentPage}){

    let numbers=[];
    for (let i=1; i<=Math.ceil(allGames/gamesPerPage);i++){
        numbers.push(i)
    }

    return(
        <div >
            {(currentPage-1)?
            <button onClick={()=>setPage(currentPage-1)} className={styles.buttons}>prev</button>
            :<button className={styles.buttons} disabled>prev</button>
            }
            {
                numbers.map(e=>{
                    return <button key={e} onClick={()=>{setPage(e); window.scroll(0,-300)}} className={styles.buttons}>{e}</button>
                })
            }
            {
            (currentPage<numbers.length)?
            <button onClick={()=>{setPage(currentPage+1); window.scroll(0,-300)}} className={styles.buttons}>next</button>
            :<button className={styles.buttons} disabled>next</button>
            }
        </div>
    )
}