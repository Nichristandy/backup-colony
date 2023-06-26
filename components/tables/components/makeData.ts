import { DateModule, PhoneModule, faker } from '@faker-js/faker'

export type ColumnItems = {
    id: any
    fullName: string
    firstName: string
    lastName: string
    gender: string
    age: number
    email: string,
    phoneNumber: string | number
    images: string
    owned: number
    occupied: number
    date: string | number
    visits: number
    progress: number
    status: 'active' | 'inactive'
    subRows?: ColumnItems[],
    avatar: string | undefined,
    workName: string;
    startDate: string;
    endDate: string;
    color: number | string;
}

const range = (len: number) => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

const generateRandomDates = () => {
    const startDate = faker.date.between('2023-01-01', '2023-12-31');
    const endDate = faker.date.between(startDate, '2023-12-31');

    return {
        start: startDate.toISOString(),
        end: endDate.toISOString()
    };
};

const newPerson = (): ColumnItems => {
    const random = generateRandomDates();
    const start = random.start;
    const end = random.end;

    return {
        id: faker.datatype.uuid(),
        fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        images: faker.image.dataUri(),
        email: `${faker.name.firstName()}@gmail.com`,
        gender: faker.helpers.shuffle<ColumnItems['gender']>([
            'male',
            'female',
            'any',
        ])[0]!,
        // phoneNumber: faker.phone.phoneNumber('6281#########'),
        avatar: faker.internet.avatar(),
        phoneNumber: faker.datatype.number(1000),
        date: faker.date.recent().toDateString(),
        owned: faker.datatype.number(40),
        occupied: faker.datatype.number(100),
        age: faker.datatype.number(40),
        visits: faker.datatype.number(1000),
        progress: faker.datatype.number(100),
        status: faker.helpers.shuffle<ColumnItems['status']>([
            'active',
            'inactive',
        ])[0]!,
        workName: faker.name.jobTitle(),
        startDate: start,
        endDate: end,
        color: faker.internet.color()

    }
}

export function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): ColumnItems[] => {
        const len = lens[depth]!
        return range(len).map((d): ColumnItems => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
            }
        })
    }

    return makeDataLevel()
}
