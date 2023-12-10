import axios from 'axios';
import '../App.css';
import './Styles/Home.css';
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


export default function Home(){

  const [dataMovie, setDataMovie] = useState()
  const [discover, setDiscover] = useState()
  const [back, setBack] = useState()
  const [open, setOpen] = useState(false)
  const [videoURL, setVideoURL] = useState(null)
  const [idVideo, setIdVideo] = useState(null)

  const video = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${idVideo}/videos?language=pt-BR&page=1`,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
    }
  };

  const handleOpen = () =>{
    axios
    .request(video)
    .then(function (response) {
      setVideoURL(response.data)
      setOpen(true)
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  useEffect(()=>{ 
    const imageURL = 'https://image.tmdb.org/t/p/original';
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/trending/movie/week?language=pt-BR',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
      }
    };

    const discover_movie = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/trending/tv/week?language=pt-BR',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
      }
    };

    axios
    .request(options)
    .then(function (response) {
      setDataMovie(response.data)
      setBack(imageURL + dataMovie.results[0].backdrop_path)
      setIdVideo(dataMovie.results[0].id)
    })
    .catch(function (error) {
      console.error(error);
    });

    axios
    .request(discover_movie)
    .then(function (response) {
      setDiscover(response.data)
    })
    .catch(function (error) {
      console.error(error);
    });

  },[dataMovie, discover])

    return(
      <>
        <Box className='body' width={'100vw'} height={'85vh'} sx={{backgroundImage: `url(${back})`}}>
            <Header />
            {videoURL ? 
              <Modal setOpen={setOpen} open={open} id={videoURL.results[0].key} />
            : '' }
            {dataMovie ? 
            <div className='title'>
              <div className='right'>
                {dataMovie ?
                  <div className='description'>  
                    <h1>{dataMovie.results[0].title}</h1>
                    <p>{dataMovie.results[0].overview}</p>   
                  </div>
                : ''}

                  <div className='button_footer'>
                  <Button variant='outlined' onClick={handleOpen} startIcon={ <PlayArrowIcon /> }>
                    Trailer
                  </Button>

                    <Button variant='contained' startIcon={ <AddIcon /> }>
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
        {dataMovie ? 
          <Slider movies={dataMovie.results} title='Filmes em alta' category={'movie'} />
        : '' }

        {discover ? 
          <Slider movies={discover.results} title='Séries em alta' category={'tv'} />
        : '' }
        
        {dataMovie && discover ? <Footer /> : ''} 
      </>    
    )
}