import { FaPen, FaTrash } from "react-icons/fa"

import type { Transaction } from "../types/types"

import * as utils from "../utils/utils"

export function TransactionRow(transaction: Transaction){
  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <h3>{transaction.descricao}</h3>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{utils.formatMoney(transaction["valor_transacao"])}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            {transaction["tipo_transacao"]}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {new Date(transaction["data_hora"]).toLocaleDateString('pt-br')}
        </td>
        <td>
          <div>
            <FaPen className="text-blue-500 cursor-pointer" />
            <FaTrash className="text-red-500 cursor-pointer" />
          </div>
        </td>
      </tr>


        
    </>
  )
}