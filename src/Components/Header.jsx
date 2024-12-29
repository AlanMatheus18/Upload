import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'


export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  position="static" 
        sx={{ 
          boxShadow: '0 1px 25px 1px rgba(0, 0, 0, 0.2)', 
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center',
          background:'#109010',
        }}>
            <img src="src/assets/Artboard 2.png" alt="logo" style={{ height: '55px' }} />
            <Typography variant="h4" gutterBottom 
             component="div" 
             sx={{ 
               margin: 'auto 0', 
               marginLeft: '35%', 
                 
             }}>
        Upload de Arquivo
      </Typography>
      </AppBar>
    </Box>
  );
}