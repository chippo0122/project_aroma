import { createAuth, verifyMail } from "../../firebase/authFunc";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const user = await createAuth(req.body);
            //verify mail after the account has been created
            await verifyMail();
            res.json(user);
        } catch (err) {
            res.status(404).json(err);
        }
    }
}

export default handler