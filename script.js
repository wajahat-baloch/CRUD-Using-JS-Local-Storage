function validateForm() {
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let address = document.getElementById("address").value;
  let email = document.getElementById("email").value;

  if (name.trim() === "") {
    alert("Name is required");
    return false;
  }

  if (age.trim() === "") {
    alert("Age is required");
    return false;
  } else if (isNaN(age) || parseInt(age) < 1) {
    alert("Age must be a valid positive number");
    return false;
  }

  if (address.trim() === "") {
    alert("Address is required");
    return false;
  }

  if (email.trim() === "") {
    alert("Email is required");
    return false;
  } else if (!email.includes("@")) {
    alert("Invalid email address");
    return false;
  }

  return true;
}

function showData() {
  var peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];

  var html = "";
  peopleList.forEach(function (element, index) {
    html += '<tr data-index="' + index + '">'; // Add data-index attribute
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.age + "</td>";
    html += "<td>" + element.address + "</td>";
    html += "<td>" + element.email + "</td>";
    html +=
      '<td><button onclick="deleteData(' +
      index +
      ')" class="deleteBtn">Delete</button> <button onclick="updateData(' +
      index +
      ')" class="updateBtn">Edit</button></td>';
    html += "</tr>";
  });

  document.querySelector("#crudTable tbody").innerHTML = html;
}

function addData() {
  if (validateForm()) {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;

    var peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];

    peopleList.push({
      name: name,
      age: age,
      address: address,
      email: email,
    });
    localStorage.setItem("peopleList", JSON.stringify(peopleList));

    showData();
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";
  }
}

window.onload = showData();

function deleteData(index) {
  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  peopleList.splice(index, 1);
  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  showData();
}

function updateData(index) {
  document.getElementById("Submit").style.display = "none";
  document.getElementById("Update").style.display = "block";

  var peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];

  document.getElementById("name").value = peopleList[index].name;
  document.getElementById("age").value = peopleList[index].age;
  document.getElementById("address").value = peopleList[index].address;
  document.getElementById("email").value = peopleList[index].email;

  // Remove the previous event listener
  document.getElementById("Update").removeEventListener("click", updateData);

  // Set the event listener for the update button
  document.getElementById("Update").addEventListener("click", function () {
    if (validateForm()) {
      peopleList[index].name = document.getElementById("name").value;
      peopleList[index].age = document.getElementById("age").value;
      peopleList[index].address = document.getElementById("address").value;
      peopleList[index].email = document.getElementById("email").value;

      localStorage.setItem("peopleList", JSON.stringify(peopleList));
      showData();

      document.getElementById("name").value = "";
      document.getElementById("age").value = "";
      document.getElementById("address").value = "";
      document.getElementById("email").value = "";

      document.getElementById("Submit").style.display = "block";
      document.getElementById("Update").style.display = "none";
    }
  });
}
