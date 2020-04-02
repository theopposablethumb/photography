import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Image from './Image';
import { fetchPhoto, fetchPhotos } from '../../actions';

class PhotoDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentPhoto: this.props.location.state.photoId};
        this.keyHandling = this.keyHandling.bind(this);
    }

    componentDidMount() {
        this.props.fetchPhoto(this.state.currentPhoto);
        this.props.fetchPhotos(this.props.location.state.albumId);
        window.addEventListener("keyup", this.keyHandling);
    }

    componentWillUnmount() {
        window.removeEventListener("keyup", this.keyHandling);
    }

    renderTitle() {
        if (!this.props.photo.photo.title) {
            return <h1>Slow to impulse</h1>
        } else {
            return <h1>{this.props.photo.photo.title._content}</h1>
        }
    }

    renderPhoto() {
        if (!this.props.photo.photo.description) {
            return <p>Slow to impulse</p>
        } else {
            return <Image photoId={this.state.currentPhoto} title={this.props.photo.photo.title._content} alt={this.props.photo.photo.description._content} />
        }
    }

    renderPageTitle() {
        if (!this.props.photo.photo.title) {
            return <title>Photography by Brendan Meachen</title>
        } else {
            return <title>{this.props.photo.photo.title._content} | Phtography by Brendan Meachen</title>
        }
    }

    renderMetaDescription() {
        if (!this.props.photo.photo.title) {
            return <title>Photography by Brendan Meachen</title>
        } else {
            return <meta name="description" content={this.props.photo.photo.description._content} />
        }
    }

    selectNextPhoto(photoId) {
        photoId = this.state.currentPhoto;
        let photoArray = this.props.photo.photos.photo;
        let index = photoArray.findIndex(p => p.id === photoId); //find index of object key in array
        let nextPhoto;
        if(index >= 0 && index < photoArray.length - 1) {
            nextPhoto = photoArray[index +1].id;
        } else if (index >= photoArray.length - 1) {
            nextPhoto = photoArray[0].id;
        }
        this.setState({currentPhoto: nextPhoto});
    }

    selectPrevPhoto(photoId) {
        photoId = this.state.currentPhoto;
        let photoArray = this.props.photo.photos.photo;
        let index = photoArray.findIndex(p => p.id === photoId); //find index of object key in array
        let prevPhoto;
        if(index > 0 && index <= photoArray.length - 1) {
            prevPhoto = photoArray[index -1].id;
        } else if (index === 0) {
            prevPhoto = photoArray[photoArray.length - 1].id;
        }
        this.setState({currentPhoto: prevPhoto});
    }

    keyHandling(e) {
        if(e.keyCode === 37) {
            return this.selectPrevPhoto();
        } else if (e.keyCode === 39) {
            return this.selectNextPhoto();
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="photograph">
                <Helmet>
                    {this.renderPageTitle()}
                    
                </Helmet>
                {this.renderTitle()}
                {this.renderPhoto()}
                
                <div className="navigation">
                    <button onClick={()=> this.selectPrevPhoto()} >Previous photo</button>
                    <button onClick={()=> this.selectNextPhoto()} >Next photo</button>
                
                    <Link to={{
                        pathname: `/photography/${this.props.match.params.album}`,
                        state: {albumId: this.props.location.state.albumId}
                    }}>
                        Back to gallery
                    </Link>
                </div>
            </div>
            )
    }
}

const mapStateToProps = (state) => {
    return { photo: state };
}

export default connect(mapStateToProps, {fetchPhoto: fetchPhoto, fetchPhotos: fetchPhotos})(PhotoDetail);