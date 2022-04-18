const searchNameFilter = document.querySelector("#search-name");
const searchAgeFilter = document.querySelector("#search-age");

const appendDataIntoTable = (data) => {
  const table = document.querySelector("#table");
  table.innerHTML = `
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Email</th>
      <th>Password</th>
      <th>Age</th>
    </tr>
  `;

  data.forEach(({ id, name, email, password, age }) => {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
      <td id=row-${id} class="student-id">${id}</td>
      <td>${name}</td>
      <td>${email}</td>
      <td>${password}</td>
      <td>${age}</td>
    `;
    table.appendChild(tableRow);

    const rowId = document.querySelector(`#row-${id}`);
    rowId.addEventListener("click", () => {
      getDataWithId(rowId.textContent);
    });
  });
};

const getData = async (key, value) => {
  try {
    const response = await fetch(
      key
        ? `http://localhost:5000/api/students?${key}=${value}`
        : "http://localhost:5000/api/students"
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getDataWithId = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/students/${id}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      appendDataIntoTable(data);
    }
  } catch (error) {
    console.log(error);
    return {};
  }
};

searchAgeFilter.addEventListener("change ", (event) => {
  dataFilter(`age`, event.target.value);
});

searchNameFilter.addEventListener("change", (event) => {
  dataFilter(`name`, event.target.value);
});

const dataFilter = async (key, value) => {
  const data = await getData(key, value);
  appendDataIntoTable(data);
};

dataFilter();
