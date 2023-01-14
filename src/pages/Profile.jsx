import React from 'react'
import { useParams } from 'react-router-dom'

const Profile = () => {

  const params = useParams()

  console.log(params.id)

  return (
    <div>Profile</div>
  )
}

export default Profile