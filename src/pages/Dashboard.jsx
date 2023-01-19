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
  ExperienceTab,
  EditProfileTab,
  EducationTab,
  SocialsTab
} from '../components'

import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PublicIcon from '@mui/icons-material/Public';

const Dashboard = () => {
  const user = useSelector(state => state.auth.user)
  const { user_metadata: { full_name } } = user

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container
      maxWidth="md"
    >
      <Box
        margin="3rem 0"
        backgroundColor="custom_silver.main"
        borderRadius="4px"
        padding="1rem"
      >
        <Box
          component="div"
          textAlign="center"
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
            Welcome to your dashboard <Link component={RouterLink} to={`/profile/${user.id}`}>{full_name}</Link>
            <br />
            Dashboard is a place where you can manage your profile.
          </Typography>
        </Box>
        <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: 'divider', marginTop: '2rem' }}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            sx={{ 
              minHeight: 'unset',
              '& .MuiTabs-flexContainer': {
                justifyContent: {
                  xs: 'unset',
                  lg: 'center'
                }
              }
            }}
          >
            <Tab 
              icon={<AccountBoxIcon />} 
              label="Edit Profile" 
              {...a11yProps(0)}
              sx={{ minHeight: 'unset' }} 
            />
            <Tab 
              icon={<AssignmentIcon />} 
              label="Add Experience" 
              {...a11yProps(1)}
              sx={{ minHeight: 'unset' }} 
            />
            <Tab 
              icon={<SchoolIcon />} 
              label="Add Education" 
              {...a11yProps(2)}
              sx={{ minHeight: 'unset' }} 
            />
            <Tab 
              icon={<PublicIcon />} 
              label="Add Socials" 
              {...a11yProps(3)}
              sx={{ minHeight: 'unset' }} 
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <EditProfileTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ExperienceTab />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <EducationTab />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <SocialsTab />
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