import { Box, IconButton, Button } from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useRef, useState } from 'react'
import axios from 'axios'
import Modal from './Modal'
import './Styles/Slides.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

export default function Slide_Movies(props){

    const [open, setOpen] = useState(false)
    const [videoURL, setVideoURL] = useState(null)
    const [URL, setURL] = useState(null)
    const imageURL = 'https://image.tmdb.org/t/p/original';
    const carousel = useRef(null)
    const width = window.innerWidth + 'px'

    const handleLeft = () =>{
        carousel.current.scrollLeft -= carousel.current.offsetWidth
    }
    const handleRight = () =>{
        carousel.current.scrollLeft += carousel.current.offsetWidth
    }
    const handleOpen = id =>{
        console.log(id)
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
          setVideoURL(response.data)
          setOpen(true)
          setURL(videoURL.results[0].key)
        })
        .catch(function (error) {
          console.error(error);
        });
      }

    return(
        <Box className='box'
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
               {videoURL ? 
                <Modal open={open} setOpen={setOpen} id={URL} /> 
                : ''}
                <span>{props.title}</span>
                <ul ref={carousel}>
            {props.movies ?
                props.movies.map(item =>{
                    return(
                        <li key={item.id}>
                            <Button className='card'
                            sx={{
                                width: `calc(${width}/11)`,
                                height: '185px',
                                backgroundImage: `url(${imageURL + item.poster_path})`,
                                margin: '5px'
                            }}
                            >
                                <div className='play'>
                                    <Button className='play_movie' variant='contained' size='small' onClick={handleOpen(item.id)}>
                                        <PlayArrowIcon />
                                    </Button>
                                </div>
                            </Button>
                        </li>
                        
                        )})
            : '' }
            </ul>
            <div className='button'>
                <IconButton className='buttons' size='large' onClick={handleLeft}>
                    <KeyboardArrowLeft fontSize='inherit' />
                </IconButton>

                <IconButton className='buttons' size='large' onClick={handleRight}>
                    <KeyboardArrowRight fontSize='inherit'/>
                </IconButton>
            </div> 
        </Box>
    )
}