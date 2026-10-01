/* =====================================================
   LOGIKA TAMPILAN MAKANYUK!
   Data restoran ada di file data.js (variabel restoList).
   ===================================================== */

/* ===== FUNGSI BANTU ===== */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const rp = n => "Rp" + n.toLocaleString("id-ID");
const menit = j => { const [h, m] = j.split(":").map(Number); return h * 60 + m; };
const fmtJarak = j => j >= 1000 ? (j / 1000).toFixed(1).replace(".", ",") + " km" : j + " m";
// Harga "mulai dari" tidak menghitung item tambahan (telur, sambal, dll)
const termurah = r => Math.min(...r.menu.filter(m => !m.tambahan).map(m => m.harga));
const inisial = nama => nama.split(" ").slice(0, 2).map(k => k[0]).join("");
const ikonKat = { "Makanan Berat": "🍛", "Kopi & Minuman": "☕", "Jajanan": "🍡" };
const ke = id => $(id).scrollIntoView({ behavior: "smooth" });

/* ===== STATUS BUKA / TUTUP ===== */
const sedangLibur = r => !!(r.libur && r.libur.includes(HARI[new Date().getDay()]));
function sedangBuka(r) {
  if (sedangLibur(r)) return false;
  const d = new Date(), n = d.getHours() * 60 + d.getMinutes();
  const b = menit(r.jamBuka), t = menit(r.jamTutup);
  // Jika jam tutup lebih kecil dari jam buka, berarti tutup lewat tengah malam
  return t > b ? (n >= b && n < t) : (n >= b || n < t);
}
const badgeHTML = r => sedangLibur(r) ? `<span class="badge libur">Libur</span>`
  : sedangBuka(r) ? `<span class="badge buka">Buka</span>` : `<span class="badge tutup">Tutup</span>`;

/* ===== BAGIAN KARTU ===== */
// Gambar kartu: pakai r.foto, kalau tidak ada pakai r.logo, kalau tidak ada pakai inisial
const gambarHTML = r => r.foto ? `<img src="${r.foto}" alt="${r.nama}">`
  : r.logo ? `<img class="logo-img" src="${r.logo}" alt="Logo ${r.nama}">` : inisial(r.nama);
// Kotak menu: pakai r.favorit kalau diisi, kalau tidak ambil menu pertama
const andalan = r => r.favorit ? ["Favorit", r.favorit] : ["Contoh menu", r.menu.find(m => !m.tambahan).nama];

// Preview menu di kartu: kalau sedang mencari, tampilkan menu yang cocok (kata kunci disorot).
// Kalau tidak, tampilkan 3 menu termurah.
const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const sorot = (nama, q) => q ? nama.replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig"), s => `<mark>${s}</mark>`) : nama;
function miniMenu(r) {
  const q = state.q.trim().toLowerCase();
  const cocok = q ? r.menu.filter(m => m.nama.toLowerCase().includes(q)) : [];
  const pakaiCocok = cocok.length > 0;
  const daftar = pakaiCocok ? cocok : r.menu.filter(m => !m.tambahan).sort((a, b) => a.harga - b.harga);
  const sisa = daftar.length - 3;
  return `<div class="mini"><h5>${pakaiCocok ? `Menu yang cocok (${cocok.length})` : "Menu termurah"}</h5>
    <ul>${daftar.slice(0, 3).map(m => `<li><span>${sorot(m.nama, pakaiCocok ? q : "")}</span><b>${rp(m.harga)}</b></li>`).join("")}</ul>
    ${sisa > 0 ? `<small>+${sisa} menu lainnya, klik untuk lihat semua</small>` : ""}</div>`;
}

function cardHTML(r) {
  const [label, isi] = andalan(r);
  return `<article class="card" tabindex="0" data-id="${r.id}">
    <div class="foto">${gambarHTML(r)}${badgeHTML(r)}<span class="pill-kat">${r.kategori}</span></div>
    <div class="isi">
      <h3>${r.nama}</h3>
      <p class="lok">📍 ${r.lokasi}</p>
      <p class="fav"><b>${label}:</b> ${isi}</p>
      ${miniMenu(r)}
      <div class="jam"><span>🕒 ${r.jamBuka}–${r.jamTutup}</span><span>${fmtJarak(r.jarak)} dari kampus</span></div>
      <div class="bawah"><div><small>Mulai dari</small><strong>${rp(termurah(r))}</strong></div><span class="btn garis">Lihat Detail</span></div>
    </div>
  </article>`;
}

