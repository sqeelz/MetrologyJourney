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
    fetch('../data/databesaralumni.xlsx')
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
                        "Asal_Lulusan",
                        "Angkatan",
                        "Tahun_Lulus",
                        "Posisi_Pekerjaan",
                        "Perusahaan_Tempat_Bekerja",
                        "No_HP"
                    ],
                    range: 2 // Skip the first row which contains column headers
                });

                 // Ensure all keys are present in each row
                 const keys = ["No", "Nama", "Asal_Lulusan", "Angkatan", "Tahun_Lulus", "Posisi_Pekerjaan", "Perusahaan_Tempat_Bekerja", "No_HP"];
                 const formattedData = jsonData.map(row => {
                     let formattedRow = {};
                     keys.forEach(key => {
                         formattedRow[key] = row[key] || ''; // Fill missing keys with an empty string
                     });
                     return formattedRow;
                 });


                $(document).ready(function() {
                    $('#dataTable').DataTable({
                        data: formattedData,
                        columns: [
                            { data: 'No' },
                            { data: 'Nama' },
                            { data: 'Asal_Lulusan' },
                            { data: 'Angkatan' },
                            { data: 'Tahun_Lulus' },
                            { data: 'Posisi_Pekerjaan' },
                            { data: 'Perusahaan_Tempat_Bekerja' },
                            { data: 'No_HP' }
                        ]
                    });
                });
                console.log(jsonData);

            } else {
                console.log('Sheet "Lembar1" not found');
                document.getElementById('output').textContent = 'Sheet "Lembar1" not found';
            }
        })
        .catch(error => console.error('Error fetching the Excel file:', error));

       
});