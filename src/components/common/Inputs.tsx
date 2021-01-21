import React, { ChangeEvent }from 'react';
import { FormGroup } from 'reactstrap';
import styled from 'styled-components';
import Select from 'react-select';
import {MovieType} from '../../types/types';

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

type PropsTextInputType = {
    name: string, 
    placeholder: string, 
    label: string,
    onChangeMovie: (n: string, v: string) => void, 
    defaultValue: string, 
    register: (required: boolean) => void,
    required?: boolean
}
export const TextInput: React.FC<PropsTextInputType> = ({name, placeholder, label, onChangeMovie, defaultValue, register, required }) => {

    const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
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
            // @ts-ignore
            ref={register({ required })}/>
        </FormGroup>
    );
}

type PropsTextAreaType = {
    name: string, 
    placeholder: string, 
    label: string,
    onChangeMovie: (n: string, v: string) => void, 
    defaultValue: string, 
    register: (required: boolean) => void,
    required?: boolean,
    rows: number
}
export const TextAreaInput: React.FC<PropsTextAreaType> = ({name, placeholder, label, onChangeMovie, defaultValue, register, rows, required}) => {

    const inputOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
            // @ts-ignore
            ref={register({ required })}/>
        </FormGroup>
    );
}

type PropsNumberInputType = {
    name: string, 
    placeholder: string, 
    label: string,
    onChangeMovie: (n: string, v: number) => void, 
    defaultValue: string, 
    register: (required: boolean) => void,
    required?: boolean,
    min: string,
    max: string
}
export const NumberInput: React.FC<PropsNumberInputType> = ({name, placeholder, label, onChangeMovie, min, max, defaultValue, register, required}) => {

    const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
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
            max={max}
            onChange={inputOnChange}
            defaultValue={defaultValue}
            // @ts-ignore
            ref={register({ required })}/>
        </FormGroup>
    );
}

type PropsSelectType = {
    name: string, 
    placeholder: string,
    label: string,
    onChangeMovie: (n: string, v: string) => void,
    movie: MovieType,
    genres: Array<string>  
}
export const SelectInput: React.FC<PropsSelectType> = ({name, label, onChangeMovie, movie, genres, placeholder}) => {

    const genresOptions = genres.filter(g => g !== "ALL").map(g => ({value: g, label: g}));
    const selectedGenres = genresOptions.filter(go => {
        if (!movie) return false;
        return movie.genres.indexOf(go.value) >= 0;
    });

    const inputOnChange = (val: any) => {
        // @ts-ignore
        const value = !val ? [""] : val.map(item => item.value);
        onChangeMovie(name, value);
    };

    return (
        <FormGroup>
            <LabelBold>{label}</LabelBold>
            <Select 
            isMulti
            name={name}
            placeholder={placeholder}
            onChange={inputOnChange}
            options={genresOptions}
            defaultValue={selectedGenres}/>
        </FormGroup>
    );
}