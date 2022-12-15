// // src/Tiptap.jsx
// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'

// const Tiptap = () => {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: '<p>Hello World!</p>',
//   })

//   return <EditorContent editor={editor} />
// }

// export default Tiptap

import './TipTap.scss'

import { EditorContent, useEditor } from '@tiptap/react'
import { useEffect, useState } from 'react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { Article } from '../../requests'
import { useParams } from 'react-router-dom'

const TipTap = (props) => {
  // const [initialBody, setInitialBody] = useState('')

  const [initialContent, setInitialContent] = useState('')

  // useEffect(() => {
  //   setInitialBody(props.defaultBody)
  // }, [])



  console.log(props.defaultBody)
  console.log(`All props: `, props)

  //  console.log(`Logging props: `)
  //  console.log(props)

  // const articleId = useParams()

  // const [test, setTest] = useState('')

  useEffect(() => {
    // const fetchedData = async () => {
    // const data = await Article.show(articleId.id)
    // setInitialContent(data.body)

    const fetchData = async () => {
      const data = await props
      console.log(`Awaiting props: `)
      console.log(await props)
      setInitialContent(await data.defaultBody)

      // editor.commands.setContent(data.props)
      // console.log(data.props)
    }
    // console.log(`UseEffect Log from TipTap:`)
    // console.log(props)

    // setInitialContent(props)

    // }

    //  fetchedData()

    fetchData()
  }, [])

    const editor = useEditor({
      extensions: [StarterKit],
      // content: initialContent ? initialContent : '',
      content: props.defaultBody,
      onUpdate: ({ editor }) => {
        const html = editor.getHTML()
        // console.log(html)
        props.data(html)
      },
    })

  const MenuBar = ({ editor }) => {
    const fontList = [
      { label: 'Sans-serif', value: 'sans-serif' },
      { label: 'Sans-serif', value: 'sans-serif' },
    ]

    const [font, setFont] = useState('')

    /* Set Default Content */

    // console.log(props)
    // console.log(editor)

    if (!editor) {
      return null
    }

    return (
      <>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <span className="strikethrough">A</span>
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear Formatting
        </button>
        {/* <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        paragraph
      </button> */}
        <select
          name="fontFamily"
          placeholder="Select font..."
          value={
            editor.isActive('textStyle', { fontFamily: font })
              ? `{ label: 'Sans-serif', value: 'sans-serif' }`
              : `{ label: 'Sans-serif', value: 'sans-serif' }`
          }
          options={fontList}
          onChange={({ value: fontSel }) => {
            setFont(fontSel)
            editor.chain().focus().setFontFamily(fontSel).run()
          }}
        />
        {/* <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        h6
      </button> */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          {/* Bullet List */}•
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          1. 2. 3.
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          blockquote
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          horizontal rule
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          redo
        </button>
      </>
    )
    // console.log(props)
  }

  // export default (initialContent, props) => {
  //   const editor = useEditor({
  //     extensions: [StarterKit],
  //    // content: initialContent ? initialContent : '',
  //    content: props
  //   })

  //   return (
  //     <div className="editor-container">
  //       <MenuBar editor={editor} />
  //       <EditorContent editor={editor} />
  //     </div>
  //   )
  // }
  // setInitialContent(initialContent)
  // setTimeout(() => {
  //   setInitialContent({initialContent})
  //   // console.log(editor.getHTML())
  // }, 2000);

  return (
    <div className="editor-container">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      {/*   {console.log(<EditorContent/>)} */}
    </div>
  )
}

export default TipTap
