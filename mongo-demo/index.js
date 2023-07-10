const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  try {
    // await course.validate();
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}

async function getCourses() {
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)

  // or
  // and

  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({
    author: "Mosh",
    isPublished: true,
  })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({
      name: 1,
      tags: 1,
    });
  console.log(courses);
}

async function updateCourse(id) {
  // Approach: Query first
  // findById()
  // Modify its properties
  // save()

  // const course = await Course.findById(id);
  // if (!course) return;

  // course.isPublished = true;
  // course.author = "Another Author";

  // course.set({
  //   isPublished: true,
  //   author: "Another Author",
  // });

  // const result = await course.save();
  // console.log(result);

  // Approach: Update first
  // Update directly
  // Optionally: get the updated document
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Jason",
        isPublished: false,
      },
    },
    { new: true }
  );
  console.log(course);
}

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  // const course = await Course.findByIdAndRemove(id);
  console.log(result);
}

createCourse();
