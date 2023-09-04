import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jwt.sign(
        { userId },
        process.env.SECRET_JWT_KEY,
        { expiresIn: '3d' }
    );

    res.cookie('jwt', token, {
        httponly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 3 * 24 * 60 * 60 * 1000
    })
}

export default generateToken;