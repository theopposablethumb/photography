import React from 'react';
import { connect } from 'react-redux';
import { fetchMeta } from '../../actions';

class PhotoMeta extends React.Component {

    componentDidMount() {
        this.props.fetchMeta(this.props.photoId);
    }

    componentDidUpdate(prevProps) {
        if(this.props.photoId !== prevProps.photoId) {
            this.props.fetchMeta(this.props.photoId); 
        }
      }

    formatDate(date) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const dateObj = new Date(this.props.meta.meta.exif[31].raw._content.replace(':', '/'));
        const year = dateObj.getFullYear();
        const monthName = months[dateObj.getMonth()]; //get the month in the date as a number and pass it as an index to the array or month strings
        const day = dateObj.getDate();
        const formattedDate = `${day} ${monthName} ${year}`;
        return formattedDate;
      }

    renderMeta() {
        if (!this.props.meta.meta) {
            return <p>fire when ready</p>
        } else {
            return(
                <ul className="meta">
                    <li><strong>Camera:</strong> {this.props.meta.meta.camera}</li>
                    <li><strong>Lens:</strong> {this.props.meta.meta.exif[27].raw._content}</li>
                    <li><strong>Focal Length:</strong> {this.props.meta.meta.exif[24].clean._content}</li>
                    <li><strong>Shutter Speed:</strong> {this.props.meta.meta.exif[11].raw._content}</li>
                    <li><strong>Aperture:</strong> {this.props.meta.meta.exif[12].clean._content}</li>
                    <li><strong>ISO:</strong> {this.props.meta.meta.exif[14].raw._content}</li>
                    <li><strong>Date taken:</strong> {this.formatDate()}</li>
                </ul>
            )
        }
    }

    render() {
        return <>{this.renderMeta()}</>
    }
}

const mapStateToProps = (state) => {
    return { meta: state };
}

export default connect(mapStateToProps, { fetchMeta: fetchMeta })(PhotoMeta);