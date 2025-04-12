
        const swimmers = 8;
        let results = Array(swimmers).fill(null);
        let currentSwimmer = 0;
        let raceStarted = false;
        let startTime;
        let timerInterval;
    
        function formatTime(ms) {
            let totalSeconds = ms / 10;
            let minutes = Math.floor(totalSeconds / 6000);
            let seconds = Math.floor((totalSeconds % 6000) / 100);
            let hundredths = Math.floor(totalSeconds % 100);
            return `${minutes}:${seconds.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;
        }
    
        function updateLiveTimer() {
            let elapsed = Date.now() - startTime;
            document.getElementById("liveTimer").innerText = formatTime(elapsed);
        }
    
        function startRace() {
    if (!raceStarted) {
        // تشغيل الصوت عند بداية السباق فقط
        const audio = document.getElementById("startSound");
        audio.play();

        raceStarted = true;
        startTime = Date.now();
        timerInterval = setInterval(updateLiveTimer, 10);
        document.querySelector(".start-btn").innerText = "تسجيل وقت";
    } else if (currentSwimmer < swimmers) {
        results[currentSwimmer] = Date.now() - startTime;
        document.getElementById(`time${currentSwimmer}`).innerText = formatTime(results[currentSwimmer]);
        currentSwimmer++;
        if (currentSwimmer === swimmers) {
            clearInterval(timerInterval);
            document.querySelector(".start-btn").disabled = true;
        }
    }
}

    
        function resetRace() {
            raceStarted = false;
            currentSwimmer = 0;
            results.fill(null);
            clearInterval(timerInterval);
            document.getElementById("liveTimer").innerText = "00:00.00";
            document.querySelector(".start-btn").innerText = "ابدأ السباق";
            document.querySelector(".start-btn").disabled = false;
            for (let i = 0; i < swimmers; i++) {
                document.getElementById(`time${i}`).innerText = "-";
            }
        }
    
        //
        function saveResults() {
    let hasResults = results.some(time => time !== null);
    if (!hasResults) {
        alert("❌ لا يوجد أي وقت مسجل بعد! يرجى تسجيل الأوقات أولاً.");
        return;
    }

    let swimType = document.getElementById("swimType").value.trim();
    let distance = document.getElementById("distance").value.trim();
    let winnerName = document.getElementById("winnerName").value.trim();

    // ✅ التحقق من إدخال جميع الحقول المطلوبة
    if (!swimType || !distance || !winnerName) {
        alert("⚠️ يرجى ملء جميع الحقول قبل حفظ النتائج!");
        return;
    }

    let record = {
        timestamp: new Date().toLocaleString(),
        results: results,
        swimType: swimType,
        distance: distance,
        winnerName: winnerName
    };

    let savedRecords = JSON.parse(localStorage.getItem("raceRecords")) || [];

    // ✅ التحقق من عدم تكرار نفس السجل
    let isDuplicate = savedRecords.some(rec =>
        rec.swimType === swimType &&
        rec.distance === distance &&
        JSON.stringify(rec.results) === JSON.stringify(results)
    );

    if (isDuplicate) {
        alert("⚠️ هذه النتائج موجودة بالفعل في السجلات!");
        return;
    }

    savedRecords.push(record);
    localStorage.setItem("raceRecords", JSON.stringify(savedRecords));

    alert("✅ تم حفظ النتائج بنجاح!");
    window.location.href = "saveResults.html";
}

    
        function initializeTable() {
            let tableBody = document.getElementById("swimmerTable");
            for (let i = 0; i < swimmers; i++) {
                let row = document.createElement("tr");
                row.innerHTML = `<td>${i + 1}</td><td id="time${i}">-</td>`;
                tableBody.appendChild(row);
            }
        }

        // العودة إلى الصفحة الرئيسية
    function goBack1() {
        window.location.href = "index.html";
    }
    
        initializeTable();
  