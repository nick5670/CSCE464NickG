export class User{

    id!: number;
    name!: string;
    email!: string;
    role!: string;
    password!: string;

    static fromHttp(user: User) : User{
        const newUser = new User();
        newUser.id = user.id;
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.role = user.role;
        newUser.password = user.password;
        return newUser;
    }

}

