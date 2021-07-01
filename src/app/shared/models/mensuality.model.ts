export class MensualityModel {
    $key: string;
    childKey: string;
    firstName: string;
    lastName: string;
    mothersLastName: string;
    date: Date;
    month: string;
    year: string;
    amount: string;
    tutor: string;
    phoneNumber: string
    type: string;
    description: string;


    constructor() {
        this.childKey = '';
        this.firstName = '';
        this.lastName = '';
        this.mothersLastName = '';
        this.date = null;
        this.month = '';
        this.year = '';
        this.amount = '';
        this.tutor = '';
        this.phoneNumber = '';
        this.type = 'mensuality';
        this.description = 'pago mensualidad';
    }
}
