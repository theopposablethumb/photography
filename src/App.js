import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/static/Header';
import Home from './components/static/Home';
import Footer from './components/static/Footer';
import AlbumList from './components/photo/AlbumList';
import Album from './components/photo/Album';
import Photo from './components/photo/Photo';
import Contact from './components/static/Contact'

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Route path='/' exact component={Home} />
                <Route path='/photography' exact component={AlbumList} />
                <Route path='/photography/:album' exact component={Album} />
                <Route path='/photography/:album/:photo' component={Photo} />
                <Route path='/contact' exact component={Contact} />
                <Route path='/success' component={Contact} />
                <Footer />
            </BrowserRouter>
        </>
    );
};

export default App;