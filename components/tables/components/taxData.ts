import { faker } from '@faker-js/faker'

export type TaxProps = {
    id?: number | string;
    taxCode?: string | number;
    taxName?: string | number;
    unit?: string | number;
    total?: string | number;
    createdAt: Date | string | any;
    updatedAt: Date | string | any;
};

const range = (len: number) => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
};

export const newTax = (): TaxProps => {
    return {
        id: faker.datatype.uuid(),
        taxCode: faker.datatype.number(10000),
        taxName: faker.lorem.words(),
        unit: faker.helpers.shuffle<TaxProps['unit']>([
            'currency',
            'percent'
        ])[0]!,
        createdAt: faker.date.recent().toISOString(),
        updatedAt: faker.date.recent().toISOString()
    }
};

export function createTaxArr(...lens: number[]) {
    const makeTaskLevel = (depth = 0): TaxProps[] => {
        const len = lens[depth]!
        return range(len).map((d): TaxProps => {
            return {
                ...newTax(),
            }
        })
    }

    return makeTaskLevel()
};