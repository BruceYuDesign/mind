'use client';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


interface EditorProps {
  content: string;
  onChange: (content: string) => void;
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


export default function Editor(props: EditorProps) {
  return (
    <>
      <ReactQuill
        value={props.content}
        placeholder='Type here...'
        onChange={props.onChange}
        modules={quillModules}
      />
    </>
  );
};