import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { User } from '../../requests'
import { Navigate } from 'react-router-dom'

const AdminUser = (props) => {
  const [permissionLevel, setPermissionLevel] = useState('')

  const navigate = useNavigate()

  const user_id = useParams()

  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const data = await User.show(user_id.id)
      setUser(data)
      setPermissionLevel(user.permission_level)
    }

    fetchData()

    // console.log('Initial Permission Level: ', user)
  }, [])

  // console.log(props)

  const updateUserInfo = (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    // console.log(fd)
    console.log(fd.get('permission_level'))

    const params = {
      first_name: fd.get('first_name'),
      last_name: fd.get('last_name'),
      email: fd.get('email'),
      permission_level: fd.get('permission_level'),
      active: fd.get('user_active'),
    }
    console.log(`Sent Params: `, params)
    editUser(user_id.id, params)
  }

  function updatePermissionLevel(e) {
    const curVal = e.currentTarget.value
    console.log(`Current Value of input: `, curVal)
    setPermissionLevel(curVal)
    console.log('Current Permission Level: ', permissionLevel)
  }

  const getDataAndSubmit = (event) => {
    // event.preventDefault()
    // const fd = new FormData(event.currentTarget)
    // const formTags = fd.get('tags')
    // // console.log(formTags)
    // const filterTags = formTags.split(',')
    // const trimTags = filterTags.map((s) => s.trim())
    // // console.log(trimTags)
    // /* Test Data */
    // // console.log(dg.get())
    // // console.log(`Logging props in Edit form: `, props)
    // props.submitForm(articleID.id, {
    //   title: fd.get('title'),
    //   body: fd.get('body'),
    //   collection: fd.get('collection'),
    //   tags: trimTags.toString(),
    //   // created_at: new Date(),
    //   user_id: user.id,
    // })
    // // // setArticle()
    // // setArticle({
    // //   title: fd.get('title'),
    // //   body: fd.get('body'),
    // //   collection: fd.get('collection'),
    // // })
    // props.onEditUpdateSubmit()
    // event.currentTarget.reset()
    // navigate(`/articles/${articleID.id}`)
  }

  function editUser(id, params) {
    User.update(id, params).then((user) => {
      if (user.errors) {
        console.log(`userErrors: ${user.errors}`, user.errors)
        // setErrors({ errors: user.errors })
      } else {
        console.log()
        navigate(`/admin`)
      }
    })
  }

  return (
    <>
      <div>AdminUserPanel</div>
      <form onSubmit={updateUserInfo}>
        <div className="input-group">
          <label htmlFor="first_name">First Name: </label>
          <input type="text" defaultValue={user.first_name} name="first_name" />
        </div>
        <div className="input-group">
          <label htmlFor="last_name">Last Name: </label>
          <input type="text" defaultValue={user.last_name} name="last_name" />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email: </label>
          <input type="text" defaultValue={user.email} name="email" />
        </div>
        <div className="input-group">
          <div>User Since: {user.created_at}</div>
        </div>
        <div className="input-group">
          <label htmlFor="permission_level">
            Current Permission Level: <span>{user.permission_level}</span>
          </label>

          <select
            name="permission_level"
            id="permission_level"
            onChange={updatePermissionLevel}
          >
            <option value="read">Read Only</option>
            <option value="write">Read and Write</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="user_active">Profile Active: </label>
          {/* <input
            type="text"
            defaultValue={user.active ? 'Active' : 'Inactive'}
          /> */}
          <input
            type="checkbox"
            name="user_active"
            id="user_active"
            defaultChecked={user.active}
          />
          {console.log(user.active)}
        </div>
        <input type="submit" value="Update Profile" />
      </form>
    </>
  )
}

export default AdminUser
