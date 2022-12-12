const baseURL = `http://127.0.0.1:3000/api/v1`

export const Article = {
  async index() {
    const req = await fetch(`${baseURL}/articles`)
    return await req.json()
  },
  // async create(params){
  //   const req = await fetch(`${baseURL}/articles`, {
  //     method: 'POST',
  //     credentials: 'include',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify(params)
  //   })
  //   const data = await req.json()
  // }
  create(params) {
    return fetch(`${baseURL}/articles`, {
      method: 'POST',
      credentials: 'include', // need this for cookies
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(params),
    }).then((res) => res.json())
  },
  // show(id) {
  //   return fetch(`${baseURL}/articles/${id}`).then((res) => res.json())
  // },
  async show(id) {
    const req = await fetch(`${baseURL}/articles/${id}`)
    return await req.json()
  },
  update(id, params) {
    return fetch(`${baseURL}/articles/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(params),
    }).then((res) => res.json())
  },
  destroy(id) {
    return fetch(`${baseURL}/articles/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
  },
}

export const Search = {
  async query(params) {
      const req = await fetch(
        `${baseURL}/searches`,
        new URLSearchParams({
          query: params,
        })
      )
    // const req = await fetch(`${baseURL}/searches`, {
    //   method: 'POST',
    //   credentials: 'include', // need this for cookies
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify(params),
    // })

    // const req = await fetch(`${baseURL}/searches`, {
    //   query: params,
    // })

    // onst req = await fetch(`${baseURL}/searches/${params}`)
    // console.log(`React Request`)
    // console.log(req)
    return await req.json()
  },
}

export const Session = {
  create(params) {
    return fetch(`${baseURL}/session`, {
      method: 'POST',
      credentials: 'include', // need for cookies to be sent cross origin
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(params),
    }).then((res) => res.json())
  },
  destroy() {
    return fetch(`${baseURL}/session`, {
      method: 'DELETE',
      credentials: 'include', // need for cookies to be sent cross origin
    }).then((res) => res.json())
  },
}

export const User = {
  current() {
    return fetch(`${baseURL}/users/current`, {
      credentials: 'include', // need for cookies to be allowed to be sent cross-origin
    }).then((res) => res.json())
  },
  create(params) {
    return fetch(`${baseURL}/users`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: params }),
    }).then((res) => res.json())
  },
}
