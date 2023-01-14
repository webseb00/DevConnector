import React, { useState } from 'react'
import { 
  Container,
  Box,
  Typography,
  Link,
  Tabs,
  Tab
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { 
  Experience,
  EditProfile,
  Education
} from '../components'

import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Dashboard = () => {
  const user = useSelector(state => state.auth.user)
  const { user_metadata: { full_name } } = user

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box
        margin="3rem 0"
      >
        <Box
          component="div"
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: '1.8rem',
                md: '2.6rem'
              }
            }}
          >
            Dashboard
          </Typography>
          <Typography
            variant="subtitle1"
            lineHeight="1.2"
          >
            Welcome to your dashboard <Link component={RouterLink} to="/">{full_name}</Link>
            <br />
            Dashboard is a place where you can manage your profile.
          </Typography>
        </Box>
        <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: 'divider', marginTop: '2rem' }}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            centered 
            scrollButtons
            allowScrollButtonsMobile
            sx={{ minHeight: 'unset' }}
          >
            <Tab 
              icon={<AccountBoxIcon />} 
              iconPosition="start"
              label="Edit Profile" 
              {...a11yProps(0)}
              sx={{ minHeight: 'unset' }} 
            />
            <Tab 
              icon={<AssignmentIcon />} 
              iconPosition="start"
              label="Add Experience" 
              {...a11yProps(1)}
              sx={{ minHeight: 'unset' }} 
            />
            <Tab 
              icon={<SchoolIcon />} 
              iconPosition="start"
              label="Add Education" 
              {...a11yProps(2)}
              sx={{ minHeight: 'unset' }} 
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <EditProfile />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Experience />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Education />
        </TabPanel>
      </Box>
    </Container>
  )
}

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <Box
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      sx={{ p: 3, width: '100%', maxWidth: '460px', margin: '0 auto' }}
    >
      {value === index && (
        <>{children}</>
      )}
    </Box>
  );
}

export default Dashboard