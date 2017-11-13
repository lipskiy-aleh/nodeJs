const defaultListOfUser = [
    {id: 1, name: 'Aleh0', login: 'aleh0', password: '1230'},
    {id: 2, name: 'Aleh1', login: 'aleh1', password: '1231'},
    {id: 3, name: 'Aleh2', login: 'aleh2', password: '1232'},
    {id: 4, name: 'Aleh3', login: 'aleh3', password: '1233'},
];

class Users {
    constructor() {
        this.users = defaultListOfUser;
    }

    get allUsers() {
        return this.users;
    }

    findUserByLoginAndPassword(login, password) {
        return this.users.find((user) => user.login === login && user.password === password);
    }

    findUserById(id) {
        return this.users.find((user) => user.id === id);
    }

    findOrCreateByTwitterId(profile) {
        const userProfile = this.users.find((user) => user.twitterId === profile.id);
        return userProfile ? userProfile : this.createUser(profile.name, profile.screen_name, null, profile.id);
    }

    createUser(name, username, password = null, twitterId = null) {
        const newUser = {
            id: this.users.length,
            twitterId: twitterId,
            name: name,
            login: username,
            password: password
        };
        this.users.push(newUser);
        return newUser;
    }

}

const users = new Users();
export default users;
