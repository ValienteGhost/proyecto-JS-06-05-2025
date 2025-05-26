const students = [];
let editIndex = null; // Nuevo: para saber si estamos editando

const tablebody = document.querySelector("#studentstable tbody");
const promedioDiv = document.getElementById("promedio");

function addStudentToTable(student, index) {
    // Formatear fecha a dd-mm-aaaa
    const [year, month, day] = student.fecha.split("-");
    const fechaFormateada = `${day}-${month}-${year}`;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastname}</td>
        <td>${fechaFormateada}</td>
        <td>${student.grade}</td>
        <td>
            <button class="action-btn edit-btn" data-index="${index}">Editar</button>
            <button class="action-btn delete-btn" data-index="${index}">Eliminar</button>
        </td>
    `;
    tablebody.appendChild(row);
}

function renderTable() {
    tablebody.innerHTML = "";
    students.forEach((student, index) => {
        addStudentToTable(student, index);
    });
    addDeleteEvents();
    addEditEvents();
}

function addDeleteEvents() {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(btn => {
        btn.onclick = function() {
            const idx = parseInt(this.getAttribute("data-index"));
            students.splice(idx, 1);
            renderTable();
            calcularpromedio();
        }
    });
}

function addEditEvents() {
    const editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach(btn => {
        btn.onclick = function() {
            const idx = parseInt(this.getAttribute("data-index"));
            const student = students[idx];
            document.getElementById("name").value = student.name;
            document.getElementById("lastname").value = student.lastname;
            document.getElementById("fecha").value = student.fecha;
            document.getElementById("grade").value = student.grade;
            editIndex = idx;
        }
    });
}

document.getElementById("studentform").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const fecha = document.getElementById("fecha").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);

    if (grade < 1 || grade > 7 || !name || !lastname || isNaN(grade)) {
        alert("error al ingresar los datos");
        return;
    }

    const student = { name, lastname, fecha, grade };

    if (editIndex !== null) {
        // Editar estudiante existente
        students[editIndex] = student;
        editIndex = null;
    } else {
        // Agregar nuevo estudiante
        students.push(student);
    }
    renderTable();
    calcularpromedio();
    this.reset();
});

function calcularpromedio() {
    if (students.length === 0) {
        promedioDiv.innerText = "El promedio del curso o estudiante/s es: 0.00";
        return;
    }
    const total = students.reduce((nota, student) => nota + student.grade, 0);
    const average = total / students.length;
    promedioDiv.innerText = `El promedio del curso o estudiante/s  es: ${average.toFixed(2)}`;
}

/* Forma alternativa de calcular el promedio
function calcularPromedio(){
    let suma = 0;
    for (const student of students){
    suma += student.grade;
}
    const count = students.length;
    const promedio = suma / count;
    console.log(promedio);
    averageDiv.textContent = "Promedio General del Curso :" +promedio;

}*/
