const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

mongoose
  .connect(url)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Connected to db")
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log("error connecting to MongoDB:", err.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: String,
})

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-param-reassign, no-underscore-dangle
    returnedObject.id = returnedObject._id.toString()
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete returnedObject._id
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Person", personSchema)
