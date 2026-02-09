const Header = () => {
  return (
    <header className="flex justify-center gap-20 bg-gray-200 h-10 items-center">
      <h1>Markdown Editor</h1>
      <button className="bg-blue-400 text-white">New Note</button>
      <hr className="border-t border-gray-400 my-4" />
    </header>
  )
}

export default Header;
