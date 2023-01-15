let row = document.querySelector('.row'); // elements with class row are selected
let studentsDetails = document.querySelector('.students-details'); // elements with class students-details are selected

// Mean Score Calculator Function should be mean of midterm(40%) and final(60%) scores
function meanScoreCalculator(midtermScore, finalScore) {
    meanScore = (midtermScore * 0.4) + (finalScore * 0.6);
    return meanScore;
}

// Letter Grade Calculator Function should be A, B, C, D, F according to point scale A > 90, B > 80, C > 70, D > 60, F < 60 or A >93, B > 85, C > 77, D > 69, F < 69 
function letterGradeCalculator(meanScore, pointScale=7) { // pointScale should be optional
    if (pointScale === 7) {
        if (meanScore >= 93) {
            return 'A';
        } else if (meanScore >= 85) {
            return 'B';
        } else if (meanScore >= 77) {
            return 'C';
        } else if (meanScore >= 69) {
            return 'D';
        } else {
            return 'F';
        }
    }
    else if (pointScale === 10) {
        if (meanScore >= 90) {
            return 'A';
        } else if (meanScore >= 80) {
            return 'B';
        } else if (meanScore >= 70) {
            return 'C';
        } else if (meanScore >= 60) {
            return 'D';
        } else {
            return 'F';
        }
    }
    else {
        console.error('Please choose a 10 or 7 point scale');
    }
}

// Is Failed Function should be true or false according to letter grade
function isFailed(letterGrade) {
    if (letterGrade === 'F') {
        return true;
    } else {
        return false;
    }
}


let Student = function (studentId, studentName, studentSurname, midtermScore, finalScore) { // Student Constructor Function 
    this.studentId = studentId;  
    this.studentName = studentName;
    this.studentSurname = studentSurname;
    this.midtermScore = midtermScore;
    this.finalScore = finalScore;
    this.meanScore = meanScoreCalculator(this.midtermScore, this.finalScore); // meanScoreCalculator function is called
    this.letterGrade = letterGradeCalculator(this.meanScore); // letterGradeCalculator function is called
    this.failed = isFailed(this.letterGrade); // isFailed function is called

}


// a student list, new student is added to the list
const studentList = [
];


function loadTheStudents(){
    studentsDetails.innerHTML = ''; // studentsDetails is cleared before loading the students again to prevent duplication of students in the list 
    studentList.forEach((student) => {  // studentList is iterated and students are loaded to the list 
        let row = document.createElement('div'); // a new row is created for each student 
        row.classList.add('row'); // row is added to the class list of the row element 
        studentsDetails.appendChild(row); // row is added to the studentsDetails element 
    
        let studentId = document.createElement('p'); 
        studentId.classList.add('student-id'); 
        row.appendChild(studentId);
    
        let studentName = document.createElement('p');
        studentName.classList.add('student-name');
        row.appendChild(studentName);
    
        let studentSurname = document.createElement('p');
        studentSurname.classList.add('student-surname');
        row.appendChild(studentSurname);
    
        let midtermScore = document.createElement('p');
        midtermScore.classList.add('midterm-score');
        row.appendChild(midtermScore);
    
        let finalScore = document.createElement('p');
        finalScore.classList.add('final-score');
        row.appendChild(finalScore);
    
        let meanScore = document.createElement('p');
        meanScore.classList.add('mean-score');
        row.appendChild(meanScore);
    
        let letterGrade = document.createElement('p');
        letterGrade.classList.add('letter-grade');
        row.appendChild(letterGrade);
    
        let failed = document.createElement('p');
        failed.classList.add('failed');
        row.appendChild(failed);

        studentId.innerText = student.studentId;
        studentName.innerText = student.studentName;
        studentSurname.innerText = student.studentSurname;
        midtermScore.innerText = student.midtermScore;
        finalScore.innerText = student.finalScore;
        meanScore.innerText = student.meanScore;
        letterGrade.innerText = student.letterGrade;
        failed.innerText = student.failed;


    });
}


document.getElementById("student-form").addEventListener("submit", function(e){ // student-form is submitted to add a new student to the list 
    e.preventDefault(); // prevent the default behaviour of the form 
    

    let studentId = document.getElementsByClassName("student-id-input")[0].value; // studentId is taken from the student-id-input element
    let studentName = document.getElementsByClassName("student-name-input")[0].value; 
    let studentSurname = document.getElementsByClassName("student-surname-input")[0].value;
    let midtermScore = document.getElementsByClassName("student-midterm-input")[0].value;
    let finalScore = document.getElementsByClassName("student-final-input")[0].value;
    let newStudent = new Student(studentId, studentName, studentSurname, midtermScore, finalScore); // newStudent is created with the values taken from the form 
    // preventing the adding of a new student if the student id is already in the list
    let isStudentIdExist = studentList.some(student => student.studentId === newStudent.studentId); // isStudentIdExist is true if the student id is already in the list 
    if (isStudentIdExist) { // if the student id is already in the list, the new student is not added to the list
        alert('This student id is already exist');
        return;
    }

    studentList.push(newStudent); // newStudent is added to the studentList
    loadTheStudents();
    
});
loadTheStudents();



// Lecture
let lectureRow = document.querySelector('.lectureRow'); // lectureRow is selected from the lectureRow class
let lecturesDetails = document.querySelector('.lectures-details'); // lecturesDetails is selected from the lectures-details class

