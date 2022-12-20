import React from 'react'
import { useState, useEffect } from 'react'

const SortArticles = (props, data) => {
  const [articles, setArticles] = useState([])

  // console.log(props.data)

  useEffect(() => {
    const fetchedArticles = async () => {
      const res = await props.data
      // console.log(res)
      setArticles(res)
    }
    fetchedArticles()
  }, [props])

  const handleChange = (e) => {
    // console.log(e.currentTarget.value)
    console.log(`Articles before sort: `, articles)
    updateSort(e.currentTarget.value, articles)
    // console.log(`Returned Array from sort:`)
    // console.log(updateSort(e.currentTarget.value, articles))
    console.log(
      `Articles after sort: `,
      updateSort(e.currentTarget.value, articles)
    )
  }

  const updateSort = (params, arr) => {
    // console.log(`Params: `, params)
    // console.log(`Articles: `, arr)
    if (params === 'a-z') {
      return arr.sort((a, b) => {
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
      // // console.log(`A-Z Arr Loop: `, arr)
      // return arr.sort((a, b) => {
      //   console.log(`A: `, a.title)
      //   console.log(`B: `, b.title)
      //   return a.title.toLowerCase() > b.title.toLowerCase()
      // })
    }
    if (params === 'z-a') {
      return arr.sort((a, b) => {
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
    if (params === 'first') {
    }
    if (params === 'last') {
    }
  }

  return (
    <div className="sort-container">
      {/*  {console.log(articles)} */}
      <label htmlFor='sort'>SortArticles</label>
      <select name="sort" id="sort" onChange={(e) => handleChange(e)}>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
        <option value="first">Created At - First</option>
        <option value="last">Created At - Last</option>
      </select>
    </div>
  )
}

export default SortArticles
