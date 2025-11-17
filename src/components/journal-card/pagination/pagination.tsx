import React from "react";
import "./pagination.scss";
import Image from "next/image";

export default function PaginationButton({
  page,
  totalPages,
  onPageChange,
  className,
}: any) {
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <div className={`pagination-container ${className || ""}`}>
      <button
        disabled={!canGoPrev}
        onClick={() => canGoPrev && onPageChange(page - 1)}
      >
        <Image
          src={"./arrow-left.svg"}
          alt={"left-arr"}
          width={12}
          height={12}
        />
      </button>

      <div className="page-indicator">
        Page {page} of {totalPages}
      </div>

      <button
        disabled={!canGoNext}
        onClick={() => canGoNext && onPageChange(page + 1)}
      >
        <Image
          src={"./arrow-left.svg"}
          className="right-arr"
          alt={"left-arr"}
          width={12}
          height={12}
        />
      </button>
    </div>
  );
}
