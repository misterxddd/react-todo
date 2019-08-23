import React from 'react';
import './SearchPannel.css'

class SearchPannel extends React.Component {

    constructor() {
        super();

        this.state = {
        term: ''
        };

        this.onSearchChange = (e) => {
            const term = e.target.value;
            this.setState({term});
            this.props.onSearchChange(term);
        };
    }
    
    render () {
        return (
            <input className="form-control search-input" 
                type="text" placeholder="search"
                value={this.state.term}
                onChange={this.onSearchChange}/>
        );
    }
};

export default SearchPannel;