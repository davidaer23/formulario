import {useState} from 'react'
import axios from 'axios'

const Notification = ({text}) => {
  if( text===null || text==='' ){
    return null
  }

  return(
    <div className='notification'>{text}</div>
  )
}


// APP

function App() {


const [userName, setUsername] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [newPassword, setNewPassword] = useState('')
const [message, setMessage ] = useState(null)
const [messageCP, setMessageCP ] = useState(null)

//Add User

const addUser = (event) =>{
  var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
  event.preventDefault()
if(password.length<8){
  alert('Password must be at least 8 characters')
}else if(password!==newPassword){
  alert('Passwords are not the same')
}else if(!validEmail.test(email) ) 
{
  alert('The email is invalid')
} else{
  const newUser = 
    {
      username:userName,
      email: email,
      password: newPassword
  }

  axios
  .post('http://localhost:3001/users', newUser)
  .then(response => alert(`Username: ${response.data.username} Email: ${response.data.email} registrado existosamente`))

  
  setUsername('')
  setEmail('')
  setPassword('')
  setNewPassword('')
}
  
  
}

// Handle Functions
const handleUserName = (event) => setUsername(event.target.value.replace(/ /g, "")) 

const handleEmail = (event) => setEmail(event.target.value.replace(/ /g, "")) 
  


const handlePassword = (event) => {
  setPassword(event.target.value) 
  event.target.value.length<8 ? 
  setMessage('Password must be at least 8 characters')  
  : setMessage(null)
  }

  const handleConfirmPassword = (event) => {
  setNewPassword(event.target.value)
  event.target.value !== password ? 
  setMessageCP('Passwords are not the same') 
  : setMessageCP(null)
}

  return (
    <div>
      <form onSubmit={addUser}>
      <div className='title'>Register New Account</div>
        <div className='container-div'>
          <div className='label'>
          <label>Username: </label> 
          </div>
          <div className='input'>
          <input value={userName} onChange={handleUserName} required/>
          </div>
        </div>
        <div className='container-div'>
          <div className='label'>
          <label>Email: </label> 
          </div>
          <div className='input'>
          <input value={email} onChange={handleEmail} required type={'email'} />
          </div>
        </div>
        
        <div className='container-div'>
          <div className='label'>
          <label>Password: </label>
          </div>
          <div className='input'>
          <input value={password} onChange={handlePassword} required type={'password'}/>
          <Notification text={message} key={1}/>
          </div>
        </div>
        
        <div className='container-div'>
          <div className='label'>
          <label>Confirm Password: </label>
          </div>
          <div className='input'>
          <input value={newPassword} onChange={handleConfirmPassword} required type={'password'}/>
          <Notification text={messageCP} key={2}/>
          </div>
        </div>

        <button type={'submit'} className={"btn-submit"} id='registerBtn'>Register</button>
      </form>
    </div>
  );
}

export default App;
