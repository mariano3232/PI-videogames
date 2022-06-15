import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByGenre } from "../../actions";
import styles from './Select.module.css'

export default function FilterGenre({setPage}){

    const genres=useSelector(state=>state.genres)
    const dispatch=useDispatch()
    function HandleChange(e){
        e.preventDefault();
        dispatch(filterByGenre(e.target.value));
        setPage(1);
    }

    return(
        <div>
            <select onChange={e=>HandleChange(e)} className={styles.select}>
                <option value="all">All genres</option>
                {
                    genres.map(e=>{
                        return <option value={e} key={e}>{e}</option>
                    })
                }
            </select>
        </div>
    )

}