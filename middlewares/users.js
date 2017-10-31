const defaultListOfUser = [
    {user: 'Aleh0', login: 'aleh0', password: '1230'},
    {user: 'Aleh1', login: 'aleh1', password: '1231'},
    {user: 'Aleh2', login: 'aleh2', password: '1232'},
    {user: 'Aleh3', login: 'aleh3', password: '1233'},
];

class Users {
    constructor() {
        this.users = defaultListOfUser;
    }

    get allUsers() {
        return this.users;
    }

}

const users = new Users();
export default users;
