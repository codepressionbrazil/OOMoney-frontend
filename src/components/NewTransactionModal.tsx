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

import locale from "date-fns/locale/pt-BR";

interface NewTransactionModalProps{
  isOpen: boolean;
  onClose: () => void;
}

export function NewTransactionModal(props: NewTransactionModalProps){
  
  const [title, setTitle] = useState<string>("")
  const [value, setValue] = useState<number>(0)
  const [date, setDate] = useState<Date>(new Date())

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
      </ModalBody>

      <ModalFooter>
        <ModalButton kind={KIND.tertiary} onClick={props.onClose}>
          Cancelar
        </ModalButton>
        
        <ModalButton>
          Adicionar
        </ModalButton>
      </ModalFooter>

    </Modal>
  )
}