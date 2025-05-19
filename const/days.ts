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
  [days.MONDAY]: "Удалить все задачи на понедельник?",
  [days.TUESDAY]: "Удалить все задачи на вторник?",
  [days.WEDNESDAY]: "Удалить все задачи на среду?",
  [days.THURSDAY]: "Удалить все задачи на четверг?",
  [days.FRIDAY]: "Удалить все задачи на пятницу?",
  [days.SATURDAY]: "Удалить все задачи на субботу?",
  [days.SUNDAY]: "Удалить все задачи на воскресенье?",
}

export {
  days,
  translate as daysTranslate,
  deleteTranslate as daysDeleteTranslate,
}
