// app.js
import { auth, db } from "./firebaseConfig.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc, getDocs, query, where } from "firebase/firestore";

const registerForm = document.getElementById('registerForm');
const studentSection = document.getElementById('studentSection');
const teacherSection = document.getElementById('teacherSection');
const subjectList = document.getElementById('subjectList');
const teacherSubjects = document.getElementById('teacherSubjects');

// Registro de usuario
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const userType = document.getElementById('userType').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guarda el tipo de usuario en Firestore
    await setDoc(doc(db, 'users', user.uid), {
      type: userType
    });

    // Redirecciona según el tipo de usuario
    if (userType === 'estudiante') {
      loadStudentSection();
    } else if (userType === 'profesor') {
      loadTeacherSection();
    }
  } catch (error) {
    console.error("Error en el registro: ", error);
  }
});

// Cargar sección de estudiante
async function loadStudentSection() {
  studentSection.style.display = 'block';
  teacherSection.style.display = 'none';

  const subjectsSnapshot = await getDocs(collection(db, 'subjects'));
  subjectsSnapshot.forEach((doc) => {
    const subject = doc.data();
    const li = document.createElement('li');
    li.textContent = subject.name;
    subjectList.appendChild(li);
  });
}

// Cargar sección de profesor
async function loadTeacherSection() {
  teacherSection.style.display = 'block';
  studentSection.style.display = 'none';

  const teacherId = auth.currentUser.uid;
  const q = query(collection(db, 'subjects'), where("teacherId", "==", teacherId));
  const teacherSubjectsSnapshot = await getDocs(q);

  teacherSubjectsSnapshot.forEach((doc) => {
    const subject = doc.data();
    const li = document.createElement('li');
    li.textContent = subject.name;
    teacherSubjects.appendChild(li);
  });
}

// Crear materia por profesor
const createSubjectForm = document.getElementById('createSubjectForm');
createSubjectForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const subjectName = document.getElementById('subjectName').value;
  const teacherId = auth.currentUser.uid;

  try {
    await setDoc(doc(collection(db, 'subjects')), {
      name: subjectName,
      teacherId: teacherId
    });
    alert("Materia creada exitosamente");
  } catch (error) {
    console.error("Error al crear materia: ", error);
  }
});
