import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'


const RegisterForm = () => {
  // Context
  const { registerUser } = useContext(AuthContext)

  // Local state
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })

  const [alert, setAlert] = useState(null)

  const { username, password, confirmPassword } = registerForm

  const onChangeRegisterForm = event => setRegisterForm({ ...registerForm, [event.target.name]: event.target.value, })

  const register = async event => {
    event.preventDefault()

    if (password !== confirmPassword) {
      setAlert({ type: 'danger', message: 'Passwords do not match' })
      setTimeout(() => setAlert(null), 5000)
      return
    }

    try {
      const registerData = await registerUser(registerForm)
      if (!registerData.success) {
        setAlert({ type: 'danger', message: registerData.message })
        setTimeout(() => setAlert(null), 5000)
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <Form className='my-4' onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control type='text' placeholder='Username' name='username' value={username} onChange={onChangeRegisterForm} required />
        </Form.Group>
        <Form.Group className='mt-2'>
          <Form.Control type='password' placeholder='Password' name='password' value={password} onChange={onChangeRegisterForm} required />
        </Form.Group>
        <Form.Group className='mt-2'>
          <Form.Control type='password' placeholder='Confirm password' name='confirmPassword' value={confirmPassword} onChange={onChangeRegisterForm} required />
        </Form.Group>
        <Button variant='success' type='submit' className='mt-3'>Register</Button>
      </Form>
      <p>Already have an account?
        <Link to='/login'>
          <Button variant='info' size='sm' className='ml-2'>Login</Button>
        </Link>
      </p>
    </>
  )
}

export default RegisterForm