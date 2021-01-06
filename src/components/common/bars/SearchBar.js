import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, InputGroup, InputGroupAddon, Input} from 'reactstrap';

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
        <div className="col-sm-7" >
            <InputGroup size="sm">
                <InputGroupAddon addonType="prepend">
                    <Button color="success" onClick={() => onClearSearch()}>Clear</Button>
                </InputGroupAddon>
                <Input type="text" placeholder="Search"
                           value={currentStr}
                           onChange={onSearchChange} />
                <InputGroupAddon addonType="append">
                    <Button color="primary" onClick={() => search(currentStr)}>Search</Button>
                </InputGroupAddon>
            </InputGroup>
        </div> 
    );   
}
export default SearchBar;