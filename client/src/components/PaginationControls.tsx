import React from 'react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null; // Don't show pagination if there's only one page or less
  }

  return (
    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <button onClick={handlePrevious} disabled={currentPage <= 1}>
        Previous
      </button>
      <span style={{ margin: '0 15px' }}>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNext} disabled={currentPage >= totalPages}>
        Next
      </button>
    </div>
  );
};

export default PaginationControls;