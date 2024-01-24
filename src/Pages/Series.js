import axios from 'axios';
import './Styles/Home.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Modal from '../Components/Modal';
import Slider from '../Components/Slides';
import Footer from  '../Components/Footer'
import { Box, Button, CircularProgress } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'
import InfoIcon from '@mui/icons-material/Info'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'


export default function Serie(){

    const [trendingTV, setTrendingTV] = useState() // Dados dos filmes em tedências
    const [actionTV, setActionTV] = useState() // Dados dos filmes de ação
    const [animationTV, setAnimationTV] = useState() // Dados dos filmes em animação
    const [crimeTV, setCrimeTV] = useState() // Dados dos filmes de crime
    const [fantasyTV, setFantasyTV] = useState() // Dados dos filmes de fantasia
    const [back, setBack] = useState() // State que guarda a imagem do background
    const [alt, setAlt] = useState() // State que guada a imagem do background alternativo para dispositivos móveis
    const [open, setOpen] = useState(false) // State para abrir e fechar o modal
    const [videoURL, setVideoURL] = useState() // State de todos os video 
    const [length, setLength] = useState(0) // Olhar o tamanho do state videoURL
    const [idVideo, setIdVideo] = useState(null) // key do video (trailer)
    const [foundVideo, setFoundVideo] = useState({}) // Array de trailers
    const width = window.innerWidth

    const handleOpen = () =>{ setOpen(true) }

    useEffect(()=>{ 
        const imageURL = 'https://image.tmdb.org/t/p/original';

        const trending = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/trending/tv/week?language=pt-BR',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
          };

        const animation = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=16&with_original_language=en',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
        };

        const action = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=10759&with_original_language=en',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
        };

        const crime ={
            method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=80&with_original_language=en',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
        };

        const fantasy ={
            method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=10765&with_original_language=en',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
        };

        const video = {
          method: 'GET',
          url: `https://api.themoviedb.org/3/tv/${idVideo}/videos?language=pt-BR&page=1`,
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
          }
      };

        axios
        .request(trending)
        .then(function (response) {
        setTrendingTV(response.data)
        setBack(imageURL + trendingTV.results[0].backdrop_path)
        setAlt(imageURL + trendingTV.results[0].poster_path)
        setIdVideo(trendingTV.results[0].id)
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(video)
        .then(function (response) {
          setVideoURL(response.data)
          setLength(videoURL.results.length)
          setFoundVideo(videoURL.results.find((item) => item.name === 'Trailer Oficial Dublado' || item.type === 'Trailer'))
        })
        .catch(function (error) {
          console.error(error);
        });


        axios
        .request(action)
        .then(function (response) {
        setActionTV(response.data)
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(animation)
        .then(function (response) {
        setAnimationTV(response.data)
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(crime)
        .then(function (response) {
        setCrimeTV(response.data)
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(fantasy)
        .then(function (response) {
          setFantasyTV(response.data)
        })
        .catch(function (error) {
          console.error(error);
        });

    },[trendingTV, actionTV, animationTV, crimeTV, fantasyTV, videoURL, idVideo, foundVideo])
    return(
        <>
        <Box className='body' width={'100vw'} height={'85vh'} sx={{backgroundImage: width > 450 ? `url(${back})` : `url(${alt})`}}>
            <Header />
            {open ? 
              <Modal setOpen={setOpen} open={open} id={foundVideo.key} />
            : '' }
            {trendingTV && actionTV && animationTV && crimeTV && fantasyTV ? 
            <div className='title'>
              <div className='right'>
                {trendingTV ?
                  <div className='description'>  
                    <h1>{trendingTV.results[0].name}</h1>
                    <p>{trendingTV.results[0].overview}</p>   
                  </div>
                : ''}

                  <div className='button_footer'>
                    {videoURL && length > 0 ?
                        <Button variant='outlined' onClick={handleOpen} startIcon={ <PlayArrowIcon sx={{paddingBottom: '3px'}} /> }>
                          Trailer
                        </Button>
                      : 
                      <Link to={`/tv/${trendingTV.results[0].id}`} className='link'>
                        <Button variant='outlined' startIcon={ <InfoIcon sx={{paddingBottom: '3px'}} /> }>
                            Detalhes
                        </Button>
                      </Link>
                    }

                    <Button variant='contained' startIcon={ <AddIcon sx={{paddingBottom: '3px'}} /> } >
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
        {trendingTV ? 
          <Slider movies={trendingTV.results} title='Tendências da semana' category={'tv'} />
        : '' }

        {actionTV ? 
          <Slider movies={actionTV.results} title='Séries de ação e aventura' category={'tv'} />
        : '' }

        {animationTV ? 
          <Slider movies={animationTV.results} title='Animação' category={'tv'} />
        : '' }

        {crimeTV ? 
          <Slider movies={crimeTV.results} title='Séries de crime' category={'tv'} />
        : '' }

        {fantasyTV ? 
          <Slider movies={fantasyTV.results} title='Séries de ficção científica e fantasia' category={'tv'} />
        : '' }
        
        {trendingTV && actionTV && animationTV && crimeTV && fantasyTV ? <Footer /> : ''} 
      </>
    )
}