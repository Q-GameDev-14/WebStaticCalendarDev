/**
 * js/app.js
 * Main Entry Point for the Dynamic Calendar Application.
 */

import { initThemeManager } from './themeManager.js';
import { startClock } from './clock.js';
import { getPrayerTimes, getHijriPrayerTimes } from './prayerTimes.js';
import { buildCalendarUI } from './calendar.js';

const LOCATION_CONFIG = {
    city: 'Padalarang',
    country: 'Indonesia',
    method: 20, 
    timezone: 'Asia/Jakarta',
    adjustment: 1 // Menggeser kalender Hijriah maju 1 hari agar Ramadhan dimulai 19 Februari
};

document.addEventListener('DOMContentLoaded', async () => {
    startClock('real-time-clock', LOCATION_CONFIG.timezone);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    document.getElementById('current-year').textContent = currentYear;

    try {
        // 1. Fetch data kalender Masehi bulan ini untuk inspeksi tanggal hari ini
        const gregorianData = await getPrayerTimes(currentYear, currentMonth, LOCATION_CONFIG);
        
        // 2. Ambil data spesifik hari ini untuk mengecek status bulan Hijriah
        const todayData = gregorianData[currentDay - 1];
        
        let isRamadhan = false;
        let hijriYear = "";
        
        if (todayData && todayData.date && todayData.date.hijri) {
            isRamadhan = todayData.date.hijri.month.number === 9; // Bulan ke-9 adalah Ramadhan
            hijriYear = todayData.date.hijri.year;
        }

        let finalPrayerData = [];
        let displayMode = 'calendar'; // Flag mode aplikasi: 'calendar' atau 'ramadhan'

        // 3. CORE LOGIC: Perpindahan Mode Secara Otomatis
        if (isRamadhan) {
            displayMode = 'ramadhan';
            // Mode Imsakiyah: Fetch jadwal FULL 1 bulan Hijriah agar tabel tidak terpotong
            finalPrayerData = await getHijriPrayerTimes(hijriYear, 9, LOCATION_CONFIG);
        } else {
            displayMode = 'calendar';
            // Mode Default: Gunakan data kalender Masehi normal
            finalPrayerData = gregorianData;
        }

        // 4. Update Theme System berdasarkan mode yang terpilih
        // Kita passing data hari ini agar theme manager bisa membaca tahun/bulan Hijriah
        const themeState = initThemeManager(currentDate, todayData, displayMode);

        // 5. Render Tabel UI dengan data final dan mode yang sesuai
        buildCalendarUI(finalPrayerData, currentDate, displayMode);

    } catch (error) {
        console.error("[App Error] Gagal memuat inisialisasi aplikasi:", error);
        
        const tbody = document.getElementById('prayer-tbody');
        if (tbody) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="10" class="loading-state" style="color: #ef4444;">
                        Koneksi ke API terputus. Silakan periksa jaringan Anda dan refresh halaman.
                    </td>
                </tr>
            `;
        }
    }
});