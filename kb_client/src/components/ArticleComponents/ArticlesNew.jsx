import { Article } from '../../requests'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ArticleForm from './ArticleForm'

// export const withRouter = (WrappedComponent) => (props) => {
//   const navigate = useNavigate()
//   //etc... other react-router-dom hooks

//   return <WrappedComponent {...props} navigate={navigate} />
// }

const ArticlesNew = (props) => {
  const navigate = useNavigate()
  const [newArticle, setNewArticle] = useState({})
  const [errors, setErrors] = useState([])

  function createNewArticle(params) {
    Article.create(params).then((article) => {
      console.log(params)
      if (article.errors) {
        console.log(`ArticleErrors: ${article.errors}`, article.errors)
        setErrors({ errors: article.errors })
      } else {
        console.log()
        navigate(`/articles`)
      }
    })
  }

  

  return (
    <>
      <div>ArticlesNew</div>
      <ArticleForm submitForm={(params) => createNewArticle(params)} />
    </>
  )
}

export default ArticlesNew

// class NewQuestionPage extends Component {
//   // constructor(props) {
//   //   super(props)
//   //   this.state = { errors: [] }
//   // }

//   createNewQuestion(params) {
//     console.log(`Params: ${params.title} ${params.body}`)
//     Question.create(params).then((question) => {
//       console.log(`question: ${question}`)
//       if (question.errors) {
//         console.log(`QuestionErrors: ${question.errors}`, question.errors)
//         this.setState({ errors: question.errors })
//       } else {
//         console.log(this.props)
//         this.props.navigate(`/questions/${question.id}`)
//       }
//     })
//   }

//   render() {
//     return (
//       <div>
//         <NewQuestionForm
//           errors={this.state.errors}
//           submitForm={(params) => this.createNewQuestion(params)}
//         />
//       </div>
//     )
//   }
// }

// export default withRouter(NewQuestionPage)
