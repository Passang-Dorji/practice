"use client"
import React,{ useState,useEffect } from "react"
import Table from "@/app/components/table"
import Modal from "@/app/components/modal"

export default function InventoryPage(){
    const [inventory,setInventory] = useState([])
    const [quantity,setQuantity] = useState("")
    const [description,setdescription] = useState("")
    const [id,setId] = useState(null)

    async function getInventory(){
        try{
            const response = await fetch('/api/inventory')
            if(!response.ok){
                throw new Error('network problem')
            }
            const {data} = await response.json()
            setInventory(data)
        }catch(error){
            console.error('fetching not okay',error)
        }
    }
    useEffect(()=>{
        getInventory()
    },[])
    async function UpdateStocks(id){
        try{
            const response = await fetch(`http://localhost:3000/api/stock/${id}`,{
                method:"POST",
                body:JSON.stringify({
                    quantity,
                    description
                })
            })
            if(!response.ok){
                throw new Error("fetch problem")
            }
            // const {data} = await response.json()
            getInventory()
            setQuantity("")
            setdescription("")
        }catch(error){
            console.log(error)
        }
    }
    return(
        <div className="bg-green-300 ml-64 pl-6 ">
            <div className="w-2/3">
                <Table
                    data={inventory}
                    headers={['Product Name','Quantity','Prices','action']}
                    renderRow={(item,index)=>(
                        <React.Fragment key={item.key}>
                            <td className="text-center"> { item.name} </td>
                            <td className="text-center"> { item.quantity} </td>
                            <td className="text-center"> { item.price} </td>
                            <td className="text-center"> 
                                <button className="border-2 border-black rounded-lg px-2"
                                       onClick={()=> {
                                        setId(item.product_id)
                                    }}   
                                >update</button>
                            </td>
                        </React.Fragment>
                    )}
                />
            </div>
            {id ?(
                <Modal onClose={(e)=>{setId(null)}}>
                    <div>
                        <input type="number"
                            placeholder="quantity"
                            value={quantity}
                            onChange={(e)=>setQuantity(e.target.value)}
                        />
                        <input type="text"
                            placeholder="description"
                            value={description}
                            onChange={(e)=>setdescription(e.target.value)}
                        />
                        <botton className="border-2 border-black"
                            onClick={()=>{
                                UpdateStocks(id),
                                setId(null)
                            }
                           } 
                        >update</botton>
                    </div>
                </Modal>
            ):null}
        </div>
    )
}


