import React, { useState } from 'react';
import styled from 'styled-components';
import { InputGroup, InputGroupAddon, Input} from 'reactstrap';
import { MyButton } from '../common/Buttons';


const SearchInput = styled(Input)`
    &:focus {    
        box-shadow: 0 0 0 0 rgba(0,123,255,0)!important;
    }
`; 

const SearchBar = ({search, clearSearch}) => {

    const [currentStr, setSearchStr] = useState('');
    const onSearchChange = (e) => {
        setSearchStr(e.currentTarget.value);
    }
    const onClearSearch = () => {
        clearSearch();
        setSearchStr('');
    }

    return (
        <div>
            <InputGroup size="sm">
                <InputGroupAddon addonType="prepend">
                    <MyButton color="success" onClickMethod={() => onClearSearch()} title="Clear"/>
                </InputGroupAddon>
                <SearchInput type="text" placeholder="Search"
                           value={currentStr}
                           onChange={onSearchChange} />
                <InputGroupAddon addonType="append">
                    <MyButton color="primary" onClickMethod={() => search(currentStr)} title="Search"/>
                </InputGroupAddon>
            </InputGroup>
        </div> 
    );   
}
export default SearchBar;