import React from "react";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getGenres, getPlatforms,Post } from "../actions";
import { Link } from 'react-router-dom'

export default function Create(){
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getGenres())
        dispatch(getPlatforms())
    },[dispatch])

    const genres=useSelector(state=>state.genres)
    const platforms=useSelector(state=>state.platforms)

    const [input,setInput]=useState({
        name:'',
        description:'',
        rating:'',
        released:'',
        genres:[],
        platforms:[],
    })

    useEffect(()=>{
        setErrors(validate(input))
    },[input])

    const [errors,setErrors]=useState({
        name:'',
        description:'',
        rating:'',
    })


    function HandleSubmit(e){
        e.preventDefault();
        if (errors.name||errors.description||errors.rating||errors.platforms||errors.genres){
            return alert('error! please check the form again ')
        }
        dispatch(Post(input));
        alert('Game created :)')
    }

    const validate= (input)=>{
        
        let errors={}
        let regex=/^[a-zA-Z\s]*$/g
        if (input.name.length===0){errors.name='Game has no name!'}
        if (!input.name.match(regex)){errors.name='This name includes invalid characters'}
        if (input.description.length===0){errors.description='Game needs a description'}
        if (input.rating<0||input.rating>5){errors.rating='rating should be a value between 0 & 5'}
        if (input.platforms.length===0){errors.platforms='Choose at least 1 platform'}
        if (input.genres.length===0){errors.genres='Choose at least 1 genre'}

        return errors;
    }

    
    function HandleChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        setErrors(
            validate({
                ...input,
                [e.target.name]:e.target.value
            })
        )
        console.log('input :',input)
        console.log('errors :',errors)
    }

    function HandleGenres(e){
        e.preventDefault();
        if(!input.genres.includes(e.target.value)){
            setInput({
                ...input,
                genres:[...input.genres,e.target.value]
            })
        }
    }
    function HandlePlatforms(e){
        e.preventDefault();
        if (!input.platforms.includes(e.target.value)){
            setInput({
                ...input,
                platforms:[...input.platforms,e.target.value]
            })
        }
    }

    return(
        <div>
            <Link to='/Home'>Home</Link>
            <h1>Add a new game!!!!11!</h1>
            <label>Name :</label>
            <input type="text" name='name' placeholder="name..." onChange={e=>HandleChange(e)}/>
            {
                errors.name && <p style={{color: "red"}}>{errors.name}</p>
            }   
            <div/>
            <label>Description :</label>
            <div/>
            <textarea name="description" placeholder='description...' rows='2' cols='50' onChange={e=>HandleChange(e)}></textarea>
            {
                errors.description && <p style={{color: "red"}}>{errors.description}</p>
            }   
            <div/>
            <label>Rating :</label>
            <input type="number" name='rating' onChange={e=>HandleChange(e)} />
            {
                errors.rating && <p style={{color: "red"}}>{errors.rating}</p>
            }   
            <label>Release date :</label>
            <input type="date" name='released' onChange={e=>HandleChange(e)}/>
            <label>Genres :</label>
            <select name='genres' onChange={e=>HandleGenres(e)}>
                <option value="">genres</option>
                {
                    genres?.map(e=>{
                       return <option value={e} key={e}>{e}</option>
                    })
                }
            </select>
            {
                errors.genres && <p style={{color: "red"}}>{errors.genres}</p>
            }  
            <ul><li>{input.genres.map(e=>{return e+' '})}</li></ul>
            <label>Platforms :</label>
            <select name='platforms' onChange={e=>HandlePlatforms(e)}>
                 <option value="">platforms</option>
                {
                    platforms.map(e=>{
                        return <option value={e} key={e}>{e}</option>
                    })
                }
            </select>
            {
                errors.platforms && <p style={{color: "red"}}>{errors.platforms}</p>
            }  
            <ul><li>{input.platforms.map(e=>{return e+' '})}</li></ul>

            <button onClick={(e)=>{HandleSubmit(e)}}>Create baby</button>



            {/* {
                platforms.map(e=>{
                    return <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Gato.jpg" alt="" width='300px' />
                })
            } */}
        </div>
    )
}