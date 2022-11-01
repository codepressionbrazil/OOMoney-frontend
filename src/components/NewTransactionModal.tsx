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
import { PhoneInput, COUNTRIES, SIZE as PHONESIZE } from "baseui/phone-input";
import { Select, Value } from "baseui/select";
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox";

interface NewTransactionModalProps{
  isOpen: boolean;
  onClose: () => void;
}

export function NewTransactionModal(props: NewTransactionModalProps){
  
  const [title, setTitle] = useState<string>("")

  return (
    <Modal
      isOpen={props.isOpen}
    >

    </Modal>
  )
}