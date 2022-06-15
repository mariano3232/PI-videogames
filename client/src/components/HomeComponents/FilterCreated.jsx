import React from "react";
import { useDispatch } from "react-redux";
import { filterCreated } from "../../actions";
import styles from './Select.module.css'

export default function FilterCreated({setPage}){

    const dispatch=useDispatch();

    function HandleChange(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
        setPage(1)
    }

    return(
        <div>
            <select onChange={e=>HandleChange(e)} className={styles.select}>
                <option value="all">All</option>
                <option value="created">Created</option>
                <option value="existent">Existent</option>
            </select>
        </div>
    )
}