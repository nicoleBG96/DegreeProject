export class ProfileModel {
    firstName: string;
    lastName: string;
    mothersLastName: string;
    birthDate: Date;
    sex: string;
    date: Date;
    isDisable: boolean;
    image: string;
    isPayMensuality: boolean;

    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.mothersLastName = '';
        this.birthDate = null;
        this.sex = '';
        this.date = null;
        this.isDisable = false;
        this.image = '';
        this.isPayMensuality = false;
    }
}
