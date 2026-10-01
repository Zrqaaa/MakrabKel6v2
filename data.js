/* =====================================================
   DATA TEMPAT MAKAN - MAKANYUK!
   File ini hanya berisi data. Logika ada di script.js.

   Cara menambah tempat makan baru:
   1. Salin salah satu blok { id: ..., ... } di bawah.
   2. Ganti id jadi angka baru (5, 6, dst, tidak boleh sama).
   3. Isi data dan menunya, lalu pisahkan dengan koma.

   Penjelasan kolom:
   - kategori : "Makanan Berat" | "Kopi & Minuman" | "Jajanan"
   - jarak    : dalam meter dari kampus (angka saja)
   - jamTutup : jika "00:00" atau lebih kecil dari jamBuka, dianggap lewat tengah malam
   - libur    : opsional, contoh ["Senin"] atau ["Sabtu", "Minggu"]
   - favorit  : opsional, tampil di kartu. Kalau kosong, otomatis memakai menu pertama
   - logo     : opsional, contoh "img/logo-nilu.png" (kalau kosong tampil inisial)
   - foto     : opsional, contoh "img/nilu.jpg" (tampil sebagai gambar kartu)
   ===================================================== */

/* Fungsi bantu: g(namaGrup, [[nama, hargaDalamRibuan], ...], tambahan?)
   Contoh: ["Mendoan", 14] = Rp14.000
   tambahan = true untuk item tambahan (telur, sambal, es batu).
   Item tambahan tidak dihitung di "Mulai dari". */
const g = (grup, daftar, tambahan = false) =>
  daftar.map(([nama, ribu]) => ({ nama, harga: Math.round(ribu * 1000), grup, tambahan }));

