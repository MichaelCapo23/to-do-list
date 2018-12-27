import React, {Component} from 'react';
import NavButton from './nav_buuton'
import axios from 'axios';
import {Base_URL, API_KEY} from '../config/api'

class ViewItem extends Component {
    state = {
        
    };
    componentDidMount = async () => {
        console.log(this.props.match.params.item_id);
        const response = await axios.get(`${Base_URL}/${this.props.match.params.item_id+ API_KEY}`);
        console.log("get item response: ", response);
    };

    render() {
        console.log(this.props);
        return (
            <div>
                <h1 className={"center"}>View Item</h1>
            </div>
        )
    }
}

export default ViewItem;