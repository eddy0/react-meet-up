import React, { useState } from 'react'
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react'
import PhotoUpload from '../../../common/photos/PhotoUpload'
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection'
import { deletePhotoFromCollection, getUserPhotos, setMainPhoto } from '../../../app/firestore/fireStoreService'
import { useDispatch, useSelector } from 'react-redux'
import { listenToUserPhotos } from '../profileActions'
import { toast } from 'react-toastify'
import { deleteFromFirebaseStorage } from '../../../app/firestore/firebaseService'

function PhotosTab({profile, isCurrentUser}) {
  const [editMode, setEditMode] = useState(false)
  const dispatch = useDispatch()
  const {loading} = useSelector(state => state.async)
  const {photos} = useSelector(state => state.profile)
  const [updating, setUpdating] = useState({
    updating: false,
    target: null,
  })
  const [deleting, setDeleting] = useState({
    deleting: false,
    target: null,
  })
  
  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    callback: photos => dispatch(listenToUserPhotos(photos)),
    deps: [dispatch, profile.id],
  })
  
  const handleSetMainPhoto = async (photo, target) => {
    setUpdating({
      updating: true,
      target: target,
    })
    try {
      await setMainPhoto(photo)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setUpdating({
        updating: false,
        target: null,
      })
    }
  }
  
  const handleDeletePhoto = async (photo, target) => {
    setDeleting({deleting: true,
      target: target,})
    try {
      await deleteFromFirebaseStorage(photo.name)
      await deletePhotoFromCollection(photo.id)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setDeleting({
        deleting: false,
        target: null,
      })
    }
  }
  
  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated={'left'} icon={'user'} content={`Photos`}/>
          {
            isCurrentUser &&
            <Button onClick={() => setEditMode(!editMode)} floated={'right'} basic
                    content={editMode ? 'Cancel' : 'add Photo'}/>
          }
        </Grid.Column>
        <Grid.Column width={16}>
          {
            editMode
              ? <PhotoUpload setEditMode={setEditMode}/>
              : (
                <Card.Group itemsPerRow={5}>
                  {
                    photos.map((photo) => {
                      const {id, url} = photo
                      return (
                        <Card key={id}>
                          <Image src={url}/>
                          <Button.Group fluid widths={2}>
                            <Button name={photo.id}
                                    loading={updating.updating && updating.target === id}
                                    basic={true}
                                    disabled={url === profile.photoURL}
                                    color={'green'}
                                    content={'Main'}
                                    onClick={(event) => handleSetMainPhoto(photo, event.target.name)}/>
                            <Button
                              name={photo.id}
                              loading={deleting.deleting && deleting.target === id}
                              disabled={url === profile.photoURL}
                              basic={true}
                              color={'red'}
                              icon={'trash'}
                              onClick={(event) => handleDeletePhoto(photo, event.target.name)}/>
                            />
                          </Button.Group>
                        </Card>)
                    })
                  }
                </Card.Group>
              )
          }
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}

export default PhotosTab