import { getUserAuth } from "../../firebase/authFunc";

const handler = async(req, res) => {
    const {authorization} = req.headers;
    const currentUser = await getUserAuth(authorization);
    await res.json(currentUser);
}

export default handler