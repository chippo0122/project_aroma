import { signoutAuth } from "../../firebase/authFunc";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            await signoutAuth();
            res.status(200).json({message: 'Logout Successful'});
        } catch (err) {
            res.status(404).json(err);
        }
    }
}

export default handler