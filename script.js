var url =
  "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";

const tableBodyElement = document.getElementById("table-body");
const infoContentElement = document.getElementById("info-content");
const searchBoxInputElement = document.getElementById("search-box");

const init = async () => {
  // display info-content
  infoContentElement.style.display = "block";

  // delete hardcoded elements
  infoContentElement.innerHTML = "";
  tableBodyElement.innerHTML = "";
  const personDetails = await fetchPersonDetails();
  if (personDetails) {
    for (const person of personDetails) {
      const row = document.createElement("tr");
      row.className = "data-row";
      // destructuring person details
      const { id, firstName, lastName, email, phone, description, address } =
        person;

      row.addEventListener("click", () => {
        // remove active class from every row
        Array.from(tableBodyElement.children).forEach((child) => {
          child.classList.remove("active");
        });
        // make current row active
        row.classList.add("active");

        // delete previous elements
        infoContentElement.innerHTML = "";

        const divUserName = document.createElement("div");
        divUserName.innerHTML = `<b>User selected:</b> ${firstName} ${lastName}`;
        infoContentElement.appendChild(divUserName);

        const divDescription = document.createElement("div");
        divDescription.innerHTML = `<div><b>Description: </b><textarea cols="50" rows="5" readonly>${description}</textarea></div>`;
        infoContentElement.appendChild(divDescription);

        const divStreetAddress = document.createElement("div");
        divStreetAddress.innerHTML = `<div><b>Address:</b> ${address.streetAddress}</div>`;
        infoContentElement.appendChild(divStreetAddress);

        const divCity = document.createElement("div");
        divCity.innerHTML = `<div><b>City: </b> ${address.city}</div>`;
        infoContentElement.appendChild(divCity);

        const divState = document.createElement("div");
        divState.innerHTML = `<div><b>State: </b> ${address.state}</div>`;
        infoContentElement.appendChild(divState);

        const divZip = document.createElement("div");
        divZip.innerHTML = `<div><b>Zip: </b> ${address.zip}</div>`;
        infoContentElement.appendChild(divZip);
      });

      const col1 = document.createElement("td");
      col1.className = "column1 col1";
      col1.textContent = id;
      row.appendChild(col1);

      const col2 = document.createElement("td");
      col2.className = "column2 col2";
      col2.textContent = firstName;
      row.appendChild(col2);

      const col3 = document.createElement("td");
      col3.className = "column3 col3";
      col3.textContent = lastName;
      row.appendChild(col3);

      const col4 = document.createElement("td");
      col4.className = "column4 col4";
      col4.textContent = email;
      row.appendChild(col4);

      const col5 = document.createElement("td");
      col5.className = "column5 col5";
      col5.textContent = phone;
      row.appendChild(col5);

      tableBodyElement.appendChild(row);
    }
  }

  searchBoxInputElement.addEventListener("input", (event) => {
    if (event.target.value != "") {
      const columnsFirstName = document.getElementsByClassName("col2");
      const columnsLastName = document.getElementsByClassName("col3");
      const columnsEmail = document.getElementsByClassName("col4");

      const value = event.target.value.toLowerCase();
      Array.from([
        ...columnsFirstName,
        ...columnsLastName,
        ...columnsEmail,
      ]).forEach((column) => {
        column.parentElement.style.display = "none";
        if (column.textContent.toLowerCase().includes(value)) {
          column.parentElement.style.display = "block";
        }
      });
    }
  });
};

const fetchPersonDetails = async () => {
  const response = await fetch(url).catch((err) => console.log(err));
  if (response) {
    return response.json();
  }
  return response;
};

window.addEventListener("DOMContentLoaded", init);
