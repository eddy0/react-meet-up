import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { log } from '../util/util'
import { Header, Icon } from 'semantic-ui-react'

function PhotoDropZone({setFiles}) {
  const dropzoneStyles = {
    border: 'dashed 3px #eee',
    borderRadius: '5%',
    paddingTop: '30px',
    textAlign: 'center',
  }
  const dropzoneActive = {
    border: 'dashed 3px green',
  }
  
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    log(acceptedFiles)
    setFiles(acceptedFiles.map((file) => Object.assign(file, {preview: URL.createObjectURL(file)})))
  }, [setFiles])
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
  return (
    <div {...getRootProps()} style={isDragActive ? {...dropzoneStyles, ...dropzoneActive} : dropzoneStyles} >
      <input {...getInputProps()} />
      <Icon name={'upload'} size={'huge'} />
      <Header content={'drop image here'} />
    </div>
  )
}

export default PhotoDropZone