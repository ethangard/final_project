import { User } from '../../requests'
import { useEffect, useState } from 'react'
import TipTap from '../RTE/TipTap'

const ArticleForm = (props) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getCurrentUser()
  }, [])

  const getCurrentUser = () => {
    return User.current().then((user) => {
      // console.log(`CurrentUser:`, user)
      if (user?.id) {
        setUser(user)
      }
    })
  }

  const getDataAndSubmit = (event) => {
    event.preventDefault()
    const fd = new FormData(event.currentTarget)

    const formTags = fd.get('tags')
    const filterTags = formTags.split(',')
    const trimTags = filterTags.map((s) => s.trim())
    // console.log(trimTags)

    props.submitForm({
      title: fd.get('title'),
      body: fd.get('body'),
      collection: fd.get('collection'),
      tags: trimTags.toString(),
      // tags: fd.get('tags'),
      // created_at: new Date(),
      user_id: user.id,
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
        <TipTap />
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
