export class User {
    constructor(
        public firstName: string,
        public secondName: string,
        public lastName: string,
        public secondLastName: string,
        public email: string,
        public username: string,
        public password: string,
        public isAdmin: boolean,
        public id: string
    ) {}
}