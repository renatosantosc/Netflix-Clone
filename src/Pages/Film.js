import axios from 'axios';
import './Styles/Home.css'
import { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Modal from '../Components/Modal';
import Slider from '../Components/Slides';
import Footer from  '../Components/Footer'
import { Box, Button, CircularProgress } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

export default function Film(){

    const [nowPlaying, setNowPlaying] = useState()
    const [actionMovie, setActionMovie] = useState()
    const [romanceMovie, setRomanceMovie] = useState()
    const [terrorMovie, setTerrorMovie] = useState()
    const [fictionMovie, setFictionMovie] = useState()
    const [back, setBack] = useState()
    const [open, setOpen] = useState(false)
    const [videoURL, setVideoURL] = useState()
    const [length, setLength] = useState(0)
    const [idVideo, setIdVideo] = useState(null)

    const handleOpen = () =>{ setOpen(true) }

    useEffect(()=>{ 
        const imageURL = 'https://image.tmdb.org/t/p/original';

        const now_playing = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
          };

        const romance = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=10749&with_original_language=en',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
          }
        };

        const action = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=28%2C12&with_original_language=en',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
          }
        };

        const terror ={
          method: 'GET',
          url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=27&with_original_language=en',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
          }
        };

        const fiction ={
          method: 'GET',
          url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=878&with_original_language=en',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
          }
        };

        const video = {
          method: 'GET',
          url: `https://api.themoviedb.org/3/movie/${idVideo}/videos?language=pt-BR&page=1`,
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
          }
      };

        axios
        .request(now_playing)
        .then(function (response) {
        setNowPlaying(response.data)
        setBack(imageURL + nowPlaying.results[0].backdrop_path)
        setIdVideo(nowPlaying.results[0].id)
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(video)
        .then(function (response) {
          setVideoURL(response.data)
          setLength(videoURL.results.length)
        })
        .catch(function (error) {
          console.error(error);
        });


        axios
        .request(action)
        .then(function (response) {
        setActionMovie(response.data)
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(romance)
        .then(function (response) {
        setRomanceMovie(response.data)
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(terror)
        .then(function (response) {
        setTerrorMovie(response.data)
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(fiction)
        .then(function (response) {
          setFictionMovie(response.data)
        })
        .catch(function (error) {
          console.error(error);
        });

    },[nowPlaying, actionMovie, romanceMovie, terrorMovie, fictionMovie, videoURL, idVideo])

    return(
        <>
        <Box className='body' width={'100vw'} height={'85vh'} sx={{backgroundImage: `url(${back})`}}>
            <Header />
            {open ? 
              <Modal setOpen={setOpen} open={open} id={videoURL.results[0].key} />
            : '' }
            {nowPlaying && actionMovie && romanceMovie && terrorMovie && fictionMovie ? 
            <div className='title'>
              <div className='right'>
                {nowPlaying ?
                  <div className='description'>  
                    <h1>{nowPlaying.results[0].title}</h1>
                    <p>{nowPlaying.results[0].overview}</p>   
                  </div>
                : ''}

                  <div className='button_footer'>
                    {videoURL && length > 0 ?
                        <Button variant='outlined' onClick={handleOpen} startIcon={ <PlayArrowIcon /> }>
                            Trailer
                        </Button>
                    : ''}

                    <Button variant='contained' startIcon={ <AddIcon /> } >
                      Minha Lista
                    </Button>
                  </div>
              </div>

                <div className='left'>
                  
                </div>

            </div>
            : <Box width='100vw' height='100vh' sx={{
                backgroundColor: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <CircularProgress sx={{color: 'red'}} />
              </Box> }
        </Box>
        {nowPlaying ? 
          <Slider movies={nowPlaying.results} title='Lançamentos' category={'movie'} />
        : '' }

        {actionMovie ? 
          <Slider movies={actionMovie.results} title='Filmes de ação e aventura' category={'movie'} />
        : '' }

        {romanceMovie ? 
          <Slider movies={romanceMovie.results} title='Filmes de romance' category={'movie'} />
        : '' }

        {terrorMovie ? 
          <Slider movies={terrorMovie.results} title='Filmes de terror' category={'movie'} />
        : '' }

        {fictionMovie ? 
          <Slider movies={fictionMovie.results} title='Filmes de ficção científicas' category={'movie'} />
        : '' }
        
        {nowPlaying && actionMovie && romanceMovie && terrorMovie && fictionMovie ? <Footer /> : ''} 
      </>
    )
}