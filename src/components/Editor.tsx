'use client';
import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


interface EditorProps {
  initialContent: string;
  editorOnSave: (content: string) => void;
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
  const { initialContent } = props;
  const [content, setContent] = useState<string>(initialContent);


  const changeContent = (value: string) => {
    setContent(value);
  };


  const handleEditorOnSave = () => {
    props.editorOnSave(content);
  };


  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);


  return (
    <>
      <ReactQuill
        value={content}
        placeholder='Type here...'
        onChange={changeContent}
        modules={quillModules}
      />
      <button
        onClick={handleEditorOnSave}
        type='button'
      >
        Save
      </button>
    </>
  );
};


export default Editor;