// reference taken from https://github.com/ihechikara/firebase-firestore-tutorial/blob/getData/app.js

//Get test 3
const username = document.getElementById('username');
const about = document.getElementById('about');
const btn = document.getElementById('btn');
const lists = document.getElementById("lists");
const conDocName ="";


const vehData = db.collection("Vehicles")



async function getUsers(){
db.collection("Users")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // nest if statement for sub collection:
      let li = document.createElement("li");
      let DocNo = document.createElement("h1");
      let Fname = document.createElement("p");
      let Lname= document.createElement("p");
      let Status = document.createElement("p");
      let vehicleVIN = document.createElement("p");

      DocNo.textContent = doc.id;
      Fname.textContent = doc.data().Fname;
      Lname.textContent = doc.data().Lname;
      Status.textContent = doc.data().Status;
      vehicleVIN.textContent = doc.data().vehicleVIN;

      li.appendChild(DocNo);
      li.appendChild(Fname);
      li.appendChild(Lname);
      li.appendChild(Status);
      li.appendChild(vehicleVIN);


      lists.appendChild(li);
    });
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });
}

async function getVehicle(){
    db.collection("Vehicle")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      let vehli = document.createElement("li");
      let DocId = document.createElement("h1"); 
      let Allotment = document.createElement("p");
      let CurrentOdo = document.createElement("p");
      let Location = document.createElement("p");
      let Make = document.createElement("p");
      let MissionID = document.createElement("p");
      let Model = document.createElement("p");
      let Year = document.createElement("p");

      //name of document
      DocId.textContent = doc.id;
      //fields in document
      Allotment.textContent = doc.data().Allotment;
      CurrentOdo.textContent = doc.data().CurrentOdo;
      Location.textContent = doc.data().Location;
      Make.textContent = doc.data().Make;
      MissionID.textContent = doc.data().MissionID;
      Model.textContent = doc.data().Model;
      Year.textContent = doc.data().Year;
  

      
      vehli.appendChild(DocId);
      vehli.appendChild(Allotment);
      vehli.appendChild(CurrentOdo); 
      vehli.appendChild(Location); 
      vehli.appendChild(Make); 
      vehli.appendChild(MissionID); 
      vehli.appendChild(Model); 
      vehli.appendChild(Year); 

      lists.appendChild(vehli);
    });
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });
}


async function getDocOdometer(){
  const querySnapshot = await db
  .collection('Vehicle/vin1234/Odometer')
    .doc('2023')
    .get()
    .then((value) => {
        readList = value.data()["March"];

        //for(i=0;i<value.data()["March"].length)

        let li = document.createElement("li");
        let docArr = document.createElement("p");
        docArr.textContent = readList;

        li.appendChild(docArr);
        lists.appendChild(li);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  }

  async function populateSelect(){

    var clearlist = document.getElementById("selectVehicle");//looks for ID to print to
    clearlist.innerHTML = ""; //clears list

  db.collection("Vehicle")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
    
   
     var docName = doc.id;
     //conDocName = docName;
    var completeSelect = document.getElementById("selectVehicle");//looks for ID to print to
        completeSelect.innerHTML += "<option>" + docName+ "</option>";//appends list with new value

        console.log(docName);
    });
  });

  vehOutput = document.getElementById("vehicleInfo");
  if(vehOutput.value==conDocName){
  
  vehOutput = getVehicle();
}
}


//Taken from https://www.w3schools.com/howto/howto_js_filter_lists.asp



//FOR Query by LIST
function myList() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("selectVehicle");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

//FOR QUERY BY DROP Down
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}


function populateList()
{



  db.collection("Vehicle")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
    
      var docMission = doc.data().MissionID;
      var docYear = doc.data().Year;
     var docName = doc.data().Make;
     var docName2 = doc.data().Model;
     var docName3 = doc.data().In_Fleet;
     docVin = doc.data().vehicleVIN;
     
     //conDocName = docName;

     if(docName3=="yes"){ // for checking specific fields

    var completeQue = document.getElementById("selectVehicle");//looks for ID to print to
        completeQue.innerHTML += "<li id="+doc+"><a>" +docMission + ":" + " " + docYear + " " + docName+ " " + docName2 + "</a></li>";//appends list with new value

        if(completeQue.getElementsByTagName("li").addEventListener("click", isSelected())){
        console.log(docName);
     
        }
      } // end if

    });
  });

}


function populateDropDown()
{

  var completeQue = document.getElementById("myDropdown");//looks for ID to print to
  db.collection("Vehicle")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
    
      var docMission = doc.data().MissionID;
      var docYear = doc.data().Year;
     var docName = doc.data().Make;
     var docName2 = doc.data().Model;
     var docName3 = doc.data().In_Fleet;
     
     //conDocName = docName;

     //if(docName3=="yes"){ // for checking specific fields

    
    completeQue.innerHTML += "<li id="+doc+" onclick=isSelected()><a>" +docMission + ":" + " " + docYear + " " + docName+ " " + docName2 + "</a></li>";//appends list with new value

     
     // } // end if

    });


  });

}

 async function isSelected(){
    //db.collection("Vehicle").get();

      //const docSnap = await getDoc(vehData);
 const testQuery =admin.firestore(vehData, where(vehData.doc, "==", getElementById(vehData.data.doc)));
    

  document.getElementById("testQuery").innerHTML += testQuery.doc;
  }
