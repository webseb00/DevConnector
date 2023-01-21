import PropTypes from 'prop-types';
import { useFetchUserEducationQuery, useRemoveEducationItemMutation } from '../services/supabaseApi';

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

const EducationList = ({ userId }) => {

  const [removeEducationItem] = useRemoveEducationItemMutation()
  const { data, isLoading } = useFetchUserEducationQuery(userId)

  const handleDelete = async itemId => {
    const confirm = window.confirm('Item will be deleted permamently! Are you sure?')
    if(!confirm) return

    try {
      const { error } = await removeEducationItem(itemId)

      if(error) throw error

      toast.info('Your education has been deleted!', {
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
      <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><b>School</b></TableCell>
              <TableCell><b>Degree</b></TableCell>
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
                  {row.school}
                </TableCell>
                <TableCell>{row.degree}</TableCell>
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

EducationList.propTypes = {
  userId: PropTypes.string.isRequired
}

export default EducationList