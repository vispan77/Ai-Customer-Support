import User from "@/models/user/user";
import jwt from "jsonwebtoken";


const getUser = async (token: string) => {
    try {
        const decode = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);

        const user = await User.findById({ _id: decode.id });

        return user;

    } catch (error) {
        console.log(error)
    }

}

export default getUser;