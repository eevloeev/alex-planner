const apiRoutes = {
  v1: {
    getTasks: {
      method: "GET",
      url: "/v1/getTasks",
    },
    editTasks: {
      method: "POST",
      url: "/v1/editTasks",
    },
  },
}

export { apiRoutes }
