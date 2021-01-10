import React, { useState } from 'react';
import styled from 'styled-components';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const DropDownToggle = styled(DropdownToggle)`
    &:focus {
        box-shadow: 0 0 0 0 rgba(0,123,255,0)!important;
    }
`;
const DropDownItem = styled(DropdownItem)`
    &:hover, &:focus {
        background-color: rgba(237,241,245,0.8);
        color: #404040;
        outline: none;
    }
`; 

const FilterBar = ({genres, filterBy, filterMethod}) => {
        const genresOptions = genres.map(g => ({
        key: g,
        text: g
    }));

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <div>
            <Dropdown group isOpen={dropdownOpen} size="sm" toggle={toggle}>
                <DropDownToggle color="primary" caret>Filter by Genre</DropDownToggle>
                <DropdownMenu>
                    {genresOptions.map(item => {
                        return (
                            <DropDownItem key={item.key} onClick={() => filterBy(item.key)}
                                        active={filterMethod === item.key}>{item.text}</DropDownItem>
                        )
                    })}
                </DropdownMenu>
            </Dropdown>
        </div>  
    );   
}
export default FilterBar;