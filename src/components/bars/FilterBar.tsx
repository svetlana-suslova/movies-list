import React from 'react';
import DropDown from '../common/DropDown';

type PropsType = {
    className: string,
    genres: Array<string>,
    filterMethod: string,
    filterBy: (key: string) => void
}

const FilterBar: React.FC<PropsType> = ({genres, filterBy, filterMethod}) => {
        const genresOptions = genres.map(g => ({
        key: g,
        text: g
    }));

    return (
        <div>
            <DropDown sortMethod={filterMethod} 
            sortOptions={genresOptions} 
            sort={filterBy} 
            title="Filter by Genre"
            color="primary"/>
        </div>  
    );   
}
export default FilterBar;