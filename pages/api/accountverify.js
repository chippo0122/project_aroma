import { verifyMail } from "../../firebase/authFunc";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            await verifyMail()
            res.status(200).json({message: 'verification mail has been sent to your box'});
        } catch (err) {
            res.status(404).json(err);
        }
    }
}

export default handler