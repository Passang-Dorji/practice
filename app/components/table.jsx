import React from "react";

function Table({data,headers,renderRow}){
    return(
        <div className="bg-white ">
            <table className="border-separate border-spacing-y-2 w-11/12 mx-2 mt-16">
                <thead className="text-black">
                    <tr className="border-2 border-black h-12 bg-purple-700">
                        {headers.map((header,index)=>(
                            <th key={index}> {header} </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-black">
                    {data.map((item,index)=>(
                        <tr className={`${index % 2 === 0 ? "bg-purple-300":"bg-purple-500"} h-10`}
                         key={index}>
                            {renderRow(item)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Table