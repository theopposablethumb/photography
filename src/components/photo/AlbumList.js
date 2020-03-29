import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchAlbums } from '../../actions';

class AlbumList extends React.Component {

    componentDidMount() {
        this.props.fetchAlbums();
    }

    renderTitle() {
        if (!this.props.location) {
            return <h2>Photography from around the world</h2>
        } else {
            return <h1>Photography from around the world</h1>
        }
    }

    renderClassName() {
        if (!this.props.location) {
            return null;
        } else {
            return 'album'
        }
    }

    renderAlbums() {
        return this.props.albums.map(album => {
            let imgUrl = `https://farm${album.farm}.staticflickr.com/${album.server}/${album.primary}_${album.secret}_c.jpg`;
            let imgTitle = album.title._content;
            let imgCaption = album.description._content;
            return (
                <figure className="album" key={album.id}>
                    <Link to={{
                                pathname: `photography/${album.title._content.toLowerCase()}`,
                                state: {albumId: album.id, title: album.title._content, description: album.description._content}
                            }}><img src={imgUrl} alt={imgCaption} title={imgTitle} />
                        </Link>
                    <figcaption>
                        <h2>
                            <Link to={{
                                pathname: `photography/${album.title._content.toLowerCase()}`,
                                state: {albumId: album.id, title: album.title._content, description: album.description._content}
                            }}>{imgTitle}</Link>
                        </h2>
                        <p>
                            <Link to={{
                                pathname: `photography/${album.title._content.toLowerCase()}`,
                                state: {albumId: album.id, title: album.title._content, description: album.description._content}
                            }}>{imgCaption}
                        </Link></p>
                    </figcaption>
                    
                </figure>
            )
        })
    }

    render() {
        return (
            <div className={`centered photography ${this.renderClassName()}`}>
                <Helmet>
                    <title>Photography portfolio for Brendan Meachen | Traveling Photographer</title>
                    <meta name="description" content="Cities, landscapes, and people from around the world photographed by Brendan Meachen." />
                </Helmet>
                {this.renderTitle()}
                {this.renderAlbums()}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return { albums: state.albums };
}

export default connect(mapStateToProps, {fetchAlbums: fetchAlbums})(AlbumList);