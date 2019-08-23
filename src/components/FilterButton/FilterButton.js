import React from 'react';

const FilterButton = ({label, status, onClick}) => {
    const statusClass = status ? ' btn-info' : ' btn-outline-secondary';
    const classNames = 'btn' + statusClass;
    return (
        <button className={classNames}
                onClick={onClick}>
            {label}
        </button>
    );
};

export default FilterButton;
