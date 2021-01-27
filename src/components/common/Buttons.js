import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';

const StyledButton = styled(Button)`
     &:focus {
          box-shadow: 0 0 0 0 rgba(0, 123, 255, 0) !important;
     }
`;

const StyledPlusButton = styled(Button)`
     font-weight: bold;
     line-height: 18px;
     font-size: 20px;
     &:focus {
          box-shadow: 0 0 0 0 rgba(0, 123, 255, 0) !important;
     }
`;

const StyledCloseButton = styled.button`
     &:focus {
          outline: none;
     }
`;

const AwesomeButton = styled.button`
     border: 1px solid #ced4da;
     background: #fff;
     color: #333;
     border-radius: 4px;
     padding: 6px 8px;
     margin: 5px;
     &:focus {
          outline: none;
     }
     .fa {
          font-size: 18px;
     }
     .fa-trash {
          padding: 0 2px;
     }
`;

export const MyButton = ({ title, onClickMethod, color, size }) => {
     return (
          <StyledButton
               size={size}
               color={color}
               onClick={() => onClickMethod()}
          >
               {title}
          </StyledButton>
     );
};

export const CloseBtn = ({ onClickMethod }) => {
     return (
          <StyledCloseButton className="close" onClick={onClickMethod}>
               &times;
          </StyledCloseButton>
     );
};

export const PlusButton = ({ title, onClickMethod, color, size }) => {
     return (
          <div>
               <StyledPlusButton
                    size={size}
                    color={color}
                    onClick={() => onClickMethod()}
               >
                    {title}
               </StyledPlusButton>
          </div>
     );
};

export const EditButton = ({ onClickMethod }) => {
     return (
          <AwesomeButton onClick={() => onClickMethod()}>
               <i class="fa fa-edit"></i>
          </AwesomeButton>
     );
};

export const DeleteButton = ({ onClickMethod }) => {
     return (
          <AwesomeButton onClick={() => onClickMethod()}>
               <i class="fa fa-trash"></i>
          </AwesomeButton>
     );
};
