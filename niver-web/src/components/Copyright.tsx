import { Typography } from '@mui/material';
import React from 'react';
import { Link } from "react-router-dom";

export const Copyright: React.FC<any> = (props) => {

  return (
    <Typography variant="body2" color="text.secondary" align="center"  {...props}>
      <Typography variant="body2" color="text.secondary" align="center">
        {'made with ❤️'}
      </Typography>
      <br />
      {'Copyright © '}
      <Link color="inherit" to="/">
        NiverDeQuem™️
      </Link>
      {' ' + new Date().getFullYear() + '.'}
    </Typography>
  )
}