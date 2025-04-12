
function formatTime(ms) {
    let totalSeconds = ms / 10;
    let minutes = Math.floor(totalSeconds / 6000);
    let seconds = Math.floor((totalSeconds % 6000) / 100);
    let hundredths = Math.floor(totalSeconds % 100);
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;
}

let savedRecords = localStorage.getItem("raceRecords");
savedRecords = savedRecords ? JSON.parse(savedRecords) : [];
let container = document.getElementById("recordsContainer");

function renderRecords() {
    container.innerHTML = "";

    if (savedRecords.length === 0) {
        container.innerHTML = "<p>لا توجد سجلات محفوظة.</p>";
    } else {
        let reversedRecords = [...savedRecords].reverse();

        reversedRecords.forEach((record, reversedIndex) => {
            let originalIndex = savedRecords.length - 1 - reversedIndex;
            let recordDiv = document.createElement("div");
            recordDiv.className = "record";

            // ✅ شعار داخل السجل
            let logo = `
                <div class="logo">
                    <img src="logo.png" alt="Logo" style="width: 80px; height: auto; border-radius: 10px; display: block; margin: 0 auto 10px;">
                </div>
            `;

            let header = `<h3>سجل ${savedRecords.length - reversedIndex} - ${record.timestamp}</h3>`;
            let extraInfo = `
                <p><strong>نوع السباحة:</strong> ${record.swimType} | 
                <strong>المسافة:</strong> ${record.distance || 'غير محدد'} | 
                <strong>اسم الفائز الأول:</strong> ${record.winnerName || '-'}</p>
            `;

            let tableHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>رقم السباح</th>
                            <th>الوقت</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            for (let i = 0; i < record.results.length; i++) {
                let time = record.results[i] ? formatTime(record.results[i]) : "-";
                tableHTML += `<tr><td>${i + 1}</td><td>${time}</td></tr>`;
            }

            tableHTML += `</tbody></table>`;

            let buttons = `
                <div class="action-buttons">
                    <button class="delete-btn" onclick="deleteRecord(${originalIndex})">🗑️ حذف السجل</button>
                    <button class="print-btn" onclick="printRecord(${originalIndex})">🖨️ طباعة السجل</button>
                </div>
            `;

            // إدراج الشعار في البداية
            recordDiv.innerHTML = logo + header + extraInfo + tableHTML + buttons;
            container.appendChild(recordDiv);
        });
    }
}

function deleteRecord(index) {
    if (confirm("هل أنت متأكد من حذف هذا السجل؟")) {
        savedRecords.splice(index, 1);
        localStorage.setItem("raceRecords", JSON.stringify(savedRecords));
        renderRecords();
    }
}

function printRecord(index) {
    const record = savedRecords[index];
    let printWindow = window.open('', '', 'width=800,height=600');

    let content = `
        <html>
        <head>
            <title>طباعة سجل ${index + 1}</title>
            <style>
                body { font-family: 'Segoe UI', sans-serif; direction: rtl; padding: 20px; }
                h2 { text-align: center; }
                .logo-print { text-align: center; margin-bottom: 10px; }
                .logo-print img { width: 80px; height: auto; border-radius: 10px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
                th { background-color: #f0f0f0; }
                p { font-size: 1rem; }
            </style>
        </head>
        <body>
            <div class="logo-print">
                <img src="logo.png" alt="Logo">
            </div>
            <h2>سجل ${index + 1}</h2>
            <p><strong>التاريخ:</strong> ${record.timestamp}</p>
            <p><strong>نوع السباحة:</strong> ${record.swimType}</p>
            <p><strong>المسافة:</strong> ${record.distance || 'غير محدد'}</p>
            <p><strong>اسم الفائز الأول:</strong> ${record.winnerName || '-'}</p>
            <table>
                <thead>
                    <tr>
                        <th>رقم السباح</th>
                        <th>الوقت</th>
                    </tr>
                </thead>
                <tbody>`;

    for (let i = 0; i < record.results.length; i++) {
        const time = record.results[i] ? formatTime(record.results[i]) : "-";
        content += `<tr><td>${i + 1}</td><td>${time}</td></tr>`;
    }

    content += `
                </tbody>
            </table>
        </body>
        </html>
    `;

    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
}

function goBack() {
    window.location.href = "counter.html";
}

function goBack1() {
    window.location.href = "index.html";
}

function goBack2() {
    window.location.href = "résultats.html";
}

renderRecords();
