import React from 'react';
import { Link } from 'react-router-dom';
import bren1 from '../../images/bren1.jpg';
import bren2 from '../../images/bren2.jpg';
import bren3 from '../../images/bren3.jpg';
import portrait from '../../images/bren-small2.jpg';

const images = [bren1, bren2, bren3];

const randomImage = () => {
    let image = Math.floor(Math.random() * images.length);
    return images[image];
}

const styles = () => {
    return {
        backgroundImage: `url(${randomImage()})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '80vh',
        width: '100vw',
        padding: '0'
    }
};

const About = () => { 
    console.log(randomImage());
        return (
            <>
                <div style={styles()}>

                </div>
                <div className="centered about">
                    <article>
                        <h1>About Brendan</h1>
                        <img src={portrait} className='profile' alt='Portrait of Brendan' title='Brendan' />
                        <p>I'm a photographer who likes to travel. I've travelled through Europe, Asia, and South America, always with a camera. I enjoy exploring, and while travelling often stray from the beaten tourist trails to get lost and find where the locals hang out. I love new people and learning about different cultures, and I'm always ready to make a new friend while travelling.</p>
                        <p>I got my first disposable film camera when I was about 4 years old as a free gift which my parents redeemed through tokens cut out from cereal boxes. I was very excited to have a camera and to make my own images. I remember using it to take a photo of my family sitting down and having a picnic, and I remember my first photos developed as a series of blurred smudges of colour. Despite the poor quality of the camera I'll nver forget the excitement of getting a film developed and seeing how my photos came out. After playing with my first camera at a young age I used to dream of one day adventuring abroad to photograph different countries and the people that live there. Much later in life I got the opportunity to do exactly that, and it transformed my life and world view.</p>
                        <p>I'm naturally curious, and travelling and photography are a great way for me to explore the things in the world I have a natural curiosity about. I love wandering around busy mega cities photographing the streets and hiking up mountains with a tent so I can photograph the milky way at night.</p>
                        <p>I use a Sony mirrorless camera and a bunch of fixed-focal length "prime" lenses. I prefer prime lenses for their quality, but I also like the creative constraints of being limited to a single focal length and not having a zoom.</p>
                        <p>I also use a wide range of vintage lenses, partly because they're more affordable, partly because I love how they work, and partly because I like the character and small flaws of an older lens in an image. Modern lenses are built to be optically perfect, but I like creating images with a lens that I can't always predict. Using vintage lenses has allowed me to explore more about photography and come to a great understanding of how lenses actually work and how I can use them to my advantage.</p>
                        <p>All of my photographs are edited and processed in Lightroom. I've been using Lightroom for nearly 10 years, and over time I've put less emphasis on recreating what the a scene objectively looks like and more emphasis on how a scene feels in a photo. With my editing I try to recreate the moods and emotions I get from a scene. Great photography for me is about telling stories as well as showing people how I see the world.</p>
                        <p>I've been building and maintaining websites for 15 years for a living, and have worked on websites for small businesses and large enterprises. I'm proficient with HTML, CSS, and Javascript, and have hands on experience with a variety of Content Management Systems. I also have an interest in design and user experience, and I know a thing or two about search engine optimisation. I built this website from scratch using ReactJS. </p>
                        <p>I enjoy to drawing and painting when I get the time. I've been making images, putting pen to paper (or crayons on walls) for as long as I can remember.</p>
                        <p>If you'd like to know more or ask me a question, <Link to='/contact'>get in touch and say hi.</Link></p>
                    </article>
                </div>
            </>
        )
}

export default About







 

