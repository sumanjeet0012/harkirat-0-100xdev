interface User {
    name: string;
    age: number;
    email?: string;
}

function greet(user: User) {
    console.log("Hello, " + user.name );
}

greet({name: "Sumanjeet", age: 22});