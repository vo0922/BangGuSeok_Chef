import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// material
import { MenuItem, TextField } from '@mui/material';

// ----------------------------------------------------------------------


export default function BlogPostsSort({ options, onSort, valueSort }) {

  return (
    <TextField select size="small" value={valueSort || ''} onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
