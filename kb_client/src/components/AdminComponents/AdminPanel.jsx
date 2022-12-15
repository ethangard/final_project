import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../../requests'
import AdminUser from './AdminUser'

const AdminPanel = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await User.index()
      setUsers(data)
    }
    fetchData()
  }, [])

  return (
    <>
{/*       {console.log(users)} */}
      <div>AdminPanel</div>
      <Link to="/admin/users/new"><button>Invite New User</button></Link>
      <div className="user-container">
        {users.map((u, i) => {
          return (
            <Link to={`./${u.id}`} className="user-item" key={i} props={u}>
              <div>First Name: {u.first_name}</div>
              <div>Last Name: {u.last_name}</div>
              <div>Email: {u.email}</div>
              <div>User Since: {u.created_at}</div>
              <div>Current Permission Level: {u.permission_level}</div>
              <div>
                Profile Active?{' '}
                {<span>{u.active ? 'Active' : 'Inactive'}</span>}
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default AdminPanel
