export default async function handler(req, res) {
// Hanya izinkan metode POST
if (req.method !== 'POST') {
return res.status(405).json({ ok: false, msg: 'Method not allowed' });
}

// Ambil username & password dari body
const { username, password } = req.body || {};

// Validasi input dasar
if (!username || !password) {
return res.status(400).json({ ok: false, msg: 'Username dan password wajib diisi' });
}

// Ambil daftar user dari environment variable
// Format: IMR_USERS = admin:1234,operator:imr2025
const envUsers = process.env.IMR_USERS || '';
const users = envUsers
.split(',')
.map(pair => {
const [user, pass] = pair.split(':');
return { user: user?.trim(), pass: pass?.trim() };
})
.filter(u => u.user && u.pass);

// Cek apakah username & password cocok
const validUser = users.find(u => u.user === username && u.pass === password);

if (validUser) {
// Jika valid, kirim respon sukses dan username
return res.status(200).json({ ok: true, username });
} else {
// Jika salah, kirim pesan error
return res.status(401).json({ ok: false, msg: 'Username atau password salah' });
}
}
