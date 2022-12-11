import { useState, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Article } from '../../requests'
import { User } from '../../requests'
import TipTap from '../RTE/TipTap'

const ArticleEdit = (props) => {
  const [updateContent, setUpdateContent] = useState({})

  const navigate = useNavigate()

  const { id, params } = props

  console.log(`Logging ArticleEdit id: `, id)
  console.log(`Logging ArticleEdit params: `, params)

  /* Get User Info */

  // console.log(`Article Edit Props: `, props)

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

  const articleID = useParams()
  const [article, setArticle] = useState({})
  const [tags, setTags] = useState([])
  // const [isFetched, setIsFetched] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const data = await Article.show(articleID.id)
      setArticle(data)
      setTags(data.tags)
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
    // console.log(formTags)
    const filterTags = formTags.split(',')
    const trimTags = filterTags.map((s) => s.trim())
    // console.log(trimTags)

    /* Test Data */
    // console.log(dg.get())
    // console.log(`Logging props in Edit form: `, props)
    props.submitForm(articleID.id, {
      title: fd.get('title'),
      body: fd.get('body'),
      collection: fd.get('collection'),
      tags: trimTags.toString(),
      // created_at: new Date(),
      user_id: user.id,
    })

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

  return (
    <>
      <div>ArticleEdit</div>
      <form onSubmit={getDataAndSubmit}>
        <div key={article.id}>
          <input type="text" defaultValue={article.title} name="title" />
          <TipTap props={article.body} />
          <input
            type="text"
            defaultValue={article.collection}
            name="collection"
          />
          <div>
            {/* <form onChange={(e) => addTag(e)}> */}
            {/* Tags: <input type="text" name="tag" onChange={(e) => addTag(e)} /> */}
            Tags: <input type="text" name="tags" />
            {/* </form> */}
            <div className="tags-container">
              {article.tags?.map((t, i) => {
                /*    return(<p>{t}</p>) */
                return (
                  <div key={i} className="tag">
                    <label htmlFor={t}>{t}</label>
                    <input type="checkbox" name={t} value={t} />
                  </div>
                )
              })}
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
