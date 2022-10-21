class User {
    constructor(name, lastName, books, pets) {
        this.name = name;
        this.lastName = lastName;
        this.books = books;
        this.pets = pets;
    }

    getFullName = () => {
        console.log(`${this.name} ${this.lastName}`);
    }

    addPets = (pet) => {
        this.pets.push(pet);
    }

    countPets = () => {
        console.log(this.pets.length);
    }

    addBook = (book) => {
        this.books.push(book);
    }

    getBookNames = () => {
        console.log(this.books.map(x => x.title));
    }
}

const user = new User("Juan", "Gómez",
    [
        {
            title: "La insoportable levedad del ser",
            autor: "Milan Kundera"
        },
        {
            title: "El mundo y sus demonios",
            autor: "karl Sagan"
        },
        {
            title: "Historia del tiempo",
            autor: "S. Hawking"
        }
    ],
    ["perro", "gato", "Hamster"]
)

user.getFullName()

user.addPets("Cacatua")

user.countPets()

user.addBook({
    title: "La rebelión de las ratas",
    autor: "Fernando Soto Aparicio"
})

user.getBookNames()