import { EmployeePositions } from "./employeePositions.model"
export enum Gender {
  Male = 'Male',
  Female = 'Female'
}
export class Employee {
  id!: number
  tz!: string
  firstName!: string
  lastName!: string
  startDate!: string
  dateBirth!: string
  gender!: Gender
  status!: boolean
  employeePositions!: EmployeePositions[]
}