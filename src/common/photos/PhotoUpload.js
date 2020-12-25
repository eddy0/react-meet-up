import React, { useState } from 'react'
import { Button, Grid, Header } from 'semantic-ui-react'
import PhotoDropZone from './PhotoDropZone'
import PhotoCropper from './PhotoCropper'
import cuid from 'cuid'
import { uploadToFirebaseStorage } from '../../app/firestore/firebaseService'
import { log } from '../util/util'
import { toast } from 'react-toastify'
import { updateUserProfilePhoto } from '../../app/firestore/fireStoreService'

const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

function PhotoUpload({setEditMode}) {
  const [files, setFiles] = useState([])
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const handleCancelCrop = () => {
    setFiles([])
    setImage(null)
    
  }
  const handleUploadPhoto = () => {
    // uploadToFirebaseStorage()
    setLoading(true)
    const filename = `${cuid()}.${getFileExtension(files[0].name)}`
    const uploadTask = uploadToFirebaseStorage(image, filename)
    uploadTask.on('state_change', snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      log(progress)
    }, error => {
      toast.error(error.message)
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        updateUserProfilePhoto(downloadURL, filename).then(() => {
          setLoading(false)
          handleCancelCrop()
          setEditMode(false)
        }).catch(error => {
            toast.error(error.message)
            setLoading(false)
          },
        )
      })
    })
  }
  return (
    <Grid>
      <Grid.Column width={4}>
        <Header color={'teal'} sub content={'step 1 -Add Photos'}/>
        <PhotoDropZone setFiles={setFiles}/>
      </Grid.Column>
      <Grid.Column width={1}/>
      <Grid.Column width={4}>
        <Header color={'teal'} sub content={'step 2 - Resize'}/>
        {
          files.length > 0 &&
          <PhotoCropper setImage={setImage} imagePreview={files[0].preview}/>
        }
      </Grid.Column>
      <Grid.Column width={1}/>
      <Grid.Column width={4}>
        <Header color={'teal'} sub content={'step 3 - Preview & Upload'}/>
        {
          files.length > 0 &&
          <>
            <div className={'img-preview'} style={{minHeight: 200, minWidth: 200, overflow: 'hidden'}}/>
            <Button.Group>
              <Button loading={loading} style={{width: 100}} positive icon={'check'} onClick={handleUploadPhoto}/>
              <Button disabled={loading} style={{width: 100}} icon={'close'} onClick={handleCancelCrop}/>
            </Button.Group>
          </>
          
        }
      </Grid.Column>
    </Grid>
  )
}

export default PhotoUpload