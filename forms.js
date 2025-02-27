document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi Flatpickr untuk input jadwal
    flatpickr("#jadwal", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        minDate: "today",
        locale: "id",
        altInput: true,
        altFormat: "j F Y H:i",
        time_24hr: true,
    });

    const form = document.getElementById('registrationForm');
    const reservasiBody = document.getElementById('reservasiBody');

    // Muat data reservasi dari server saat halaman dimuat
    loadReservations();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Ambil data dari form
        const nama = document.getElementById('nama').value;
        const usia = `${document.getElementById('usia').value} ${document.getElementById('usiaSatuan').value}`;
        const alamat = document.getElementById('alamat').value;
        const beratBadan = document.getElementById('beratBadan').value;
        const orangTua = document.getElementById('orangTua').value;
        const nomorWA = document.getElementById('nomorWA').value;
        const paket = document.getElementById('paket').value;
        const jadwal = document.getElementById('jadwal').value;

        // Format pesan WhatsApp
        const message = `Halo, saya ingin mendaftarkan sunat dengan detail sebagai berikut:
Nama: ${nama}
Usia: ${usia}
Alamat: ${alamat}
Berat Badan: ${beratBadan} kg
Orang Tua: ${orangTua}
Nomor WhatsApp: ${nomorWA}
Paket Metode Sunat: ${paket}
Jadwal Sunat: ${jadwal}

Terima kasih.`;

        // Encode pesan untuk URL
        const encodedMessage = encodeURIComponent(message);
        const phoneNumber = "6285777111597";

        // Buat objek reservasi
        const reservasi = { nama, usia, alamat, paket, jadwal };

        // Simpan ke server
        await saveReservation(reservasi);

        // Tampilkan di tabel
        displayReservation(reservasi);

        // Reset form
        form.reset();

        // Buka WhatsApp di tab baru
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    });

    // Fungsi untuk menyimpan ke server
    async function saveReservation(reservasi) {
        try {
            const response = await fetch('http://192.168.1.20:3000/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservasi),
            });
            if (!response.ok) throw new Error('Failed to save reservation');
        } catch (error) {
            console.error('Error saving reservation:', error);
        }
    }

    // Fungsi untuk memuat dari server
    async function loadReservations() {
        try {
            const response = await fetch('http://192.168.1.20:3000/reservations');
            const reservations = await response.json();
            reservations.forEach(displayReservation);
        } catch (error) {
            console.error('Error loading reservations:', error);
        }
    }

    function displayReservation(reservasi) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reservasi.nama}</td>
            <td>${reservasi.usia}</td>
            <td>${reservasi.alamat}</td>
            <td>${reservasi.paket}</td>
            <td>${reservasi.jadwal}</td>
        `;
        reservasiBody.appendChild(row);
    }
});