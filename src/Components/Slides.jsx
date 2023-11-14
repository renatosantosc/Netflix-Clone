import { Box, IconButton, Button } from '@mui/material'
import { Link } from 'react-router-dom';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useRef } from 'react'
import './Styles/Slides.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

export default function Slide_Movies(props){

    const imageURL = 'https://image.tmdb.org/t/p/original';
    const carousel = useRef(null)
    const width = window.innerWidth + 'px'

    const handleLeft = () =>{
        carousel.current.scrollLeft -= carousel.current.offsetWidth
    }
    const handleRight = () =>{
        carousel.current.scrollLeft += carousel.current.offsetWidth
    }

    return(
        <Box className='box'
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
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
                                    <Link to={'/Assistir/' + item.id} className='link'>
                                        <Button className='play_movie' variant='contained' size='small' >
                                            <PlayArrowIcon />
                                        </Button>
                                    </Link>
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