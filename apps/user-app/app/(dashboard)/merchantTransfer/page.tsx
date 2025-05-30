import React from 'react'
// import { SendCard } from '../../../components/SendCard'
// import { SentTransfer } from '../../../components/SentTransfer'
// import { ReceivedTransfer } from '../../../components/ReceivedTransfer'
import { MerchantCard } from '../../../components/MerchantCard'
import getMerchTransfers from '../../lib/actions/retrieveMerchTransfers'
import { MerchantTransfer } from '../../../components/MerchantTransfer';

export default async function(){
    const data = await getMerchTransfers() ;
    // Flatten sentMerchantTransfers from the data array
    const sentTransfers = data.flatMap((item: any) => item.sentMerchantTransfers);

    return (
        <>
                <div className="mx-auto">
                    <MerchantCard />
                </div>
                <div className="w-[50%] flex flex-col gap-12 p-2">
                    <MerchantTransfer data={sentTransfers} />
                </div>
               </>
    )
}