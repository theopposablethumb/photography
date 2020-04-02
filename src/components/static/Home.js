import React from 'react';
import Intro from './Intro';
import AlbumList from '../photo/AlbumList';
import BlogList from '../blog/BlogList';
import Contact from './Contact';

const Home = (props) => {
    console.log(props);
    return (
        <>
            <div className="cover"></div>
            <Intro />
            <AlbumList />
            <BlogList />
            <Contact />
        </>
    )
}

export default Home;