import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { 
  Avatar,
  Button,
  CircularProgress
 } from '@mui/material'
import { stringAvatar } from '../utils';
import { toast } from 'react-toastify';
import { supabase } from '../supabaseClient';

const AvatarWidget = ({ fullName, userID, size, uploadButton, url }) => {

  const [avatarURL, setAvatarURL] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
      if(url) {
        downloadImage(url)
      }
    }, [url])

  const downloadImage = async (path) => {
    try {
      const { data, error: downloadError } = await supabase.storage.from('avatars').download(path)

      if(downloadError) throw downloadError
      const url = URL.createObjectURL(data)
      
      setAvatarURL(url)
    } catch(error) {
      console.log(`Error downloading image: ${error}`)
    }
  }

  const uploadAvatar = async (imageFile) => {
    try {
      setUploading(true)

      if(!imageFile || imageFile.length === 0) {
        throw new Error('Please select an image to upload')
      }

      const file = imageFile[0]
      const fileExt = file.name.split('.')[1]
      const fileName = `${Math.random()}${userID}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)
      const { error } = await supabase.from('profiles').upsert({ id: userID, avatar_url: filePath })

      if(uploadError) throw uploadError
      if(error) throw error

      toast.success('Your image was uploaded!', {
        position: 'bottom-center',
        theme: 'colored',
        hideProgressBar: true
      })

    } catch(error) {
      toast.error(error.error_description || error.message, {
        position: 'bottom-center',
        theme: 'colored',
        hideProgressBar: true
      })
    } finally {
      setUploading(false)
    }
  }

  const handleAvatarUpload = imageFile => {
    if(imageFile && imageFile.length !== 0) {
      uploadAvatar(imageFile)
    }
  }

  const generateAvatar = () => {
    if(avatarURL) {
      return (
        <Avatar 
          alt={fullName}
          src={`${avatarURL}`}
          sx={{ width: size, height: size }}
        />
      )
    } else {
      const { bgColor, children } = stringAvatar(fullName)

      return <Avatar sx={{ backgroundColor: bgColor, width: size, height: size }}>{children}</Avatar>
    }
  }

  return (
    <>
      {generateAvatar()}
      {uploadButton && 
        (
          <Button 
            variant="contained" 
            component="label" 
            size="small" 
            sx={{ marginTop: '1rem' }}
            onChange={e => handleAvatarUpload(e.target.files)}
            disabled={uploading}
          >
            
            {
              !uploading ? 
              <>
                Upload Image
                <input hidden accept="image/*" multiple type="file" />
              </> : 
              <>
                <CircularProgress sx={{ color: 'white', marginRight: '6px' }} size={20} />
                <p>Uploading...</p>
              </>
            }
          </Button>
        )
      }
    </>
  )
}

export default AvatarWidget

AvatarWidget.defaultProps = {
  uploadButton: false
}

AvatarWidget.propTypes = {
  fullName: PropTypes.string,
  userID: PropTypes.string,
  url: PropTypes.string,
  size: PropTypes.number,
  uploadButton: PropTypes.bool
}