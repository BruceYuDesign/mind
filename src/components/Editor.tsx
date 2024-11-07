// 'use client';
import { useState } from 'react';
import ReactQuill from 'react-quill';
// import { useAuth } from '@/context/AuthContext';
import 'react-quill/dist/quill.snow.css';


interface EditorProps {
  initialContent?: string;
};


const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    [{ align: [] }],
    ['code-block'],
    ['clean'],
  ],
};


function Editor(props: EditorProps) {
  const [content, setContent] = useState(props.initialContent);
  // const { account, login } = useAuth();

  const editorOnChange = (value: string) => {
    setContent(value);
  };

  const editorOnSave = () => {
    console.log(content);
    // login(content as string);
  };

  return (
    <>
      {/* <h1>
        {account}
      </h1> */}
      <ReactQuill
        value={content}
        placeholder='Type here...'
        onChange={editorOnChange}
        modules={quillModules}
      />
      <button
        onClick={editorOnSave}
        type='button'
      >
        Save
      </button>
    </>
  );
};


export default Editor;