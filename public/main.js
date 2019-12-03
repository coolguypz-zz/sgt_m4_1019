$(document).ready(initApp);

function initApp() {
    $("#add-student").click(submitFormData)
    getStudent();
}

function getStudent() {
  $.ajax({
    url:'/api/students',
    success: resp =>{
      addStudentToDom(resp.student);
    }
  })
}

function addStudentToDom(students) {
  const studentElement = [];
  const tbody = $('#student-data');
  tbody.text('');  // === tbody.empty();
  students.forEach(student => {
    const tr = $('<tr>');
    const name = $('<td>',{html : student.name});
    const course = $('<td>',{html : student.course});
    const grade = $('<td>',{html : student.grade});
    tr.append(name,course,grade);
    studentElement.push(tr);
  });
  tbody.append(studentElement)
}

function addStudent(name,course,grade) {
  $.ajax({
    method:'post',
    url:'api/students',
    data:{
      name,
      course,
      grade
    },
    success:(res)=>{
      getStudent();
    }
  })
}

function submitFormData(e) {
  if(e) e.preventDefault();
  const name = $("#name").val();
  const course = $("#course").val();
  const grade = $("#grade").val();
  addStudent(name,course,grade);
}