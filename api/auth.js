export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, msg: "Method not allowed" });
  }

  try {
    const { username, password } = req.body;

    // Ganti username & password sesuai kebutuhan kamu
    const USER = process.env.IMR_USER || "admin";
    const PASS = process.env.IMR_PASS || "imr123";

    if (username === USER && password === PASS) {
      return res.status(200).json({ ok: true });
    } else {
      return res.status(401).json({ ok: false, msg: "Username atau password salah" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, msg: "Server error" });
  }
}
