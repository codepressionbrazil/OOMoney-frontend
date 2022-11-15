import { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "baseui/modal";
import { KIND } from "baseui/button";

import { useTransactions } from "../context/useTransactions";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionId: number;
  description: string;
}

export function DeleteTransactionModal(props: DeleteModalProps) {
  const { deleteTransaction } = useTransactions();

  async function handleSubmit(){
    await deleteTransaction(props.transactionId)
    props.onClose()
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalHeader>Adicionar transação</ModalHeader>
        <ModalBody>
          <h2>Deseja mesmo deletar a transação {'"' + props.description + '"'} ?</h2>
        </ModalBody>

        <ModalFooter>
          <ModalButton kind={KIND.tertiary} onClick={props.onClose}>
            Cancelar
          </ModalButton>

          <ModalButton onClick={handleSubmit}>Deletar</ModalButton>
        </ModalFooter>
      </Modal>
    </>
  );
}
