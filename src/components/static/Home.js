import React from 'react';
import Intro from './Intro';
import AlbumList from '../photo/AlbumList';
import Contact from './Contact';

const Home = () => {
    return (
        <>
            <div className="cover"></div>
            <Intro />
            <AlbumList />
            <Contact />
        </>
    )
}

export default Home;