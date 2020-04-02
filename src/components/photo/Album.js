import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { fetchPhotos, fetchAlbums } from '../../actions';

class Album extends React.Component {

    componentDidMount() {
        this.props.fetchPhotos(this.props.match.params.aid);
        this.props.fetchAlbums();
    }

    renderTitle() {
        if (!this.props.photos) {
            return <h1>Spinning up the flux capacitor</h1>;
        } else {
            return <h1>{this.props.photos.title}</h1>
        }
    }

    findAlbum() {
        let albumId = this.props.match.params.aid;
        return this.props.albums.find(album => albumId === album.id);
    }

    renderDescription() {
        if(!this.props.albums.length) {
            return <p>Spinning up the flux capacitor</p>
        } else {
            return <p>{this.findAlbum().description._content}</p>
        }
    }

    renderPageTitle() {
        if (!this.props.photos) {
            return <title>'Photography portfolio for Brendan Meachen | Traveling Photographer'</title>
        } else {
            return <title>{this.props.photos.title}</title>
        }
    }

    renderMetaDescription() {
        if(!this.props.albums.length) {
            return <meta name="description" content='Photography from around the world!' />;
        } else {
            return <meta name="description" content={this.findAlbum().title._content } />;
        }
    }

    renderPhotos() {
        if (!this.props.photos) {
            return <p>loading photos</p>;
        } else {
            return this.props.photos.photo.map(photo => {
                let imgUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`;
                let imgSize = '_w.jpg';
                return (
                    <figure key={photo.id}>
                        <Link to={ `${this.props.photos.title.toLowerCase()}-${this.props.match.params.aid}/${photo.title.replace(/\s+/g, '-').replace(/,/g, '').toLowerCase()}/${photo.id}`}>
                            <img src={`${imgUrl}${imgSize}`} alt={photo.title} title={photo.title} /> 
                        </Link>
                    </figure>
                ); 
            })
        }
    }

    findPrimaryPhoto() {
        if (!this.props.photos) {
            return <p>Loading primary photo</p>;
        } else {
            let primary = this.props.photos.primary;
            return this.props.photos.photo.find(photo => primary === photo.id);
        }
    }

    renderPrimaryPhoto() {
        let imgUrl = `https://farm${this.findPrimaryPhoto().farm}.staticflickr.com/${this.findPrimaryPhoto().server}/${this.findPrimaryPhoto().id}_${this.findPrimaryPhoto().secret}_b.jpg`;
        let style = {backgroundImage: `url(${imgUrl})`, backgroundPosition: 'center center', backgroundSize: 'cover'};
        return <div className="primary" style={style}></div>;
    }

    render(){
        return (
            <div className="centered photography album">
                <Helmet>
                    {this.renderPageTitle()}
                    {this.renderMetaDescription()}    
                </Helmet>
                {this.renderTitle()}
                {this.renderPrimaryPhoto()}
                {this.renderDescription()}
                <div className="photos">
                    {this.renderPhotos()}
                </div>
            </div>
    );
    }

}

const mapStateToProps = (state, ownProps) => {
    return { photos: state.photos, albums: state.albums};
}

export default connect(mapStateToProps, {fetchPhotos: fetchPhotos, fetchAlbums: fetchAlbums})(Album);