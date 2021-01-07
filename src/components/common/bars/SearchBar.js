import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, InputGroup, InputGroupAddon, Input} from 'reactstrap';

const SearchButton = styled(Button)`
    &:focus {
        box-shadow: 0 0 0 0 rgba(0,123,255,0)!important;
    }
`;
const SearchInput = styled(Input)`
    &:focus {
        outline: none;
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
        <div className="col-sm-4" >
            <InputGroup size="sm">
                <InputGroupAddon addonType="prepend">
                    <SearchButton color="success" onClick={() => onClearSearch()}>Clear</SearchButton>
                </InputGroupAddon>
                <SearchInput type="text" placeholder="Search"
                           value={currentStr}
                           onChange={onSearchChange} />
                <InputGroupAddon addonType="append">
                    <SearchButton color="primary" onClick={() => search(currentStr)}>Search</SearchButton>
                </InputGroupAddon>
            </InputGroup>
        </div> 
    );   
}
export default SearchBar;