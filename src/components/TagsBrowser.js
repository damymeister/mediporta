import React, { useState, useEffect } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import TagsService from '../services/tagsService';
import PropTypes, { oneOf } from 'prop-types';
import '../style/style.css';


const TagsBrowser = ({ pageSize: initialPageSize, sortBy: initialSortBy, sortOrder: initialSortOrder }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);

  const tagsService = TagsService();

  useEffect(() => {
    setPageSize(initialPageSize);
    setSortBy(initialSortBy);
    setSortOrder(initialSortOrder);
  }, [initialPageSize, initialSortBy, initialSortOrder]);

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      try {
        const response = await tagsService.getTags(pageSize, sortBy, sortOrder);
        setTags(response);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchTags();

  }, [pageSize, sortBy, sortOrder])

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
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <InputLabel id="page-size-label">Page Size</InputLabel>
          <TextField
            htmlFor="page-size-label"
            id="page-size-select"
            value={pageSize}
            onChange={handlePageSizeChange}
          />
        </Grid>
        <Grid item>
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            htmlFor="sort-by-label"
            id="sort-by-select"
            value={sortBy}
            onChange={handleSortByChange}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="activity">Activity</MenuItem>
            <MenuItem value="popular">Popular</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          <InputLabel id="sort-order-label">Sort Order</InputLabel>
          <Select
            htmlFor="sort-order-label"
            id="sort-order-select"
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </Grid>
      </Grid>
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
               <TableCell className="TableDataCell">{tag.name}</TableCell>
               <TableCell className="TableDataCell">{tag.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

TagsBrowser.propTypes = {
  pageSize: PropTypes.number,
  sortBy: oneOf(['name', 'activity', 'popular']),
  sortOrder: oneOf(['asc', 'desc']),
};


TagsBrowser.defaultProps = {
  pageSize: 5,
  sortBy: 'name',
  sortOrder: 'asc',
};

export default TagsBrowser;