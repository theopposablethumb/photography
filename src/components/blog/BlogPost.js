import React from 'react';
import { connect } from 'react-redux';
import { fetchBlogPost } from '../../actions';

class BlogPost extends React.Component {

    componentDidMount() {
        this.props.fetchBlogPost(this.props.match.params.id);
    }

    renderBlogPost() {
        if(!this.props.post) {
            return ( 
                <article>
                    <p>Warp factor 9. Engage!</p>
                </article>
            )
        } else {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
            
            const date = new Date(this.props.post.date);
            const year = date.getFullYear();
            const monthName = months[date.getMonth()]; //get the month in the date as a number and pass it as an index to the array or month strings
            const day = date.getDate();
            const dayName = days[date.getDay()];
            const formattedDate = `${dayName} ${day} ${monthName} ${year}`;
            
            return (
                <article>
                    <h2>{this.props.post.title}</h2>
                    <p className='date'>{formattedDate}</p>
                    <div dangerouslySetInnerHTML={{ __html: this.props.post.body}} />
                </article>

            )
        }
    }

    render() {
        return (
            <div className='centered'>
                {this.renderBlogPost()}
            </div>
            )
    }
}

const mapStateToProps = (state) => {
    return { post: state.post };
}
export default connect(mapStateToProps, { fetchBlogPost: fetchBlogPost })(BlogPost);