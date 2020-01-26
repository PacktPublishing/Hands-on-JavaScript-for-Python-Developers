import React from 'react'
import './Gallery.css'
import Upload from '../upload/Upload'

class Gallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      path: '',
      error: null
    }

    this.delete = this.delete.bind(this)
    this.get = this.get.bind(this)
  }

  componentDidMount() {
   this.get() 
  }

  get() {
    fetch("http://localhost:3000/gallery")
      .then(res => res.json())
      .then((result) => {
        this.setState({
          files: result.files,
          path: result.path
        })
      },
        (error) => {
          this.setState({
            files: [],
            path: '',
            error
          })
        })
  }

  delete(e) {
    fetch(`http://localhost:3000/gallery/${e.target.id}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.componentDidMount()
      })
  }

  render() {
    const { error, files, path } = this.state

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <>
        <Upload reload={this.get}/>

        {
          files.length > 0 ? (

            <ul>
              {files.map(file => (
                <li key={file}><img id={file} src={path + file} alt="" onClick={this.delete} /></li>
              ))}
            </ul>
          ) : <p>No photos</p>
        }
      </>
    )
  }
}

export default Gallery