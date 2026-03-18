/**
 * js/clock.js
 * Modul untuk menangani Real Time Clock.
 */

/**
 * Memulai jam digital real-time pada elemen tertentu.
 * * @param {string} elementId - ID dari elemen HTML tempat jam akan ditampilkan.
 * @param {string} timezone - Zona waktu (contoh: 'Asia/Jakarta').
 */
export function startClock(elementId, timezone = 'Asia/Jakarta') {
    const clockElement = document.getElementById(elementId);
    
    if (!clockElement) {
        console.error(`[Clock Error] Elemen dengan ID '${elementId}' tidak ditemukan.`);
        return;
    }

    function updateClock() {
        const now = new Date();
        
        // Menggunakan locale 'en-GB' untuk memastikan format 24 jam dengan pemisah titik dua (HH:MM:SS)
        // karena locale 'id-ID' terkadang menggunakan titik (HH.MM.SS) di beberapa browser.
        const timeOptions = { 
            timeZone: timezone,
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false
        };
        
        const timeFormatted = now.toLocaleTimeString('en-GB', timeOptions);

        // Update DOM dengan format yang diminta: "HH:MM:SS WIB"
        clockElement.textContent = `${timeFormatted} WIB`;
    }

    // Panggil sekali di awal agar tidak ada delay 1 detik saat halaman pertama dimuat
    updateClock();
    
    // Set interval untuk update setiap 1000 milidetik (1 detik)
    setInterval(updateClock, 1000);
}