import { DateModule, PhoneModule, faker } from '@faker-js/faker'

export type TaskProps = {
    id: string | number
    createdAt?: string | null
    detail?: {
        discussion?: any | any[]
        files?: any | any[]
        subTask?: any | any[]
        tags?: any | any[]
        workers?: any | any[]
    }
    status?: string | any
    taskCode?: string | number | any
    taskDescription?: string
    taskIndex?: any
    taskName?: string
    taskRequestStatus?: boolean
    taskStatus?: string
    times?: {
        scheduleStart: string | null,
        scheduleEnd: string | null
        executionEnd: string | null
        executionStart: string | null
    }
    totalDiscussion?: number
    totalFile?: number
    totalSubTask?: number
    updatedAt?: string | null
}

export type UserProps = {
    id?: string | number | any
    userCode?: string | null
    firstName?: string
    lastName?: string
    nickName?: string
    birthday?: string | null
    email?: string
    gender?: string
    userAddress?: string
    phoneNumber?: string | number
    profileImage?: string
    totalWallet?: string | number
    mobileNotification?: number | string
    updatedAt?: string | null;
    createdAt?: string | null
}

export type DivisionProps = {
    divisionCode?: string | number;
    divisionDescription?: string;
    divisionName?: string;
    id?: string | number;
    status?: string;
    member: UserProps[]
};

export type WorkProps = {
    id: number | string | any;
    workCode?: number | string;
    workName?: string;
    workDescription?: string;
    workStatus?: string;
    workType?: string;
    workCategory?: any;
    task?: TaskProps[];
    totalTask?: number;
    totalTaskCompleted?: number;
    updatedAt?: string | null;
    createdAt?: string | null;
    member?: UserProps[];
    scheduleStart: string | null | undefined;
    scheduleEnd: string | null | undefined;
    executionEnd: string | null | undefined;
    executionStart: string | null | undefined;
    status?: string;
    divisions?: DivisionProps[];
    priority?: string
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

    const startEx = faker.date.between('2023-02-01', '2023-12-31');
    const endEx = faker.date.between(startDate, '2023-12-31');

    return {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        startEx: startEx.toISOString(),
        endEx: endEx.toISOString()
    };
};

const newMember = (): UserProps => {
    return {
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        nickName: faker.name.middleName(),
        lastName: faker.name.lastName(),
        profileImage: faker.image.avatar(),
        email: `${faker.name.firstName()}@gmail.com`,
        gender: faker.helpers.shuffle<UserProps['gender']>([
            'male',
            'female'
        ])[0]!,
        phoneNumber: faker.phone.number("62812########"),
        birthday: faker.date.recent().toISOString(),
        createdAt: faker.date.recent().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        mobileNotification: faker.datatype.number(100),
        totalWallet: faker.datatype.number(100),
        userAddress: faker.address.streetAddress(),
        userCode: faker.datatype.string()
    }
};

export function createMemberArr(...lens: number[]) {
    const makeTaskLevel = (depth = 0): UserProps[] => {
        const len = lens[depth]!
        return range(len).map((d): UserProps => {
            return {
                ...newMember(),
            }
        })
    }

    return makeTaskLevel()
};

const newDivision = (): DivisionProps => {
    const member = createMemberArr(4)
    return {
        id: faker.datatype.uuid(),
        divisionCode: faker.datatype.number(10000),
        divisionDescription: faker.lorem.paragraph(),
        divisionName: faker.helpers.shuffle<DivisionProps['divisionName']>([
            'Engineer',
            'Technician',
            'Operational',
            'Cleaning Service'
        ])[0]!,
        status: faker.helpers.shuffle<DivisionProps['status']>([
            'active',
            'inactive'
        ])[0]!,
        member: member
    }
};

export function createDivisionArr(...lens: number[]) {
    const makeTaskLevel = (depth = 0): DivisionProps[] => {
        const len = lens[depth]!
        return range(len).map((d): DivisionProps => {
            return {
                ...newDivision(),
            }
        })
    }

    return makeTaskLevel()
};

