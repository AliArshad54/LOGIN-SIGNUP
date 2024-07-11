import React, { useState,useReducer } from 'react';
import NavigationBar from '../User/dashboard/NavigationBar';
import '../Post/Style.css'
const initialState=[
  {
id:1,
Text:"Nature is beautiful"
  },{
    id:2,
    Text:"Trees are our oxygen"
  }
]
const reducer=(state,action)=>{
  switch(action.type){
    case 'Add':{
    return [
      ...state,
      {
      id:action.payload.id,
      Text:action.payload.text
    }
  ]
}
case 'edit': {
  return state.map(todo =>
  {
    if(todo.id===action.payload.id){
      return {
        ...todo,
        Text:action.payload.text
      }
    }
    else{
      return todo;
    }
  }
  )
}   
    case 'Delete':{
  return state.filter(todo=>todo.id!==action.payload.id)
  }
  }
}
const Post=()=>{
  const [state,dispatch]=useReducer(reducer,initialState);
  const [text,setText]=useState('');
  const [newText,setNewText]=useState('');
  const [isEditable,setIsEditable]=useState(false);
  const [editId,setEditId]=useState(null);
  const startEditTodo = (id, currentText) => {
    setIsEditable(true);
    setEditId(id);
    setNewText(currentText);
  };
function AddTodo(){
 return dispatch({
  type:"Add",
  payload:{
    id:Date.now(),
    text:text,
  }
})
}
const editTodo=(id,text)=>{
dispatch({
  type:'edit',
  payload:{
    id,
    text
    }
})
setNewText('');
setEditId(null);
setIsEditable(false);
}
function deleteTodo(id){
  return dispatch({
    type:'Delete',
    payload:{
    id,  
    }
  })
}
const handleTodo=(e)=>{
e.preventDefault();
}
  return (
    <>
    <NavigationBar/>
      <div className="postContainer">
        <div className="topContainer">
          <h2>Create a New Post</h2>
      <form onSubmit={handleTodo} >
        <input type="text"  onChange={(e)=>setText(e.target.value)}/>
            <button type="submit" onClick={AddTodo} >Save Post</button>
          </form>
        </div>
<div className='postsContaienr'>
  {
    
  state.map((todo)=>(
    <>
    <div className='elements' key={todo.id}>
     {
      isEditable&&editId===todo.id ? (
        <>
        <input type="text" value={newText} onChange={(e)=>setNewText(e.target.value)}/>
        <button  onClick={()=>editTodo(todo.id,newText)}>{ isEditable ? 'Save':''}</button>
        </>
      ):(
        <>
        {todo.Text}
        <button onClick={()=>startEditTodo(todo.id,todo.name)}>Edit</button>
       </>
      )
     }
      <button onClick={()=>deleteTodo(todo.id)}>Delete</button>
      </div>
    </>
    
  ))
  }
</div>
      </div>
    </>
  );  
};

export default Post;
