import React from 'react';

import './ItemAddForm.css';

class ItemAddForm extends React.Component {

    constructor() {
        super();

        this.state = {
            label: ''
        };

        this.onLabelChange = (event) => {
            this.setState({
                label: event.target.value
            });
        };

        this.onSubmit = (event) => {
            event.preventDefault();
            this.props.onAdd(this.state.label);
            this.setState({
                label: ''
            });
        };
    }

    render() {
        return (
            <form className="item-add-form d-flex"
                  onSubmit={this.onSubmit}>
                <input type="text"
                   className="form-control"
                   placeholder="What need to be done:"
                   onChange={this.onLabelChange}
                   value={this.state.label} />
                <button className="btn btn-outline-secondary">
                    Add Item
                </button>
            </form>
    );
    }
}

export default ItemAddForm;