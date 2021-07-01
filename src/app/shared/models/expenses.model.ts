export class ExpensesModel {
    $key: string;
    date: Date;
    amount: string;
    description: string;
    type: string;

    constructor() {
        this.date = null;
        this.amount = '';
        this.description = '';
        this.type = 'expense';
    }
}
