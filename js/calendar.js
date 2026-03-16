/**
 * js/calendar.js
 * Modul untuk merender UI Kalender dan Data Jadwal Sholat ke dalam tabel.
 */

/**
 * Membangun baris tabel berdasarkan data jadwal sholat dari API.
 * @param {Array} prayerData - Array data jadwal harian dari API Aladhan.
 * @param {Date} currentDate - Objek Date hari ini.
 * @param {String} displayMode - Flag mode aplikasi ('ramadhan' atau 'calendar').
 */
export function buildCalendarUI(prayerData, currentDate, displayMode) {
    const tbody = document.getElementById('prayer-tbody');
    if (!tbody) return;

    // Bersihkan state loading
    tbody.innerHTML = '';

    // Format tanggal hari ini menjadi string DD-MM-YYYY untuk pencocokan presisi
    const dd = String(currentDate.getDate()).padStart(2, '0');
    const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const yyyy = currentDate.getFullYear();
    const todayStr = `${dd}-${mm}-${yyyy}`;

    // Helper Functions
    const formatTime = (timeStr) => {
        if (!timeStr) return '--:--';
        return timeStr.split(' ')[0];
    };

    const formatDate = (gregorianDate) => {
        const day = gregorianDate.day;
        const month = gregorianDate.month.en.substring(0, 3);
        return `${day} ${month}`;
    };

    const calculateDuha = (sunriseStr) => {
        try {
            const cleanSunrise = formatTime(sunriseStr);
            const [hours, minutes] = cleanSunrise.split(':').map(Number);
            const dateObj = new Date();
            dateObj.setHours(hours, minutes + 20, 0, 0); 
            
            const duhaHours = String(dateObj.getHours()).padStart(2, '0');
            const duhaMinutes = String(dateObj.getMinutes()).padStart(2, '0');
            return `${duhaHours}:${duhaMinutes}`;
        } catch {
            return '--:--';
        }
    };

    // Loop dan Render Data
    prayerData.forEach((dayData, index) => {
        
        // LOGIKA PENENTUAN NOMOR URUT (KOLOM "KE-")
        let rowNumber;
        if (displayMode === 'ramadhan') {
            // Mode Imsakiyah: Kolom KE- adalah Hari Puasa (tanggal Hijriah)
            rowNumber = parseInt(dayData.date.hijri.day, 10); 
        } else {
            // Mode Calendar: Kolom KE- adalah Tanggal Normal (tanggal Masehi)
            rowNumber = parseInt(dayData.date.gregorian.day, 10); 
        }

        // Cek apakah data baris ini persis dengan tanggal hari ini
        const isToday = (dayData.date.gregorian.date === todayStr);

        const tr = document.createElement('tr');

        if (isToday) {
            tr.classList.add('row-today');
            
            // Auto-scroll ke jadwal hari ini
            setTimeout(() => {
                tr.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 800); 
        }

        tr.style.animationDelay = `${index * 0.03}s`;

        const timings = dayData.timings;
        const duhaTime = timings.Dhuha ? formatTime(timings.Dhuha) : calculateDuha(timings.Sunrise);

        tr.innerHTML = `
            <td>
                ${isToday ? `<span class="day-number-badge">${rowNumber}</span>` : rowNumber}
            </td>
            <td>${formatDate(dayData.date.gregorian)}</td>
            <td>${formatTime(timings.Imsak)}</td>
            <td>${formatTime(timings.Fajr)}</td>
            <td>${formatTime(timings.Sunrise)}</td>
            <td>${duhaTime}</td>
            <td>${formatTime(timings.Dhuhr)}</td>
            <td>${formatTime(timings.Asr)}</td>
            <td>${formatTime(timings.Maghrib)}</td>
            <td>${formatTime(timings.Isha)}</td>
        `;

        tbody.appendChild(tr);
    });
}