import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Todo =()=>{
    const [todoData,setTodoData] = useState([])
    const [loading,setLoading] = useState(true)
    const [edit,setEdit] = useState(false)
    const [value,setValue] = useState("")
    const [id,setId] = useState(null)
    const [filterData,setFilterData] = useState([])

const getData = async()=>{
 try {
    const res = await fetch("http://localhost:5000/user/find")
    const result = await res.json()
    if(res.status === 200){
        setTodoData(result)
        setLoading(false)
    }else{
        throw new error("Something went wrong or data not found")
    }
    
 } catch (error) {
    console.log(error.message)
    setLoading(false)
 }
} 

// for delete function
const deleteFetch = async(id)=>{
    try {
         const res =  await fetch(`http://localhost:5000/user/find/${id}`,{
            method : "DELETE",
            headers : {"Content-Type":"application/json"}
        })
        
  if (!window.confirm("Are you sure you want to delete this user?")) return;
        if(res.ok){
            
            getData()
        }else if (res.status === 404) {
      alert("User not found!");
    } else {
      alert("Failed to delete user!");
    }

     
         
    } catch (error) {
        console.log(error.message)
    }
     
}

// submit 
const  handleSubmit = async()=>{
if(!edit){
    try {
        
   const res = await fetch(`http://localhost:5000/user`,{
    method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({name:value}),

   })
   if(res.ok){
     setValue("")
     alert("add data successful")
    getData()
   }
    } catch (error) {
      console.log(error)   
    }
 

}else{
try {
    
    const res = await fetch(`http://localhost:5000/user/find/${id}`,{
        method : "PUT",
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify({name:value})
    })

    if(res.ok) {
        alert("Edit successful")
        setValue("")
        getData()
    }
    
} catch (error) {
    console.error(error)
}


}
}
const editedFetch = (data,id)=>{
    setEdit(true)
    setValue(data)
    setId(id)
}



       useEffect(()=>{
           
        getData()
          const filtrated = todoData.filter((data) => {
    return data.name.toLowerCase().includes(value.toLowerCase());
  });
  setFilterData(filtrated);
       },[value,todoData])
  if (loading) return <div>Loading...</div>






    return(
        <div className='min-h-screen bg-[#f1ecec] flex justify-center items-center'>
            <div className='max-w-md w-full bg-[#95adb6] p-6 rounded-xl shadow-md'>
                <h2 className='text-center text-2xl'>Todo</h2>
                <div className='flex  items-center justify-center mt-3 gap-2'>
                    <input type="text"
                    value={value}
                    onChange={(e)=>setValue(e.target.value)}
                    className='border border-gray-300 bg-amber-50 p-1 focus:outline-none focus:ring-red-700 rounded-sm'
                    />
                    <button
                    onClick={handleSubmit}
                     className='bg-blue-500 hover:bg-blue-600 p-1 rounded-sm trangation duration-200'>{ edit ? "Update": "Submit" }</button>
                   </div>

                     <div className='flex flex-col  justify-center mt-2 '>
                        <ul>
     {
                                filterData.map((todoData,index)=>{
                                    return <li key={index} className='w-full mt-2 p-2 pl-3 rounded-sm bg-amber-100 flex justify-between'>
                                          <p>{todoData.name}</p>
                                          <div className='flex gap-3 items-center'>
                                            <button onClick={()=>deleteFetch(todoData._id)}><MdDeleteForever/></button>
                                            <button onClick={()=>editedFetch(todoData.name,todoData._id)}><FaEdit /></button>
                                          </div>
                                    </li>
                                })
                             }                        
                       </ul>          
                     </div>

            </div>


        </div>
    )
}

export default Todo
