import React,{ createContext, ReactNode, useContext, useEffect, useState } from 'react'

import * as types from "../types/types"
import { api } from "../services/api"

interface TransactionContextData {
  transactions: types.Transaction[]
}

const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData)

export function TransactionProvider(children: ReactNode){
  const [transactions, setTransactions] = useState<types.Transaction[]>([])

  useEffect(()=>{
    getTransactions()
  }, [])

  async function getTransactions(){
    const {data} = await api.get('/transactions')
    setTransactions(data)
  }

  return (
    <TransactionContext.Provider value={{ transaction }}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransaction(){
  const context = useContext(TransactionContext)

  return context
}