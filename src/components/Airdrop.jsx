import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import React from 'react'

const AirdropComponent = () => {
    const wallet = useWallet()
    const { connection }  = useConnection()
    const handleClick = async () => {
        console.log(wallet)
        console.log("Button clicked")
        await connection.requestAirdrop(wallet.publicKey, 1000000000)
        alert("Airdropped")
    }
    return (
        <div className='flex flex-col gap-6 items-center'>
            <div className='text-white'>
                {wallet.publicKey 
                    ? <div className='text-xl'>Your public key: {wallet.publicKey.toString()}</div> 
                    : <>Connect your wallet</>
                }
            </div>
            <div className='border-2 max-w-full border-black rounded-md py-2 px-4 flex gap-3 bg-slate-900 text-white'>
                <label htmlFor="amount">Amount :</label>
                <input type="text" id="amount" placeholder='Enter the amount' />
            </div>
            <button onClick={handleClick} className='bg-purple-900 border-1 border-black font-bold text-white py-2 px-4 rounded-md'>Airdrop</button>
        </div>
    )
}

export default AirdropComponent
