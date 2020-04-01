import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/static/Header';
import Home from './components/static/Home';
import Footer from './components/static/Footer';
import AlbumList from './components/photo/AlbumList';
import Album from './components/photo/Album';
import Photo from './components/photo/Photo';
import Blog from './components/blog/Blog';
import BlogPost from './components/blog/BlogPost';
import Contact from './components/static/Contact'
import ScrollToTop from './components/ScrollToTop';
import MuckingAbout from './MuckingAbout';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <ScrollToTop />
                <Header />
                <Route path='/' exact component={Home} />
                <Route path='/photography' exact component={AlbumList} />
                <Route path='/photography/:album' exact component={Album} />
                <Route path='/photography/:album/:photo' component={Photo} />
                <Route path='/blog' exact component={Blog} />
                <Route path='/blog/:post-:id' component={BlogPost} />
                <Route path='/contact' component={Contact} />
                <Route path='/muckabout' component={MuckingAbout} />
                <Footer />
            </BrowserRouter>
        </>
    );
};

export default App;