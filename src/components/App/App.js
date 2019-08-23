import React from 'react';

import AppHeader from '../AppHeader';
import SearchPannel from '../SearchPannel';
import ToDoList from '../ToDoList';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm';
import './App.css';

class App extends React.Component {
    constructor() {
        super();

        this.maxId = 100;

        this.createItem = (text) => {
            return {
                label: text,
                important: false,
                done: false,
                id: this.maxId++
            };
        };

        this.state = {
            todoData: [
                this.createItem("Drink Coffee"),
                this.createItem("Build React App"),
                this.createItem("Have a lunch")
            ],
            sort: [
                {label: "All", status: true, name: 'all'},
                {label: "Active", status: false, name: 'active'},
                {label: "Done", status: false, name: 'done'}
            ],
            term: '',
            filter: 'all'
        };

        this.deleteItem = (id) => {
            this.setState(({todoData}) => {
                const index = todoData.findIndex((el) => el.id === id);

                return {
                    todoData: [
                                ...todoData.slice(0, index), 
                                ...todoData.slice(index+1)
                              ]
                };
            });
        };

        this.addItem = (text) => {
            const newItem = this.createItem(text);

            this.setState(({todoData}) => {

                return {
                    todoData: [...todoData, newItem]
                };
            });
        };

        this.toggleProperty = (arr, id, propName) => {
            const index = arr.findIndex((el) => el.id === id);
                
            const oldItem = arr[index];
            const newItem = Object.assign({}, oldItem, {[propName]: !oldItem[propName] });
                
            return [
                    ...arr.slice(0, index),
                    newItem,
                    ...arr.slice(index+1)
            ];
        };

        this.onToggleImportant = (id) => {
            this.setState(({todoData}) => {
                return {
                    todoData: this.toggleProperty(todoData, id, 'important')
                };
            });
        };

        this.onToggleDone = (id) => {
            this.setState(({todoData}) => {
                return {
                    todoData: this.toggleProperty(todoData, id, 'done')
                };
            });
        };

        this.search = (items, term) => {
            if(term.length === 0) {
                return items;
            }
            return items.filter((item) => {
                return item.label.toLowerCase()
                    .indexOf(term.toLowerCase()) > -1;
            });
        };

        this.onSearchChange = (term) => {
            this.setState({term});
        };

        this.filter = (items, filter) => {
            switch(filter) {
                case 'all':
                    return items;
                case 'active':
                    return items.filter((item) => !item.done);
                case 'done':
                    return items.filter((item) => item.done);
                default:
                    return items;
            }
        };

        this.changeSortStatus = (sortName) => {
            this.setState(({sort}) => {
                const newSort = sort.map((item) => {
                    item.status = (item.name === sortName) ? true : false;

                    return item;
                });
                return {
                    sort: newSort
                };
            });
        };

        this.onSortChange = (sortName) => {
            this.changeSortStatus(sortName);
            this.setState({filter: sortName});
        };
    }

    render() {
        const {todoData, term, filter, sort} = this.state;

        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((el) => el.done).length; 
        const todoCount = todoData.length - doneCount;
        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />

                <div className="top-panel d-flex">
                    <SearchPannel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter sort={sort} onSortChange={this.onSortChange}/>
                </div>

                <ToDoList 
                    stuffList={visibleItems} 
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}/>

                <ItemAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;