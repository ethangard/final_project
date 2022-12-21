import { Session } from '../../requests'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function SignInPage(props) {
  const { onSignIn } = props

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const [errors, setErrors] = useState([])

  function handleSubmit(event) {
    event.preventDefault()
    // const { currentTarget } = event;

    // const formData = new FormData(currentTarget);
    const params = {
      email: email,
      password: password,
    }

    Session.create(params).then((data) => {
      if (data.status === 404) {
        setErrors([...errors, { message: 'Wrong email or password' }])
      } else if (data.id) {
        onSignIn()
        // Navigated to Index page from the browser
        // We can 'push' on history to manipulate the browser
        // and direct our user to any page in our app
        // props.history.push('/questions') <--- not working
        navigate('/')
      }
    })
  }

  return (
    <div >
      <form onSubmit={handleSubmit} className="sign-in-container">
      <h1>Sign In</h1>
        {errors.length > 0 ? (
          <div>
            <h4>Failed to Sign In</h4>
            <p>{errors.map((error) => error.message).join(', ')}</p>
          </div>
        ) : (
          ''
        )}
        <div className='form-input'>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(event) => {
              setEmail(event.currentTarget.value)
            }}
          />
        </div>
        <div className='form-input'>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(event) => {
              setPassword(event.currentTarget.value)
            }}
          />
        </div>
        <input type="submit" value="Sign In" />
      </form>
    </div>
  )
}

export default SignInPage
