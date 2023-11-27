import { Box, Grid, Button, Typography, CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios'
import './Styles/ViewMovie.css'
import Modal from '../Components/Modal'
import Header from '../Components/Header'
import Slides from '../Components/Slides'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'

export default function ViewMovie(){

    const [dateMovie, setDateMovie] = useState(null)
    const [cast, setCast] = useState(null)
    const [newCast, setNewCast] = useState(null)
    const [recommendations, setRecommendations] = useState(null)
    const [open, setOpen] = useState(false)
    const [key, setKey] = useState(null)
    const [release, setRelease] = useState(null)
    const [releaseMovie, setReleaseMovie] = useState(null)
    const [minute, setMinute] = useState(null)
    const [hours, setHours] = useState(null)
    const [found, setFound] = useState(null)
    const imageURL = 'https://image.tmdb.org/t/p/original';
    const { id, name } = useParams()

    const openVideo = () =>{
        const video = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${name}/${id}/videos?language=pt-BR&page=1`,
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
            url: `https://api.themoviedb.org/3/${name}/${id}?language=pt-BR`,
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
          };

          const release_movie = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${name}/${id}/release_dates`,
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
          };

          const credits = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${name}/${id}/credits?language=pt-BR`,
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
          };

          const recommendation = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${name}/${id}/recommendations?language=pt-BR&page=1`,
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
          };

        axios
        .request(movie)
        .then(function (response) {
        setDateMovie(response.data)
        const movieRelease = new Date(name === 'movie' ? dateMovie.release_date : dateMovie.seasons[0].air_date)
        const ano = movieRelease.getFullYear()
        setRelease(ano)
        const hrs = Math.floor(dateMovie.runtime / 60)
        const min = dateMovie.runtime % 60
        setHours((`${hrs}`).slice(-2))
        setMinute((`${min}`).slice(-2))
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(release_movie)
        .then(function (response) {
        setReleaseMovie(response.data.results)
        setFound(releaseMovie.find((item) => item.iso_3166_1 === 'BR'))
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(credits)
        .then(function (response) {
          setCast(response.data.cast)
          setNewCast(cast.slice(0, 20))
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(recommendation)
        .then(function (response) {
          setRecommendations(response.data.results)
        })
        .catch(function (error) {
        console.error(error);
        });

      },[id, name, found, releaseMovie, dateMovie, cast, recommendations])
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
              {dateMovie && release && recommendations ? 
                <Grid container className='grid_view'>
                  <Grid item className='left'>
                    <div className='certification'>
                      <span className='date'>{release} </span>
                      {found ? 
                      <Typography className='age' variant='body1'
                        sx={{
                          backgroundColor: 
                          found.release_dates[0].certification === '10' ? 'blue' : 
                          found.release_dates[0].certification === '12' ? 'rgb(204, 204, 18)' :
                          found.release_dates[0].certification === '14' ? 'orange' :
                          found.release_dates[0].certification === '16'  ? 'red' : 
                          found.release_dates[0].certification === '18' ? 'black' : 'green'
                      }}>
                        {found.release_dates[0].certification} 
                      </Typography>
                      : ''}

                      <span className='genres'>{dateMovie.genres[0].name ? dateMovie.genres[0].name : ''}{dateMovie.genres[1].name ? ' | ' + dateMovie.genres[1].name : ''}</span>
                      <span className='time'>
                        {name === 'movie' ? `${hours}h ${minute}m` :  
                         name === 'tv' ? dateMovie.seasons[0].name : ''}
                      </span>
                    </div>
                    <h1>{name === 'movie'? dateMovie.title : dateMovie.name}</h1>
                    <p>{dateMovie.overview}</p>
                    
                    <div className='button_video'>
                      <Button variant='outlined' onClick={openVideo} startIcon={ <PlayArrowIcon /> } >
                       Trailer
                      </Button>

                      <Button variant='contained' startIcon={ <AddIcon /> } >
                       Minha Lista
                      </Button>
                    </div>
                  </Grid>
                  
                  <Grid item className='rigth' sx={{
                    backgroundImage: `url(${imageURL + dateMovie.backdrop_path})`
                  }}>
                  </Grid>
                </Grid>
                : 
                <Box width='100vw' height='100vh' sx={{
                  backgroundColor: 'transparent',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <CircularProgress sx={{color: 'red'}} />
                </Box> }

                {newCast ? 
                  <Slides title='Elenco' cast={newCast} name={name} />
                : ''}

                {recommendations && name === 'movie' ? 
                  <Slides title={`Recomendações`} movies={recommendations} category={'movie'} />
                : ''}

                {recommendations && name === 'tv' ? 
                  <Slides title={`Recomendações`} movies={recommendations} category={'tv'} />
                : ''}

              </Box>
                {key && open ? <Modal setOpen={setOpen} open={open} id={key.results[0].key} /> : ''}
        </>
    )
}