import React from 'react'
import "./Style.css"
import { useState,useEffect } from 'react'
import axios from "axios"

function Moviesearch() {
const[movie,setMovie]=useState("")
const[film,setFilms]=useState([])
const showmovies=()=>{
    if(movie){
       axios.get(`https://www.omdbapi.com/?s=${movie}&apikey=18357bad`)
        .then((res)=>{
        // console.log(res);
        // console.log(res.data)
       if(res.data.Search){
        setFilms(res.data.Search)
       }
       else{
        alert("Movie Not Found...")
        setMovie("")
       }
    })
        .catch((err)=>console.log("Movie not found"))
    }
    else{
        alert("Please Add a movie name...")
    }
}

useEffect(()=>{
    if(movie ){
        showmovies()
    }
    else{
        axios.get(`https://www.omdbapi.com/?s=avengers&apikey=18357bad`)
        .then((res)=>{
        console.log(res);
         console.log(res.data)
        setFilms(res.data.Search)}
        ).catch((err)=>console.log("movie not found"))
    }
},[])
return (
    <div className="container">
      <h1 className="nav">HOOKED</h1>
      <div className="search">
        <input
          type="text"
          className="inputbox"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
        />
        <button className="btn" onClick={showmovies}>
          Search
        </button>
      </div>
      {film.length > 0 && (
        <div className="results">
          <div className="up">
            <p>Sharing a few of our favorite movies</p>
          </div>
          <div className="down">
            {film.map((movie) => (
              <div key={movie.imdbID}>
                <h3>{movie.Title}</h3>
                <img src={movie.Poster} alt={movie.Title} />
                <p>{movie.Year}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Moviesearch
