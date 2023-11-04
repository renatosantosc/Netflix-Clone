import { NavLink } from "react-router-dom";
import { Grid, Button } from "@mui/material";



export default function Header(){
    return(
        <div className='header'>
            <Grid container alignItems={'center'} width={'100%'}>

                <Grid item lg={6} md={6} sm={6} xs={6} sx={{backgroundColor: 'red'}}>
                    <span>MOVIEFLIX</span>
                    <div className='links'>
                        <NavLink to='/' className='button'>
                            <Button variant='text'>Início</Button>
                        </NavLink>

                        <NavLink to='/Séries' className='button'>
                            <Button variant='text'>Séries</Button>
                        </NavLink>

                        <NavLink to='/Filmes' className='button'>
                            <Button variant='text'>Filmes</Button>
                        </NavLink>

                        <NavLink to='/Bombando' className='button'>
                            <Button variant='text'>Bombando</Button>
                        </NavLink>
                    </div>
                </Grid>

                <Grid item lg={6} md={6} sm={6} xs={6} sx={{backgroundColor: 'green'}}>
                    <Button variant='text'>Pesquisa</Button>
                    <Button variant='text'>Lembrete</Button>
                    <Button variant='text'>Avatar</Button>
                </Grid>

            </Grid>
        </div>
    )
}