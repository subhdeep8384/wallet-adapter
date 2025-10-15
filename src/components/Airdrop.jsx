import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import React from 'react'

const AirdropComponent = () => {
    
    const wallet = useWallet()
    const { connection }  = useConnection()

    const handleAirdrop = async () => {
        if (!wallet.publicKey) {
            console.log("NO KEY")
            return;
        }
        try {
           
            const publicKey = wallet.publicKey;
            const res = await connection.requestAirdrop(
                publicKey,
                1 * 1000000000
            );
            console.log(res);
       

        } catch (err) {
            console.error(err);
            
        } 
    };
    return (
        <div className='flex flex-col gap-6 items-center'>
            <div className='text-white'>
                {wallet.publicKey 
                    ? <div className='text-xl'>Your public key: {wallet.publicKey.toBase58()}</div> 
                    : <>Connect your wallet</>
                }
            </div>
            <div className='border-2 max-w-full border-black rounded-md py-2 px-4 flex gap-3 bg-slate-900 text-white'>
                <label htmlFor="amount">Amount :</label>
                <input type="text" id="amount" placeholder='Enter the amount' />
            </div>
            <button onClick={handleAirdrop} className='bg-purple-900 border-1 border-black font-bold text-white py-2 px-4 rounded-md'>Airdrop</button>
        </div>
    )
}

export default AirdropComponent
