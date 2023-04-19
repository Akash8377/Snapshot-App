
import './App.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function App() {
  const searchData = useRef(null);
  const [searchText, setSearchText] = useState("mountains");
  const [imageData, setImageData] = useState([])
  useEffect(()=> {
    
    const params = {
      method: "flickr.photos.search",
      api_key: "d86eb2e2e9a6a6fda19836fb30286f5c",
      text: searchText,
      sort: "",
      per_page: 100,
      license: '4',
      extras: "Akash, license",
      format: "json",
      nojsoncallback: 1
    }
    //farm id secret server
    const parameters = new URLSearchParams(params);
    //?per_page=24&
    const url = `https://api.flickr.com/services/rest/?${parameters}`
    axios.get(url).then((resp)=> {
      console.log(resp.data)
      const arr = resp.data.photos.photo.map((imgData)=> {
        return fetchFlickrImageUrl(imgData, 'q');
      });
      setImageData(arr);
    }).catch(()=> {

    }).finally(()=> {

    })

  }, [searchText])
  const fetchFlickrImageUrl = (photo, size)=> {
  
    let url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
    if(size) {
      url += `_${size}`
    }
    url += '.jpg'
    return url
  }
  return (
    <div>
    <h1>
      SNAPSHOT
      </h1>
      <label htmlFor="search">
    <input onChange={(e)=>{searchData.current = e.target.value} }  className="search" placeholder="Search..."/>
    <button onClick={()=> {setSearchText(searchData.current)}} className="search">Search</button>
    </label>
    <div className='main-changeName'>
    <section>
      <button onClick={()=> {setSearchText("mountains")}}>Mountains</button>
      <button onClick={()=> {setSearchText("beaches")}}>Beaches</button>
      <button onClick={()=> {setSearchText("birds")}}>Birds</button>
      <button onClick={()=> {setSearchText("food")}}>Food</button>
    </section>
    </div>
    <div className='image-container'>
      
        {imageData.map((imageurl, key)=> {
          return (
            <article className='flickr-image'>
              <img src={imageurl} alt='' key={key}/>
            </article>
          )
          
        })}
      
    </div>
    </div>
  );
}

export default App;
