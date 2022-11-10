import { useState } from "react"

import { FaPen, FaTrash } from "react-icons/fa"
import type { TransactionFromDB } from "../types/types"
import * as utils from "../utils/utils"

export function TransactionRow({transaction}: {transaction: TransactionFromDB}) {

  const [selectedTransaction, setSelectedTransaction] = useState<number | null>(null)

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  function openEditModal(transactionId: number) {
    setSelectedTransaction(transactionId)
    setIsEditModalOpen(true)
  }

  return (
    <>
      <td className="w-[35%] text-left">{transaction.descricao}</td>
      
      <td className={transaction.tipoTransacao === 'ENTRADA' ? 'income' : 'outcome'}>
        {utils.formatMoney(transaction.valorTransacao)}
      </td>
      
      <td>{transaction.classificacao.nomeClassificao }</td>
      
      <td>{new Date(transaction.dataHora).toLocaleDateString()}</td>
      
      <td>
        <button
          type="button"
          onClick={() => openEditModal(transaction.id)}
        >
          <FaPen />
        </button>
        <button type="button">
          <FaTrash />
        </button>
      </td>
    </>
  )
}