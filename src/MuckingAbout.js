import React from 'react';
import axios from 'axios';

class MuckingAbout extends React.Component {
    componentDidMount() {
        (async () => {
            const response = await axios.get('../../functions/functions.js')
            console.log(response)
          })()
    }
    
    render() {
        return (
            <p>Mucking around</p>
        )
    }
}

export default MuckingAbout;