import React from "react";
import { getPagesArray } from "../../../utils/pages";

const Pagination = ({ totalPages, page, changePage }) => {
  const pagesArray = getPagesArray(totalPages);

  if (totalPages <= 1) return null;

  return (
    <div className="page__wrapper">
      {pagesArray.map((p) => (
        <button
          type="button"
          onClick={() => changePage(p)}
          key={p}
          className={page === p ? "page page__current" : "page"}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default Pagination;