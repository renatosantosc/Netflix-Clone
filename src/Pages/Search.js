import Header from '../Components/Header'
import { Box, Grid, TextField, Button } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import SearchIcon from '@mui/icons-material/Search';
// import './Styles/Search.css'


export default function Search(){

    const [search, setSearch] = useState()
    const [resultSearch, setResultSearch] = useState()
    const imageURL = 'https://image.tmdb.org/t/p/original';

    const handleChange = e => {
        setSearch(e.target.value)

        const search_multi = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=pt-BR&page=1`,
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
          };
          
          axios
            .request(search_multi)
            .then(function (response) {
              setResultSearch(response.data.results)
            })
            .catch(function (error) {
              console.error(error);
            });
    }

    return(
        <>
            <Box container
            sx={{
                width: '100vw'
            }}>
                <Header />
                <Grid 
                    container 
                    direction={'column'} 
                    width={'100%'} 
                    justifyContent={'center'}
                    alignItems={'center'}
                    sx={{marginTop: '7%', gap: '10px'}}
                >
                    <Grid item width={'30%'} >
                        <TextField 
                            type='text'
                            variant='outlined'
                            size='small'
                            fullWidth
                            placeholder='Encontre seus filmes e séries'
                            onChange={handleChange}
                            value={search}
                            sx={{
                                '& .MuiOutlinedInput-root' : {
                                    color: 'white',
                                    '& > fieldset' : {
                                        border: '2px solid',
                                        borderColor: '#505658',
                                        borderRadius: '10px'
                                    }
                                },
                                
                                '&:hover .MuiOutlinedInput-root' : {
                                    '& > fieldset' : {
                                        borderColor: '#505658'
                                    }
                                },
                                '& .MuiOutlinedInput-root.Mui-focused' : {
                                    '& > fieldset' : {
                                        borderColor: '#fff'
                                    }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item width={'80%'} height={'80%'} justifyContent={'center'} sx={{marginTop: '2%'}}>
                        <Grid container width={'100%'} height={'100%'} justifyContent={'center'}>
                            {resultSearch && search.trim().length > 0 ? resultSearch.map(items =>{
                                return(
                                    <Grid item xl={2} lg={2} md={3} xs={4} textAlign={'center'} key={items.id}>
                                        
                                        <Link to={`/${items.media_type}/${items.id}`}>
                                            <Button
                                                sx={{
                                                    width: '145px',
                                                    height: '210px',
                                                    backgroundImage: `url(${imageURL + items.poster_path})`,
                                                    margin: '10px',
                                                    backgroundSize: 'contain',
                                                    backgroundRepeat: 'no-repeat',
                                                    ':hover' : {
                                                        transform: 'scale(1.1)'
                                                    },
                                                    transition: '0.4s ease'
                                                }}
                                            >
                                            </Button>
                                        </Link>
                                        
                                    </Grid>
                                )
                            }) : 'Nada'}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}