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
const [messageEmail, setMessageEmail ] = useState(null)

//Add User

const addUser = (event) =>{
  event.preventDefault()

  if(messageCP || messageEmail){ //El password y el email puede enviarse sin importar el mensaje entonces por eso esta validacion
    window.alert("Los datos son erroneos")
    return
  }

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

// Handle Functions
const handleUserName = (event) => setUsername(event.target.value.replace(/ /g, "")) 

const handleEmail = (event) =>{
  setEmail(event.target.value.replace(/ /g, "")) 
} 
 
const validarEmail = (event) =>{
  const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
  !validEmail.test(event.target.value) ? setMessageEmail('Email invalido') : setMessageEmail(null)
  if(event.target.value===''){
    setMessageEmail(null)
  }
  
}


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
          <input value={email} onChange={handleEmail} onBlur={validarEmail} required type={'email'} />
          <Notification text={messageEmail} key={0}/>
          </div>
        </div>
        
        <div className='container-div'>
          <div className='label'>
          <label>Password: </label>
          </div>
          <div className='input'>
          <input value={password} minLength="8" onChange={handlePassword} required type={'password'}/>
          <Notification text={message} key={1}/>
          </div>
        </div>
        
        <div className='container-div'>
          <div className='label'>
          <label>Confirm Password: </label>
          </div>
          <div className='input'>
          <input value={newPassword} minLength="8" onChange={handleConfirmPassword} required type={'password'}/>
          <Notification text={messageCP} key={2}/>
          </div>
        </div>

        <button type={'submit'} className={"btn-submit"} id='registerBtn'>Register</button>
      </form>
    </div>
  );
}

export default App;
