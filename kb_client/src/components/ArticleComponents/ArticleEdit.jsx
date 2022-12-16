import { useState, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Article } from '../../requests'
import TipTap from '../RTE/TipTap'
import { findByAltText } from '@testing-library/react'
import { Collection, User, Tag } from '../../requests'
import CreatableSelect from 'react-select/creatable'

const ArticleEdit = (props) => {
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [collections, setCollections] = useState([])
  const [collection, setCollection] = useState({})
  const [editorData, setEditorData] = useState('')
  const [published, setPublished] = useState(false)
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState([])

  const collectionOptions = collections.map((c, i) => {
    return { value: c.name, label: c.name }
  })

  useEffect(() => {
    const fetchedCollections = async () => {
      const data = await Collection.index()
      setCollections(data)
    }

    fetchedCollections()

    // const fetchedTitle = async() => {
    //   const data = await Article.show()
    // }

    // console.log(`Props Here: `, props)
  }, [])

  const tagOptions = tags.map((t, i) => {
    return { value: t.name, label: t.name }
  })

  const navigate = useNavigate()

  const { id, params } = props

  // console.log(`Logging ArticleEdit id: `, id)
  // console.log(`Logging ArticleEdit params: `, params)

  /* Get User Info */

  // console.log(`Article Edit Props: `, props)

  useEffect(() => {
    const fetchPublished = async () => {
      const data = await article.published
      setPublished(data)
    }
    fetchPublished()
  }, [])

  const updatePublished = (e) => {
    setPublished(e.target.checked)
    // console.log(published)
  }

  useEffect(() => {
    getCurrentUser()
    const fetchAllTags = async () => {
      const data = await Tag.index()
      setTags(data)
    }
    fetchAllTags()
  }, [])

  const getCurrentUser = () => {
    return User.current().then((user) => {
      // console.log(`CurrentUser:`, user)
      if (user?.id) {
        setUser(user)
      }
    })
  }

  const articleID = useParams()
  const [article, setArticle] = useState({})
  // const [isFetched, setIsFetched] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const data = await Article.show(articleID.id)
      setArticle(data)
      setTags(data.tags)
      setTitle(data.title)
      setCollection(data.collection)
    }
    fetchData()
  }, [])

  //const test = [1, 2, 3]

  //const arrTags = article.tags

  // const addTag = (e) => {
  //   e.preventDefault()
  //   const curVal = e.currentTarget.value
  //   const curLen = curVal.length
  //   // console.log(e.currentTarget.value)
  //   if (curVal[curLen - 1] === ',' && curVal.length >= 4) {
  //     const actualVal = curVal.substring(0, curLen - 1).trim()
  //     setTags((oldArr) => [...oldArr, actualVal])
  //     // console.log(actualVal)
  //     // e.currentTarget.reset()
  //     console.log(tags)

  //     e.currentTarget.value = ''
  //   }
  // }

  const getDataAndSubmit = (event) => {
    event.preventDefault()
    const fd = new FormData(event.currentTarget)

    const formTags = fd.get('tags')
    // const filterTags = formTags.split(',')
    // const trimTags = filterTags.map((s) => s.trim())

    /* Test Data */
    // console.log(dg.get())
    // console.log(`Logging props in Edit form: `, props)
    props.submitForm(articleID.id, {
      title: title,
      body: body,
      collection: collection,
      tags: tags,
      // created_at: new Date(),
      user_id: user.id,
      published: published,
    })

    // console.log(`Loggin Form Data: `, fd)

    // console.log(`POST Title: `, title, `POST Body: `, body)

    // console.log(`Test Update Published: `, fd.get('published'))

    // // setArticle()
    // setArticle({
    //   title: fd.get('title'),
    //   body: fd.get('body'),
    //   collection: fd.get('collection'),
    // })

    props.onEditUpdateSubmit()

    event.currentTarget.reset()

    navigate(`/articles/${articleID.id}`)
  }

  // console.log(article.body)

  const getEditorBody = (params) => {
    setBody(params)
    console.log(params)
  }

  function changeCollection(e) {
    console.log(`Current Collection value: `, e.value)
    setCollection({ name: e.value, label: e.label })
    // console.log(`Changed Collection To:`, collection)
  }

  function changeTag(e) {
    setTag(e)
    // console.log(`Changed Collection To:`, collection)
  }

  const initialTags = article.tags?.map((t) => {
    return { value: t.name, label: t.name }
  })

  const updateTitle = (e) => {
    setTitle(e.currentTarget.value.trim())
    console.log(e.currentTarget.value.trim())
  }

  //////////////////////////////////////////

  return (
    <>
      {console.log(article)}
      <div>ArticleEdit</div>
      <form onSubmit={getDataAndSubmit}>
        <div key={article.id}>
          <input
            type="text"
            defaultValue={article.title}
            name="title"
            onChange={(e) => updateTitle(e)}
          />
          <TipTap data={getEditorBody} defaultBody={article.body} />
          {/*    <input
            type="text"
            defaultValue={article.collection}
            name="collection"
          /> */}
          <label htmlFor="collection">Collection</label>
          <CreatableSelect
            isClearable
            options={collectionOptions}
            onChange={(e) => changeCollection(e)}
            defaultValue={collection}
            name="collection"
          />
          {console.log(collectionOptions)}
          <div>
            {/* <form onChange={(e) => addTag(e)}> */}
            {/* Tags: <input type="text" name="tag" onChange={(e) => addTag(e)} /> */}
            Tags: {/* <input type="text" name="tags" /> */}
            {/* </form> */}
            <div className="tags-container">
              {/* {article.tags?.map((t, i) => {
                return (
                  <span key={i} className="tag">
                    <label htmlFor={t}>{t}</label>
                    <input type="checkbox" name={t} value={t} />
                  </span>
                )
              })} */}
              {/* {console.log('Article Tags: ', article.tags)}
              {console.log('All Tags: ', allTags)}
              {console.log(article.tags)} */}
              {/* {tags?.map((t, i) => {
                return (
                  <span key={i} className="tag">
                    <label htmlFor={t}>{t.name}</label>
                    {article.tags?.map((a, i) => {
                      let count = 0
                      if (a.id === t.id) {
                        count += 1
                        return (
                          <input
                            type="checkbox"
                            name={t}
                            value={t.name}
                            checked
                          />
                        )
                      }
                      // if (count === 1){
                      //   return (
                      //     <input
                      //       type="checkbox"
                      //       name={t}
                      //       value={t.name}
                      //     />
                      //   )
                      // }
                    })}
                  </span>
                )
              })} */}
              {/*   {console.log(`Logging tags: `, article.tags)} */}
              <CreatableSelect
                isMulti
                options={tagOptions}
                onChange={(e) => changeTag(e)}
                defaultValue={initialTags?.map((t) => t)}
              />
            </div>
            <div>
              <label htmlFor="published">Published: </label>
              <input
                type="checkbox"
                name="published"
                id="published"
                onChange={(e) => updatePublished(e)}
                defaultChecked={article.published}
              />
            </div>
          </div>
        </div>
        <div>
          <input type="submit" value="Update Article" />
        </div>
      </form>
    </>
  )
}

export default ArticleEdit
