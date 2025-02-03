// ini copas dari ourGraduate.js belum diapa-apain, nantinya diganti pake data final project

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });


    // Fetch the Excel file from the server
    fetch('../data/dataJudul.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            // Read the Excel file using XLSX
            const workbook = XLSX.read(data, { type: 'array' });

            // Access the sheet named "Lembar1"
            const worksheet = workbook.Sheets['Lembar1'];

            // Check if the worksheet exists
            if (worksheet) {
              // Convert sheet to JSON
              const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                header: [
                  "No",
                  "Nama",
                  "Angkatan",
                  "Tahun_Lulus",
                  "Judul_Laporan",
                  "Judul_TA",
                ],
                range: 1, // Skip the first row which contains column headers
              });

              // Ensure all keys are present in each row
              const keys = [
                "No",
                "Nama",
                "Angkatan",
                "Tahun_Lulus",
                "Judul_Laporan",
                "Judul_TA",
              ];
              const formattedData = jsonData.map((row) => {
                let formattedRow = {};
                keys.forEach((key) => {
                  formattedRow[key] = row[key] || ""; // Fill missing keys with an empty string
                });
                return formattedRow;
              });
              var table;

              $(document).ready(function () {
                table = $("#dataTable").DataTable({
                  data: formattedData,
                  columns: [
                    { data: "No" },
                    { data: "Nama" },
                    { data: "Angkatan" },
                    { data: "Tahun_Lulus" },
                    { data: "Judul_Laporan" },
                    { data: "Judul_TA" },
                  ],
                });
              });
              console.log(formattedData[1]["Angkatan"]);

              // filter
              // Mengambil nilai unik dari kolom 'Angkatan'
              var angkatanValues = [
                ...new Set(formattedData.map((item) => item.Angkatan)),
              ]; // Ambil nilai unik
              var angkatanDropdown =
                '<select id="angkatanFilter"><option value="">Filter Angkatan</option>';
              angkatanValues.forEach(function (value) {
                angkatanDropdown +=
                  '<option value="' + value + '">' + value + "</option>";
              });
              angkatanDropdown += "</select>";

              // Menambahkan dropdown filter untuk 'Angkatan' di luar tabel
              $("#angkatanFilterContainer").html(angkatanDropdown);

              // Event listener untuk filter 'Angkatan'
              $("#angkatanFilter").on("change", function () {
                var angkatanVal = $(this).val();
                table
                  .column(2)
                  .search(
                    angkatanVal ? "^" + angkatanVal + "$" : "",
                    true,
                    false
                  )
                  .draw();
              });
            } else {
                console.log('Sheet "Lembar1" not found');
                document.getElementById('output').textContent = 'Sheet "Lembar1" not found';
            }
        })
        .catch(error => console.error('Error fetching the Excel file:', error));
});