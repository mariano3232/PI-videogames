import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { alphabeticalOrder } from "../../actions";
import styles from './Select.module.css'

export default function Alphabetical(){

    const dispatch=useDispatch();
    function HandleChange(e){
        e.preventDefault();
        dispatch(alphabeticalOrder(e.target.value))
    }

    return(
        <div>
            <select onChange={e=>HandleChange(e)} className={styles.select}>
                <option>Alphabetical</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>
        </div>
    )
}