let Lecture = function (lectureId, lectureName) { // Lecture is created with lectureId and lectureName parameters 
    this.lectureId = lectureId;
    this.lectureName = lectureName;
    this.studentList = []; // studentList is created as an empty array 
    this.numberOfStudents = this.studentList.length;
    this.numberOfStudentsFailed = this.studentList.filter(student => student.failed).length; 
    this.numberOfStudentsPassed = this.studentList.filter(student => !student.failed).length;
    this.meanOfStudents = this.studentList.reduce((sum, student) => sum + student.meanScore, 0) / this.studentList.length;

}

const lectureList = []; // lectureList is created as an empty array 

function loadTheLectures(){ // loadTheLectures function is created to load the lectures to the lectureRow element 
    lecturesDetails.innerHTML = ''; // lecturesDetails is emptied  
    lectureList.forEach((lecture) => { // forEach method is used to iterate over the lectureList array 
        let lectureRow = document.createElement('div'); // lectureRow is created as a div element
        lectureRow.classList.add('lectureRow'); // lectureRow is added to the lectureRow class 

        lecturesDetails.appendChild(lectureRow); // lectureRow is added to the lecturesDetails element 

        let lectureId = document.createElement('p'); 
        lectureId.classList.add('lecture-id');
        lectureRow.appendChild(lectureId);

        let lectureName = document.createElement('p');
        lectureName.classList.add('lecture-name');
        lectureRow.appendChild(lectureName);
        
        let numberOfStudents = document.createElement('p');
        numberOfStudents.classList.add('number-of-students');
        lectureRow.appendChild(numberOfStudents);

        let numberOfStudentsFailed = document.createElement('p');
        numberOfStudentsFailed.classList.add('number-of-students-failed');
        lectureRow.appendChild(numberOfStudentsFailed);

        let numberOfStudentsPassed = document.createElement('p');
        numberOfStudentsPassed.classList.add('number-of-students-passed');
        lectureRow.appendChild(numberOfStudentsPassed);

        let meanOfStudents = document.createElement('p');
        meanOfStudents.classList.add('mean-of-students');
        lectureRow.appendChild(meanOfStudents);

        lectureId.innerText = lecture.lectureId;
        lectureName.innerText = lecture.lectureName;
        numberOfStudents.innerText = lecture.numberOfStudents;
        numberOfStudentsFailed.innerText = lecture.numberOfStudentsFailed;
        numberOfStudentsPassed.innerText = lecture.numberOfStudentsPassed;
        meanOfStudents.innerText = lecture.meanOfStudents;
    });
}

document.getElementById("lecture-form").addEventListener("submit", function(e){ // lecture-form is selected and submit event is listened 
    e.preventDefault(); // prevent the default behaviour of the form 
    let lectureId = document.getElementsByClassName("lecture-id-input")[0].value; // lectureId is taken from the lecture-id-input element 
    let lectureName = document.getElementsByClassName("lecture-name-input")[0].value;
    let newLecture = new Lecture(lectureId, lectureName);
    let isLectureIdExist = lectureList.some(lecture => lecture.lectureId === newLecture.lectureId); // isLectureIdExist is true if the lecture id is already in the list
    if (isLectureIdExist) {
        alert('This lecture id is already exist');
        return;
    }
    lectureList.push(newLecture);
    loadTheLectures();

});
 
loadTheLectures();


let addStudentToLecture = function (studentId, lectureId) { 
    let student = studentList.find(student => student.studentId === studentId); // is there a student with the studentId in the studentList
    let lecture = lectureList.find(lecture => lecture.lectureId === lectureId); // is there a lecture with the lectureId in the lectureList
    lecture.studentList.push(student); // student is added to the lecture.studentList array
    lecture.numberOfStudents = lecture.studentList.length; // assign the length of the lecture.studentList array to lecture.numberOfStudents
    lecture.numberOfStudentsFailed = lecture.studentList.filter(student => student.failed).length; // assign the number of failed students to lecture.numberOfStudentsFailed
    lecture.numberOfStudentsPassed = lecture.studentList.filter(student => !student.failed).length; // assign the number of passed students to lecture.numberOfStudentsPassed
    lecture.meanOfStudents = lecture.studentList.reduce((sum, student) => sum + student.meanScore, 0) / lecture.studentList.length; // assign the mean of the students to lecture.meanOfStudents
    loadTheLectures();
}

document.getElementById("add-student-to-lecture-form").addEventListener("submit", function(e){ // add-student-to-lecture-form is selected and submit event is listened
    e.preventDefault(); // prevent the default behaviour of the form
    let studentId = document.getElementsByClassName("student-id-input")[0].value; // take the studentId from the student-id-input element
    let lectureId = document.getElementsByClassName("lecture-id-input")[0].value; // take the lectureId from the lecture-id-input element

    // prevent the user from adding a student to a lecture twice
    let isStudentExist = lectureList.some(lecture => lecture.studentList.some(student => student.studentId === studentId)); // isStudentExist is true if the student is already in the lecture
    if (isStudentExist) {
        alert('This student is already exist in this lecture');
        return;
    }
    
    addStudentToLecture(studentId, lectureId); // call the addStudentToLecture function with the studentId and lectureId parameters
   
   
});















