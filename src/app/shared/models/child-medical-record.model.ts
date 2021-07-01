export class ChildMedicalRecordModel {
    firstName: string;
    lastName: string;
    mothersLastName: string;
    birthDate: Date;
    age: number;
    sex: string;
    address: string;
    date: Date;
    description: string;
    vaccines: string;

    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.mothersLastName = '';
        this.age = null;
        this.sex = '';
        this.address = '';
        this.date = null;
        this.description = '';
        this.vaccines = '';
        this.birthDate = null;
    }
}
