import { faker } from "@faker-js/faker";
import { Employee } from "../models/Employee";

export class EmployeeFactory {
    static create(): Employee {
        return {
            firstName: faker.person.firstName(),
            middleName: faker.person.middleName(),
            lastName: faker.person.lastName(),
            employeeId: faker.string.numeric(6)
        }
    }

    static createWithInvalidEmployeeId(): Employee{
        return {
            firstName: faker.person.firstName(),
            middleName: faker.person.middleName(),
            lastName: faker.person.lastName(),
            employeeId: faker.string.numeric(10)
        }
    }
}