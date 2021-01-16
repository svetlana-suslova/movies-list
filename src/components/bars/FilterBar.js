import React from 'react';
import DropDown from '../common/DropDown';
import styled from 'styled-components';

const Bar = styled.div`
    margin: 10px 0px;
`;

const FilterBar = ({genres, filterBy, filterMethod}) => {
        const genresOptions = genres.map(g => ({
        key: g,
        text: g
    }));

    return (
        <Bar>
            <DropDown sortMethod={filterMethod} 
            sortOptions={genresOptions} 
            sort={filterBy} 
            title="Filter by Genre"
            color="primary"/>
        </Bar>  
    );   
}
export default FilterBar;