import { verifyMailForgot } from "../../firebase/authFunc";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const {email} = req.body;
        try {
            await verifyMailForgot(email);
            res.status(200).json({message: 'reset password mail has been sent to your box'});
        } catch (err) {
            res.status(404).json(err);
        }
    }
}

export default handler