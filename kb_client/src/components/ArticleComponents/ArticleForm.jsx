import { Collection, User } from '../../requests'
import { useEffect, useState } from 'react'
import TipTap from '../RTE/TipTap'

const ArticleForm = (props) => {
  const [user, setUser] = useState(null)
  const [collections, setCollections] = useState([])
  const [editorData, setEditorData] = useState('')
  const [published, setPublished] = useState(false)

  useEffect(() => {
    getCurrentUser()

    const fetchCollections = async () => {
      const data = await Collection.index()
      setCollections(data)
    }

    fetchCollections()
    // console.log(collections)
  }, [])

  const getCurrentUser = () => {
    return User.current().then((user) => {
      // console.log(`CurrentUser:`, user)
      if (user?.id) {
        setUser(user)
      }
    })
  }

   const updatePublished = (e) => {
     setPublished(e.target.checked)
     console.log(published)
   }

  const getTipTapData = (props) => {
    setEditorData(props)
    console.log(editorData)
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
      published: published
    })
    console.log(`Test New Published: `, fd.get('published'))
    event.currentTarget.reset()
  }

  const searchCollections = (e) => {
    console.log(e.currentTarget.value)

    const filterVal = e.currentTarget.value
    if (filterVal.length < 2) {
      document.querySelector('#collection-output').innerHTML = ''
      return
    }

    const filteredCol = collections.filter((c) => {
      return c.name.toLowerCase().match(filterVal.toLowerCase())
    })

    // console.log(filteredCol)

    if (filteredCol.length === 0) {
      //document.querySelector('#collection-output').innerHTML = `Create <strong>${filterVal}</strong> as a tag?`
      document.querySelector(
        '#collection-output'
      ).innerHTML = `Click here to create this collection: ${filterVal}`
    } else {
      document.querySelector('#collection-output').innerHTML = filteredCol.map(
        (f) => f.name
      )
    }
  }

  const createCollection = (e) => {
    const currVal = e.currentTarget.innerHTML
    console.log(currVal)

    Collection.create({ name: currVal }).then((res) => {
      console.log(res)
    })
    setCollections({ collections })
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
        <TipTap onChange={setEditorData} />
        <input type="text" name="body" id="" />
      </div>
      <div>
        <label htmlFor="collection">Collection</label>
        <br />
        <input
          type="text"
          name="collection"
          id=""
          onChange={(e) => searchCollections(e)}
          placeholder="Search for existing collections..."
        />
        <div onClick={(e) => createCollection(e)} id="collection-output"></div>
      </div>
      <div>
        <label htmlFor="tags">Tags</label>
        <br />
        <input type="text" name="tags" id="" />
      </div>
      <label htmlFor='published'>Published: </label>
        <input
            type="checkbox"
            name="published"
            id="published" 
            defaultChecked={false}   
            onChange={(e)=> updatePublished(e)}       
          />
      <div>
        <input type="submit" value="Create Article" />
      </div>
    </form>
  )
}

export default ArticleForm
