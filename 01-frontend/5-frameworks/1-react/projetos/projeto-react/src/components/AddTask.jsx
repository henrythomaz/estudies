import { useState } from "react";

function AddTask({ onAddTaskSubmit }) {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
    <input className="bg-white border-slate-300 outline-slate-400 px-4 py-2 rounded-md" type="text" placeholder="Digite o titulo da tarefa" value={title} onChange={(event) => setTitle(event.target.value)}></input>
    <input className="bg-white border-slate-300 outline-slate-400 px-4 py-2 rounded-md" type="text" placeholder="Digite a descrição da tarefa" value={description} onChange={(event) => setDescription(event.target.value)}></input>
    <button onClick={() => { if (!title.trim() || !description.trim()) return alert("Preencha o titulo e a descrição da tarefa."); onAddTaskSubmit(title, description); setTitle(""); setDescription("");}} className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium">Adicionar</button>
    </div>
  );
}

export default AddTask;
