import { loginAuth } from "../../firebase/authFunc";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const user = await loginAuth(req.body);
            res.json(user);
        } catch (err) {
            res.status(404).json(err);
        }
    }
}

export default handler
