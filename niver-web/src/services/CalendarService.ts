import { CalendarApi } from "../providers"

const getBirthdaysOfMonthFromAllGroupsByPerson = (month: number, personId: number) => CalendarApi.get('/birthdays/' + month + '/' + personId)

export const CalendarService = {
  getBirthdaysOfMonthFromAllGroupsByPerson,
}