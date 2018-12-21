import 'materialize-css/dist/css/materialize.min.css';
import React, {Component} from 'react';
import List from './list';
import AddItem from './add_item';
import 'materialize-css/dist/js/materialize';
import dummyList from "../data/to_do_list";
import { randomString } from '../helpers/indexhelper';
import axios from 'axios';

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
        this.getListData();
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
                <h1 className={"center"}>TO DO LIST</h1>
                <AddItem add={this.addItem}/>
                <List toggle={this.toggleComplete} delete={this.deleteItem} toDos={list}/>
            </div>
        );
    }
}


export default App;
