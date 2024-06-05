import knex from "@/database"

export async function POST(req){
    const {name,description} = await req.json()
    const data = await knex('categories').insert({
        name,
        description
    }).returning('*')
    return Response.json({data})
}
export async function GET(){
    const data= await knex('categories').select('*')
    return Response.json({data})
}