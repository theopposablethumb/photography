import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogRecentPosts } from '../../actions';

class Blog extends React.Component {
    
    componentDidMount() {
        this.props.fetchBlogRecentPosts();
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
        return this.props.recentPosts.map(post => {
            return (
                <article key={post.id}>
                    <h3>
                        <Link to={`/blog/${post.title.replace(/\s+/g, '_').toLowerCase()}-${post.id}`}>
                            {post.title}
                        </Link>
                    </h3>
                    <p className="date">Published on {this.formatDate(post.date)}</p>
                </article>
            )
        })
    }

    render() {
        console.log(this.props);
        return (
            <div className="centered blogList">
                <h2>Latest Blog posts</h2>
                {this.renderBlogPosts()}
            </div>
            )
    }
}

const mapStateToProps = (state) => {
    return { recentPosts: state.recentPosts };
}

export default connect(mapStateToProps, { fetchBlogRecentPosts: fetchBlogRecentPosts })(Blog);