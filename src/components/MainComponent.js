import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, TextField, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import axios from 'axios';

const TagsBrowser = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.stackexchange.com/2.2/tags?page=1&pagesize=${pageSize}&order=${sortOrder}&sort=${sortBy}&site=stackoverflow`);
        setTags(response.data.items);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchTags();
  }, [pageSize, sortBy, sortOrder]);

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="page-size-label">Page Size</InputLabel>
        <Select
          labelId="page-size-label"
          id="page-size-select"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="sort-by-label">Sort By</InputLabel>
        <Select
          labelId="sort-by-label"
          id="sort-by-select"
          value={sortBy}
          onChange={handleSortByChange}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="count">Count</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="sort-order-label">Sort Order</InputLabel>
        <Select
          labelId="sort-order-label"
          id="sort-order-select"
          value={sortOrder}
          onChange={handleSortOrderChange}
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags.map((tag) => (
              <TableRow key={tag.name}>
                <TableCell>{tag.name}</TableCell>
                <TableCell>{tag.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TagsBrowser;
