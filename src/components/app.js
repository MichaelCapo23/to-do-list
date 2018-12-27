import 'materialize-css/dist/css/materialize.min.css';
import React, {Component} from 'react';
import List from './list';
import AddItem from './add_item';
import 'materialize-css/dist/js/materialize';
import axios from 'axios';
import {Route, Switch} from 'react-router-dom';
import ViewItem from "./view_item"
import {Base_URL, API_KEY} from '../config/api'
import NotFound from './404'

class App extends Component {
    state = {
        list: [],
    };

    componentDidMount() {
        this.getListData();
    }

    deleteItem = async (id) => {
        const response = await axios.delete(`${Base_URL}/${id + API_KEY}`);
        this.getListData();
    };

    addItem = async (item) => {
        const response = await axios.post(Base_URL + API_KEY, item);
        await this.getListData();
    };

    async getListData(){
        try {
            const response = await axios.get(Base_URL + API_KEY);
            this.setState({
                list: response.data.todos,
            });
        } catch (err) {
            console.log("error when tyring to get listData: ", err)
        }

        //http://api.reactprototypes.com/todos?key=c918_demouser
        // axios.get(Base_URL + API_KEY).then((response) => {
        //     console.log('get todos response: ', response);
        // }).catch((err) => {
        //     console.log('get todos error response: ', err.message);
        // });
    };

    toggleComplete = async (id) => {
        const response = await axios.put(`${Base_URL}/${id + API_KEY}`);
        console.log("put: ",response);
        this.getListData();
    };

    render() {
        const {list} = this.state;
        return (
            <div className={"container"}>
                <Switch>
                    <Route exact path={"/"} render={(props) => {
                        return <List {...props} toggle={this.toggleComplete} delete={this.deleteItem} toDos={list}/>
                    }}/>

                    <Route path={"/Add-item"} render={(props) => {
                        return <AddItem {...props} add={this.addItem}/>
                    }}/>

                    <Route path={"/item/:item_id"} component={ViewItem}/>

                    <Route component={NotFound}/>
                </Switch>
            </div>
        );
    }
}


export default App;
