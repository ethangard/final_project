import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Article } from '../../requests'
import { useNavigate } from 'react-router-dom'
import TipTap from '../RTE/TipTap'
import ArticleEdit from './ArticleEdit'
import { Navigate } from 'react-router-dom'

const ArticleShow = () => {
  const articleID = useParams()
  const [createdAt, setCreatedAt] = useState()
  const [article, setArticle] = useState({})
  const [errors, setErrors] = useState([])
  const [editMode, setEditMode] = useState(false)
  const navigate = useNavigate()
  // const [isFetched, setIsFetched] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const data = await Article.show(articleID.id)
      setArticle(data)
    }
    fetchData()
    // setIsFetched(true)
  }, [])

  useEffect(() => {
    const setCreatedAtInitial = async () => {
      const data = await new Date(article.created_at).toLocaleString() 
      setCreatedAt(await data)
      console.log('Date:', data) 
    }
    setCreatedAtInitial()
  }, [article])

  function editArticle(id, params) {
    Article.update(id, params).then((article) => {
      // console.log(`Edited Article Params: `, params)
      // console.log(`Edited Article Details: `, article)
      if (article.errors) {
        console.log(`ArticleErrors: ${article.errors}`, article.errors)
        setErrors({ errors: article.errors })
      } else {
        console.log()
        navigate(`/articles/${articleID.id}`)
      }
    })
  }

  function changeEditMode() {
    editMode === true ? setEditMode(false) : setEditMode(true)
  }

  const updateEditModeRemote = () => {
    setEditMode(false)
    reRenderPage()
  }

  const reRenderPage = () => {
    console.log({ ...article })
    setArticle({ ...article })
  }

  const test = [1, 2, 3]

  const arrTags = article.tags

  // if (!isFetched) return null

  const findFavourite = () => {}

  // function getDate(params){
  //   return (new Date(article.created_at))
  // }

  // console.log(`In function date`, date)
  // console.log(date)

  if (!editMode) {
    return (
      // <ArticleEdit submitForm={(id, params) => editArticle(id, params)} />

      <>
        {/*  {console.log(article)} */}
        <div>ArticleShow</div>
        <div key={article.id}>
          {/* <Link to="./edit"> */}
          <button onClick={changeEditMode}>Edit</button>
          {/* <button onClick=()>{'Favourite'}</button> */}
          {/* </Link> */}

          <h3>Title: {article.title}</h3>
          <div>
            Body: <div dangerouslySetInnerHTML={{ __html: article.body }} />
          </div>
          <p>Collection: {article.collection}</p>
          {/*           {console.log(date)} */}
          {/*        {console.log(new Date(article.created_at))} */}
          <div>
            {/* Tags: {console.log(article.tags)} */}
            {article.tags?.map((t, i) => {
              return i === article.tags.length - 1 ? (
                <span key={i}>{t.name}</span>
              ) : (
                <span key={i}>{t.name}, </span>
              )
            })}
          </div>
          <div>Created at: {createdAt}</div> 
        </div>
      </>
    )
  } else {
    return (
      <ArticleEdit
        submitForm={(id, params, changeEditMode) =>
          editArticle(id, params, changeEditMode)
        }
        onEditUpdateSubmit={updateEditModeRemote}
      />
    )
  }
}

export default ArticleShow
