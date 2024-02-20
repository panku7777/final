import React from 'react';
import { Tabs, Tab, Paper, Typography } from '@mui/material';
import  styled  from '@emotion/styled';

const StyledPaper = styled(Paper)`
  margin: 5px 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Adminscreen() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <StyledPaper elevation={3}>
        <Typography variant='h4' align='center' style={{ fontSize: '30px', marginBottom: '20px' }}>
          <b>Admin Panel</b>
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          orientation='vertical'
          variant='scrollable'
        >
          <Tab label='Books' />
          <Tab label='Users' />
          <Tab label='Genre' />
        </Tabs>
        <div className='ml-3'>
          {value === 0 && <Typography variant='h4'>Books Content</Typography>}
          {value === 1 && <Typography variant='h4'>Users Content</Typography>}
          {value === 2 && <Typography variant='h4'>Genre Content</Typography>}
        </div>
      </StyledPaper>
    </div>
  );
}

export default Adminscreen;
