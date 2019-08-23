import React from 'react';
import FilterButton from '../FilterButton/FilterButton';

class ItemStatusFilter extends React.Component {
    render() {
        const {sort, onSortChange} = this.props;

        const btns = sort.map((item) => {
            const {label, status, name} = item;

            return (
                <FilterButton label={label} status={status} 
                              onClick={() => onSortChange(name)} 
                              key={name}/>
            );
        });
        
        return (
            <div className="btn-group">
                {btns}
            </div>
        );
    }
}

export default ItemStatusFilter;