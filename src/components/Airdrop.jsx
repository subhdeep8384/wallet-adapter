import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect, useState } from 'react'

const AirdropComponent = () => {
  const [publicKeyStr, setPublicKeyStr] = useState("")
  const [balance, setBalance] = useState(null)
  const wallet = useWallet()
  const { connection } = useConnection()

 
  useEffect(() => {
    if (wallet.publicKey) {
      setPublicKeyStr(wallet.publicKey.toBase58())
    } else {
      setPublicKeyStr("")
    }
  }, [wallet.publicKey])


  useEffect(() => {
    const fetchBalance = async () => {
      if (!wallet.publicKey) return
      try {
        const info = await connection.getAccountInfo(wallet.publicKey)
        setBalance(info ? info.lamports / 1e9 : 0)
      } catch (err) {
        console.error("Error fetching balance:", err)
      }
    }
    fetchBalance()
  }, [wallet.publicKey, connection])

  // Handle airdrop
  const handleAirdrop = async () => {
    if (!wallet.publicKey) {
      console.log("NO KEY")
      return
    }
    try {
      await connection.requestAirdrop(wallet.publicKey, 1 * 1e9)
      alert("Airdrop requested! Refresh balance soon.")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className='text-xl text-white '>Balance: {wallet.publicKey !== null ? `${balance} SOL` : "connect your account to see balance"}</div>
      <div className="text-white">
        {wallet.publicKey
          ? <div className="text-xl">Your public key: {publicKeyStr}</div>
          : <>Connect your wallet</>}
      </div>
      <button
        onClick={handleAirdrop}
        className="bg-purple-900 font-bold text-white py-2 px-4 rounded-md"
      >
        Airdrop
      </button>
    </div>
  )
}

export default AirdropComponent
