import { DateModule, PhoneModule, faker } from '@faker-js/faker'

export type BillingTypeProps = {
    id?: number | string;
    orderNumber?: number | string;
    billingTypeName?: string;
    billingTypeSubs?: BillingTypeProps[];
    status?: string;
    updatedAt?: string;
    createdAt?: string;
    // sub
    parameter?: string;
    subTypeName?: string;
    amount?: number | string | any;
    discount?: number | string | any;
    tax?: number | string | any;
}

export type BillingProps = {
    id?: number | string;
    billingCode?: string | number;
    billingName?: string;
    billingStatus?: string;
    billingTypes?: BillingTypeProps[];
    durationStart?: Date | string | any | null;
    durationEnd?: Date | string | any | null;
    periodStart?: Date | string | any | null;
    periodEnd?: Date | string | any | null;
    status?: string;
    templateName?: any;
    totalBill?: number | string | null;
    totalPaidBill?: number | string | null;
    updatedAt?: string;
    createdAt?: string;
    billingDescription?: string | any;
};

const range = (len: number) => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
};

const generateRandomDates = () => {
    const startDate = faker.date.between('2023-01-01', '2023-12-31');
    const endDate = faker.date.between(startDate, '2023-12-31');

    const startEx = faker.date.between('2023-02-01', '2023-12-31');
    const endEx = faker.date.between(startDate, '2023-12-31');

    return {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        durationStart: startEx.toISOString(),
        durationEnd: endEx.toISOString()
    };
};

const newSubType = (): BillingTypeProps => {
    return {
        id: faker.datatype.uuid(),
        orderNumber: faker.datatype.number(10000),
        parameter: faker.helpers.shuffle<BillingTypeProps['parameter']>([
            'Component',
            'Component Percentage',
            'Discount',
            'Receivable',
        ])[0]!,
        subTypeName: faker.helpers.shuffle<BillingTypeProps['subTypeName']>([
            'Tagihan Listrik',
            'Tagihan Air',
            'Tagihan Maintenance',
        ])[0]!,
        status: faker.helpers.shuffle<BillingTypeProps['status']>([
            'active',
            'inactive'
        ])[0]!,
        createdAt: faker.date.recent().toISOString(),
        updatedAt: faker.date.recent().toISOString()
    }
};

export function createSubTypeArr(...lens: number[]) {
    const makeTaskLevel = (depth = 0): BillingTypeProps[] => {
        const len = lens[depth]!
        return range(len).map((d): BillingTypeProps => {
            return {
                ...newSubType(),
            }
        })
    }

    return makeTaskLevel()
};

const newBillingType = (): BillingTypeProps => {
    const subType = createSubTypeArr(3);
    return {
        id: faker.datatype.uuid(),
        orderNumber: faker.datatype.number(10000),
        billingTypeName: faker.helpers.shuffle<BillingTypeProps['billingTypeName']>([
            'Biaya Listrik',
            'Biaya Air',
            'Biaya Maintenance',
        ])[0]!,
        status: faker.helpers.shuffle<BillingTypeProps['status']>([
            'active',
            'inactive'
        ])[0]!,
        billingTypeSubs: subType,
        createdAt: faker.date.recent().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        amount: faker.datatype.number({ min: 10000, max: 1000000 }),   
        discount: faker.datatype.number({ min: 100, max: 10000}),   
        tax: faker.datatype.number({ min: 100, max: 10000}),
    }
};

export function createBillingTypeArr(...lens: number[]) {
    const makeTaskLevel = (depth = 0): BillingTypeProps[] => {
        const len = lens[depth]!
        return range(len).map((d): BillingTypeProps => {
            return {
                ...newBillingType(),
            }
        })
    }

    return makeTaskLevel()
};

export const newBilling = (): BillingProps => {
    const billingType = createBillingTypeArr(3);
    const { start, end, durationStart,durationEnd } = generateRandomDates();
    return {
        id: faker.datatype.uuid(),
        billingCode: faker.datatype.number(10000),
        billingName: faker.lorem.words(),
        status: faker.helpers.shuffle<BillingProps['status']>([
            'active',
            'inactive'
        ])[0]!,
        billingStatus: faker.helpers.shuffle<BillingProps['billingStatus']>([
            'Approv',
            'Completed',
            'Reject',
            'Publish',
            'Waiting',
        ])[0]!,
        billingTypes: billingType,
        periodStart: start,
        periodEnd: end,
        durationStart: durationStart,
        durationEnd: durationEnd,
        billingDescription: faker.lorem.lines(),
        templateName: faker.lorem.words(),
        totalBill: faker.datatype.number(1000000),
        totalPaidBill: faker.datatype.number(1000000),
        createdAt: faker.date.recent().toISOString(),
        updatedAt: faker.date.recent().toISOString()        
    }
};

export function createBillingArr(...lens: number[]) {
    const makeTaskLevel = (depth = 0): BillingProps[] => {
        const len = lens[depth]!
        return range(len).map((d): BillingProps => {
            return {
                ...newBilling(),
            }
        })
    }

    return makeTaskLevel()
};