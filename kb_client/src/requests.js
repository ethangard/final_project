const baseURL = `http://127.0.0.1:3000/api/v1`

export const Article = {
  async index() {
    const req = await `${baseURL}/articles`
    return await req.json()
  },
}
