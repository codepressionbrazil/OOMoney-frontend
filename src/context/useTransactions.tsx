import React,{ createContext, useContext, useEffect, useState } from 'react'

import * as types from "../types/types"
import { api } from "../services/api"
import { useAuth } from '../hook/useAuth'

interface TransactionContextData {
  transactions: types.TransactionFromDB[]
  transactionClassifications: types.TransactionClassification[]
  createTransaction: (transaction: TransactionInput) => Promise<void>
  updateTransaction: (transaction: types.updateData, transactionId: number) => Promise<void>
  deleteTransaction: (transactionId: number) => Promise<void>
  findOneTransaction: (transactionId: number) => Promise<types.TransactionFromDB>
  getTransactionClassifications: () => Promise<void>
}

interface TransactionInput {
  description: string,
  amount: number,
  date: string,
  transactionType: string,
  idClassification: number
}

const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData)

export function TransactionProvider({children}: any): JSX.Element {
  const { user } = useAuth()

  const [transactions, setTransactions] = useState<types.TransactionFromDB[]>([])
  const [transactionClassifications, setTransactionClassifications] = useState<types.TransactionClassification[]>([])

  useEffect(()=>{
    getTransactions()
    getTransactionClassifications()
  }, [])

  async function getTransactions(){
    const {data} = await api.get(`/transacao/pessoa/${user?.cpf}`)
    console.log(transactions)
    setTransactions(data)
  }

  async function findOneTransaction(id: number){
    const {data} = await api.get(`/transacao/${id}`)
    return data
  }

  async function getTransactionClassifications(){
    const {data} = await api.get('/classificacao')
    setTransactionClassifications(data)
  }

  async function createTransaction(
    {
      description, amount, date, transactionType, idClassification
    }: TransactionInput){
    try { 
      await api.post("/transacao", {
        descricao: description,
        valorTransacao: amount,
        dataHora: date,
        tipoTransacao: transactionType,
        classificacao: {
          idClassificacao: idClassification
        },
        pessoa: {
          cpf: user?.cpf
        }
      })

      await getTransactions()
    } catch (error) {
      console.error(error)
    }   
  }

  async function updateTransaction(data: types.updateData, transactionId: number){
    try {

      const formattedData = {
        descricao: data.description,
        valorTransacao: data.amount,
        dataHora: data.date,
        tipoTransacao: data.transactionType,
        classificacao: {
          idClassificacao: data.idClassification
        },
        pessoa: {
          cpf: user?.cpf
        }
      }

      await api.put(`/transacao/${transactionId}`, formattedData)

      await getTransactions()
      
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteTransaction(transactionId: number){
    try {
      await api.delete(`/transacao/${transactionId}`)
      await getTransactions()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <TransactionContext.Provider value={{ transactions, transactionClassifications, findOneTransaction, getTransactionClassifications, createTransaction, updateTransaction, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions(){
  const context = useContext(TransactionContext)

  return context
}