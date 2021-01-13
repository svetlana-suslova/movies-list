import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import styled from 'styled-components';
import Select from 'react-select';

const LabelBold = styled(Label)`
    font-weight: 700;
`;
const MyInput = ({name, label, placeholder, rows, min, type, ...props}) => {
    return (
        <FormGroup>
            <LabelBold htmlFor={name}>{label}</LabelBold>
            <Input type={type} 
            name={name} 
            placeholder={placeholder}
            rows={rows}
            min={min}
            {...props}/>
            <FormFeedback>Field is required.</FormFeedback>
        </FormGroup>
    );
}


export const TextInput = ({onChangeMovie, value, ...props}) => {

    const inputOnChange = (event) => {
        onChangeMovie(event.target.name, event.target.value);
    };
    return (
        <MyInput
        type="text"
        onChange={inputOnChange}
        value={value ? value : ''}
        {...props}/>
    );
}
export const TextAreaInput = ({onChangeMovie, rows, value, ...props}) => {

    const inputOnChange = (event) => {
        onChangeMovie(event.target.name, event.target.value);
    };
    return (
        <MyInput
        type="textarea"
        rows={rows}
        onChange={inputOnChange}
        value={value ? value : ''}
        {...props}/>
    );
}
export const NumberInput = ({onChangeMovie, min, value, ...props}) => {

    const inputOnChange = (event) => {
        const value = parseInt(event.target.value, 10);
        onChangeMovie(event.target.name, value);
    };
    return (
        <MyInput
        type="number"
        onChange={inputOnChange}
        min={min}
        value={value}
        {...props}/>
    );
}

export const SelectInput = ({name, label, placeholder, onChangeMovie, options, value}) => {

    const inputOnChange = (val) => {
        if (!val) return;
        const value = val.map(x => x.value);
        onChangeMovie(name, value);
    };
    return (
        <FormGroup>
            <LabelBold htmlFor={name}>{label}</LabelBold>
            <Select isMulti 
            name={name} 
            placeholder={placeholder}
            onChange={inputOnChange}
            options={options}
            value={value}/>
            <FormFeedback>Field is required.</FormFeedback>
        </FormGroup>
    );
}