import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByGenre } from "../../actions";
export default function FilterGenre(){

    const genres=useSelector(state=>state.genres)
    const dispatch=useDispatch()
    function HandleChange(e){
        e.preventDefault();
        dispatch(filterByGenre(e.target.value))
    }

    return(
        <div>
            <select onChange={e=>HandleChange(e)}>
                <option value="all">filter by genre (reset)</option>
                {
                    genres.map(e=>{
                        return <option value={e} key={e}>{e}</option>
                    })
                }
            </select>
        </div>
    )

}