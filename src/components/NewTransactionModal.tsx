import { useState } from "react"
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

interface NewTransactionModalProps{
  isOpen: boolean;
  onClose: () => void;
}

export function NewTransactionModal(props: NewTransactionModalProps){
  
  const [title, setTitle] = useState<string>("")
  const [value, setValue] = useState<number>(0)
  const [date, setDate] = useState<Date>(new Date())
  const [type, setType] = useState<SelectValueType>([])
  const [classification, setClassification] = useState<SelectValueType>([])

  const { createTransaction, transactionClassifications } = useTransactions()

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
    try {
      const data = {
        description: title,
        amount: value,
        date: format(date, "yyyy-MM-dd HH:mm:ss"),
        transactionType: type[0]?.id,
        idClassification: classification[0]?.id
      }
  
      await createTransaction(data as any)
      props.onClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalHeader>Adicionar transação</ModalHeader>
      <ModalBody>
        <FormControl label="Título">
          <Input
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </FormControl>

        <FormControl label="Valor">
          <Input
            value={value}
            onChange={(e) => setValue(Number(e.currentTarget.value))}
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
            value={type}
            onChange={({ value }) => setType(value)}
            placeholder="Selecione o tipo"
          />
        </FormControl>

        <FormControl label="Classificação">
          <Select
            options={handleCreateTransactionsClassifications()}
            value={classification}
            onChange={({value}) => setClassification(value)}
            placeholder="Selecione uma classificação"
          />
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <ModalButton kind={KIND.tertiary} onClick={props.onClose}>
          Cancelar
        </ModalButton>
        
        <ModalButton
          onClick={handleSubmit}
        >
          Adicionar
        </ModalButton>
      </ModalFooter>

    </Modal>
  )
}