const newTask = (): TaskProps => {
    const random = generateRandomDates();
    const scheduleStart = random.start;
    const scheduleEnd = random.end;
    const executionStart = random.startEx;
    const executionEnd = random.endEx;

    return {
        id: faker.datatype.uuid(),
        detail: {
            discussion: faker.lorem.text(),
            files: {
                documentNumber: faker.datatype.number(100),
                documentSource: faker.image.dataUri()
            },
            subTask: [],
            tags: [],
            workers: [],
        },
        taskCode: faker.datatype.string(10),
        status: faker.helpers.shuffle<TaskProps['status']>([
            'active',
            'inactive'
        ])[0]!,
        taskIndex: 0,
        taskName: faker.name.jobTitle(),
        taskDescription: faker.lorem.text(),
        taskRequestStatus: faker.helpers.shuffle<TaskProps['taskRequestStatus']>([
            true,
            false
        ])[0]!,
        taskStatus: faker.helpers.shuffle<TaskProps['taskStatus']>([
            'To Do',
            'On Progress',
            'Resolved',
            'Done',
        ])[0]!,
        times: {
            scheduleStart,
            scheduleEnd,
            executionStart,
            executionEnd
        },
        totalDiscussion: 0,
        totalFile: 1,
        totalSubTask: 1,
        createdAt: faker.date.recent().toISOString(),
        updatedAt: faker.date.recent().toISOString()
    }
};

export function createTaskArr(...lens: number[]) {
    const makeTaskLevel = (depth = 0): TaskProps[] => {
        const len = lens[depth]!
        return range(len).map((d): TaskProps => {
            return {
                ...newTask(),
            }
        })
    }

    return makeTaskLevel()
};

const newWork = (): WorkProps => {
    const task = newTask();
    const division = createDivisionArr(2);
    const member = createMemberArr(3);
    return {
        id: faker.datatype.uuid(),
        executionStart: task.times?.executionStart,
        executionEnd: task.times?.executionEnd,
        scheduleStart: task.times?.scheduleStart,
        scheduleEnd: task.times?.scheduleEnd,
        status: faker.helpers.shuffle<WorkProps['status']>([
            'active',
            'inactive'
        ])[0]!,
        divisions: division,
        member: member,
        task: [task],
        totalTask: 1,
        totalTaskCompleted: 0,
        workCategory: faker.helpers.shuffle<WorkProps['workCategory']>([
            {
                id: 2,
                status: 'active',
                urgency: false,
                workCategoryCode: null,
                workCategoryDescription: null,
                workCategoryName: "Engineering"
            },
            {
                id: 3,
                status: 'active',
                urgency: false,
                workCategoryCode: null,
                workCategoryDescription: null,
                workCategoryName: "Cleaning Service"
            },
            {
                id: 1,
                status: 'active',
                urgency: true,
                workCategoryCode: null,
                workCategoryDescription: null,
                workCategoryName: "Maintenance"
            },
        ])[0]!,
        workCode: faker.datatype.number(10000),
        workDescription: faker.lorem.text(),
        workName: faker.name.jobTitle(),
        workStatus: faker.helpers.shuffle<WorkProps['workStatus']>([
            'Open',
            'On Progress',
            'Closed',
            'Overdue'
        ])[0]!,
        workType: faker.helpers.shuffle<WorkProps['workType']>([
            'Project',
            'Regular Task',
            'Complaint Handling',
            'Maintenance'
        ])[0]!,
        createdAt: faker.date.recent().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        priority: faker.helpers.shuffle<WorkProps['priority']>([
            'Low',
            'Medium',
            'High'
        ])[0]!,
    }
}

export function createDataTask(...lens: number[]) {
    const makeTaskLevel = (depth = 0): WorkProps[] => {
        const len = lens[depth]!
        return range(len).map((d): WorkProps => {
            return {
                ...newWork(),
            }
        })
    }

    return makeTaskLevel()
};

export function createTask() {
    return newWork();
}
