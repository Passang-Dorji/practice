import knex from "@/database";

export async function POST(req){
    const {itemLists,totalAmount,payment,journalNumber} = await req.json()
    const data = await knex.transaction(async(trx)=>{
        const [createdTrans] = await trx('transaction')
            .insert({
                total_amount:totalAmount,
                payment,
                journal_number:journalNumber,
                opened_at: new Date().toISOString(),
                closed_at: new Date().toISOString()
            }).returning('*')

        for(let i=0; i < itemLists.length;i++){
            const items = itemLists[i]
            await trx('transaction_items')
                .insert({
                    transaction_id:createdTrans.id,
                    product_id: items.productId,
                    quantity:items.quantity,
                    price:items.price,
                    total_price: items.quantity * items.price
                }).where('transaction_items.transaction_id','transaction.id')
            
            let InvenQuantity = await trx('inventory')
                .join('products','inventory.product_id','products.id')
                .where('inventory.product_id',items.productId)
                .select('quantity','name')
                
                if(InvenQuantity.length[0] < items.quantity){
                    throw new Error(`insufficient stocks for ${InvenQuantity[0].name}`)
                }else{
                    await trx('inventory')
                        .where('inventory.product_id',items.productId)
                        .decrement('quantity',items.quantity)
                }
        }
        return createdTrans
    })
    return Response.json({data})
}