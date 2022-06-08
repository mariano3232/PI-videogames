import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { searchGame } from "../../actions";
import styles from './SearchBar.module.css'

export default function SearchBar(){
    const dispatch=useDispatch()
    const [input,setInput]=useState('')

    function HandleChange(e){
        e.preventDefault();
        setInput(e.target.value)
        console.log('Input:',input)
    }
    function HandleClick(e){
        e.preventDefault();
        dispatch(searchGame(input))
    }

return(
    <div className={styles.container}>
        <input type="text" placeholder="    Search..." onChange={e=>HandleChange(e)} className={styles.input}/>
        <button onClick={e=>HandleClick(e)} className={styles.button}>Search</button>
    </div>
)
}
