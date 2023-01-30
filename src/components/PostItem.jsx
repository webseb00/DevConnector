import React from 'react'
import PropTypes from 'prop-types';

const PostItem = ({ userId, id, likes, text }) => {
  return (
    <div>{text}</div>
  )
}

PostItem.propTypes = {
  requiredObjectWithShape: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  })
}
export default PostItem