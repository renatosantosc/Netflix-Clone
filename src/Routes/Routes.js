import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from '../Pages/Home'
import Series from '../Pages/Series'
import Film from '../Pages/Film'
import Popping from '../Pages/Popping'

export default function MyRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/Séries' element={ <Series /> } />
                <Route path='/Filmes' element={ <Film /> } />
                <Route path='/Bombando' element={ <Popping /> } />
            </Routes>
        </BrowserRouter>
    )
}