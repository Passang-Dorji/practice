"use client"
import React, { useState ,useEffect} from "react"
import Table from "@/app/components/table"
import Modal from "@/app/components/modal"


export default function ProductPages(){
const [products,setProducts] = useState([])
const [showModal,setShowModal] = useState(false)
const [name,setName] = useState()
const [id ,setId] = useState()
const [formData,setFormData] = useState({
    name:"",
    description:"",
    category_id:"",
    price:"",
    quantity:""
})
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};
async function submitCreate(e){
    e.preventDefault()
    try{
        const response = await fetch("/api/products",{
            method:"POST",
            body:JSON.stringify(formData)
        })
        if(!response.ok){
            throw new Error("fetch problem")
        }
        const {data} = await response.json()         
        setFormData({
            name:"",
            description:"",
            category_id:"",
            price:"",
            quantity:""
        })
        setShowModal(false)
    }catch(error){
        console.log(error)
    }
 }

 async function getProducts(){
     try{
         const response = await fetch('/api/products')
         if(!response.ok){
             throw new Error('network response was not okay')
            }
            const {data} = await response.json()
            setProducts(data)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getProducts()
    },[])

    async function searchProduct(){
        try{
            const response = await fetch(`http://localhost:3000/api/products/searchby?search=${name}`)
            if(!response.ok){
                throw new Error("network problem")
            }
            const {data} = await response.json()
            setProducts(data)
        }catch(error){
            console.log(error)
        }
    }
     
    return(
        <div className="flex w-screen h-screen bg-teal-600 p-4 sm:ml-64">
            <div className=" bg-slate-400 px-2 w-2/3">
                <input className="mt-12 h-10 w-1/2 pl-4 text-black"
                    type="text"
                    placeholder="seacrh"
                    onChange={(e)=>{
                        setName(e.target.value)
                        setId(e.target.value)
                    } }
                />
                <button className="ml-2 border-2 "
                    onClick={searchProduct}
                >search</button>
                <Table
                    headers={["Name","Description","Ctg Name","Ctg Description","Price"]}
                    data={products}
                    renderRow={(item,index)=>(
                        <React.Fragment key={item.id}>
                            <td className="text-center"> {item.name} </td>
                            <td className="text-center"> {item.description} </td>
                            <td className="text-center"> {item.category_name} </td>
                            <td className="text-center"> {item.cate_description} </td>
                            <td className="text-center"> {item.price} </td>
                        </React.Fragment>
                    )}
                />
                <button className="border-2 px-2 border-black mt-3"
                    onClick={()=>setShowModal(true)}
                >add</button>
            </div>
            {showModal?(
                <Modal onClose={()=>setShowModal(false)}>
                    <form onSubmit={submitCreate}
                        className="h-1/2 w-1/2  ml-3">
                        <div>
                            <input className="text-black mt-4"
                                placeholder="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input className="text-black mt-4"
                                placeholder="description"
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input className="text-black mt-4"
                                placeholder="category_id"
                                type="number"
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input className="text-black mt-4"
                                placeholder="price"
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input className="text-black mt-4"
                                placeholder="quantity"
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                            />
                        </div>
                        <button className="border-2 border-black px-2"
                            type="submit"
                        > create </button>
                        
                    </form>

                </Modal>
            ):null}
        </div>
    )
}