import React, { useState } from 'react';
import styled from 'styled-components';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Bar = styled.div`
    marginTop: 19;
`;
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

const SortingBar = ({sortingMethod, sortBy}) => {
    const sortByOptions = [
        {key: 'title', text: 'Title'},
        {key: 'year', text: 'Year'},
        {key: 'runtime', text: 'Movie runtime'},
    ];
    
const [dropdownOpen, setDropdownOpen] = useState(false);
const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Bar className="col-sm-1" >
            <Dropdown group isOpen={dropdownOpen} size="sm" toggle={toggle}>
                <DropDownToggle caret>Sort By</DropDownToggle>
                <DropdownMenu>
                    {sortByOptions.map(item => {
                        return (
                            <DropDownItem key={item.key} onClick={() => sortBy(item.key)}
                                        active={sortingMethod === item.key}>{item.text}</DropDownItem>
                        )
                    })}
                </DropdownMenu>
            </Dropdown>
        </Bar>  
    );    
}
export default SortingBar;