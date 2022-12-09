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
    const req =  await fetch(`${baseURL}/articles/${id}`)
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
  


