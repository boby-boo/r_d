// Оголосіть змінні для збереження інформації про користувача, використовуючи примітивні типи TypeScript:
// ім’я (string);
// дата народження (string або Date);
// номер телефону (string або number);

type User = {
    name: string;
    birthDate: string | Date;   
    phone: string | number;
    address: string | null;
}

const user: User = {
    name: "John",   
    birthDate: new Date('1990-01-01'),
    phone: '+380991234567',
    address: null,
}

const user2: User = {
    name: "Robert",   
    birthDate: 'February 18, 1995',
    phone: '+380991234567',
    address: 'Kyiv, Ukraine',
}

const showUserInfo = (user: User) => {
    const { name, birthDate, phone, address } = user;
    const birthdayIsDate = birthDate instanceof Date ? birthDate.toLocaleDateString() : birthDate;
    const addressIsString = typeof address === 'string' ? address : 'N/A';

    console.log(`
        Name: ${name}, 
        BirthDate: ${birthdayIsDate}, 
        Phone: ${phone}, 
        Address: ${addressIsString}
    `);
}

showUserInfo(user);
showUserInfo(user2);

// const name: string = "John";
// const birthDate: string | Date = new Date('1990-01-01');
// const phone: string | number = '+380991234567';
// const address: string | null = null;

// const showUserInfo = (name: string, birthDate: string | Date, phone: string | number, address: string | null) => {
//     const birthdayIsDate = birthDate instanceof Date;
//     console.log(`Name: ${name}, \n Birth Date: ${birthdayIsDate ? birthDate.toLocaleDateString() : birthDate}, \n Phone: ${phone}, \n Address: ${address}`);
// }

// showUserInfo(name, birthDate, phone, address);
