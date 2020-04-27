import React, { useState } from 'react';
import './App.css';


function PostControlPanel(props) {
    return (
    <div>
      <button onClick={props.addPost}>Add Post</button>
      <button onClick={props.removePost}>Remove Post</button>
    </div>
    );
}

function AddPostPanel(props) {
  const objTitle = React.createRef();
  const objContent = React.createRef();
  const fileUploader = React.createRef();
  const [imgSelected, setImgSelected] = React.useState(null);

  function uploadImage() { 
    console.log("Upload Image"); 
    fileUploader.current.click();
  }

  function submitPost() { 
    console.log("Submit Post"); 
    props.callback(objTitle.current.value, objContent.current.value, imgSelected);
  }

  function fileSelected() {
    if (undefined === fileUploader.current.files[0]) {
      console.log("Did not select file, do nothing");
    }
    else {
      console.log("File selected: " + fileUploader.current.files[0].name);
      setImgSelected(URL.createObjectURL(fileUploader.current.files[0]));
    }
  }

  return (
    <div>
      <input type="file" id="selectdFile" onChange={fileSelected} ref={fileUploader} accept="image/*" style={{display:'none'}}></input>
      <span className="Add-Post">Title:</span>
      <input ref={objTitle}></input>
      <span className="Add-Post">Content:</span>
      <textarea placeholder="Please input Content." ref={objContent}></textarea>
      {imgSelected && <span className="Add-Post">Image Preview:</span>}
      {imgSelected && <img src={imgSelected} alt="Preview"></img>}
        
      <div className="Add-Post">
        <button onClick={uploadImage}>upload</button>
        <button onClick={submitPost}>submit</button>
      </div>
    </div>
    );
}

function App() {
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [listPostInfo, setListPostInfo] = useState([]);
  //const [lastPostTimestamp, setLastPostTimestamp] = useState(null);

  function addPost() {
    console.log("Add Post");
    setIsAddingPost(true);
  }

  function removePost() { 
    if(0 === listPostInfo.length) {
      console.log("List of post is empty, do nothing.");
      return;
    }
    var lastId = listPostInfo[listPostInfo.length - 1]['id'];
    setListPostInfo(listPostInfo.filter(item => item.id !== lastId));
  }

  function submitPostCallBack(strTitle, strContent, imgFile) {
    var currentTimestamp = Math.floor(Date.now() / 1000);
    setListPostInfo(listPostInfo.concat({
      "id": currentTimestamp,
      "title": strTitle,
      "content": strContent,
      "image": imgFile
    }));
    setIsAddingPost(false);
  };

  return (
    <div className="App"> 

    {
    isAddingPost
    ? <AddPostPanel callback={submitPostCallBack}/>
    : <PostControlPanel addPost={addPost} removePost={removePost}/>
    }

    {!isAddingPost && 0 < listPostInfo.length &&
      <div>
        {listPostInfo.map(item => (
          <div key={item["id"]} style={{borderStyle: "dashed"}}>
            <span className="Add-Post">{item["title"]}</span>
            <span className="Add-Post">{item["content"]}</span>
          </div>
        ))}
      </div>
    }
    </div>
  );
}

export default App;
