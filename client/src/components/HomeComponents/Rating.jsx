import React from "react";
import { useDispatch } from "react-redux";
import { sortByRating } from "../../actions";
export default function Rating(){
    const dispatch=useDispatch()
    function HandleChange(e){
        e.preventDefault();
        dispatch(sortByRating(e.target.value))
    }

    return(
        <div>
            <select onChange={e=>HandleChange(e)}>
                <option value="">Rating</option>
                <option value="asc">↑</option>
                <option value="des">↓</option>
            </select>
        </div>
    )
}