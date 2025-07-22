import logger from "./logger.js";

export const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();

  logger.info(`Token issued for user: ${user._id} (${user.email})`, {
    userId: user._id,
    statusCode,
    message,
  });

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // already good
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // 👈 key change
    })
    .json({
      success: true,
      message,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        accountVerified: user.accountVerified,
      },
    });
};
