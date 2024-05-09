import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from './Layout/Layout';
import Masters from '../Pages/Masters/Masters';
import Offering from '../Pages/Offering/Offering';
import Master from '../Pages/Masters/components/Master/Master';

const Router = () => {
    return(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}> 
                <Route path='/' element={<Masters/>}/>
                <Route path='/Masters/:id' element={<Master/>}/>
                {/* <Route path='/Offering' element={<Offering/>}/> */}
                {/* <Route path='/Offering/:id' element={<Offering/>}/> */}
                {/* <Route path='/Login' element={<Login/>}/> */}
            </Route>
        </Routes>
    </BrowserRouter>
    );
}

export default Router;