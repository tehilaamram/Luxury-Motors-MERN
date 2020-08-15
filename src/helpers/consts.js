export const ROLE = {
    GUEST: 'guest',
    USER: 'user',
    WORKER: 'worker',
    ADMIN: 'admin',
}

export const CONNECTED_USER = {
    ROLE: 'role',
    EMAIL: 'email',
    FULL_NAME: 'fullName',
    ID: 'id',
}

export const TRANSMISSION = ['Manual',
    'automaton',
    'Tifronic',
    'Robotic'];

export const MAKER = ['Acura',
    'Alfa_Romeo', 'Audi','BMW','Bentley','Buick','Cadillac','Chevrolet','Chrysler','Dodge','Fiat', 'Ford',
    'GMC', 'Genesis', 'Honda', 'Hyundai','Infiniti','Jaguar','Jeep','Kia','Lamburgini', 'Land','Lexus',
    'Lincoln', 'Lotus','Maserati','Mazda',   'Mercedes','Mercury',    'Mini','Mitsubishi','Nissan',
    'Polestar','Peugeot', 'Pontiac', 'Porsche','Ram','Rivian',    'Rolls-Royce','Saab','Saturn',
    'Scion',    'Smart','Subaru','Suzuki',  'Tesla','Toyota','Volkswagen','Volvo','Acura',
    'Alfa_Romeo', 'Audi','BMW','Bentley','Buick','Cadillac','Chevrolet','Chrysler','Dodge','Fiat', 'Ford',
    'GMC', 'Genesis', 'Honda', 'Hyundai','Infiniti','Jaguar','Jeep','Kia', 'Land','Lexus',
    'Lincoln', 'Lotus','Maserati','Mazda',   'Mercedes','Mercury',    'Mini','Mitsubishi','Nissan',
    'Polestar','Pontiac', 'Porsche','Ram','Rivian',    'Rolls-Royce','Saab','Saturn',
    'Scion',    'Smart','Subaru','Suzuki',  'Tesla','Toyota','Volkswagen','Volvo'];

export const MODEL_TO_MANUFACTURER=[
    {manufacturer:'acura', models:['A4','A5','A6','Q5','SQ5','Q7','Q8']},
    {manufacturer:'peugeot', models:['3008', '2008', '5008']},
    {manufacturer:'audi', models:['A4','A5','A6','Q5','SQ5','Q7','Q8']},
    {manufacturer: 'bmw', models: ['X1','X2','X3','X3 M','X4', 'X4','X4 M', 'M850']},
    {manufacturer: 'buick', models: ['REGAL SPORTBACK', 'REGAL GS','REGAL AVENIR','REGAL TOURX']}
];

export const VEHICLE = {
    MODEL: 'model',
    MAKER: 'maker',
    COLOR: 'color',
    MAIN_IMAGE: 'mainImage',
    ADDITIONAL_IMAGES: 'additionalImages',
    SEATS: 'seats',
    DOORS: 'doors',
    TRANSMISSION: 'transmission',
    YEAR: 'year',
    PRICE: 'price',
    QUANTITY: 'quantity',
}

export const CHAT = {
    ROOM: 'room',
}

export const ORDER_STATUS = {
    ON_HOLD: 'On hold',
    PENDING_SUPPLIER: 'Pending supplier',
    CONFIRMED: 'confirmed',
    ON_PROCESS :'on process',
    DONE: 'Done',
}