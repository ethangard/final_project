import { User } from '../../requests'
import { useNavigate } from 'react-router-dom'

function CreateUser(props) {
  const { onSignUp } = props

  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    const { currentTarget } = event
    const formData = new FormData(currentTarget)
    const params = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      password: formData.get('password'),
      password_confirmation: formData.get('password_confirmation'),
      permission_level: formData.get('permission_level'),
    }

    console.log(params)

    User.invite_user(params).then((data) => {
      console.log(data)
      // console.log(data[0].id)
      if (data[0].id) {
        // onSignUp()
        navigate('/admin')
      }
    })
  }

  return (
    <main className="sign-in-container">
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-input">
          <label htmlFor="first_name">First name</label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            className="sign-in-input"
          />
        </div>
        <div className="form-input">
          <label htmlFor="last_name">Last name</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            className="sign-in-input"
          />
        </div>
        <div className="form-input">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            className="sign-in-input"
          />
        </div>
        <div className="form-input">
          <label htmlFor="permission_level">Permission Level</label>
          <select
            name="permission_level"
            id="permission_level"
            className="permission-container"
          >
            <option value="read">Read Only</option>
            <option value="write">Read and Write</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="form-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="sign-in-input"
          />
        </div>
        <div className="form-input">
          <label htmlFor="password_confirmation">Confirm Password</label>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            className="sign-in-input"
          />
        </div>
        <input type="submit" value="Sign Up" className="sign-in-btn" />
      </form>
    </main>
  )
}

export default CreateUser
