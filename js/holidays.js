/**
 * js/holidays.js
 * Modul untuk mengambil data hari libur nasional dari API Publik Nager.Date
 * dan merendernya ke UI berdasarkan mode kalender.
 */

/**
 * Mengambil daftar hari libur nasional selama satu tahun penuh.
 * @param {number} year - Tahun Masehi (misal: 2026)
 * @param {string} countryCode - Kode negara ISO 3166-1 alpha-2 (Default: 'ID')
 * @returns {Array} Array objek data hari libur
 */
export async function getPublicHolidays(year, countryCode = 'ID') {
    const apiUrl = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("[API Error] Gagal memuat data hari libur:", error);
        return []; // Kembalikan array kosong jika gagal agar tidak merusak UI
    }
}

/**
 * Memfilter dan merender hari libur ke dalam list UI.
 * @param {Array} holidays - Data mentah hari libur satu tahun.
 * @param {String} displayMode - Flag mode aplikasi ('ramadhan' atau 'calendar').
 * @param {Array} currentTableData - Data jadwal API yang sedang dirender di tabel saat ini.
 */
export function renderHolidays(holidays, displayMode, currentTableData) {
    const holidayList = document.getElementById('holiday-list');
    if (!holidayList) return;

    holidayList.innerHTML = ''; // Bersihkan state loading/lama
    let filteredHolidays = [];

    // Jika data tabel kosong, hentikan proses
    if (!currentTableData || currentTableData.length === 0) {
        holidayList.innerHTML = '<li class="holiday-empty">Data kalender tidak tersedia.</li>';
        return;
    }

    if (displayMode === 'calendar') {
        // FILTER CALENDAR MODE: Ambil libur yang bulannya sama dengan bulan yang sedang dirender
        const sampleDate = currentTableData[0].date.gregorian;
        const targetMonth = sampleDate.month.number; 
        const targetYear = sampleDate.year;

        filteredHolidays = holidays.filter(h => {
            const [y, m, d] = h.date.split('-'); // Format API Nager adalah YYYY-MM-DD
            return parseInt(m, 10) === parseInt(targetMonth, 10) && parseInt(y, 10) === parseInt(targetYear, 10);
        });
    } else if (displayMode === 'ramadhan') {
        // FILTER RAMADHAN MODE: Ambil libur yang jatuh persis di dalam rentang tanggal 1-30 hari puasa
        const startDateStr = currentTableData[0].date.gregorian.date; // Format API Aladhan: DD-MM-YYYY
        const endDateStr = currentTableData[currentTableData.length - 1].date.gregorian.date;

        // Helper untuk mengubah DD-MM-YYYY menjadi objek Date murni yang bisa dibandingkan
        const parseAladhanDate = (str) => {
            const [d, m, y] = str.split('-');
            return new Date(y, m - 1, d);
        };

        const startRange = parseAladhanDate(startDateStr);
        const endRange = parseAladhanDate(endDateStr);

        filteredHolidays = holidays.filter(h => {
            const hDate = new Date(h.date);
            return hDate >= startRange && hDate <= endRange;
        });
    }

    // Jika tidak ada hari libur di periode tersebut
    if (filteredHolidays.length === 0) {
        holidayList.innerHTML = '<li class="holiday-empty">Tidak ada hari libur nasional di periode ini.</li>';
        return;
    }

    // Format tanggal elegan (Contoh: "17 Agustus")
    const formatHolidayDate = (dateString) => {
        const dateObj = new Date(dateString);
        return dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long' });
    };

    // Render list ke DOM (membuat elemen <li> dengan animasi)
    filteredHolidays.forEach((holiday, index) => {
        const li = document.createElement('li');
        li.className = 'holiday-item';
        // Memberikan jeda animasi masuk bergantian (stagger) seperti tabel
        li.style.animation = `slideIn 0.5s ease forwards ${index * 0.1}s`;
        li.style.opacity = '0'; 
        
        li.innerHTML = `
            <span class="holiday-date">${formatHolidayDate(holiday.date)}</span>
            <span class="holiday-name">${holiday.localName}</span>
        `;
        holidayList.appendChild(li);
    });
}