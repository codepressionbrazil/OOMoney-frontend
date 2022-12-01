import { useState } from "react"

import { FaPen, FaTrash } from "react-icons/fa"
import type { TransactionFromDB } from "../types/types"
import * as utils from "../utils/utils"
import { DeleteTransactionModal } from "./DeleteTransactionModal"

import { EditTransactionModal } from "./EdiTransactionModal" 

export function TransactionRow({transaction}: {transaction: TransactionFromDB}) {

  const [selectedTransaction, setSelectedTransaction] = useState<number | null>(null)

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  function openEditModal(transactionId: number) {
    setSelectedTransaction(transactionId)
    setIsEditModalOpen(true)
  }

  function closeEditModal() {
    setIsEditModalOpen(false)
  }

  function openDeleteModal(transactionId: number) {
    setSelectedTransaction(transactionId)
    setIsDeleteModalOpen(true)
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false)
  }


  return (
    <>
      <td className="w-[35%] text-left py-2">{transaction.descricao}</td>
      
      <td className={transaction.tipoTransacao === 'ENTRADA' ? 'income py-2' : 'outcome py-2'}>
        {utils.formatMoney(transaction.valorTransacao)}
      </td>
      
      <td className="py-2">{transaction.classificacao.nomeClassificao}</td>
      
      <td className="py-2">{new Date(transaction.dataHora).toLocaleDateString()}</td>
      
      <td className="flex justify-evenly py-2">
        <button
          type="button"
          onClick={() => openEditModal(transaction.id)}
        >
          <FaPen />
        </button>
        <button
          type="button"
          onClick={() => openDeleteModal(transaction.id)}
        >
          <FaTrash />
        </button>
      </td>
      <EditTransactionModal isOpen={isEditModalOpen} onClose={closeEditModal} transactionId={selectedTransaction as number} />
      <DeleteTransactionModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} transactionId={selectedTransaction as number} description={transaction.descricao} />
    </>
  )
}