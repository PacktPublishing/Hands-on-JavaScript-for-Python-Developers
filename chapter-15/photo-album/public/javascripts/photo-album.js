class PhotoAlbum {
  constructor() {
    this.data = {}
  }

  getAlbum() {
    fetch('/gallery')
      .then(response => response.json())
      .then( (data) => {
        this.data = JSON.parse(data)
      })
  }
}

const album = new PhotoAlbum();
