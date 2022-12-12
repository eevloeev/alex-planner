const days = {
  MONDAY: "monday",
  TUESDAY: "tuesday",
  WEDNESDAY: "wednesday",
  THURSDAY: "thursday",
  FRIDAY: "friday",
  SATURDAY: "saturday",
  SUNDAY: "sunday",
}

const translate = {
  [days.MONDAY]: "Понедельник",
  [days.TUESDAY]: "Вторник",
  [days.WEDNESDAY]: "Среда",
  [days.THURSDAY]: "Четверг",
  [days.FRIDAY]: "Пятница",
  [days.SATURDAY]: "Суббота",
  [days.SUNDAY]: "Воскресенье",
}

const deleteTranslate = {
  [days.MONDAY]: "Удалить все задачи с понедельника?",
  [days.TUESDAY]: "Удалить все задачи со вторника?",
  [days.WEDNESDAY]: "Удалить все задачи со среды?",
  [days.THURSDAY]: "Удалить все задачи с четверга?",
  [days.FRIDAY]: "Удалить все задачи с пятницы?",
  [days.SATURDAY]: "Удалить все задачи с субботы?",
  [days.SUNDAY]: "Удалить все задачи с воскресенья?",
}

export {
  days,
  translate as daysTranslate,
  deleteTranslate as daysDeleteTranslate,
}
