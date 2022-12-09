import { User } from '../../requests'
import { useEffect, useState } from 'react'

const ArticleForm = (props) => {

  const [user, setUser] = useState(null)

    useEffect(() => {
      getCurrentUser()
    }, [])


  const getCurrentUser = () => {
    return User.current().then((user) => {
      console.log(`CurrentUser:`, user)
      if (user?.id) {
        setUser(user)
      }
    })
  }



  const getDataAndSubmit = (event) => {
    event.preventDefault()
    const fd = new FormData(event.currentTarget)

    console.log(fd)
    props.submitForm({
      title: fd.get('title'),
      body: fd.get('body'),
      collection: fd.get('collection'),
      tags: fd.get('tags'),
      created_at: new Date(),
      user_id: user.id
    })
    event.currentTarget.reset()
  }

  return (
    <form onSubmit={getDataAndSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <br />
        <input type="text" name="title" id="" />
      </div>
      <div>
        <label htmlFor="body">Body</label>
        <br />
        <input type="text" name="body" id="" />
      </div>
      <div>
        <label htmlFor="collection">Collection</label>
        <br />
        <input type="text" name="collection" id="" />
      </div>
      <div>
        <label htmlFor="tags">Tags</label>
        <br />
        <input type="text" name="tags" id="" />
      </div>
      <div>
        <input type="submit" value="Create Article" />
      </div>
    </form>
  )
}

export default ArticleForm
