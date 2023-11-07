import axios from 'axios'
import '../App.css'
import './Styles/Home.css'
import { useState, useEffect } from 'react';
import Header from '../Components/Header';
import { Box, Button, Modal } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'


export default function Home(){

  const [dataMovie, setDataMovie] = useState()
  const [back, setBack] = useState()
  const [avatar, setAvatar] = useState()
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
    setOpen(true)
    axios
    .request(video)
    .then(function (response) {
      setVideoURL(response.data)
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  useEffect(()=>{ 
    const imageURL = 'https://image.tmdb.org/t/p/original';
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
      }
    };

    axios
    .request(options)
    .then(function (response) {
      setDataMovie(response.data)
      setBack(imageURL + dataMovie.results[4].backdrop_path)
      setAvatar(imageURL + dataMovie.results[0].poster_path)
      setIdVideo(dataMovie.results[4].id)
    })
    .catch(function (error) {
      console.error(error);
    });
  },[dataMovie])

    return(
        <Box className='body' width={'100vw'} height={'95vh'} sx={{backgroundImage: `url(${back})`}}>
            <Header avatar={avatar} />
            <div className='title'>
              <div className='right'>
                {dataMovie ?
                  <div className='description'>  
                    <h1>{dataMovie.results[4].title}</h1>
                    <p>{dataMovie.results[4].overview}</p>   
                  </div>
                : ''}

                  <div className='button_footer'>
                    <Button variant='outlined' startIcon={ <PlayArrowIcon /> }>
                      Assitir
                    </Button>

                    <Button variant='contained' startIcon={ <AddIcon /> }>
                      Minha Lista
                    </Button>
                  </div>
              </div>

                <div className='left'>
                  {videoURL ?
                    <iframe src={`https://www.youtube.com/embed/${videoURL.results[0].key}`}/>
                  : ''}
                  <Button variant='contained' onClick={handleOpen} startIcon={ <PlayArrowIcon /> }>
                    Trailer
                  </Button>
                </div>
            </div>
        </Box>
    )
}