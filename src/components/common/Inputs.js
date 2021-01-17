import React from 'react';
import { FormGroup } from 'reactstrap';
import styled from 'styled-components';
import Select from 'react-select';

const LabelBold = styled.label`
    font-weight: 700;
`;

const Input = styled.input`
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    border-radius: 4px;
    border: 1px solid #ced4da;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    padding: 0.375rem 0.75rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin-bottom: 15px;
`;

const TextArea = styled.textarea`
    display: block;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ced4da;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    padding: 0.375rem 0.75rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin-bottom: 15px;
`;


export const TextInput = ({name, placeholder, label, onChangeMovie, defaultValue, register, required }) => {

    const inputOnChange = (event) => {
        onChangeMovie(event.target.name, event.target.value);
    };
    return (
        <FormGroup>
            <LabelBold>{label}</LabelBold>
            <Input
            type="text"
            name={name}
            placeholder={placeholder}
            onChange={inputOnChange}
            defaultValue={defaultValue}
            ref={register({ required })}/>
        </FormGroup>
    );
}

export const TextAreaInput = ({name, placeholder, label, onChangeMovie, defaultValue, register, rows, required}) => {

    const inputOnChange = (event) => {
        onChangeMovie(event.target.name, event.target.value);
    };
    return (
        <FormGroup>
            <LabelBold>{label}</LabelBold>
            <TextArea
            name={name}
            rows={rows}
            placeholder={placeholder}
            onChange={inputOnChange}
            defaultValue={defaultValue}
            ref={register({ required })}/>
        </FormGroup>

    );
}

export const NumberInput = ({name, placeholder, label, onChangeMovie, min, defaultValue, register, required}) => {

    const inputOnChange = (event) => {
        const value = parseInt(event.target.value, 10);
        onChangeMovie(event.target.name, value);
    };
    return (
        <FormGroup>
            <LabelBold>{label}</LabelBold>
            <Input
            type="number"
            name={name}
            placeholder={placeholder}
            min={min}
            onChange={inputOnChange}
            defaultValue={defaultValue}
            ref={register({ required })}/>
        </FormGroup>
    );
}

export const SelectInput = ({name, label, onChangeMovie, options, defaultValue}) => {

    const inputOnChange = (val) => {
        const value = !val ? [""] : val.map(item => item.value);
        onChangeMovie(name, value);
        console.log(value);  
    };

    return (
        <FormGroup>
            <LabelBold>{label}</LabelBold>
            <Select 
            isMulti
            name={name}
            onChange={inputOnChange}
            options={options}
            defaultValue={defaultValue}/>
        </FormGroup>
    );
}