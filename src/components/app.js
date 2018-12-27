import 'materialize-css/dist/css/materialize.min.css';
import React, {Component} from 'react';
import List from './list';
import AddItem from './add_item';
import 'materialize-css/dist/js/materialize';
import axios from 'axios';
import {Route} from 'react-router-dom';

const Base_URL = 'http://api.reactprototypes.com/todos';
const API_KEY = '?key=c1018_IFeelThat';

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
                <Route exact path={"/"} render={(props) => {
                    return <List {...props} toggle={this.toggleComplete} delete={this.deleteItem} toDos={list}/>
                }}/>

                <Route path={"/Add-item"} render={(props) => {
                    return <AddItem {...props} add={this.addItem}/>
                }}/>
            </div>
        );
    }
}


export default App;
