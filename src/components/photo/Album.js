import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { fetchPhotos } from '../../actions';

class Album extends React.Component {

    //It is possible however a lot of other props are already dependent on location.state... so will need further refactoring
    componentDidMount() {
        if (!this.props.history.location.state) {
            switch (this.props.location.pathname) {
                case '/photography/landscapes':
                    this.props.fetchPhotos('72157710823336551');
                    break;
                case '/photography/street':
                    this.props.fetchPhotos('72157710825244592');
                    break;
                case 'photography/portraits':
                    this.props.fetchPhotos('72157710824310687');
                    break;
                default:
                    this.props.fetchPhotos('72157710773833253');
            }
                 
        } else {
            this.props.fetchPhotos(this.props.location.state.albumId);
        }
    }

    renderTitle() {
        if (!this.props.photos) {
            return <h1>Spinning up the flux capacitor</h1>;
        } else {
            return <h1>{this.props.photos.title}</h1>
        }
    }

    renderDescription() {
        if (!this.props.history.location.state) {
            return <p>Photography from around the world!</p>
        } else {
            return <p>{this.props.location.state.description}</p>
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
        if (!this.props.history.location.state) {
            return <meta name="description" content='Cities, landscapes, and people from around the world photographed by Brendan Meachen.' />
        } else {
            return <meta name="description" content={this.props.location.state.description} />;
        }
    }

    renderPhotos() {
        if (!this.props.photos) {
            return <p>loading photos</p>;
        } else {
            if (!this.props.history.location.state) { 
                return this.props.photos.photo.map(photo => {
                    let imgUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`;
                    let imgSize = '_w.jpg';
                    return (
                        <figure key={photo.id}>
                            <img src={`${imgUrl}${imgSize}`} alt={photo.title} title={photo.title} /> 
                        </figure>
                    )
                })
            } else {
                return this.props.photos.photo.map(photo => {
                    let imgUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`;
                    let imgSize = '_w.jpg';
                    return (
                        <figure key={photo.id}>
                            <Link 
                                to={{
                                    pathname: `${this.props.photos.title}/${photo.title}`,
                                    state: {photoId: photo.id, albumId: this.props.location.state.albumId, albumPhotos: this.props.photos.photo}
                                }}
                            >
                                <img src={`${imgUrl}${imgSize}`} alt={photo.title} title={photo.title} /> 
                            </Link>
                        </figure>
                    ); 
                })
            }
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
        let alt = this.findPrimaryPhoto().title;
        return <figure className="primary"><img src={imgUrl} alt={alt} title={alt} /></figure>;
    }

    render(){
        return (
                <div className="centered photography album">
                    <Helmet>
                        {this.renderPageTitle()}
                        {this.renderMetaDescription()}    
                    </Helmet>
                    {this.renderTitle()}
                    {this.renderDescription()}
                    {this.renderPrimaryPhoto()}
                    <div className="photos">
                        {this.renderPhotos()}
                    </div>
                </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return { photos: state.photos};
}

export default connect(mapStateToProps, {fetchPhotos: fetchPhotos})(Album);