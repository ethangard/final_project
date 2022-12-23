import { Navigate, Outlet } from 'react-router-dom'

const ActiveRoutes = ({ isActive }) => {
  // console.log(isActive)
  // console.log(isActive)

  return isActive.active ? <Outlet /> : <Navigate to="/suspended" />

  // return isActive.active

  // if(isActive.active){
  //   return <Outlet />
  //   {/* <h1>You are active</h1> */}
  // } else {
  // // return isActive ? <Outlet /> : <Navigate to="/sign_in" />
  //   return <Navigate to="/suspended"
  // }
}

export default ActiveRoutes
