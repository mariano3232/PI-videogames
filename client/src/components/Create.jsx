import React from "react";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getGenres, getPlatforms, Post } from "../actions";
import { Link } from 'react-router-dom'
import styles from './Create.module.css'

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
        image:'',
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
        name2:'',
        description:'',
        description2:'',
        rating:'',
        date:'',
        genres:'',
        platforms:'',
    })

    const [submitFail,setSubmitFail]=useState(false)
    function HandleSubmit(e){
        e.preventDefault();
        if (errors.name||errors.description||errors.rating||errors.platforms||errors.genres){
            setSubmitFail(true) 
            return alert(' error! please check the form again ')
        }
        dispatch(Post(input));
        alert('Game created :)')
    }

    const validate= (input)=>{
        
        let errors={}
        let nameRegex=/^[a-zA-Z0-9 _]*$/g
        if (input.name.length===0){errors.name='Game has no name!'}
        if (!input.name.match(nameRegex)){errors.name2='This name includes invalid characters'}
        if (input.name.length>250){errors.name2='name is too long'}
        if (input.description.length===0){errors.description='Game needs a description'}
        if (input.description.length>20){errors.description2='Description is too long'}
        if (input.rating<0||input.rating>5){errors.rating='rating should be a value between 0 & 5'}
        if (typeof(input.rating)==='number'&&input.rating!==null){errors.rating='rating should be a number'}
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
        <div className={styles.container}>
            <Link to='/Home'><button className={styles.home}>Home</button></Link>
            <h1>Add a new game!</h1>
            <label>Name : *</label>
            <input type="text" name='name' placeholder="name..." onChange={e=>HandleChange(e)} className={styles.input}/>
            {
                (errors.name&&submitFail)?<p style={{color: "red"}}>{errors.name}</p>:<h1></h1>
            }
            {
                errors.name2?<p style={{color: "red"}}>{errors.name2}</p>:<h1></h1>
            }
            <div/>
            <label>Description : *</label>
            <div/>
            <textarea name="description" placeholder='description...' rows='3' cols='70' onChange={e=>HandleChange(e)} className={styles.description}></textarea>
            {
                (errors.description&&submitFail)?<p style={{color: "red"}}>{errors.description}</p>:<h1></h1>
            }
            {
                errors.description2?<p style={{color: "red"}}>{errors.description2}</p>:<h1></h1>
            }      
            <div/>
            <label>Rating :</label>
            <input type="number" name='rating' onChange={e=>HandleChange(e)} className={styles.input}/>
            {
                errors.rating?<p style={{color: "red"}}>{errors.rating}</p>:<h1></h1>
            }   
            <label>Release date :</label>
            <input type="date" name='released' onChange={e=>HandleChange(e)} className={styles.input}/>
            <div/>
            <label>Genres :*</label>
            <select name='genres' onChange={e=>HandleGenres(e)} className={styles.input}>
                <option value="">genres</option>
                {
                    genres?.map(e=>{
                       return <option value={e} key={e}>{e}</option>
                    })
                }
            </select>
            {
                (errors.genres&&submitFail)?<p style={{color: "red"}}>{errors.genres}</p>:<h1></h1>
            }  
            <ul><li>{input.genres.map(e=>{return e+' '})}</li></ul>
            <label>Platforms :*</label>
            <select name='platforms' onChange={e=>HandlePlatforms(e)} className={styles.input}>
                 <option value="">platforms</option>
                {
                    platforms.map(e=>{
                        return <option value={e} key={e}>{e}</option>
                    })
                }
            </select>
            {
                (errors.platforms&&submitFail)?<p style={{color: "red"}}>{errors.platforms}</p>:<h1></h1>
            }  
            <ul><li>{input.platforms.map(e=>{return e+' '})}</li></ul>
            <label>Image :</label>
            <input type="text" name='image' placeholder="URL" onChange={e=>HandleChange(e)} className={styles.input}/>

            <button onClick={(e)=>{HandleSubmit(e)}} className={styles.create}>Create!</button>
        </div>
    )
}