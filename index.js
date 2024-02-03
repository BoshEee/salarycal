function calculateSalary() {
  // Get input values
  const workingHours =
    parseFloat(document.getElementById("workingHours").value) || 0;
  const hourlyRate =
    parseFloat(document.getElementById("hourlyRate").value) || 0;

  const bonusHours =
    parseFloat(document.getElementById("bonusHours").value) || 0;
  const bonusHourlyRate =
    parseFloat(document.getElementById("bonusHourlyRate").value) || 0;

  // Calculate total hours and salary
  const totalHours = workingHours + bonusHours;
  const regularSalary = workingHours * hourlyRate;
  const bonusSalary = bonusHours * bonusHourlyRate;
  const totalSalary = regularSalary + bonusSalary;

  // Display the result with the currency symbol (New Israeli Shekel - ILS)
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `<p>Total Hours: ${totalHours} hours</p>
                                <p>Regular Salary: ₪${regularSalary.toFixed(
                                  2
                                )}</p>
                                <p>Bonus Salary: ₪${bonusSalary.toFixed(2)}</p>
                                <p>Total Salary: ₪${totalSalary.toFixed(2)}</p>
                                <button onclick="downloadPDF()">Download as PDF</button>`;
}

function downloadPDF() {
  const resultElement = document.getElementById("result");

  // Get the current date
  const currentDate = new Date().toLocaleDateString();

  // Define PDF options with onBeforeSave callback
  const pdfOptions = {
    margin: 10,
    filename: `salary_report_${currentDate}.pdf`, // Include the date in the filename
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    onBeforeSave: (pdf) => {
      // Insert the date at the top of the first page
      pdf.text(`Date: ${currentDate}`, 15, 15);
    },
  };

  // Generate and download the PDF
  html2pdf(resultElement, pdfOptions);
}
