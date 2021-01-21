import React, { useState } from 'react';
import styled from 'styled-components';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const DropDownToggle = styled(DropdownToggle)`
    &:focus {
        box-shadow: 0 0 0 0 rgba(0,123,255,0)!important;
    }
`;
const DropDownItem = styled(DropdownItem)`
    &:focus {
        background-color: rgba(237,241,245,0.8);
        color: #404040;
        outline: none;
    }
`;

type SortOptionsType = {
    key: string, 
    text: string
}
 
type PropsType = {
    sortMethod: string, 
    sort: (key: string) => void 
    sortOptions: Array<SortOptionsType>,
    title: string, 
    color: string
}
const DropDown: React.FC<PropsType> = ({sortMethod, sort, sortOptions, title, color}) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <div>
            <Dropdown group isOpen={dropdownOpen} size="sm" toggle={toggle}>
                <DropDownToggle caret color={color}>{title}</DropDownToggle>
                <DropdownMenu>
                    {sortOptions.map(item => {
                        return (
                            <DropDownItem key={item.key} onClick={() => sort(item.key)}
                                        active={sortMethod === item.key}>{item.text}</DropDownItem>
                        )
                    })}
                </DropdownMenu>
            </Dropdown>
        </div>  
    );    
}
export default DropDown;