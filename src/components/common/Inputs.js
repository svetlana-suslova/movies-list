import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import styled from 'styled-components';

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


export const TextInput = ({onChangeMovie, ...props}) => {

    const inputOnChange = (event) => {
        onChangeMovie(event.target.name, event.target.value);
    };
    return (
        <MyInput
        type="text"
        onChange={inputOnChange}
        {...props}/>
    );
}
export const TextAreaInput = ({onChangeMovie, rows, ...props}) => {

    const inputOnChange = (event) => {
        onChangeMovie(event.target.name, event.target.value);
    };
    return (
        <MyInput
        type="textarea"
        rows={rows}
        onChange={inputOnChange}
        {...props}/>
    );
}
export const NumberInput = ({onChangeMovie, min, ...props}) => {

    const inputOnChange = (event) => {
        const value = parseInt(event.target.value, 10);
        onChangeMovie(event.target.name, value);
    };
    return (
        <MyInput
        type="number"
        onChange={inputOnChange}
        min={min}
        {...props}/>
    );
}