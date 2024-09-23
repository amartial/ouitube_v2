/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 06/03/2024 09:51:50
*/
import React, { FC, useEffect } from 'react';
import './Pagination.css';
import { Link, useNavigate } from 'react-router-dom';


interface PaginationProps {
  currentPage?: number
  totalPages?: number
  nextPage?: number | null
  previousPage?: number | null
  pageLinks?: string[]
  onPageChange?: (page: number) => void
}


const Pagination: FC<PaginationProps> = ({ currentPage, nextPage, previousPage, totalPages, pageLinks, onPageChange }) => {

  const links = pageLinks?.map((page) => parseInt(page.split('=')[1]))
  const navigate = useNavigate()
  const step = 1


  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  const handleClick = (event: any, page?: number | null) => {
    event.preventDefault()
    console.log({ page });


    if (page) {
      onPageChange && onPageChange(page)
      const currentSearchParams = new URLSearchParams(window.location.search)
      currentSearchParams.set('page', page.toString())

      navigate({ search: currentSearchParams.toString() })
    }
  }

  const renderPageNumbers = () => {
    let newLinks = links


    newLinks = newLinks?.filter((page: number) => (page >= currentPage! - step) && (page <= currentPage! + step))

    return newLinks?.map((page: number, index: number) => (
      <li className="page-item" key={index}>
        <a className={"page-link " + (page == currentPage ? 'active' : '')}
          onClick={(event) => handleClick(event, page)}
        >
          {page}
        </a>
      </li>

    ))
  }

  return (
    <div className="Pagination">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"
            onClick={(event) => handleClick(event, previousPage)}
          ><a className="page-link" href="#">Prev</a></li>
          {
            currentPage! > step+1 &&
            <>
              <li className="page-item" >
                <a className="page-link"
                  onClick={(event) => handleClick(event, 1)}
                >
                  {1}
                </a>
              </li>
              <li className="page-item" >
                <a className="page-link">
                  ...
                </a>
              </li>
            </>
          }

          {renderPageNumbers()}

          {
            currentPage! < totalPages!-step &&
            <>
             <li className="page-item" >
                <a className="page-link">
                  ...
                </a>
              </li>
              <li className="page-item" >
                <a className="page-link"
                  onClick={(event) => handleClick(event, totalPages)}
                >
                  {totalPages}
                </a>
              </li>
             
            </>
          }

          <li className="page-item"
            onClick={(event) => handleClick(event, nextPage)}
          ><a className="page-link" href="#">Next</a></li>
        </ul>
      </nav>

    </div>
  );
}

export default Pagination;