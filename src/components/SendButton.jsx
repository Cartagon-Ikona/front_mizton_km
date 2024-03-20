import * as React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SendRoundedIcon from '@mui/icons-material/SendRounded';



export default function FontAwesomeSvgIconDemo({handleSend}) {
  return (
    <Stack direction="row" spacing={2}>
      <IconButton aria-label="Example" onClick={handleSend}>        
        <SendRoundedIcon color='error' fontSize="large" />
      </IconButton>

    </Stack>
  );
}