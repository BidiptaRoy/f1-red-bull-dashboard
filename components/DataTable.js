// components/DataTable.js (WITH DROPDOWN + ADVANCED SEARCH)
import { useState, useMemo, useEffect } from 'react';
import {
  TableWrapper,
  Table,
  PaginationContainer,
  PaginationButton,
  PaginationInfo,
  Select,
  SearchControls,
  ErrorMessage,
} from './styles';

export default function DataTable({ data, searchQuery, useRegex, searchMode }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [regexError, setRegexError] = useState('');

  // Reset to page 1 when search, rows per page, or mode changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, itemsPerPage, useRegex, searchMode]);

  // Filter data based on search query, regex, and boolean mode
  const filteredData = useMemo(() => {
    setRegexError('');
    if (!searchQuery.trim()) return data;

    return data.filter((row) => {
      // Build a searchable string from the row
      const searchableText = [
        row.Constructor?.name || '',
        row.Constructor?.constructorId || '',
        row.Constructor?.nationality || '',
        row.season || '',
        row.position || '',
        row.points || '',
      ].join(' ').toLowerCase();

      // REGEX MODE
      if (useRegex) {
        try {
          const regex = new RegExp(searchQuery, 'i');
          return regex.test(searchableText);
        } catch (err) {
          setRegexError(`Invalid regex: ${err.message}`);
          return true; // Show all if regex is invalid
        }
      }

      // BOOLEAN MODE (AND / OR)
      const terms = searchQuery
        .split(/\s+(?:AND|OR)\s+|\s+/i)
        .filter(t => t.trim())
        .map(t => t.toLowerCase());

      if (searchMode === 'OR') {
        return terms.some(term => searchableText.includes(term));
      }
      // Default: AND
      return terms.every(term => searchableText.includes(term));
    });
  }, [data, searchQuery, useRegex, searchMode]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentData = filteredData.slice(startIdx, endIdx);

  const goToNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const goToPrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);

  return (
    <>
      <SearchControls>
        <label style={{ color: '#FFB81C', fontWeight: 700 }}>
          Rows per page:&nbsp;
          <Select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </Select>
        </label>
        <span style={{ color: '#E8E8E8', opacity: 0.8 }}>
          Showing <strong style={{ color: '#FFB81C' }}>
            {filteredData.length === 0 ? 0 : startIdx + 1}-{Math.min(endIdx, filteredData.length)}
          </strong> of <strong style={{ color: '#FFB81C' }}>{filteredData.length}</strong> results
        </span>
      </SearchControls>

      {regexError && <ErrorMessage>⚠️ {regexError}</ErrorMessage>}

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>Season</th>
              <th>Position</th>
              <th>Team</th>
              <th>Nationality</th>
              <th>Points</th>
              <th>Wins</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((row, idx) => (
                <tr key={`${row.season}-${row.Constructor?.constructorId}-${idx}`}>
                  <td style={{ color: '#FFB81C', fontWeight: 700 }}>{row.season}</td>
                  <td>{row.position}</td>
                  <td>{row.Constructor?.name}</td>
                  <td>{row.Constructor?.nationality}</td>
                  <td>{row.points}</td>
                  <td>{row.wins}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableWrapper>

      <PaginationContainer>
        <PaginationButton onClick={goToFirstPage} disabled={currentPage === 1}>
          ⏮ First
        </PaginationButton>
        <PaginationButton onClick={goToPrevPage} disabled={currentPage === 1}>
          ◀ Previous
        </PaginationButton>
        <PaginationInfo>
          Page {currentPage} of {totalPages || 1}
        </PaginationInfo>
        <PaginationButton onClick={goToNextPage} disabled={currentPage === totalPages || totalPages === 0}>
          Next ▶
        </PaginationButton>
        <PaginationButton onClick={goToLastPage} disabled={currentPage === totalPages || totalPages === 0}>
          Last ⏭
        </PaginationButton>
      </PaginationContainer>
    </>
  );
}