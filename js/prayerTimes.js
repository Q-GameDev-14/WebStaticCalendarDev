/**
 * js/prayerTimes.js
 * Modul untuk mengambil data jadwal sholat real-time dari Aladhan API.
 */

export async function getPrayerTimes(year, month, config) {
    const adj = config.adjustment || 0;
    
    // KUNCI PERBAIKAN: Menambahkan &calendarMethod=MATHEMATICAL agar parameter adjustment berfungsi
    const apiUrl = `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${encodeURIComponent(config.city)}&country=${encodeURIComponent(config.country)}&method=${config.method}&adjustment=${adj}&calendarMethod=MATHEMATICAL`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        
        if (result.code === 200 && Array.isArray(result.data)) {
            return result.data;
        } else {
            throw new Error("Format data Masehi dari Aladhan API tidak sesuai ekspektasi.");
        }
    } catch (error) {
        console.error("[API Error] Gagal melakukan fetch jadwal sholat Masehi:", error);
        throw error; 
    }
}

export async function getHijriPrayerTimes(hijriYear, hijriMonth, config) {
    const adj = config.adjustment || 0;
    
    // KUNCI PERBAIKAN: Menambahkan &calendarMethod=MATHEMATICAL di endpoint ini juga
    const apiUrl = `https://api.aladhan.com/v1/hijriCalendarByCity/${hijriYear}/${hijriMonth}?city=${encodeURIComponent(config.city)}&country=${encodeURIComponent(config.country)}&method=${config.method}&adjustment=${adj}&calendarMethod=MATHEMATICAL`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        
        if (result.code === 200 && Array.isArray(result.data)) {
            return result.data;
        } else {
            throw new Error("Format data Hijriah dari Aladhan API tidak sesuai ekspektasi.");
        }
    } catch (error) {
        console.error("[API Error] Gagal melakukan fetch jadwal sholat Hijriah:", error);
        throw error; 
    }
}