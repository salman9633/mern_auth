import jwt from "jsonwebtoken";
import cookie from "cookie";

const generateToken = (res, userId) => {
    const token = jwt.sign(
        { userId },
        process.env.SECRET_JWT_KEY,
        { expiresIn: '3d' }
    );

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 3 * 24 * 60 * 60 * 1000
    }
    const cookieString = cookie.serialize('jwt', token, cookieOptions);
    res.setHeader('Set-Cookie', cookieString);
    return token
}

export default generateToken;