import React, { useState, useRef } from 'react'
import Nav from '../components/Nav'
import './ProfileScreen.css'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import db from '../components/fbase'
import { storage } from '../components/fbase';
import avatar from '../images/netflix-avatar.png'
import {useEffect} from 'react'
import {ref, uploadBytes, getDownloadURL } from "firebase/storage";

function ProfileScreen()  {
    
    const auth =  getAuth()
    const user = auth.currentUser
    const [userPlan, setUserPlan] = useState(null)
    const [userName, setUserName] = useState('')
    const inputFile = useRef(null)
    const [image,setImage] = useState()
    const [imageURL, setImageURL] = useState(null)
    let currentFile = ''



    useEffect(() =>{
        async function fetchUserData(){
          const docRef = doc(db, "users", auth.currentUser.email);
          const currentUserDoc = await getDoc(docRef)
          const currentUserPlan = currentUserDoc.data().plans
          const currentUserName = currentUserDoc.data().name
          setUserPlan(currentUserPlan)
          setUserName(currentUserName)
          const pathReference = ref(storage, 'profile/'+currentUserName);
          getDownloadURL(pathReference)
        .then(async (url) => {

        setImageURL(url)
  })
  .catch((error) => {
    console.log(error)
  });


        }
            fetchUserData();
    },[]);

  

    const onButtonClick = () => {
        // `current` points to the mounted file input element
       inputFile.current.click();
      };

      const handleChange = (e) => {
        currentFile = e.target.files[0]
        console.log(currentFile.name)
        setImage(currentFile)
        const storageRef = ref(storage, 'profile/' + userName);
        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, currentFile).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        // window.location.reload(false)
        const docRef = doc(db, "users", auth.currentUser.email);
        getDownloadURL(storageRef)
        .then(async (url) => {
        await updateDoc(docRef, {
            "profileURL" : url
        })
        setImageURL(url)
  })
  .catch((error) => {
    console.log(error)
  });
});
      }

    return (
        !auth.currentUser.emailVerified ? <div className="profileScreen"> <h1 className='verify-message'>Please verify using the email in your inbox</h1>
        <h2 className='verify-messageh2'>If done already, <u onClick={() => window.location.reload()}>click here</u></h2></div>
        :
        <div className="profileScreen">
            <Nav/>
            <div className="profileScreen__body">
            <h1>Profile</h1>
            <div className="profileScreen__info">
            
                <img src={imageURL?imageURL:avatar} alt="" onClick={onButtonClick}  />
                <input type='file' id='file' ref={inputFile} onChange={(e) => handleChange(e)} style={{'display': 'none'}} />
                {/* <input type="file" multiple accept="image/*" onChange={() => {console.log("tjiw")}} placeholder={avatar} /> */}
                {/* </img> */}
                
                {/* <button onClick={() => {}} className="profileScreen__upload">Upload Profile Picture</button> */}
                
                <div className="profileScreen__details">
                
                    <div className='details_div'><h2>{userName}</h2><h3>{user.email}</h3></div>
                    
                    <div className="profileScreen__plans">
                    
                        <h3><strong>Plan: </strong> {userPlan}</h3>
                        <p></p>


                        <button className='reset-text' onClick={() => sendPasswordResetEmail(auth,user.email).then(() => window.alert('Email is sent, please check inbox'))}>Reset Password</button>
                        <button onClick={() => auth.signOut()} className="profileScreen__signOut">Sign Out</button>
                    </div>
                </div>
            </div>
            </div>

        </div>
    )
}

export default ProfileScreen
