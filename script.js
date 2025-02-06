document.addEventListener("DOMContentLoaded", function () {
    let projects = [
        { name: "Andi Setiawan", client: "andi.setiawan@gmail.com", status: "Dibekukan", saldo: 5200000 },
        { name: "Budi Santoso", client: "budi.santoso@gmail.com", status: "Dibekukan", saldo: 8750000 },
        { name: "Citra Dewi", client: "citra.dewi@gmail.com", status: "Dibekukan", saldo: 6400000 },
        { name: "Dewi Lestari", client: "dewi.lestari@gmail.com", status: "Dibekukan", saldo: 7300000 },
        { name: "Eko Prasetyo", client: "eko.prasetyo@gmail.com", status: "Dibekukan", saldo: 9100000 },
        { name: "Fajar Nugroho", client: "fajar.nugroho@gmail.com", status: "Dibekukan", saldo: 4800000 },
        { name: "Gita Rahmawati", client: "gita.rahmawati@gmail.com", status: "Dibekukan", saldo: 6000000 },
        { name: "Hendra Wijaya", client: "hendra.wijaya@gmail.com", status: "Dibekukan", saldo: 7500000 },
        { name: "Intan Permatasari", client: "intan.permatasari@gmail.com", status: "Dibekukan", saldo: 8200000 },
        { name: "Joko Susanto", client: "joko.susanto@gmail.com", status: "Dibekukan", saldo: 3900000 },
        { name: "Kiki Amalia", client: "kiki.amalia@gmail.com", status: "Dibekukan", saldo: 5600000 },
        { name: "Lina Sari", client: "lina.sari@gmail.com", status: "Dibekukan", saldo: 7100000 },
        { name: "Maya Indah", client: "maya.indah@gmail.com", status: "Dibekukan", saldo: 8400000 },
        { name: "Nina Kurniawati", client: "nina.kurniawati@gmail.com", status: "Dibekukan", saldo: 9200000 },
        { name: "Omar Hidayat", client: "omar.hidayat@gmail.com", status: "Dibekukan", saldo: 6700000 },
        { name: "Putri Ayu", client: "putri.ayu@gmail.com", status: "Dibekukan", saldo: 5300000 },
        { name: "Rudi Hartono", client: "rudi.hartono@gmail.com", status: "Dibekukan", saldo: 8000000 },
        { name: "Siti Nurhaliza", client: "siti.nurhaliza@gmail.com", status: "Dibekukan", saldo: 4500000 },
        { name: "Tina Melati", client: "tina.melati@gmail.com", status: "Dibekukan", saldo: 6000000 },
        { name: "Umar Faruq", client: "umar.faruq@gmail.com", status: "Dibekukan", saldo: 7200000 },
        { name: "Vina Safitri", client: "vina.safitri@gmail.com", status: "Dibekukan", saldo: 8900000 }
    ];

    // Ambil data dari localStorage
    let storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
        projects = JSON.parse(storedProjects); // Menggunakan data yang disimpan
    }

    let projectList = document.getElementById("project-list");
    let editButton = document.getElementById("edit-button");
    let saveButton = document.getElementById("save-button");
    let isEditing = false; // Status untuk mengatur mode edit

    projects.forEach((project, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td contenteditable="false" onblur="updateProject(${index}, 'name', this.innerText)">${project.name}</td>
            <td contenteditable="false" onblur="updateProject(${index}, 'client', this.innerText)">${project.client}</td>
            <td contenteditable="false" onblur="updateProject(${index}, 'saldo', this.innerText)">${project.saldo.toLocaleString('id-ID')}</td>
            <td contenteditable="false" onblur="updateProject(${index}, 'status', this.innerText)">${project.status}</td>
        `;
        projectList.appendChild(row);
    });

    document.getElementById("total-projects").textContent = projects.length;

    // Menghitung total saldo
    function calculateTotalAndAverage() {
        let totalSaldo = projects.reduce((total, project) => total + project.saldo, 0);
        document.getElementById("total-balance").textContent = `Rp. ${totalSaldo.toLocaleString('id-ID')}`;
    }

    // Fungsi untuk memperbarui proyek
    window.updateProject = function(index, field, value) {
        if (field === 'name') {
            projects[index].name = value;
        } else if (field === 'client') {
            projects[index].client = value;
        } else if (field === 'saldo') {
            let newSaldo = parseInt(value.replace(/\./g, '').replace(/Rp. /, ''));
            if (!isNaN(newSaldo)) {
                projects[index].saldo = newSaldo;
            }
        } else if (field === 'status') {
            projects[index].status = value;
        }
        
        // Simpan data ke localStorage
        localStorage.setItem('projects', JSON.stringify(projects));
        calculateTotalAndAverage();
    };

    // Fungsi untuk mengaktifkan mode edit
    editButton.addEventListener("click", function() {
        isEditing = true;
        document.querySelectorAll("td").forEach(td => {
            td.contentEditable = "true"; // Mengaktifkan edit
        });
        this.style.display = "none"; // Sembunyikan tombol Edit
        saveButton.style.display = "inline"; // Tampilkan tombol Save
    });

    // Fungsi untuk menyimpan perubahan
    saveButton.addEventListener("click", function() {
        isEditing = false;
        document.querySelectorAll("td").forEach(td => {
            td.contentEditable = "false"; // Menonaktifkan edit
        });
        editButton.style.display = "inline"; // Tampilkan tombol Edit
        this.style.display = "none"; // Sembunyikan tombol Save
    });

    // Panggil fungsi untuk menghitung dan menampilkan saldo
    calculateTotalAndAverage();
});