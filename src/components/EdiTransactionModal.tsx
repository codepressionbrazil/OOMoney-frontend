import { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import { KIND } from "baseui/button";

import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { DatePicker } from "baseui/datepicker";
import { Select, Value as SelectValueType } from "baseui/select";

import locale from "date-fns/locale/pt-BR";
import { format } from "date-fns";
import { useTransactions } from "../context/useTransactions";
import { updateData } from "../types/types";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionId: number;
}

export function EditTransactionModal(props: EditModalProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState<Date>(new Date());
  const [transactionType, setTransactionType] = useState<SelectValueType>([]);
  const [classification, setClassification] = useState<SelectValueType>([]);

  const { findOneTransaction, updateTransaction, transactionClassifications } = useTransactions();

  useEffect(() => {
    loadSelectedTransaction()
  }, [props.transactionId])

  async function loadSelectedTransaction() {
    const transaction = await findOneTransaction(props.transactionId)
    setDescription(transaction.descricao)
    setAmount(transaction.valorTransacao)
    setDate(new Date(transaction.dataHora))
    setTransactionType([{ id: transaction.tipoTransacao.toLocaleUpperCase('en-us'), label: transaction.tipoTransacao }])
    setClassification([{ id: transaction.classificacao.idClassificacao, label: transaction.classificacao.nomeClassificao }])
  }

  function handleCreateTransactionsClassifications() {
    const formattedClassifications = transactionClassifications.map(classification => {
      return {
        label: classification.nomeClassificao,
        id: classification.idClassificacao
      }
    })

    return formattedClassifications;
  }

  async function handleSubmit(){
    const data = {
      description,
      amount,
      date: format(date, "yyyy-MM-dd HH:mm:ss"),
      transactionType: transactionType[0]?.id,
      idClassification: classification[0]?.id
    }

    await updateTransaction(data as updateData, props.transactionId)
    props.onClose()
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalHeader>Adicionar transação</ModalHeader>
        <ModalBody>
          <FormControl label="Descrição">
            <Input
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
            />
          </FormControl>

          <FormControl label="Valor">
            <Input
              value={amount}
              onChange={(e) => setAmount(Number(e.currentTarget.value))}
            />
          </FormControl>

          <FormControl label="Data">
            <DatePicker
              value={date}
              onChange={({ date }) => setDate(date as Date)}
              formatString="dd/MM/yyyy"
              placeholder="dd/MM/yyyy"
              locale={locale}
            />
          </FormControl>

          <FormControl label="Tipo">
            <Select
              options={[
                { label: "Saída", id: "SAIDA" },
                { label: "Entrada", id: "ENTRADA" },
              ]}
              value={transactionType}
              onChange={({ value }) => setTransactionType(value)}
              placeholder="Selecione o tipo"
            />
          </FormControl>

          <FormControl label="Classificação">
            <Select
              options={handleCreateTransactionsClassifications()}
              value={classification}
              onChange={({ value }) => setClassification(value)}
              placeholder="Selecione uma classificação"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <ModalButton kind={KIND.tertiary} onClick={props.onClose}>
            Cancelar
          </ModalButton>

          <ModalButton onClick={handleSubmit}>Editar</ModalButton>
        </ModalFooter>
      </Modal>
    </>
  );
}