/* ===== PENCARIAN, FILTER, URUTAN ===== */
const state = { q: "", kat: "Semua", maks: 0, buka: false, urut: "nama" };

function hasilFilter() {
  const q = state.q.trim().toLowerCase();
  return restoList.filter(r =>
    (!q || r.nama.toLowerCase().includes(q) || r.menu.some(m => m.nama.toLowerCase().includes(q))) &&
    (state.kat === "Semua" || r.kategori === state.kat) &&
    (!state.maks || termurah(r) <= state.maks) &&
    (!state.buka || sedangBuka(r))
  ).sort((a, b) =>
    state.urut === "harga" ? termurah(a) - termurah(b) :
    state.urut === "jarak" ? a.jarak - b.jarak : a.nama.localeCompare(b.nama));
}

function tampilkan() {
  const hasil = hasilFilter();
  $("#grid").innerHTML = hasil.map(cardHTML).join("");
  $("#jumlah").textContent = `Menampilkan ${hasil.length} tempat makan yang cocok untukmu`;
  $("#kosong").hidden = hasil.length > 0;
}

function renderKategori() {
  const daftar = ["Semua", ...new Set(restoList.map(r => r.kategori))];
  $("#kategoriList").innerHTML = daftar.map(k =>
    `<button class="kat" data-kat="${k}" aria-pressed="${k === state.kat}"><i>${ikonKat[k] || "🍽️"}</i>${k}</button>`).join("");
}

$("#kategoriList").addEventListener("click", e => {
  const b = e.target.closest(".kat"); if (!b) return;
  state.kat = b.dataset.kat;
  renderKategori(); tampilkan(); ke("#tempat");
});
$("#q").addEventListener("input", e => { state.q = e.target.value; tampilkan(); });
$("#formCari").addEventListener("submit", e => { e.preventDefault(); state.q = $("#q").value; tampilkan(); ke("#tempat"); });
$$(".pill").forEach(p => p.addEventListener("click", () => {
  $("#q").value = state.q = p.dataset.q; tampilkan(); ke("#tempat");
}));
$("#harga").addEventListener("change", e => { state.maks = +e.target.value; tampilkan(); });
$("#status").addEventListener("change", e => { state.buka = e.target.value === "buka"; tampilkan(); });
$("#urut").addEventListener("change", e => { state.urut = e.target.value; tampilkan(); });
$("#reset").addEventListener("click", () => {
  Object.assign(state, { q: "", kat: "Semua", maks: 0, buka: false, urut: "nama" });
  $("#q").value = ""; $("#harga").value = "0"; $("#status").value = "semua"; $("#urut").value = "nama";
  renderKategori(); tampilkan();
});

/* ===== REKOMENDASI (tab + acak) ===== */
const tabRekom = {
  hemat: { label: "Paling Hemat", daftar: () => [...restoList].sort((a, b) => termurah(a) - termurah(b)) },
  dekat: { label: "Terdekat", daftar: () => [...restoList].sort((a, b) => a.jarak - b.jarak) },
  nongkrong: { label: "Buat Nongkrong", daftar: () => restoList.filter(r => r.kategori === "Kopi & Minuman") },
  buka: { label: "Sedang Buka", daftar: () => restoList.filter(sedangBuka) }
};
function renderRekom(kunci) {
  const t = tabRekom[kunci], daftar = t.daftar().slice(0, 3);
  $("#rekom").innerHTML = daftar.length ? daftar.map(r => `<article class="rek" tabindex="0" data-id="${r.id}">
      <div class="rek-bg">${gambarHTML(r)}</div>
      <div class="rek-isi"><span class="tagk">${t.label}</span><h3>${r.nama}</h3><p>${r.kategori} · Mulai ${rp(termurah(r))}</p></div>
    </article>`).join("") : `<p class="lead2">Belum ada tempat yang cocok saat ini.</p>`;
}
$("#tabs").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  $$("#tabs button").forEach(x => x.setAttribute("aria-pressed", x === b));
  renderRekom(b.dataset.tab);
});
// Tombol acak: pilih satu tempat secara acak lalu tampilkan detailnya
$("#btnAcak").addEventListener("click", () => bukaModal(restoList[Math.floor(Math.random() * restoList.length)].id));

