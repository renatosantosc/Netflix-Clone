import { Box, Grid, Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios'
import './Styles/ViewMovie.css'
import Modal from '../Components/Modal'
import Header from '../Components/Header'
import { PlayArrowIcon} from '@mui/icons-material/'
import { AddIcon} from '@mui/icons-material/'

export default function ViewMovie(){

    const [dateMovie, setDateMovie] = useState(null)
    const [open, setOpen] = useState(false)
    const [key, setKey] = useState(null)
    const imageURL = 'https://image.tmdb.org/t/p/original';
    const { id } = useParams()

    const openVideo = () =>{
        const video = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${id}/videos?language=pt-BR&page=1`,
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
          };

        axios
        .request(video)
        .then(function (response) {
            setKey(response.data)
            setOpen(true)
        })
        .catch(function (error) {
        console.error(error);
        });
    }

      useEffect(() =>{
        const movie = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`,
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
          };

        axios
        .request(movie)
        .then(function (response) {
        setDateMovie(response.data)
        })
        .catch(function (error) {
        console.error(error);
        });

      },[id])
    return(
        <>
            <Box className='container'
            sx={{
                width: '100vW',
                color: '#fff',
                padding: '0 10px'
            }}
            >
              <Header />
              {dateMovie ? 
                <Grid container className='grid'>
                  <Grid item className='left'>
                    <h1>{dateMovie.title}</h1>
                    <p>{dateMovie.overview}</p>
                    
                    <div className='button_video'>
                      <button onClick={openVideo} >
                      { <PlayArrowIcon /> } Trailer
                      </button>

                      <button >
                      { <AddIcon /> } Minha Lista
                      </button>
                    </div>
                  </Grid>
                  
                  <Grid item className='rigth' sx={{
                    backgroundImage: `url(${imageURL + dateMovie.backdrop_path})`
                  }}>
                  </Grid>
                </Grid>
                : ''}
                
              </Box>
                {key && open ? <Modal setOpen={setOpen} open={open} id={key.results[0].key} /> : ''}
        </>
    )
}