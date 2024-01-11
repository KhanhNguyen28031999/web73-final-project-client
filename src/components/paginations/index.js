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
      <button onClick={() => handlePageChange(page - 1)} disabled={isFirstPage}>
        Previous
      </button>
      <span>{`Page ${page} of ${totalPages}`}</span>
      <button onClick={() => handlePageChange(page + 1)} disabled={isLastPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
