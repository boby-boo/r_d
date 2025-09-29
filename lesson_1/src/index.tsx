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
    const addressIsString = address || 'N/A';

    console.log(`
        Name: ${name}, 
        BirthDate: ${birthdayIsDate}, 
        Phone: ${phone}, 
        Address: ${addressIsString}
    `);
}

showUserInfo(user);
showUserInfo(user2);
