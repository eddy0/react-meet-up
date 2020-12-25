import React, { useState } from 'react'
import { Button, Grid, Header } from 'semantic-ui-react'
import PhotoDropZone from './PhotoDropZone'
import PhotoCropper from './PhotoCropper'

function PhotoUpload(props) {
  const [files, setFiles] = useState([])
  const [image, setImage] = useState(null)
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
              <div className={'img-preview'} style={{minHeight: 200, minWidth: 200, overflow: 'hidden'}} />
              <Button.Group>
                <Button style={{width: 100}} positive icon={'check'}/>
                <Button style={{width: 100}} icon={'close'}/>
              </Button.Group>
            </>
  
        }
      </Grid.Column>
    </Grid>
  )
}

export default PhotoUpload