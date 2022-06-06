import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { searchGame } from "../../actions";

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
    <div>
        <input type="text" placeholder="Search..." onChange={e=>HandleChange(e)}/>
        <button onClick={e=>HandleClick(e)}>Search</button>
    </div>
)
}
