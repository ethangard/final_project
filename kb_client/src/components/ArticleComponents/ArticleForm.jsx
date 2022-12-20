import { Collection, User, Tag } from '../../requests'
import { useEffect, useState } from 'react'
import TipTap from '../RTE/TipTap'
import CreatableSelect from 'react-select/creatable'

const ArticleForm = (props) => {
  const [user, setUser] = useState(null)
  const [collections, setCollections] = useState([])
  const [collection, setCollection] = useState({})
  const [editorData, setEditorData] = useState('')
  const [published, setPublished] = useState(false)
  const [body, setBody] = useState('')
  const [getAllTags, setGetAllTags] = useState([])
  const [tag, setTag] = useState([])

  // const options = [...collections]
  const collectionOptions = collections.map((c, i) => {
    return { value: c.name, label: c.name }
  })

  const tagOptions = getAllTags.map((t, i) => {
    return { value: t.name, label: t.name }
  })

  // console.log('Options', options)

  const getEditorBody = (params) => {
    setBody(params)
    // console.log(params)
  }

  useEffect(() => {
    getCurrentUser()

    const fetchCollections = async () => {
      const data = await Collection.index()
      setCollections(data)
    }

    const fetchTags = async () => {
      const data = await Tag.index()
      setGetAllTags(data)
    }

    fetchCollections()
    fetchTags()
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

  const togglePublished = (e) => {
    // console.log(e.target.checked)
    setPublished(e.target.checked)
    console.log(e.target.checked)
  }

  const getTipTapData = (props) => {
    setEditorData(props)
    console.log(editorData)
  }

  const getDataAndSubmit = (event) => {
    event.preventDefault()
    const fd = new FormData(event.currentTarget)
    console.log(`Is this article published? `, published)

    // const formTags = fd.get('tags')
    // const filterTags = formTags.split(',')
    // const trimTags = filterTags.map((s) => s.trim())
    // console.log(trimTags)

    console.log(`Selected tags are: `, tag)

    // props.submitForm({
    //   title: fd.get('title'),
    //   body: body,
    //   collection: collection.value,
    //   tags: tag,
    //   // tags: fd.get('tags'),
    //   // created_at: new Date(),
    //   user_id: user.id,
    //   published: published,
    // })

    const sentTags = tag.map((t, i) => {
      return t.value
    })

    props.submitForm({
      title: fd.get('title'),
      body: body,
      collection: collection.value,
      tags: sentTags,
      // tags: fd.get('tags'),
      // created_at: new Date(),
      user_id: user.id,
      published: published,
    })

    // console.log(
    //   props.submitForm({
    //     title: fd.get('title'),
    //     body: body,
    //     collection: collection.value,
    //     tags: tag,
    //     // tags: fd.get('tags'),
    //     // created_at: new Date(),
    //     user_id: user.id,
    //     published: published,
    //   })
    // )
    // console.log(`Test New Published: `, fd.get('published'))
    console.log(`Post Tags: `, tag)
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

  // console.log(`Current Collection: `, collection)

  function changeCollection(e) {
    setCollection(e)
    // console.log(`Changed Collection To:`, collection)
  }

  function changeTag(e) {
    setTag(e)
    // console.log(`Changed Collection To:`, collection)
  }

  ////////////////////////////////////////////////

  return (
    <form onSubmit={getDataAndSubmit}>
      {/*       {console.log(collections)} */}
      <div>
        <label htmlFor="title">Title</label>
        <br />
        <input type="text" name="title" id="" />
      </div>
      <div>
        <label htmlFor="body">Body</label>
        <br />
        <TipTap onChange={setEditorData} data={getEditorBody} />
        {/*     <input type="text" name="body" id="" /> */}
      </div>
      <div>
        <label htmlFor="collection">Collection</label>
        <CreatableSelect
          isClearable
          options={collectionOptions}
          onChange={(e) => changeCollection(e)}
        />
        {/* Previous Styles */}
        {/* <label htmlFor="collection">Collection</label>
        <br />
        <input
          type="text"
          name="collection"
          id=""
          onChange={(e) => searchCollections(e)}
          placeholder="Search for existing collections..."
        /> */}
        <div onClick={(e) => createCollection(e)} id="collection-output"></div>
      </div>
      <div>
        <label htmlFor="tags">Tags</label>
        <br />
        {/*  <input type="text" name="tags" id="" /> */}
        <CreatableSelect
          isMulti
          options={tagOptions}
          onChange={(e) => changeTag(e)}
        />
      </div>
      <label htmlFor="published">Published: </label>
      <input
        type="checkbox"
        name="published"
        id="published"
        defaultChecked={false}
        onChange={(e) => togglePublished(e)}
      />
      <div>
        <input type="submit" value="Create Article" />
      </div>
    </form>
  )
}

export default ArticleForm
