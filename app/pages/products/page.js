"use client"
import React, { useState ,useEffect} from "react"
import Table from "@/app/components/table"

export default function ProductPages(){
const [products,setProducts] = useState([])
const [originalproducts,setOriginalProducts] = useState([])
const [name,setName] = useState()

    useEffect(()=>{
        async function getProducts(){
            try{
                const response = await fetch('/api/products')
                if(!response.ok){
                    throw new Error('network response was not okay')
                }
                const {data} = await response.json()
                setProducts(data)
                setOriginalProducts(data)
            }catch(error){
                console.log(error)
            }
        }
        getProducts()
    },[])
    
    function filterDataByName(name){
        if(name===""){
            setProducts(originalproducts)
        }else{
            const filtereddata = originalproducts.filter(product => product.name.toLowerCase().startsWith(name.toLowerCase()))
            setProducts(filtereddata)
        }
    }
    return(
        <div className="flex w-screen h-screen bg-teal-600">
            <div className=" bg-slate-400 px-2 w-1/2">
                <input className="mt-12 h-10 w-1/2 pl-4 text-black"
                    type="text"
                    placeholder="seacrh"
                    onChange={(e)=>{
                        setName(e.target.value)
                        filterDataByName(e.target.value)
                    } }
                />
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
            </div>
        </div>
    )
}