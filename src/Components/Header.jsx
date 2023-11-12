import { NavLink } from "react-router-dom";
import { useState } from 'react'
import { Grid, Button, Avatar, Menu, MenuItem } from "@mui/material";
import NotificationIcon from '@mui/icons-material/Notifications'
import CreateSharpIcon from '@mui/icons-material/CreateSharp'
import SettingsIcon from '@mui/icons-material/Settings'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HelpIcon from '@mui/icons-material/Help'
import Logouticon from '@mui/icons-material/Logout'
import SearchIcon from '@mui/icons-material/Search'
import './Styles/Header.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'


export default function Header(props){
    const [anchorEl, setAnchorEl] = useState(null)
    const [height, setHeight] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = e =>{
        setAnchorEl(e.currentTarget)
    }
    const handleClose = () =>{
        setAnchorEl(null)
    }
    const view_Height = () =>{
        setHeight(window.scrollY)
    }
    setInterval(view_Height, 1000)

    return(
        <div className='header'>
            <Grid className='container' container alignItems={'center'} width={'100%'} height={'10vh'} 
            sx={{
                padding: '0px 35px',
                backgroundColor: height > 0 ? 'black' : 'rgba(0, 0, 0, 0.445)'
                }}>
                <Grid item lg={6} md={6} sm={6} xs={6} className='grid' 
                sx={{
                    display: 'flex', 
                    alignItems: 'center', 
                    height: '100%'
                }}>
                    <Button className="Logo" variant='text'>
                        M
                    </Button>
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

                <Grid item lg={6} md={6} sm={6} xs={6} className='search' sx={{textAlign: 'right'}}>
                    <Button> <SearchIcon /> </Button>
                    <Button> <NotificationIcon /> </Button>
                    <Button
                        title="Perfil"
                        id='basic-button'
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <Avatar variant='rounded' alt='Five night' src={props.avatar} />
                    </Button>
                    <Menu
                        id='basic-menu'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button'
                        }}
                    >
                        <MenuItem sx={{fontSize: '0.8rem'}} onClick={handleClose}>{<CreateSharpIcon fontSize="small" sx={{paddingRight: '5%'}} />}Gerenciar perfil</MenuItem>
                        <MenuItem sx={{fontSize: '0.8rem'}} onClick={handleClose}>{<SettingsIcon fontSize="small" sx={{paddingRight: '5%'}} />}Configurações</MenuItem>
                        <MenuItem sx={{fontSize: '0.8rem'}} onClick={handleClose}>{<AccountCircleIcon fontSize="small" sx={{paddingRight: '5%'}} />}conta</MenuItem>
                        <MenuItem sx={{fontSize: '0.8rem'}} onClick={handleClose}>{<HelpIcon fontSize="small" sx={{paddingRight: '5%'}} />}Ajuda</MenuItem>
                        <MenuItem sx={{fontSize: '0.8rem'}} onClick={handleClose}>{<Logouticon fontSize="small" sx={{paddingRight: '5%'}} />}Sair</MenuItem>
                    </Menu>
                </Grid>
            </Grid>
        </div>
    )
}