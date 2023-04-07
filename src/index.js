// Import the functions you need from the SDKs you need
import {txtDate, txtOdometer, btnOdoSubmit} from "./ui";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc,arrayUnion, arrayRemove, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
//import { collection, query, where, getDocs } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlI5qyObXliGIxTlT1Ygjg32LExFRWZWQ",
  authDomain: "numeric-skill-366019.firebaseapp.com",
  projectId: "numeric-skill-366019",
  storageBucket: "numeric-skill-366019.appspot.com",
  messagingSenderId: "99449098930",
  appId: "1:99449098930:web:51268f9c92ff92ab83afab",
  measurementId: "G-JM0XWZWG1X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
console.log('Welcome Firestore!');

//date objects
const monthsFullName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthsStringNum =["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const currentDate = new Date();
console.log(currentDate);
console.log(currentDate.getFullYear());
console.log(monthsFullName[currentDate.getMonth()]);
console.log(currentDate.getDate());
const currentMonthString = monthsFullName[currentDate.getMonth()];
const currentMonthNum = currentDate.getMonth()
const currentDay = currentDate.getDate();
const currentYear = currentDate.getFullYear();


//sarting directory for vechile
//future plans, start with directory, the Info will end up being Vehicle vin which will need to come from the users vechile assingment doc
var dbDirectory = "Vehicle/Info/Odometer";


//function for writing to db
const writeOdoRecord = async () => {
  const odoReading = txtOdometer.value;
  const odoDate = txtDate.value;

  //breaks up the date input into needed parts
  const year = odoDate.substring(0,4);//gets the year
  const month = odoDate.substring(5,7);//gets the month
  const day = odoDate.substring(8);

  console.log("ParseInt test: " + parseInt(month));
  console.log("Num name conversion test: " + monthsFullName[parseInt(month)-1]);

  let getMonthNum = 0;

  for(getMonthNum=0; getMonthNum<12; getMonthNum++)
  {
    if(monthsStringNum[getMonthNum] == month)
    {
      console.log("Getmonthnum: " + getMonthNum);
      break;
    }
  }
  console.log("year: " + year);
  console.log("currentYear: " + currentYear);
  console.log("Getmonthnum: " + getMonthNum);
  console.log("currentMonthNum: " + currentMonthNum);
  console.log("day: " + day);
  console.log("currentDay: " + currentDay);
  console.log(year <= currentYear && (getMonthNum <= currentMonthNum && day <= currentDay));
  
  
  if(year <= currentYear && (getMonthNum <= currentMonthNum && day <= currentDay)){

  dbDirectory = dbDirectory + "/" + year;//adds the year value to point to the right document
  const odometerrecord = doc(firestore, dbDirectory);

  //Calls function to read current doc to see if an entry was made for that date
  //if no date is found then continue
  //if entry is found then prompt user to update or stop

  if(checkForIncreasingOdo(odometerrecord,month, day, odoReading)){

  //empty object to write to database
  let  docData = {};

 //if else structure to update the correct the array with the day-odometer reading
  if(month == "01"){
    console.log("Jan entered!");
  docData={
    January: arrayUnion(day+"-"+odoReading),
    
  };
  }
  else if(month == "02")
  {
    console.log("Feb entered!");
    docData={
      February: arrayUnion(day+"-"+odoReading),
      
    };
  }
  else if(month == "03")
  {
    console.log("Mar entered!");
    docData={
      March: arrayUnion(day+"-"+odoReading),
      
    };
  }
  else if(month == "04")
  {
    console.log("Apr entered!");
    docData={
      April: arrayUnion(day+"-"+odoReading),
      
    };
  }
  else if(month == "05")
  {
    console.log("May entered!");
    docData={
      May: arrayUnion(day+"-"+odoReading),
      
    };
  }
  else if(month == "06")
  {
    console.log("Jun entered!");
    docData={
      June: arrayUnion(day+"-"+odoReading),
      
    };
  }
  else if(month == "07")
  {
    console.log("Jul entered!");
    docData={
      July: arrayUnion(day+"-"+odoReading),
      
    };
  }
  else if(month == "08")
  {
    console.log("Aug entered!");
    docData={
      August: arrayUnion(day+"-"+odoReading),
      
    };
  }
  else if(month == "09")
  {
    console.log("Sep entered!");
    docData={
      September: arrayUnion(day+"-"+odoReading),
      
    };
  }
  else if(month == "10")
  {
    console.log("Oct entered!");
    docData={
      October: arrayUnion(day+"-"+odoReading),
      
    };
  }
  else if(month == "11")
  {
    console.log("Nov entered!");
    docData={
      November: arrayUnion(day+"-"+odoReading),
      
    };
  }
  else if(month == "12")
  {
    console.log("Dec entered!");
    docData={
      December: arrayUnion(day+"-"+odoReading),
      
    };
  }

  checkForSameDate(odometerrecord,month, day, odoReading);

    try {
     await updateDoc(odometerrecord, docData);
     
     //reset directory
     dbDirectory = "Vehicle/Info/Odometer";

   }
   catch(error) {
     console.log(`There was an error: ${error}`)
     showLoginError(error)
   }
  }
  else{
    alert("Invaild odometer input");
  }
  }
  else{
    alert("Invaild input");
  }
  //GetDocTest();

}

//listener for button to activate write function
btnOdoSubmit.addEventListener("click", writeOdoRecord);

async function checkForSameDate(odometerrecord,month, day, odoReading){
  const docSnap = await getDoc(odometerrecord);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    const obdjectdata = docSnap.data();
    //alert(Object.keys(obdjectdata)[0]);
    const montharray = obdjectdata[monthsFullName[parseInt(month)-1]];

    for(var x = 0; x<montharray.length; x++)
    {
      if(montharray[x].substring(0,2) == day && montharray[x] != day+"-"+odoReading)
      {
        alert("Previous Record being removed");
        if(month == "01"){
        await updateDoc(odometerrecord, {January: arrayRemove(montharray[x])});
        }
        else if (month == "02"){
          await updateDoc(odometerrecord, {February: arrayRemove(montharray[x])});
        }
        else if (month == "03"){
          await updateDoc(odometerrecord, {March: arrayRemove(montharray[x])});
        }
        else if (month == "04"){
          await updateDoc(odometerrecord, {April: arrayRemove(montharray[x])});
        }
        else if (month == "05"){
          await updateDoc(odometerrecord, {May: arrayRemove(montharray[x])});
        }
        else if (month == "06"){
          await updateDoc(odometerrecord, {June: arrayRemove(montharray[x])});
        }
        else if (month == "07"){
          await updateDoc(odometerrecord, {July: arrayRemove(montharray[x])});
        }
        else if (month == "08"){
          await updateDoc(odometerrecord, {August: arrayRemove(montharray[x])});
        }
        else if (month == "09"){
          await updateDoc(odometerrecord, {September: arrayRemove(montharray[x])});
        }
        else if (month == "10"){
          await updateDoc(odometerrecord, {October: arrayRemove(montharray[x])});
        }
        else if (month == "11"){
          await updateDoc(odometerrecord, {November: arrayRemove(montharray[x])});
        }
        else if (month == "12"){
          await updateDoc(odometerrecord, {December: arrayRemove(montharray[x])});
        }
        break;
      }
    }

    //odooutput.innerHTML = `You're odometer reading is ${obdjectdata["Odometer"]}`
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

async function checkForIncreasingOdo(odometerrecord,month, day, odoReading){
  const docSnap = await getDoc(odometerrecord);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    const obdjectdata = docSnap.data();
    //alert(Object.keys(obdjectdata)[0]);
    const montharray = obdjectdata[monthsFullName[parseInt(month)-1]];
    let previousDay = -1;
    let arraypos = -1;

    for(let x =0; x < montharray.length; x++){
      if(parseInt(montharray[x].substring(0,2)) < parseInt(day) && parseInt(montharray[x].substring(0,2)) > previousDay){
        previousDay = parseInt(montharray[x].substring(0,2));
        arraypos = x;
      }
    }

    if(parseInt(montharray[arraypos].substring(3)) <= parseInt(odoReading))
    {
      return true;
    }
    else{
      return false;
    }

  } 
  else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return false;
  }
}

