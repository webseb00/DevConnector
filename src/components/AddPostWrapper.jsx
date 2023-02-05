import React, { useState } from 'react'
import { 
  DashboardModal,
  PostForm
} from './'

import { 
  Fab
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

const AddPostWrapper = ({ component }) => {
  const [modal, setModal] = useState(false)

  return (
    <>
      {component}
      <DashboardModal 
        modal={modal}
        setModal={setModal}
        component={<PostForm setModal={setModal} />}
        title="Create post"
      />
      <Fab 
        onClick={() => setModal(true)}
        color="primary" 
        aria-label="add post"
        sx={{
          position: 'fixed',
          right: '40px',
          bottom: '40px'
        }}
      >
        <AddIcon />
      </Fab>
    </>
  )
}

export default AddPostWrapper