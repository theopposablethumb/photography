import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { fetchBlogPosts } from '../../actions';
import portrait from '../../images/bren-small.jpg';

class Blog extends React.Component {
    
    componentDidMount() {
        this.props.fetchBlogPosts();
    }

    formatDate(postDate) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        
        const date = new Date(postDate.replace(/-/g, '/'));
        const year = date.getFullYear();
        const monthName = months[date.getMonth()]; //get the month in the date as a number and pass it as an index to the array or month strings
        const day = date.getDate();
        const dayName = days[date.getDay()];
        const formattedDate = `${dayName} ${day} ${monthName} ${year}`;
        return formattedDate;
    }

    renderBlogPosts() {
        return this.props.blog.map(post => {
            return (
                <article key={post.id}>
                    <h2>
                        <Link to={`/blog/${post.title.replace(/\s+/g, '_').toLowerCase()}-${post.id}`}>
                            {post.title}
                        </Link>
                    </h2>
                    <p className="date">Published on {this.formatDate(post.date)}</p>
                    <div dangerouslySetInnerHTML={{ __html: post.body_abstract}} />
                    <p><Link to={`/blog/${post.title.replace(/\s+/g, '_').toLowerCase()}-${post.id}`} className="readMore">Read more...</Link></p>
                </article>
            )
        })
    }

    render() {
        
        return (
            <div className="centered blog">
                <Helmet>
                    <title>Cameras, lenses, lightroom, and photography technique | Photography blog</title>
                    <meta name='description' content='I am a photographer who likes to travel. Travel photography, experiences, lenses, and photo editing.' />
                </Helmet>
                <article className="intro">
					<h1>Hi, I'm Brendan</h1>
                    <img src={portrait} className='profile' alt='Portrait of Brendan' title='Brendan' />
					<p>I'm a photographer who likes to travel and learn about new cultures. I shoot mostly with prime lenses as I enjoy the creative challenge of constraints, and I have a love for vintage glass.</p>
				</article>
                {this.renderBlogPosts()}
            </div>
            )
    }
}

const mapStateToProps = (state) => {
    return { blog: state.blog };
}

export default connect(mapStateToProps, { fetchBlogPosts: fetchBlogPosts })(Blog);