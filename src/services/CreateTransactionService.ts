import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const errors: string[] = [];

    if (!title) {
      errors.push('Title is required for this transaction');
    }

    if (!value) {
      errors.push('Value is required for this transaction');
    }

    if (!title) {
      errors.push('Title is required for this transaction');
    }

    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome') {
      if (value > balance.total) {
        errors.push(
          'The value of this transaction is greater than your income',
        );
      }
    }

    if (errors.length > 0) {
      throw new Error(...errors);
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
