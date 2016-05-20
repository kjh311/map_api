module.exports = {
  development: {
    root: rootPath,
    db: 'mongodb://localhost/MeanMapApp'
  },
  test: {
    root: rootPath,
    db: 'mongodb://localhost/MeanMapApp'
  },
  staging: {
    root: rootPath,
    db: process.env.MONGOLAB_URI
  },
  production: {
    root: rootPath,
    db: process.env.MONGOLAB_URI
  }
}