const restoList = [
  {
    id: 1,
    nama: "NILU KOPI UIN SALATIGA",
    kategori: "Kopi & Minuman",
    deskripsi: "Kafe F&B satu atap di Pulutan: main course, rice bowl, pasta, platter, light bites, plus es kopi susu, pour over, dan minuman tradisional. Buka setiap hari sampai tengah malam.",
    favorit: "Es Kopi Susu Aren Soul",
    logo: "",
    foto: "",
    lokasi: "Pulutan, Kec. Sidorejo, Kota Salatiga, Jawa Tengah 50716",
    jarak: 650,
    linkMaps: "https://www.google.com/maps/search/?api=1&query=MFMG%2B6R3+Salatiga",
    jamBuka: "10:00",
    jamTutup: "00:00",
    menu: [
      ...g("Main Course", [["Nasi Goreng Special", 22], ["Ayam Goreng Cabe Ijo", 23], ["Grilled Chicken", 23], ["Chicken Steak", 25], ["Chicken Salted Egg", 25]]),
      ...g("Rice Bowl", [["Telur Sambal Matah", 15], ["Nugget Telur", 18], ["Chicken Bowl", 20], ["Ayam Daun Jeruk", 20], ["Pecel Ayam", 21]]),
      ...g("Pasta & Noodle", [["Aglio Olio", 20], ["Carbonara", 21], ["Mie Tori Kara", 23], ["Bakmie Ayam", 24]]),
      ...g("Platter", [["Circle", 25], ["Gathering", 30]]),
      ...g("Light Bites", [["Mendoan", 14], ["French Fries", 15], ["Cireng", 15], ["Fried Cassava", 17], ["Corn Ribs", 17], ["Timus", 17], ["Risol", 21], ["Chicken Cheese Ball", 21], ["Toast Bread", 19], ["Banana Fritter", 19]]),
      ...g("Extra", [["Saos", 3], ["Sambal", 3], ["Kerupuk", 3], ["Telur", 5]], true),
      ...g("Classic", [["Black", 16], ["White", 17], ["Caramel Machiatto", 22], ["Mocha", 23], ["White Float", 24]]),
      ...g("Es Kopi Susu", [["Aren Soul", 22], ["Wild Hazel", 22], ["Glazed Roasted", 22], ["Corn Crunch Latte", 23], ["Butter Cloud", 23]]),
      ...g("Refreshment", [["Lemon Tea", 15], ["Lychee Tea", 16], ["Fresh Juice", 18], ["Dragon Mojito", 19], ["Strawberry Mojito", 19], ["Summer Bliss", 23], ["Pitaya Velvet Blend", 24]]),
      ...g("Signature", [["Pink Matcha Clouds", 22], ["Crimson Choco", 22], ["Midnight Float", 23], ["Frappucino", 25]]),
      ...g("Milky Series", [["Chocolate", 21], ["Red Velvet", 21], ["Matcha", 23]]),
      ...g("Pour Over", [["Tubruk", 14], ["Vietnam Drip", 19], ["V60", 21]]),
      ...g("Traditional", [["Wedang Uwuh", 13], ["Wedang Jahe", 14], ["Tape Ketan Susu", 14]])
    ]
  },

  {
    id: 2,
    nama: "WAROENG SARJANA",
    kategori: "Makanan Berat",
    deskripsi: "Warung ayam krispy dan nasi soto dengan harga paling ramah kantong sekitar kampus. Pilih satuan atau paket bernama jenjang kuliah, dari Paket Maba sampai Paket Cumlaude.",
    favorit: "Paket Sarjana (Rp10.000)",
    logo: "",
    foto: "",
    lokasi: "Pulutan, Kec. Sidorejo, Kota Salatiga, Jawa Tengah 50716",
    jarak: 700,
    linkMaps: "https://www.google.com/maps/search/?api=1&query=MFMH%2BRWW+Salatiga",
    jamBuka: "09:00",
    jamTutup: "20:00",
    menu: [
      ...g("Menu Single", [["Nasi Soto Ayam", 5], ["Nasi Putih", 3], ["Ayam Krispy", 7], ["Paha Atas", 8], ["Paha Bawah", 7], ["Sayap", 6], ["Kepala", 4], ["Ati Ampela", 4], ["Telor", 3], ["Tahu", 1], ["Tempe", 1], ["Terong Goreng", 2], ["Kol Goreng", 2]]),
      ...g("Menu Couple", [["Paket Sarjana", 10], ["Paket D3", 11], ["Paket Cumlaude", 12], ["Paket Wisuda", 12], ["Paket Skripsi", 11], ["Paket Kompre", 10], ["Paket Sempro", 9], ["Paket KKN", 8], ["Paket Magang", 7], ["Paket Maba", 6]]),
      ...g("Minuman", [["Teh / Es Teh", 3], ["Kopi Hitam", 4], ["Chocolatos / Bengbeng", 5], ["White Coffee / Coffeemix", 5], ["Nutrisari", 4], ["Susu Bendera", 4], ["Good Day Freeze", 5]])
    ]
  },

  {
    id: 3,
    nama: "PROJO RESTO",
    kategori: "Makanan Berat",
    deskripsi: "Resto chicken steak harga pelajar, paket ayam penyetan, snack, dan barisan es segar: es teler, es campur, es oyen, es doger. Catatan: tutup setiap hari Senin.",
    favorit: "Es Teler Durian",
    logo: "",
    foto: "",
    lokasi: "Jl. Dipomenggolo, Pulutan, Kec. Sidorejo, Kota Salatiga, Jawa Tengah 50716",
    jarak: 850,
    linkMaps: "https://www.google.com/maps/search/?api=1&query=MFPG%2BHV7+Salatiga",
    jamBuka: "10:00",
    jamTutup: "21:00",
    libur: ["Senin"],
    menu: [
      ...g("Makanan", [["Nasi Telur Dadar Crispy", 15], ["Chicken Steak Original", 20], ["Chicken Katsu Steak", 20], ["Steak Ayam Original", 20], ["Crispy Chicken Steak BBQ", 15], ["Crispy Chicken Steak Mushroom", 15], ["Crispy Chicken Steak Black Pepper", 15], ["Nasi Putih", 5]]),
      ...g("Snack", [["Mix Platter", 25], ["Bakwan Sayur", 10], ["Pisang Kembung", 15], ["Tahu Bakso", 15]]),
      ...g("Paket Ayam Penyetan", [["Paket Hemat (Sayap + Kepala)", 10], ["Paket Ekonomis (Paha Atas / Paha Bawah / Sayap + Kepala)", 15], ["Paket 20K (Paha + Kepala / Paha + Sayap)", 20]]),
      ...g("Smoothies", [["Mango Smoothies", 20], ["Avocado Smoothies", 20], ["Dragonfruit Smoothies", 20]]),
      ...g("Es Teler", [["Es Teler Original", 10], ["Es Teler Es Krim", 15], ["Es Teler Durian", 20]]),
      ...g("Es Campur", [["Es Campur Original", 15], ["Es Campur Es Krim", 20], ["Es Campur Durian", 25]]),
      ...g("Es Oyen", [["Es Oyen Original", 15], ["Es Oyen Es Krim", 15], ["Es Oyen Durian", 20]]),
      ...g("Es Doger", [["Es Doger Original", 15], ["Es Doger Es Krim", 20], ["Es Doger Durian", 25]]),
      ...g("Lainnya", [["Es Buah", 10], ["Campur", 15], ["Doger", 15], ["Es Krambol Oreo", 20], ["Es Krambol Mangga", 20], ["Black Rice Es Krim", 20], ["Coconut Sundae Es Krim", 15], ["Coconut Sundae Durian", 20], ["Lemon Tea", 10], ["Teh Panas", 5], ["Es Teh", 5], ["Jus Semangka", 15], ["Jus Mangga", 15], ["Jus Jambu Merah", 15], ["Jus Buah Naga", 15], ["Jus Alpukat", 15], ["Es Cappuccino Cincau", 15], ["Es Jeruk", 5], ["Air Mineral", 3], ["Mojito", 15]])
    ]
  },

  {
    id: 4,
    nama: "BENTO COFFEE SALATIGA",
    kategori: "Kopi & Minuman",
    deskripsi: "Kafe dengan menu lengkap: rice bowl, mie, camilan, kopi, dan aneka minuman. Buka setiap hari sampai tengah malam.",
    favorit: "Nasi Ayam Geprek Bento",
    logo: "",
    foto: "",
    lokasi: "Jl. H. Ilyas No.23, Ngablak Kidul, Jombor, Tuntang, Kab. Semarang",
    jarak: 6000,
    linkMaps: "https://maps.app.goo.gl/dL6A9PZAZsM4976n9",
    jamBuka: "09:00",
    jamTutup: "00:00",
    menu: [
      ...g("Rice Bowl", [["Chicken Egg Sambal Dabu-Dabu", 19], ["Chicken Egg Sambal Matah", 19], ["Chicken Egg Teriyaki", 19], ["Chicken Egg Blackpepper", 19], ["Chicken Egg Mentai", 19]]),
      ...g("Signature Food", [["Nasi Telur Sambal Lamongan", 15], ["Nasi Telur Sambal Geprek", 15], ["Nasi Telur Sambal Dabu-Dabu", 15], ["Nasi Telur Sambal Matah", 15], ["Nasi Telur Saus Mentai", 15], ["Nasi Ayam Penyet Bento", 18], ["Nasi Ayam Geprek Bento", 19], ["Nasi Ayam Bakar", 20]]),
      ...g("Roti Bakar", [["Roti Bakar Coklat", 12], ["Roti Bakar Green Tea", 13], ["Roti Bakar Keju", 13], ["Roti Bakar Coklat Keju", 14]]),
      ...g("Indomie", [["Mie Goreng", 11], ["Mie Rebus", 11], ["Mie Iblis", 14], ["Mie Goreng Spesial", 15], ["Mie Jepang Kaldu", 15]]),
      ...g("Snack", [["Mendoan", 13], ["Tahu Dadu", 13], ["Singkong Goreng", 14], ["French Fries", 14], ["Pisang Goreng", 14], ["Jamur Enoki", 14], ["Tahu Walik", 15], ["Cireng", 15], ["Combo Platter", 18], ["Banana Crispy", 15]]),
      ...g("Coffee Based", [["Coffee Latte", 17], ["Americano", 11], ["Coffee Aren", 16], ["Coffee Milk", 13], ["Coffee Caramel", 16], ["Coffee Hazelnut", 16], ["Coffee Almond", 16], ["Coffee Vanilla", 16], ["Coffee Pandan", 17], ["Coffee Regal", 18]]),
      ...g("Chocolate Based", [["Choco Original", 16], ["Choco Vanilla", 17], ["Choco Caramel", 17], ["Choco Hazelnut", 17], ["Choco Almond", 17]]),
      ...g("Non Coffee", [["Taro", 18], ["Red Velvet", 18], ["Matcha", 18]]),
      ...g("Traditional Based", [["Air Mineral", 9], ["Kopi Tubruk", 9], ["Kopi Susu", 11], ["Kopi Susu Jahe", 13], ["Susu Jahe", 12], ["Jahe Teh", 10]]),
      ...g("Squash", [["Lemon Squash", 16], ["Lychee Squash", 18], ["Strawberry Squash", 17], ["Blue Curacao Squash", 19]]),
      ...g("Mocktail", [["Black Berry", 18], ["Green Hornet", 18]]),
      ...g("Milk Based", [["Vanilla Milk", 19], ["Caramel Milk", 19], ["Hazelnut Milk", 19], ["Pandan Milk", 19], ["Lychee Milk", 19], ["Strawberry Milk", 19]]),
      ...g("Fruit Juices", [["Alpukat", 17], ["Strawberry", 17], ["Mangga", 17]]),
      ...g("Smoothies", [["Banana", 20], ["Strawberry", 20]]),
      ...g("Artisan Tea", [["Tea", 8], ["Lemon Tea", 11], ["Lychee Tea", 17], ["Caramel Tea", 13], ["Vanilla Tea", 13], ["Strawberry Tea", 13]]),
      ...g("Tambahan Makanan", [["Telur", 4], ["Nasi", 5], ["Sambal Dabu-Dabu", 3], ["Sambal Matah", 2.5], ["Sambal Geprek", 3], ["Sambal Lamongan", 2.5], ["Package", 1.5]], true),
      ...g("Tambahan Minuman", [["Es Batu", 2], ["Extra Shot", 3]], true)
    ]
  }

  /* ===== TEMPLATE TEMPAT BARU (hapus tanda komentar, lalu isi) =====
  ,
  {
    id: 5,
    nama: "NAMA TEMPAT",
    kategori: "Jajanan",
    deskripsi: "Deskripsi singkat tempat makan.",
    favorit: "Menu andalan",
    logo: "",
    foto: "",
    lokasi: "Alamat lengkap",
    jarak: 500,
    linkMaps: "https://maps.app.goo.gl/xxxx",
    jamBuka: "08:00",
    jamTutup: "17:00",
    libur: ["Minggu"],
    menu: [
      ...g("Makanan", [["Nama Menu", 10], ["Nama Menu 2", 12]]),
      ...g("Minuman", [["Es Teh", 3]])
    ]
  }
  ================================================================ */
];
