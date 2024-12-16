const sidebar = document.getElementById('sidebar');
const toggleSidebar = document.getElementById('toggleSidebar');
const menuText = document.querySelectorAll('.menu-text');
const tBodyCours = document.querySelector("#tBodyCours");  
let allCours = [];
let professeurs = [];
let semestres = [];

document.addEventListener("DOMContentLoaded", async function() {
    async function fetchProfesseurs() {
        try {
            const response = await fetch('http://localhost:3000/Professeurs'); 
            const data = await response.json();
            professeurs = data;
        } catch (error) {
            console.error('Erreur lors de la récupération des professeurs:', error);
        }
    }

    async function fetchSemestres() {
        try {
            const response = await fetch('http://localhost:3000/Semestres'); 
            const data = await response.json();
            semestres = data;
        } catch (error) {
            console.error('Erreur lors de la récupération des semestres:', error);
        }
    }

    async function fetchCours() {
        try {
            const response = await fetch('http://localhost:3000/Cours'); 
            const data = await response.json();
            console.log('Cours reçus:', data);  
            allCours = data;
            await fetchProfesseurs();
            await fetchSemestres();
            listCours(allCours);  
        } catch (error) {
            console.error('Erreur lors de la récupération des cours:', error);
        }
    }

    function listCours(cours) {
        if (!tBodyCours) return; 
        tBodyCours.innerHTML = '';  

        cours.forEach(cour => {
            const prof = professeurs.find(p => p.idProf === cour.idProf);
            const semestre = semestres.find(s => s.idSemestre === cour.idSemestre);

            const row = document.createElement('tr');  
            row.innerHTML = `
                <td class="border border-gray-300 px-4 py-2">${cour.module}</td>
                <td class="border border-gray-300 px-4 py-2">${prof.nom}</td>
                <td class="border border-gray-300 px-4 py-2">${semestre.nom}</td>
                <td class="border border-gray-300 px-4 py-2 text-center">
                    <a href="sceance.html" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Voir Séances</a>
                </td>
            `;
            tBodyCours.appendChild(row); 
        });
    }

    fetchCours();  
});


toggleSidebar.addEventListener('click', () => {
  sidebar.classList.toggle('w-64');
  sidebar.classList.toggle('w-20');
  const icon = toggleSidebar.querySelector('i');
  icon.classList.toggle('bx-chevron-left');
  icon.classList.toggle('bx-chevron-right');

  menuText.forEach(text => {
    text.style.display = sidebar.classList.contains('w-64') ? 'inline' : 'none';
  });
});