getVehicle();

getUsers();
//GetDocTest();

vin ="";

//Get vehicle
async function getVehicle() {
  const db = admin.firestore();
  const querySnapshot = await db.collection("Vehicle").get();
  info = querySnapshot.data();
  console.log("Document data:" + info);
  //const info = querySnapshot.docs.map((doc) => { return doc.id });
  return info;
}

exports.yourFunction = functions.http.onRequest(async (req, res) => {
  res.send(await getUids());
});

/*
//Get User test 1
async function getUsers() {
  const db = admin.firestore();
  const querySnapshot = await db.collection("Users").get();
  info = querySnapshot.data();
  console.log("Document data:" + info);
  //const info = querySnapshot.docs.map((doc) => { return doc.id });
  return info;
}

exports.yourFunction = functions.http.onRequest(async (req, res) => {
  res.send(await getUids());
});
*/

/*
//Get user test 2
async function getUsers(){

  const q = query(collection(db, "Users"), where("Fname", "==", "Michael"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  });
}
*/

//Get test 3
const username = document.getElementById('username');
const about = document.getElementById('about');
const btn = document.getElementById('btn');

async function getUsers(){
  const lists = document.getElementById("lists");

db.collection("Users")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      let li = document.createElement("li");
      let Fname = document.createElement("h1");
      let Lname= document.createElement("h1");
      let vehicleVIN = document.createElement("p")

      Fname.textContent = doc.data().Fname;
      Lname.textContent = doc.data().Lname;
      vehicleVIN.textContent = doc.data().vehicleVIN;

      li.appendChild(Fname);
      li.appendChild(Lname);
      li.appendChild(vehicleVIN);

      lists.appendChild(li);
    });
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });
}