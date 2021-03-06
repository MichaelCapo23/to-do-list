import React, { Component } from 'react';
import axios from 'axios';
import { Base_URL, API_KEY } from '../config/api';

class ViewItem extends Component {
    state = {
        data: ''
    }

    getItemData = async () => {
        console.log('Item ID: ', this.props.match.params.item_id);
        const resp = await axios.get(`${Base_URL}/${this.props.match.params.item_id + API_KEY}`).then( (response) => {
            console.log('response Get Item Data: ', response.data.todo);
            this.setState({
                data: {...response.data.todo}
            })
        });
    }

    async componentDidMount() {
        this.getItemData();
    }

    render() {
        console.log('State Data: ', this.state.data);
        console.log('View Item Props: ', this.props);
        return (
            <div>
                <h1 className="center">View Item</h1>
                <div className="collection">
                    <h4 className="collection-item">Title: {this.state.data.title}</h4>
                    <p className="collection-item">Details: {this.state.data.details}</p>
                </div>
            </div>
        )
    }
}
export default ViewItem;