import React from 'react';
import DropDown from '../common/DropDown';
import styled from 'styled-components';

const Bar = styled.div`
    margin-bottom: 20px;
`;
type PropsType = {
    className: string,
    sortingMethod: string,
    sortBy: (sortingMethod: string) => void
}

const SortingBar: React.FC<PropsType> = ({sortingMethod, sortBy}) => {
    const sortByOptions = [
        {key: 'title', text: 'Title'},
        {key: 'year', text: 'Year'},
        {key: 'runtime', text: 'Movie runtime'},
    ];

    return (
        <Bar>
            <DropDown sortMethod={sortingMethod} 
            sortOptions={sortByOptions} 
            sort={sortBy} 
            title="Sort by"
            color="secondary"/>
        </Bar>  
    );    
}
export default SortingBar;