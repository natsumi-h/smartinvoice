import { useState } from "react";

function usePagination<T>(data: T[]) {
  const chunk = <T,>(array: T[], size: number): T[][] => {
    if (!array.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  };
  const [activePage, setPage] = useState(1);
  const itemsPerPage = 10;
  const paginatedData = chunk(data, itemsPerPage);
  const currentPageData = paginatedData[activePage - 1] || [];

  return {
    currentPageData,
    activePage,
    setPage,
    paginatedData,
  };
}

export default usePagination;
