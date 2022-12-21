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
  const [sort, setSort] = useState('')

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

  const sortedArticles = () => {
    // console.log(`Params: `, params)
    console.log(`Current Sort: `, sort)
    if (sort === 'a-z') {
      return articles.sort((a, b) => {
        const nameA = a.title.toLowerCase()
        const nameB = b.title.toLowerCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
      })
    }
    if (sort === 'z-a') {
      return articles.sort((a, b) => {
        const nameA = a.title.toLowerCase()
        const nameB = b.title.toLowerCase()
        if (nameA < nameB) {
          return 1
        }
        if (nameA > nameB) {
          return -1
        }
        return 0
      })
    }
    if (sort === 'first') {
      return articles.sort((a, b) => {
        const createdA = a.created_at
        const createdB = b.created_at
        if (createdA < createdB) {
          return 1
        }
        if (createdA > createdB) {
          return -1
        }
        return 0
      })
    }
    if (sort === 'last') {
      return articles.sort((a, b) => {
        const createdA = a.created_at
        const createdB = b.created_at
        if (createdA < createdB) {
          return -1
        }
        if (createdA > createdB) {
          return 1
        }
        return 0
      })
    }
  }

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
  // const ArticleIndexProps = { articles, setQuery }

  return (
    <div className="ArticleIndex-container">
      {/*  {console.log(articles)} */}
      <div className="filter-container">
        <div className="filter-container-options">
          <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />
          <SortArticles
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          />
        </div>
        {/*  <SortArticles data={articles} onChange={(e)=> setSort(e.target.value)} /> */}
        <ArticleIndexDetails
          articles={filteredArticles}
          sorts={sortedArticles(sort)}
          value={query}
        />
        {/*   <ArticleIndexDetails articles={filteredArticles} sorts={sortedArticles} /> */}
      </div>
    </div>
  )
}

export default ArticleIndex
