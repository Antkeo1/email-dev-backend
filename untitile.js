// to write a function to retrieve a blob of json
// to make an ajax request, use 'fetch' function
// http://rallycoding.herokuapp.com/api/music_albums

/*{
  "title":"Taylor Swift",
  "artist":"Taylor Swift",
  "url":"https://www.amazon.com/Taylor-Swift/dp/B0014I4KH6",
  "image":"https://images-na.ssl-images-amazon.com/images/I/61McsadO1OL.jpg",
  "thumbnail_image":"https://i.imgur.com/K3KJ3w4h.jpg"
}*/

/*const fetchAlbums = () => {
  fetch('http://rallycoding.herokuapp.com/api/music_albums')
    .then(res => res.json())
    .then(json => console.log(json))
}*/

const fetchAlbums = async () => {
  const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums')
  const json = await res.json()
  console.log(json)
}

fetchAlbums()
