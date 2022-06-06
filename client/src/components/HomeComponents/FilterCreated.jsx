import React from "react";
import { useDispatch } from "react-redux";
import { filterCreated } from "../../actions";

export default function FilterCreated(){

    const dispatch=useDispatch();

    function HandleChange(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
    }

    return(
        <div>
            <select onChange={e=>HandleChange(e)}>
                <option value="all">All</option>
                <option value="created">Created</option>
                <option value="existent">Existent</option>
            </select>
        </div>
    )
}