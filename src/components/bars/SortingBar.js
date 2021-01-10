import React from 'react';
import DropDown from '../common/DropDown';

const SortingBar = ({sortingMethod, sortBy}) => {
    const sortByOptions = [
        {key: 'title', text: 'Title'},
        {key: 'year', text: 'Year'},
        {key: 'runtime', text: 'Movie runtime'},
    ];

    return (
        <div>
            <DropDown sortMethod={sortingMethod} 
            sortOptions={sortByOptions} 
            sort={sortBy} 
            title="Sort by"
            color="secondary"/>
        </div>  
    );    
}
export default SortingBar;