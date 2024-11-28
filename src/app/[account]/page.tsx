export default function AccountPage() {


  const toolbarButtons = () => {
    const isYourBlog = true;
    if (isYourBlog) {
      return (
        <></>
      )
    } else {
      return (
        <></>
      )
    }
  }


  return (
    <div>
      <ul className='flex flex-row gap-4'>
        {toolbarButtons()}
      </ul>
    </div>
  );
}