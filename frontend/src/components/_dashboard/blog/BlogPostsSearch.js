import React, {  useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';

// material
import { styled } from '@mui/material/styles';
import { Box, TextField, Autocomplete, InputAdornment } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '& .MuiAutocomplete-root': {
    width: 200,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': {
      width: 240,
      '& .MuiAutocomplete-inputRoot': {
        boxShadow: theme.customShadows.z12
      }
    }
  },
  '& .MuiAutocomplete-inputRoot': {
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    }
  },
  '& .MuiAutocomplete-option': {
    '&:not(:last-child)': {
      borderBottom: `solid 1px ${theme.palette.divider}`
    }
  }
}));

// ----------------------------------------------------------------------


export default function BlogPostsSearch({ posts }) {
  let value = "";
  const handleChange = (e) => {
    value = e.target.value
  }
  const handleEnter = (e) => {
    if(e.key === 'Enter') {
      window.location.href=`/home/recipe/search/${value}`
    }
  }
  return (
    <RootStyle>
      <TextField
        size='small'
        onChange={handleChange}
        onKeyPress={handleEnter}
        placeholder="제목 검색..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box
                component={Icon}
                icon={searchFill}
                sx={{
                  ml: 0,
                  width: 40,
                  height: 20,
                  color: 'text.disabled'
                }}
              />
            </InputAdornment>
          )
        }}
      />
    </RootStyle>
  );
}