/* ===== MODAL DETAIL ===== */
function menuHTML(menu) {
  const grup = {};
  menu.forEach(m => { const k = m.grup || "Menu"; if (!grup[k]) grup[k] = []; grup[k].push(m); });
  return Object.entries(grup).map(([nama, isi]) =>
    `<h4>${nama}</h4><ul>${isi.map(m => `<li><span>${m.nama}</span><i></i><b>${rp(m.harga)}</b></li>`).join("")}</ul>`).join("");
}
const modal = $("#modal");
let fokusAsal = null;

function bukaModal(id) {
  const r = restoList.find(x => x.id === +id); if (!r) return;
  fokusAsal = document.activeElement;
  const libur = r.libur ? ` · Libur: ${r.libur.join(", ")}` : "";
  $("#modalIsi").innerHTML = `<div class="m-head"><div class="m-ico">${r.logo ? `<img src="${r.logo}" alt="">` : inisial(r.nama)}</div>
      <div><h3 id="mJudul">${r.nama}</h3><p>${r.kategori} · ${r.jamBuka}–${r.jamTutup}${libur}</p></div></div>
    <p>${badgeHTML(r)}</p>
    <p>${r.deskripsi}</p>
    <div class="m-cari">
      <input id="mQ" type="search" placeholder="Cari menu di sini..." value="${esc(state.q)}" aria-label="Cari menu">
      <select id="mUrut" aria-label="Urutkan menu">
        <option value="grup">Per kategori</option>
        <option value="murah">Termurah</option>
        <option value="mahal">Termahal</option>
        <option value="nama">Nama A-Z</option>
      </select>
    </div>
    <div id="mMenu"></div>
    <p style="margin-top:1.5rem">📍 ${r.lokasi} (${fmtJarak(r.jarak)} dari kampus)</p>
    <a class="btn hijau" href="${r.linkMaps}" target="_blank" rel="noopener">Buka di Google Maps</a>`;
  modal.hidden = false;
  $("#mQ").addEventListener("input", () => isiMenu(r));
  $("#mUrut").addEventListener("change", () => isiMenu(r));
  isiMenu(r);
  $("#tutup").focus();
}
// Isi daftar menu di modal sesuai kata kunci dan urutan yang dipilih
function isiMenu(r) {
  const q = $("#mQ").value.trim().toLowerCase(), u = $("#mUrut").value;
  const daftar = r.menu.filter(m => !q || m.nama.toLowerCase().includes(q) || (m.grup || "").toLowerCase().includes(q));
  if (u === "murah") daftar.sort((a, b) => a.harga - b.harga);
  else if (u === "mahal") daftar.sort((a, b) => b.harga - a.harga);
  else if (u === "nama") daftar.sort((a, b) => a.nama.localeCompare(b.nama));
  $("#mMenu").innerHTML = !daftar.length ? `<p>Menu tidak ditemukan.</p>`
    : u === "grup" ? menuHTML(daftar)
    : `<ul>${daftar.map(m => `<li><span>${m.nama}</span><i></i><b>${rp(m.harga)}</b></li>`).join("")}</ul>`;
}
function tutupModal() { modal.hidden = true; if (fokusAsal) fokusAsal.focus(); }
$("#tutup").addEventListener("click", tutupModal);
modal.addEventListener("click", e => { if (e.target === modal) tutupModal(); });
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !modal.hidden) tutupModal();
  if (e.key === "Enter" && e.target.dataset && e.target.dataset.id) bukaModal(e.target.dataset.id);
});
// Klik kartu manapun (daftar atau rekomendasi) membuka detail
document.addEventListener("click", e => { const c = e.target.closest("[data-id]"); if (c) bukaModal(c.dataset.id); });

/* ===== NAVBAR ===== */
$("#burger").addEventListener("click", () => $("#burger").setAttribute("aria-expanded", $("#menu").classList.toggle("open")));
$("#menu").addEventListener("click", () => $("#menu").classList.remove("open"));
const obsNav = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) $$("#menu a").forEach(a => a.classList.toggle("on", a.hash === "#" + e.target.id));
}), { rootMargin: "-40% 0px -55% 0px" });
["beranda", "tempat", "rekomendasi", "tentang"].forEach(id => obsNav.observe(document.getElementById(id)));

/* ===== ISI ANGKA OTOMATIS DARI DATA ===== */
$("#hTempat").textContent = restoList.length + " tempat";
$("#hMurah").textContent = "Mulai " + rp(Math.min(...restoList.map(termurah)));
$("#nPilihan").textContent = restoList.length;

/* ===== TAMPILAN AWAL ===== */
renderKategori();
renderRekom("hemat");
tampilkan();
