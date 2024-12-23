abstract class Animal {
    abstract makeSound(): void;  // Abstract method

    move(): void {
        console.log("Moving...");
    }
}

class Dog extends Animal {
    makeSound(): void {
        console.log("Bark");
    }
}

const dog = new Dog();
dog.makeSound();  // Bark
dog.move();       // Moving...
