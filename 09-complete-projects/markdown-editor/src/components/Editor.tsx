import HeaderEditor from "./HeaderEditor.tsx";
import TextEditor from "./TextEditor.tsx"

const Editor = () => {
  return (
    <section className="flex flex-col">
      <HeaderEditor />
      <hr className="border-t border-gray-300 my-4" />
      <TextEditor />
    </section>
  )
}

export default Editor;
