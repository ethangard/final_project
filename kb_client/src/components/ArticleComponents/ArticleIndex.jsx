import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Article } from '../../requests'
import SearchBar from '../SearchComponents/SearchBar'
import SortArticles from './SortArticles'
import TextTruncate from 'react-text-truncate'
import ArticleIndexDetails from './ArticleIndexDetails'

const ArticleIndex = () => {
  const [articles, setArticles] = useState([])
  const [allArticles, setAllArticles] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const data = await Article.index()
      setArticles(data)
      setAllArticles(data)
    }

    fetchData()
  }, [])

  const filteredArticles =
    query.length <= 2
      ? articles
      : articles.filter((a) => {
          return a.title.toLowerCase().includes(query.toLowerCase())
        })
  // =
  // (query, arr) => {
  //   if (query.length <= 2) {
  //   } else {
  //     const matches = arr.filter((a) =>
  //       a.title.toLowerCase().includes(query.toLowerCase())
  //     )
  //     return matches
  // //   }
  // }

  // const reRenderSearch = (params) => {
  //   // console.log(`Triggering re-render search...`)
  //   setArticles(params)
  //   // console.log(articles)
  // }

  // console.log(articles)
  const ArticleIndexProps = { articles, setQuery }
  return (
    <div className="ArticleIndex-container">
      {/*  {console.log(articles)} */}
      <div className="filter-container">
        <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />
        <SortArticles data={articles} />
        <ArticleIndexDetails articles={filteredArticles} />
      </div>
    </div>
  )
}

export default ArticleIndex
