// /api/auth.js

export default async function handler(req, res) {
  // Hanya izinkan POST
  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body || {};

    // Ambil dari environment variables
    const validUser = process.env.IMR_USER;
    const validPass = process.env.IMR_PASS;

    // Cek apakah sesuai
    if (username === validUser && password === validPass) {
      return res.status(200).json({ ok: true });
    } else {
      return res.status(401).json({ ok: false, msg: 'Username atau password salah' });
    }
  } catch (error) {
    console.error('Error di auth.js:', error);
    return res.status(500).json({ ok: false, msg: 'Terjadi kesalahan server' });
  }
}
