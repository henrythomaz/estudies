import Editor from "./Editor.tsx";
import Aside from "./Aside.tsx";

const Main = () => {
  return (
    <main className="flex h-screen w-full">
      <Aside />
      <div className="flex-1">
      <Editor />
      </div>
    </main>
  )
}

export default Main;
