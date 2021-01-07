import React from 'react';
import styled from 'styled-components';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'; 

const Paginator = ({selectPage, activePage, total}) => {
   
    const pagesCount = Math.ceil(total / 10);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className="col-sm-5">
            <Pagination size="sm">
                <PaginationItem >
                    <PaginationLink first />
                </PaginationItem>
                <PaginationItem >
                    <PaginationLink previous />
                </PaginationItem>
                    {pages.map(p => {
                        return (
                            <PaginationItem active={activePage === p} key={p} >
                                <PaginationLink onClick={() => selectPage(p)}>{p}</PaginationLink>
                            </PaginationItem>
                        )})
                    }
                <PaginationItem>
                    <PaginationLink next />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink last />
                </PaginationItem>
             </Pagination>
        </div>
    );   
}
export default Paginator;