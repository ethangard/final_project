import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Article } from '../../requests'
import { useNavigate } from 'react-router-dom'
import TipTap from '../RTE/TipTap'
import ArticleEdit from './ArticleEdit'

const ArticleShow = () => {
  const articleID = useParams()
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

  function editArticle(id, params) {
    Article.update(id, params).then((article) => {
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

  if (!editMode) {
    return (
      // <ArticleEdit submitForm={(id, params) => editArticle(id, params)} />

      <>
        <div>ArticleShow</div>
        <div key={article.id}>
          {/* <Link to="./edit"> */}
          <button onClick={changeEditMode}>Edit</button>
          {/* </Link> */}

          <h3>Title: {article.title}</h3>
          <p>Body: {article.body}</p>
          <p>Collection: {article.collection}</p>
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
