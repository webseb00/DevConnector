import PropTypes from 'prop-types';
import { useFetchUserExperienceQuery, useRemoveExperienceItemMutation } from '../services/supabaseApi';

import { toast } from 'react-toastify';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';

const ExperienceList = ({ userId }) => {

  const [removeExperienceItem] = useRemoveExperienceItemMutation()
  const { data, isLoading } = useFetchUserExperienceQuery(userId)

  const handleDelete = async itemId => {
    const confirm = window.confirm('Item will be deleted permamently! Are you sure?')
    if(!confirm) return

    try {
      const { error } = await removeExperienceItem(itemId)

      if(error) throw error

      toast.info('Your experience item has been deleted!', {
        position: 'bottom-center',
        theme: 'colored',
        hideProgressBar: true
      })
    } catch(error) {
      console.log(error)
    }
  }

  if(data?.error?.code) return <p style={{ color: 'red' }}>An error occurred, please try again later</p>
  if(isLoading) return <p>Loading...</p>
  if(!data.data?.length) return <p>Your list is empty</p>

  return (
      <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Company</b></TableCell>
              <TableCell><b>Years</b></TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.data.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell>{row.company}</TableCell>
                <TableCell>{`${row.from} - ${row.current ? 'Current' : row.to}`}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(row.id)}
                  >
                    <CancelIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  )
}

ExperienceList.propTypes = {
  userId: PropTypes.string.isRequired
}

export default ExperienceList