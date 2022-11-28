import {default as rating} from '@mtucourses/rate-my-professors';
const { default: ratings} = rating
// const {ratings} = rating;
// import ratings from '@mtucourses/rate-my-professors';

const uncID = 'U2Nob29sLTEyMzI=';
const returnedKeys = [ "firstName", "lastName", "avgDifficulty", "avgRating"]

// teacher list for testing purposes, this is what we get from the user
const teacherList = ["kris jordan", "john martin", "brent munsell", "ketan mayer patel"]
// example endpoint: /app/getRatings/ for default arr of 3 teachers both get and post, /app/getDifficulty/ for default arr get and post, /app/ for 200 status, 404 not found
// add 2-3 endpoints for user database interactions and UI

const getRatingsForTeacher = async (teacherName) => {
    console.log("got here");
    const possibleTeachers = await ratings.searchTeacher(teacherName, uncID);
    if (!possibleTeachers.length) return {};

    const teacherId = possibleTeachers[0].id;
    const teacher = await ratings.getTeacher(teacherId);
  
    return Object
      .keys(teacher)
      .filter( key => returnedKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = teacher[key];
        return obj;
  }, {});

};

export async function getTeachers(namesArr) {
// export const getTeachers = async (namesArr) => {
  const rmpPromises = []
  // console.log("inside getTeachers");
  namesArr.forEach( name => rmpPromises.push(getRatingsForTeacher(name)))
  return Promise.allSettled(rmpPromises)
}

// for testing purposes
const run = async () => {
  const teacherData = await getTeachers(teacherList)
  console.log("got to run");
  console.log(teacherData);
}

run()

export async function computeDifficulty() {
  var sumOfDifficulty = 0
  data = await getTeachers(teacherList) 
  var length = 0

  for (let i = 0; i < teacherList.length; i++) {
    if (!isNaN(data[i].value.avgDifficulty))    {
      sumOfDifficulty += data[i].value.avgDifficulty;
      length +=1
    }
  }
  difficulty = (sumOfDifficulty / length);
  let difficultyR = difficulty.toFixed(2);

  return difficultyR;
}

// for testing purposes
const runDifficulty = async () => {
  const difficulty = await computeDifficulty();
  console.log("Average Difficulty")
  console.log(difficulty)
}

runDifficulty()

export async function computeRating(ratingExample) {
  var sumOfRating = 0
  const data = await getTeachers(teacherList) 
  var length = 0

  for (let i = 0; i < teacherList.length; i++) {
    if (!isNaN(data[i].value.avgRating))    {
      sumOfRating += data[i].value.avgRating;
      length +=1
    }
  }
  rating = (sumOfRating / length);
  let ratingR = rating.toFixed(2);
  return ratingR;
}

// for testing purposes
const runRating = async () => {
  const rating = await computeRating();
  console.log("Average Rating")
  console.log(rating)
}

runRating()

