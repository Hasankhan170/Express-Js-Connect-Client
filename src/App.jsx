import { useEffect, useState } from "react"


const App = () => {
  const [arr,setArr] = useState([])

  const fetchData = async ()=>{
    try {
    const response = await fetch("http://localhost:3000/api/v1/todos")
    const data = await response.json()
    console.log(data.todos);
    setArr(data.todos)
    
    } catch (error) {
      console.log(error);
      
    }
  
    

  }
  useEffect(()=>{
    fetchData()
  },[])
  
  return (
    <>
    <h1>Todo App</h1>
    {
      arr ? arr.map((item)=>{
        return <div key={item._id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <hr/>
        </div>
      }):<h1>item not found</h1>
    }
    </>
  )
}

export default App
