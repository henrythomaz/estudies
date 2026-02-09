const TextEditor = () => {
  return (
    <form>
        <label htmlFor="text">Escreva aqui: </label>
        <textarea id="text" rows={10} cols={10} placeholder="Digite algo..." className="h-screen w-full resize-y bg-red-200"></textarea>
    </form>
  )
}

export default TextEditor;
