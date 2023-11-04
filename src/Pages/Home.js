import axios from 'axios'
import '../App.css'
import { useState } from 'react';
import Header from '../Components/Header';


export default function Home(){

  const [dataMovie, setDataMovie] = useState([])
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
    }
  };

  const dateMovie = () =>{
    axios
  .request(options)
  .then(function (response) {
    setDataMovie(response.data.results)
    console.log(response.data.results);
  })
  .catch(function (error) {
    console.error(error);
  });
  }

    return(
        <div ClassName='App'>
            <Header />
            <h1>Home</h1>
            <button
            onClick={dateMovie}>Teste</button>

            {dataMovie ? dataMovie.map(movie => {
                return(
                <div key={movie.id}>
                    <h3>Título: {movie.title}</h3>
                    <p>Sobre: {movie.overview}</p>
                </div>
                )
            }) : ''}
        </div>
    )
}