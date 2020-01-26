import React from 'react'
import './Gallery.css'

class Gallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      path: '',
      error: null
    }
  }

  componentDidMount() {
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

  render() {
    const { error, files, path } = this.state

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <>
        {
          files.length > 0 ? (

            <ul>
              {files.map(file => (
                <li key={file}><img src={path + file} alt="" /></li>
              ))}
            </ul>
          ) : <p>No photos</p>
        }
      </>
    )
  }
}

export default Gallery