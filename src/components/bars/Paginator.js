import React from 'react';
import styled from 'styled-components';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const Bar = styled.div`
    margin: 10px 10px;
`;

const PaginationButton = styled(PaginationLink)`
    &:focus {
        box-shadow: 0 0 0 0 rgba(0,123,255,0)!important;
    }
`;

const Paginator = ({selectPage, activePage, pages, portionCount, portionNumber, setPortionNumber}) => {
  
    return (
        <Bar>
            <Pagination size="sm">
                {
                    portionNumber > 1 && 
                    <PaginationItem>
                        <PaginationButton previous onClick={() => { setPortionNumber(portionNumber - 1) }}/>
                    </PaginationItem>
                }
                { pages.length > 1 ?
                    pages.map(p => {
                        return (
                            <PaginationItem active={p === activePage} key={p} >
                                <PaginationButton onClick={() => selectPage(p)}>{p}</PaginationButton>
                            </PaginationItem> )})
                    : null
                }
                {
                    portionCount > portionNumber &&
                    <PaginationItem>
                        <PaginationButton next onClick={() => { setPortionNumber(portionNumber + 1) }}/>
                    </PaginationItem>
                }
             </Pagination>
        </Bar>
    );   
}
export default Paginator;