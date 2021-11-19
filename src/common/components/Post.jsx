import { useState } from "react";
import axios from "axios";
export const Post = ({setCreatePost,setShowPost}) =>{
    const [charCount,setCharCount] = useState(0);
    const [imageURL,setImageURL]   = useState("");
    const [image,setImage] = useState("");

    const uploadHandler = async () =>{
        console.log("Called")
        if(!image){
           console.log("Image is required");
        }
        const data = new FormData();
        data.append("file",image);
        data.append("upload_preset", "Zushoc");
        data.append("cloud_name", "dlfkr6n8m");
        try{
            const response = await axios.post("https://api.cloudinary.com/v1_1/dlfkr6n8m/image/upload",data);
            setImageURL(response.data.secure_url);
            return response.data;
        }catch(err){
            console.log({err});
        }
    }
    return (
        <div style={{marginTop:"7rem"}}>
            <div>  
                <textarea className="text-container" type="text" placeholder="Whats cooking ?" onChange={(e)=>setCharCount(e.target.value)}></textarea>
            </div>
            <div className="btn-component">
                <input className="center file-component" type ="file" onChange={(e)=>setImage(e.target.files[0])}/>
                <button className="center close-btn" 
                onClick={()=>{
                    setCreatePost(false);
                    setShowPost(true)}} 
                >X</button>
                <button className="center post-component" >Post</button>
                <button className="center add-component" onClick={()=>uploadHandler()}>+</button>
                <img src = {imageURL} alt ="images"/>
                <p className ="text-center">{charCount.length}/100 </p>
            </div>
               <p></p>
        </div>
    )
}