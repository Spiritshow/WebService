import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from './Layout/Layout';
import Masters from '../Pages/Masters/Masters';
import Offering from '../Pages/Offering/Offering';
import Master from '../Pages/Masters/components/Master/Master';
import Sign_up from '../Pages/Login/Sign_up';
import Login from '../Pages/Login/Login';
import Offer from '../Pages/Offering/components/Offer/Offer';

const Router = () => {
    return(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}> 
                <Route path='/' element={<Masters/>}/>
                <Route path='/Masters/:id' element={<Master/>}/>
                <Route path='/Offering' element={<Offering/>}/>
                <Route path='/Offering/:id' element={<Offer/>}/>
                <Route path='/Login' element={<Login/>}/>
                <Route path='/Sign_up' element={<Sign_up/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
    );
}

export default Router;