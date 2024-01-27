import { useEffect } from "react";
import "./style.css";

const Pagination = ({ page, pageSize, totalPages, onPageChange }) => {
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="pagination">
      <button
        className={!isFirstPage ? "previous" : "previous1"}
        onClick={() => {
          window.scrollTo(0, 0);
          handlePageChange(page - 1);
        }}
        disabled={isFirstPage}
      >
        Previous
      </button>
      <span>{`Page ${page} of ${totalPages}`}</span>
      <button
        className="next"
        onClick={() => {
          window.scrollTo(0, 0);
          handlePageChange(page + 1);
        }}
        disabled={isLastPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
