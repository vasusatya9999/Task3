// get details
let studName = "";
let email = "";
let phone = "";
let branch = "";
let imgLink = "";
let gender = "";
let BID = "";

let male = document.getElementById("male");
let female = document.getElementById("female");
let other = document.getElementById("other");

let container = document.getElementById("listContainer");
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


male.checked = true;

document.getElementById("clear").addEventListener("click", clear);

function submit() {
  studName = document.getElementById("name").value;
  email = document.getElementById("email").value;
  phone = document.getElementById("phone").value;
  branch = document.getElementById("branch").value;
  imgLink = document.getElementById("imgLink").value;

  if (male.checked) {
    gender = "Male";
  } else if (female.checked) {
    gender = "Female";
  } else {
    gender = "Other";
  }

  if(!checkValidity()) return;

  let date = new Date();
  let full_time = "Regitered on " + monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " at " + date.getHours() + ":" + date.getMinutes();
  BID = "BID" + date.getFullYear()+FormatDigit(date.getMonth())+FormatDigit(date.getDate())+FormatDigit(date.getHours())+FormatDigit(date.getMinutes())+FormatDigit(date.getSeconds())+FormatDigit(date.getMilliseconds());

  let ul = document.createElement("ul");
  ul.className = "list";
  let li_name = document.createElement("li");
  let li_branch = document.createElement("li");
  let li_gender = document.createElement("li");
  let li_phone = document.createElement("li");
  let li_email = document.createElement("li");
  let li_img = document.createElement("li");
  let li_time = document.createElement("li");
  let li_btn = document.createElement("li");

  container.appendChild(ul);

  li_name.innerHTML = studName;
  li_branch.innerHTML = branch;
  li_gender.innerHTML = gender;
  li_phone.innerHTML = phone;
  li_email.innerHTML = email;
  li_time.innerHTML = full_time;

  ul.appendChild(li_name);
  ul.appendChild(li_branch);
  ul.appendChild(li_gender);
  ul.appendChild(li_phone);
  ul.appendChild(li_email);

  let img = document.createElement("img");
  img.src = imgLink;
  img.alt = "Image Not given!";
  li_img.appendChild(img);
  
  ul.appendChild(li_img);
  ul.appendChild(li_time);

  let btn = document.createElement("button");
  btn.innerHTML = "Remove";
  btn.id = BID;
  btn.className = "removebtn"
  li_btn.appendChild(btn); 
  ul.appendChild(li_btn);

  saveData();
  clear();
  getID();
}

function FormatDigit(n) {
  if (n < 10) return "0"+n;
  if (n < 100) return "00"+n;
  return n;
}

function checkValidity() {
  if (studName == "" || email == "" || phone == "" || branch == "" || imgLink == "" || gender == "") {
    alert("Please fill all the data!");
    
    switch("") {
        case studName: 
                document.getElementById("name").focus();
                break;
        
                case email: 
                document.getElementById("email").focus();
                break;

                case phone: 
                document.getElementById("phone").focus();
                break;

                case branch: 
                document.getElementById("branch").focus();
                break;

                case imgLink: 
                document.getElementById("imgLink").focus();
                break;
    }
    return false;
  }
  return true;
}

function clear() {
  BID = "";
  male.checked = true;
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("branch").value = "";
  document.getElementById("imgLink").value = "";
}

function getID() {
  Array.from(document.getElementsByClassName("removebtn")).forEach(element => {
      document.getElementById(element.id).addEventListener("click", function(e) {
        container.removeChild(this.parentNode.parentNode);
        saveData();
      }, false);
  });
}

function saveData() {
  window.localStorage.setItem("registration", container.innerHTML);
}

saveData();
let content = window.localStorage.getItem("registration");
if (content.trim()+"" == "") {
  container.innerHTML = '<div class="title">Registered Student List</div>';
}
container.innerHTML = window.localStorage.getItem("registration");
getID();