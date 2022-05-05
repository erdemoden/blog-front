import '../Styles/Background.css'
import '../Styles/FormDesign.css'
import Bounce from 'react-reveal/Bounce';
import {useNavigate} from 'react-router-dom';
import { useState ,useEffect } from 'react';
import swal from 'sweetalert';
const axios = require('axios');
let number = 1;
const Login  = (props)=>{
  const navigate = useNavigate();
  const [allState,setAllState] = useState({
    title:props.title,
    message:props.message,
    button:props.button,
    show:true
  });
   const beforeLoad = ()=>{
      axios.get('http://localhost:1998/',{withCredentials:true})
      .then(function(response){
        if(response.data.route === "/homepage"){
          navigate("/homepage");
        }
        else if(response.data.route === "/login"){
          navigate("/");
        }
        console.log(response.data.route);
      });
     }
      const handleClick = ()=>{
          if(allState.show === false && number === 1){
              setAllState({show:true,message:"Have Account ?",title:"Sign-Up"});
            }
          else if(allState.show === false && number === 2){
            setAllState({show:true,message:"Don't Have Account ?",title:"Login"});
          }
          
      }
      const submit = async()=>{
        if(document.getElementById("password").value.trim().length ==0){
          swal({
            title: "Password Field Is Required!",
            text: "You Should Create A Password",
            icon: "error",
            button: "Close This Alert",
          });
        }
        else if(document.getElementById("username").value.trim().length ==0){
          swal({
            title: "Username Field Is Required!",
            text: "You Should Create A Username",
            icon: "error",
            button: "Close This Alert",
          });
        }
         else if(allState.title === "Sign-Up"){
          let post = await fetch('http://localhost:1998/signup',{
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
            },
             credentials:'include',
            body: JSON.stringify({username:document.getElementById("username").value, password:document.getElementById("password").value})
          });
          let postres = await post.json();
          if(postres.route === '/homepage'){
            navigate('/homepage');
          }
          else if(postres.error){
            swal({
              title: postres.error,
              text: "Please Check And Try Again",
              icon: "error",
              button: "Close This Alert",
            });
          }
         }
         else if(allState.title === "Login"){

         }
      }
      useEffect(() =>{
        beforeLoad();
      },[]);
      useEffect( ()=>{
        setTimeout(() => {
              if(allState.show === true && number === 1){
                setAllState({show:false,message:"Have Account ?",title:"Sign-Up"});
                number = 2;
              }
              else if(allState.show === true && number === 2){
                setAllState({show:false,message:"Don't Have Account ?",title:"Login"});
                number = 1;
            }
          }, 300);
      },[allState]);
        return(
            <div>
            <Bounce left opposite when={!allState.show}>
            <div className='formBack'>
                <h1 className='Title'>{allState.title}</h1>
                <input type="text" name = "username" placeholder="Username" id='username'></input>
                <input type="password" name = "password" placeholder="Password" id='password'></input>
                <input type="button" value={allState.title} onClick = {submit} ></input>
                <p>{allState.message} <span style={{color:"blue",cursor:"pointer"}} onClick = {handleClick}>Click Here</span></p>
            </div>
            </Bounce>
            </div>
           
    );
        }



export default Login;