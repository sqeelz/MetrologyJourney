function excelDateToJSDate(excelDate) {
    // Excel date base is 1900-01-01 and it is considered as day 1.
    // JavaScript date base is 1970-01-01.
    // Excel dates start from 1, so we need to subtract 1 to get the correct offset.

    const excelBaseDate = new Date(Date.UTC(1900, 0, 1));
    const daysOffset = excelDate - 2; // Excel counts January 1, 1900 as 1, but it should be 0 in our calculation.

    // Convert days to milliseconds and add to base date
    const jsDate = new Date(excelBaseDate.getTime() + daysOffset * 86400000);

    return jsDate;
}

function createJobCard(job) {
    return `
      <article class="rounded-xl border-2 border-gray-100 bg-white mb-4">
        <div class="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
          <a href="#" class="block shrink-0">
            <img alt="" src="${job.image}" class="size-14 rounded-lg object-cover" />
          </a>
          <div>
            <h3 class="font-medium sm:text-lg">
              <a href="${job.url}" class="hover:underline">${job.header}</a>
            </h3>
            <a href="#" class="hover:underline">${job.nama_perusahaan}</a>
            <p class="line-clamp-2 text-sm text-gray-700">${job.deskripsi}</p>
            <div class="mt-2 sm:flex sm:items-center sm:gap-2">
              <div class="flex items-center gap-1 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-xs">${job.lokasi}</p>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-xs text-gray-500">
                ${job.jenis_pekerjaan}
                </p>
            </div>
            <p class="text-xs text-gray-500 sm:mx-40">
                ${job.tanggal}
            </p>
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <strong class="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-green-600 px-3 py-1.5 text-white">
            <a class="text-[10px] font-medium sm:text-xs" href="${job.url}">Selengkapnya</a>
          </strong>
        </div>
      </article>
    `;
}

// Function to render all jobs
function renderJobs(jobs) {
    const container = document.querySelector('.jobs-container');
    container.innerHTML = jobs.map(createJobCard).join('');
}

window.addEventListener('DOMContentLoaded', event => {
    // Fetch the Excel file from the server
    fetch('../data/JobsData.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            // Read the Excel file using XLSX
            const workbook = XLSX.read(data, { type: 'array' });

            // Access the sheet named "Sheet1"
            const worksheet = workbook.Sheets['Sheet1'];

            if (worksheet) {
                // Convert sheet to JSON
                const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                    header: [
                        "ID",
                        "image",
                        "header",
                        "nama_perusahaan",
                        "lokasi",
                        "jenis_pekerjaan",
                        "url",
                        "deskripsi",
                        "tanggal"
                    ],
                    range: 2 // Skip the irst row if it's a header
                });
                //   Get Date history
                const now = new Date();
                // Map over jsonData array and process each job
                jsonData.map(job => {
                    job.tanggal = excelDateToJSDate(job.tanggal); // Convert Excel date to JavaScript Date
                    const diffTime = Math.abs(now - job.tanggal); // Calculate difference in milliseconds
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

                    // Determine the textual representation based on the difference
                    if (diffDays === 0) {
                        job.tanggal = "Hari ini"; // Today
                    } else if (diffDays < 30) {
                        job.tanggal = diffDays + " hari yang lalu"; // Days ago
                    } else if (diffDays >= 30 && diffDays < 365) {
                        const months = Math.floor(diffDays / 30);
                        job.tanggal = months + " bulan yang lalu"; // Months ago
                    } else {
                        const years = Math.floor(diffDays / 365);
                        job.tanggal = years + " tahun yang lalu"; // Years ago
                    }
                });
                console.log(jsonData);
                // Render the job cards
                renderJobs(jsonData);

            } else {
                console.error('Sheet "Sheet1" not found');
                document.getElementById('output').textContent = 'Sheet "Sheet1" not found';
            }
        })
        .catch(error => console.error('Error fetching the Excel file:', error));
});
