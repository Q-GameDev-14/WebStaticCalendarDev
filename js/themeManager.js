/**
 * js/themeManager.js
 * Modul untuk mengatur Sistem Theme Otomatis berdasarkan mode tampilan.
 */

/**
 * Menerapkan tema dan teks judul yang sesuai berdasarkan displayMode.
 * @param {Date} currentDate - Objek Date hari ini.
 * @param {Object} todayData - Data jadwal sholat hari ini dari API (untuk ambil tahun Hijriah).
 * @param {String} displayMode - Flag mode aplikasi ('ramadhan' atau 'calendar').
 * @returns {Object} State tema saat ini.
 */
export function initThemeManager(currentDate, todayData, displayMode) {
    const body = document.getElementById('app-body');
    const mainTitle = document.getElementById('main-title');
    const hijriTitle = document.getElementById('hijri-title');
    const subTitle = document.getElementById('sub-title');

    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); 
    const currentYear = currentDate.getFullYear();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let hijriYear = "";
    let hijriMonthNumber = 0;
    let hijriDayNumber = 0;

    if (todayData && todayData.date && todayData.date.hijri) {
        hijriYear = todayData.date.hijri.year;
        hijriMonthNumber = todayData.date.hijri.month.number;
        hijriDayNumber = parseInt(todayData.date.hijri.day, 10);
    }

    // 1. Evaluasi Event Masehi
    const isNatalSeason = (currentMonth === 11) && (currentDay >= 23 && currentDay <= 27);
    const isImlekSeason = (currentYear === 2026) && (currentMonth === 1) && (currentDay >= 15 && currentDay <= 19);
    const isValentineSeason = (currentMonth === 1) && (currentDay >= 12 && currentDay <= 16);
    
    // NEW: Evaluasi Event Tahun Baru (31 Desember ATAU 1-2 Januari)
    const isNewYearSeason = (currentMonth === 11 && currentDay === 31) || (currentMonth === 0 && currentDay <= 2);

    // 2. Evaluasi Event Hijriah
    const isIdulAdhaSeason = (hijriMonthNumber === 12) && (hijriDayNumber >= 9 && hijriDayNumber <= 13);

    body.className = ''; 

    // PRIORITAS TEMA BERDASARKAN EVENT
    if (displayMode === 'ramadhan') {
        body.classList.add('theme-ramadhan');
        mainTitle.textContent = `Jadwal Imsakiyah Ramadan ${currentYear}`;
        hijriTitle.textContent = `رمضان ${hijriYear} هـ`;
        hijriTitle.style.display = 'block';
        subTitle.textContent = `${hijriYear} HIJRIYAH — PADALARANG, JAWA BARAT`;
        
    } else if (isIdulAdhaSeason) {
        body.classList.add('theme-idul-adha');
        mainTitle.textContent = `Selamat Idul Adha ${currentYear}`;
        hijriTitle.textContent = `ذو الحجة ${hijriYear} هـ`;
        hijriTitle.style.display = 'block';
        subTitle.textContent = `FESTIVAL OF SACRIFICE — ${hijriYear} H`;

    } else if (isNewYearSeason) {
        // TEMA TAHUN BARU AKTIF
        body.classList.add('theme-new-year');
        // Jika sedang di bulan Desember (bulan 11), tahun yang dirayakan adalah tahun depan
        const displayYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        mainTitle.textContent = `Happy New Year ${displayYear}! 🎆`;
        hijriTitle.style.display = 'none';
        subTitle.textContent = 'A NEW BEGINNING';

    } else if (isImlekSeason) {
        body.classList.add('theme-imlek');
        mainTitle.textContent = `Gong Xi Fa Cai ${currentYear}`;
        hijriTitle.style.display = 'none';
        subTitle.textContent = 'YEAR OF THE FIRE HORSE 🐎';
        
    } else if (isValentineSeason) {
        body.classList.add('theme-valentine');
        mainTitle.textContent = `Happy Valentine's Day ${currentYear}`;
        hijriTitle.style.display = 'none';
        subTitle.textContent = 'SEASON OF LOVE 💘';

    } else if (isNatalSeason) {
        body.classList.add('theme-natal');
        mainTitle.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        hijriTitle.style.display = 'none';
        subTitle.textContent = 'HOLIDAY SEASON EDITION';
        
    } else {
        body.classList.add('theme-default');
        mainTitle.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        hijriTitle.style.display = 'none';
        subTitle.textContent = 'DYNAMIC CALENDAR';
    }

    return { 
        displayMode, 
        isIdulAdhaSeason,
        isNewYearSeason,
        isNatalSeason, 
        isImlekSeason, 
        isValentineSeason, 
        currentMonthName: monthNames[currentMonth] 
    };
}