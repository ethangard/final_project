import React from 'react'
import { Search } from '../../requests'

const SearchBar = () => {
  const querySearch = (event) => {
    event.preventDefault()
    const fd = new FormData(event.currentTarget)
    const formSearch = fd.get('search')

    console.log(formSearch)

    return Search.query(formSearch).then((res) => {
      console.log(res)
    })

    // Article.create(params).then((article) => {
    //   if (article.errors) {
    //     console.log(`ArticleErrors: ${article.errors}`, article.errors)
    //     setErrors({ errors: article.errors })
    //   } else {
    //     console.log()
    //     navigate(`/articles`)
    //   }
    // })
  }

  return (
    <>
      <div>SearchBar</div>
      <form onSubmit={querySearch}>
        <input type="search" name="search" />
      </form>
    </>
  )
}

export default SearchBar
