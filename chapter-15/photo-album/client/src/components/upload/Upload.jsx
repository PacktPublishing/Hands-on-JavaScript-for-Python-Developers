import React from 'react'
import './Upload.css'

class Upload extends React.Component {
  constructor(props) {
    super(props)
    this.uploadForm = this.uploadForm.bind(this)
  }

  upload(e) {
    document.querySelector("#uploadForm").style.display = "block"
  }

  uploadForm(e) {
    e.preventDefault();
    const formData = new FormData()

    formData.append('file', document.querySelector('input').files[0]);

    fetch("http://localhost:3000/upload", {
      method: 'POST',
      body: formData
    })
    .then(() => {
      this.props.reload()
    })
  }
  
  render() {
    return (
      <>
        <p><button id="upload" onClick={this.upload}>Upload Photo</button></p>

        <div id="uploadForm" className="w3-modal">
          <form method="post" encType="multipart/form-data">
            <p><input type="file" name="filetoupload" /></p>
            <p><button type="submit" onClick={this.uploadForm}>Upload</button></p>
          </form>
        </div>
      </>
    )
  }
}

export default Upload