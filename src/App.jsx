import axios from "axios"
import { useEffect, useRef, useState } from "react"


const App = () => {
  const [arr,setArr] = useState([])
  const titVal = useRef()
  const desVal = useRef()

//get todos
    const getData = async ()=>{
      try {
      const response = await fetch("http://localhost:3000/api/v1/todos")
      const data = await response.json()
      // console.log(data.todos);
      setArr(data.todos)
      } catch (error) {
        console.log(error); 
      }
    }
    useEffect(()=>{
      getData()
    },[])

//post todo  
    const postData = async (event)=>{
      event.preventDefault()
      try {
      const response  = await axios.post("http://localhost:3000/api/v1/todo",
      {
        title : titVal.current.value,
        description : desVal.current.value
      })
      setArr(response.todos)
      console.log(response.data);

      titVal.current.value = ""
      desVal.current.value = ""
      getData()
      } catch (error) {
        console.log(error);
        
      }
      
    }

//delete Todo
   const deleteTodo = async (_id)=>{
    console.log(_id);
    const response = await axios.delete(`http://localhost:3000/api/v1/todo/${_id}`);
    setArr(response.data.todos)
    getData()
    
   }
  
  return (
    <>
    <h1>Todo App</h1>
     <form onSubmit={postData}>
      <input type="text" ref={titVal} placeholder="enter title" />
      <input type="text" ref={desVal} placeholder="enter description" />
      <button type="submit">Add</button>
    </form> 
    {
      arr ? arr.map((item)=>{
        return <div key={item._id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <button onClick={()=>deleteTodo(item._id)}>Delete</button>
          <hr/>
        </div>
      }):<h1>item not found</h1>
    }
    </>
  )
}

export default App
