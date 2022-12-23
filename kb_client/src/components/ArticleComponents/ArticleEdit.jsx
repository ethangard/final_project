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

  const togglePublished = (e) => {
    setPublished(e.target.checked)
    console.log(e.target.checked)
    // console.log(published)
  }

  useEffect(() => {
    getCurrentUser()
    const fetchAllTags = async () => {
      const data = await Tag.index()
      setTags(data)
      console.log(`All Tags`, data)
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
      // setBody(data.body)
      // setTags(data.tags)
      setTitle(data.title)
      setCollection({ value: data.collection, label: data.collection })
      console.log(`Initial Tags: `, await data.tags)
      setTag(
        await data.tags.map((t) => {
          return { value: t.name, label: t.name }
        })
      )

      /*       { value: 'test', label: 'test' } */
    }
    fetchData()
  }, [])

  // useEffect(() => {
  //   setBody(article.body)
  // }, [])

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
    // console.log(`Sent collection: `, collection)

    const formTags = fd.get('tags')
    // const filterTags = formTags.split(',')
    // const trimTags = filterTags.map((s) => s.trim())

    /* Test Data */
    // console.log(dg.get())
    // console.log(`Logging props in Edit form: `, props)

    // const trimmedCollectionName = collection.name.trim()

    const sentTags = tag.map((t, i) => {
      return t.value
    })

    console.log(`SentTags:`, sentTags)

    props.submitForm(articleID.id, {
      title: title,
      body: body,
      collection: collection.name,
      tags: sentTags,
      user_id: user.id,
      published: published,
    })

    console.log(`Body Sent:`, body)

    // console.log(`The body sent from React`, body)

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
    // console.log(`Current Collection value: `, e.value)
    setCollection({ name: e.value, label: e.value })
    console.log(`Changed Collection To:`, e.value)
  }

  function changeTag(e) {
    setTag(e)
    // console.log(`Changed Collection To:`, collection)
  }

  // const initialTags = tags?.map((t) => {
  //   return { value: t.name, label: t.name }
  // })

  const updateTitle = (e) => {
    setTitle(e.currentTarget.value.trim())
    console.log(e.currentTarget.value.trim())
  }

  /* Set Default Tags */

  // useEffect(() => {
  //   console.log(`Initial Tags: `, article.tags)
  //   setTag(article.tags)
  // }, [])

  /* Set Initial Editor Body */

  useEffect(() => {
    setBody(article.body)
  }, [])

  //////////////////////////////////////////

  return (
    <form
      onSubmit={getDataAndSubmit}
      className="article-container"
      key={article.id}
    >
      {/* <div className="article-container" key={article.id}> */}
      <div className="form-input">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          defaultValue={article.title}
          name="title"
          onChange={(e) => updateTitle(e)}
        />
      </div>
      <div className="form-input">
        <label htmlFor="body">Body</label>
        <TipTap data={getEditorBody} defaultBody={article.body} name="body" />
      </div>
      {/*    <input
            type="text"
            defaultValue={article.collection}
            name="collection"
          /> */}
      <div className="form-input">
        <label htmlFor="collection">Collection</label>
        <CreatableSelect
          isClearable
          options={collectionOptions}
          onChange={(e) => changeCollection(e)}
          defaultValue={collection}
          name="collection"
          className="select-list"
        />
      </div>
      {/*         {console.log(collectionOptions)} */}
      <div className="form-input">
        {/* <form onChange={(e) => addTag(e)}> */}
        {/* Tags: <input type="text" name="tag" onChange={(e) => addTag(e)} /> */}
        {/* <input type="text" name="tags" /> */}
        {/* </form> */}
        <div className="form-input">
          <label htmlFor="tags">Tags</label>
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
          {/*    {console.log(tag)} */}
          <CreatableSelect
            isMulti
            options={tagOptions}
            onChange={(e) => changeTag(e)}
            // defaultValue={initialTags?.map((t) => t)}
            defaultValue={tag?.map((t) => t)}
            name="tags"
            className="select-list"
            // return { value: t.name, label: t.name }
          />
        </div>
      </div>
      <div className="form-input">
        <label htmlFor="published">Published: </label>
        <input
          type="checkbox"
          name="published"
          id="published"
          onChange={(e) => togglePublished(e)}
          defaultChecked={article.published}
        />
      </div>
      <div>
        <input type="submit" value="Update Article" />
      </div>
    </form>
    /*     </div> */
  )
}

export default ArticleEdit
