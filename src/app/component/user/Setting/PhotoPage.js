import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Image, Segment, Header, Divider, Grid, Button, Card, Icon } from 'semantic-ui-react'
import { toastr } from 'react-redux-toastr'
import Dropzone from 'react-dropzone'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import log from '../../../../utils/utils'
import { deletePhoto, updateProfilePhoto, uploadPhoto } from '../../../../action/userAction'


class PhotoPage extends Component {
  state = {
    files: [],
    fileName: '',
    cropResult: null,
    dataURL: '',
    image: {}
  }

  cancelCrop = () => {
    this.setState({
      files: [],
      image: {},
      dataURL: '',
    })
  }

  uploadImage = async () => {
    try {
      await this.props.uploadProfileImage(
        this.state.image,
        this.state.fileName
      )
      this.cancelCrop()
    } catch (error) {
      toastr.error('Oops', error.message)
    }
  }

  handlePhotoDelete = (photo) => async () => {
    try {
      this.props.deletePhoto(photo)
    } catch (error) {
      toastr.error('Oops', error.message)
    }
  }

  handleSetMainPhoto = (photo) => async () => {
    try {
      await this.props.setMainPhoto(photo)
    } catch (error) {
      toastr.error('Oops', error.message)
    }
  }

  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      return
    }

    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imageUrl = URL.createObjectURL(blob)
      this.setState({
        cropResult: imageUrl,
        image: blob
      })
    }, 'image/jpeg')
  }

  onDrop = files => {
    // log(files[0], files[0], URL.createObjectURL(files[0]))
    // const reader = new FileReader()
    // reader.onload = () => {
    //   const result = reader.result
    //   // do whatever you want with the file content
    //   this.setState({
    //     files: files,
    //     fileName: files[0].name,
    //     dataURL: result,
    //   })
    // }
    // reader.onabort = () => console.log('file reading was aborted')
    // reader.onerror = () => console.log('file reading has failed')
    // reader.readAsDataURL(files[0])
    let imageUrl = URL.createObjectURL(files[0])
    this.setState({
      files: files,
      fileName: files[0].name,
      dataURL: imageUrl,
    })
  }

  render() {
    const {photos, profile, loading} = this.props
    let filteredPhotos
    if (photos) {
      filteredPhotos = photos.filter(photo => {
        return photo.url !== profile.photoURL
      })
    }
    return (
      <Segment>
        <Header dividing size="large" content="Your Photos"/>
        <Grid>
          <Grid.Row/>
          <Grid.Column width={4}>
            <Header color="teal" align='center' sub content="Step 1 - Add Photo"/>
            <Dropzone onDrop={this.onDrop} multiple={false}>
              {
                ({getRootProps, getInputProps, isDragActive}) => {
                  return (
                    <div>
                      <div
                        {...getRootProps()}
                        style={{padding: '30px 0', textAlign: 'center'}}
                        className={isDragActive ? 'dropzone dropzone--isActive' : 'dropzone'}
                      >
                        <input {...getInputProps()} />
                        {
                          isDragActive
                            ? (
                              <div>
                                <p>drop files here...</p>
                                <Icon name='upload' size='huge'/>
                              </div>
                            ) : (
                              <div>
                                <p>drop or click</p>
                                <Icon name='upload' size='huge'/>
                              </div>
                            )
                        }
                      </div>
                    </div>
                  )
                }
              }
            </Dropzone>
          </Grid.Column>
          <Grid.Column width={1}/>
          <Grid.Column width={4}>
            <Header sub color="teal" align='center' content="Step 2 - Resize image"/>
            {(
              <Cropper
                style={{height: 200, width: '100%'}}
                ref="cropper"
                src={this.state.dataURL}
                aspectRatio={1}
                viewMode={0}
                dragMode="move"
                guides={false}
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                crop={this.cropImage}
              />
            )}
          </Grid.Column>
          <Grid.Column width={1}/>
          <Grid.Column width={4}>
            <Header sub color="teal" align='center' content="Step 3 - Preview and Upload"/>
            {this.state.files[0] && (
              <div>
                <Image
                  style={{minHeight: '200px', minWidth: '200px'}}
                  src={this.state.cropResult}
                />
                <Button.Group>
                  <Button
                    loading={loading}
                    onClick={this.uploadImage}
                    style={{width: '100px'}}
                    positive
                    icon="check"
                  />
                  <Button
                    disabled={loading}
                    onClick={this.cancelCrop}
                    style={{width: '100px'}}
                    icon="close"
                  />
                </Button.Group>
              </div>
            )}
          </Grid.Column>
        </Grid>

        <Divider/>
        <Header sub color="teal" content="All Photos"/>

        <Card.Group itemsPerRow={5}>
          <Card>
            <Image src={profile.photoURL || '/assets/user.png'}/>
            <Button positive>Main Photo</Button>
          </Card>
          {photos &&
          filteredPhotos.map(photo => (
            <Card key={photo.id}>
              <Image src={photo.url}/>
              <div className="ui two buttons">
                <Button loading={loading} onClick={this.handleSetMainPhoto(photo.url)} basic color="green">
                  Main
                </Button>
                <Button onClick={this.handlePhotoDelete(photo)} basic icon="trash" color="red"/>
              </div>
            </Card>
          ))}
        </Card.Group>
      </Segment>
    )
  }
}

const actions = {
  uploadProfileImage: uploadPhoto,
  deletePhoto: deletePhoto,
  setMainPhoto: updateProfilePhoto,
}

const mapState = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    photos: state.firestore.ordered.photos,
    loading: state.loading
  }
}


const query = ({auth}) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{collection: 'photos'}],
      storeAs: 'photos'
    }
  ]
}


export default compose(
  connect(mapState, actions),
  firestoreConnect(props => query(props))
)(PhotoPage)
