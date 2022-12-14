export type Transaction = {
  idtransacao: string;
  valor_transacao: number;
  data_hora: Date;
  descricao: string;
  tipo_transacao: string;
  pessoa: {
    idPessoa: string;
  }
}

export type TransactionFromDB = {
  id: number
  descricao: string
  dataHora: Date
  valorTransacao: number
  tipoTransacao: string
  pessoa: any
  classificacao: {
    idClassificacao: number
    nomeClassificao: string
  }
}

export type TransactionClassification = {
  idClassificacao: string;
  nomeClassificao: string;
}

export type updateData = {
  description: string
  amount: number
  date: string
  transactionType: number
  idClassification: number
}