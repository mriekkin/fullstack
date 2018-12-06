let token = null

const blogs = [
  {
    id: "5c065173f2224a0942861ec4",
    title: "Continuous integration",
    author: "Martin Fowler",
    url: "https://martinfowler.com",
    likes: 16,
    user: {
      _id: "5c026e52fecd191936ce24f9",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5c065f29f2224a0942861ed4",
    title: "Cloud-hosted MongoDB",
    author: "mlab",
    url: "http://mlab.com",
    likes: 25,
    user: {
      _id: "5c026e52fecd191936ce24f9",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, blogs, setToken }