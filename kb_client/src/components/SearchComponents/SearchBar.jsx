import React from 'react'
import { useState, useEffect } from 'react'
import { Search } from '../../requests'
import { Article } from '../../requests'

const SearchBar = ({ value, onChange }) => {
  // const [usedOnce, setUsedOnce] = useState(false)
  // const [articles, setArticles] = useState()
  // const [articlesList, setArticlesList] = useState(data)
  // const [query, setQuery] = useState('')

  // useEffect(() => {
  //   setArticles(data)
  // }, [data])

  // useEffect(() => {
  //   if (!usedOnce) {
  //     setArticlesList(articles)
  //   }
  //   setUsedOnce(true)
  // }, [])

  /*   console.log(articles) */

  const filterArticles = (query, arr) => {
    //console.log(`This is happening`)
    if (query.length <= 2) {
      // console.log(`Less than or equal to 2`)
      // console.log(`ArticlesList: `, articlesList)
      // onUpdate(articlesList)
      //return articlesList
    } else {
      const matches = arr.filter((a) =>
        a.title.toLowerCase().includes(query.toLowerCase())
      )
      //console.log(matches)
      // console.log(`From the SearchBar component: `, onUpdate(matches))
      return matches
    }
  }

  const querySearch = (e) => {
    const searchQuery = e.currentTarget.value.toLowerCase()
    // event.preventDefault()
    // const fd = new FormData(event.currentTarget)
    // const formSearch = fd.get('search')
    // console.log(formSearch)

    // return Search.query(formSearch).then((res) => {
    //   console.log(res)
    // })

    // Article.create(params).then((article) => {
    //   if (article.errors) {
    //     console.log(`ArticleErrors: ${article.errors}`, article.errors)
    //     setErrors({ errors: article.errors })
    //   } else {
    //     console.log()
    //     navigate(`/articles`)
    //   }
    // })

    // filterArticles(searchQuery, articles)
  }

  return (
    <div className="search-container">
      <label htmlFor="search">SearchBar</label>
      <form onSubmit={querySearch}>
        <input type="search" name="search" value={value} onChange={onChange} />
      </form>
    </div>
  )
}

export default SearchBar
