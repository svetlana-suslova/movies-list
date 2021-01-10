import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';

const StyledButton = styled(Button)`
    &:focus {
        box-shadow: 0 0 0 0 rgba(0,123,255,0)!important;
    }
`;
const StyledCloseButton = styled.button`
    &:focus {
        outline: none;
    }
`;

export const MyButton = ({title, onClickMethod, color, size}) => {
    return (
        <StyledButton size={size} color={color} onClick={() => onClickMethod()}>{title}</StyledButton>
    );   
}

export const CloseBtn = ({onClickMethod}) => {
    return (
     <StyledCloseButton className="close" onClick={onClickMethod}>&times;</StyledCloseButton>
     );   
}