import { Box, IconButton, Button } from '@mui/material'
import { Link } from 'react-router-dom';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useRef, useState, useEffect } from 'react'
import './Styles/Slides.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

export default function Slide_Movies(props){

    const imageURL = 'https://image.tmdb.org/t/p/original';
    const carousel = useRef(null)
    const [arrow, setArrow] = useState(false)
    const [box, setBox] = useState(false)
    const width = window.innerWidth + 'px'
    const handleLeft = () =>{ carousel.current.scrollLeft -= carousel.current.offsetWidth }
    const handleRight = () =>{ carousel.current.scrollLeft += carousel.current.offsetWidth }
    useEffect(()=>{
        if(props.movies){
            props.movies.length > 10 ? setArrow(true) : setArrow(false)
            props.movies.length > 0 ? setBox(true) : setBox(false)
        }
        if(props.cast){
            props.cast.length > 10 ? setArrow(true) : setArrow(false)
            props.cast.length > 0 ? setBox(true) : setBox(false)
        }
    },[props.cast, props.movies])

    return(
        <div>
            {box ? 
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
                                        <Link to={`/${props.category}/${item.id}`} className='link'>
                                            <Button className='play_movie' variant='contained' size='small'>
                                                <PlayArrowIcon />
                                            </Button>
                                        </Link>
                                    </div>
                                </Button>
                            </li>
                            )})
                            : '' }
                            {props.cast ?
                                props.cast.map(items =>{
                                    return(
                                        <li key={items.id}>
                                            <Button className='card'
                                            sx={{
                                                width: `calc(${width}/11)`,
                                                height: '185px',
                                                backgroundImage: `url(${imageURL + items.profile_path})`,
                                                margin: '5px'
                                            }}
                                            >
                                                <div className='character'>
                                                    <span className='name'>Personagem:</span>
                                                    <span className='character_name'>
                                                        {props.name === 'movie' ? items.character
                                                        : items.roles[0].character}
                                                    </span>
                                                </div>
                                            </Button>
                                            <span className='cast_name'>{items.name}</span>
                                        </li>
                                )}) : ''}
                                
                    </ul>
                    {arrow ?
                        <Box className='button' sx={{top: props.movies ? '-150px' : '-175px'}}>
                            <IconButton className='buttons' size='large' onClick={handleLeft}>
                                <KeyboardArrowLeft fontSize='inherit' />
                            </IconButton>

                            <IconButton className='buttons' size='large' onClick={handleRight}>
                                <KeyboardArrowRight fontSize='inherit'/>
                            </IconButton>
                        </Box> 
                        : ''}
            </Box>
        : ''}
        </div>
    )
}