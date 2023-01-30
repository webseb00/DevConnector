import React from 'react'
import { 
  Button, 
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box
} from '@mui/material'
import PropTypes from 'prop-types';

const DashboardModal = ({ modal, setModal, component, title }) => {

  const handleClose = () => setModal(false)

  return (
    <Dialog
      open={modal}
      onClose={handleClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      sx={{
        '& .MuiPaper-root': {
          maxHeight: 'unset',
          overflowY: 'unset',
          maxWidth: '600px',
          minWidth: '300px',
          width: '100%'
        },
        '& .MuiDialogContent-root': {
          overflowY: 'unset'
        }
      }}
    >
      <DialogTitle id="scroll-dialog-title" textAlign="center">
        {title}
      </DialogTitle>
      <DialogContent>
        {component}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

DashboardModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
  component: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
}

export default DashboardModal