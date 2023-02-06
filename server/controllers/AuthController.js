import users from "../models/users.js";

const login = async ()=>{
    const login = async (req, res) => {
        const { email, password } = req.body;
        const user = await users.findOne({ email });
        console.log("user", user)
        if (!user) {
          return res
            .status(400)
            .json(
              {
                errors: { message: message.USER_NOT_FOUND }
              });
        }
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
      
        if (!isPasswordCorrect) {
          return res
            .status(422)
            .json({
              errors: { message: message.PASSWORD_NOT_MATCH }
            });
        }
        console.log("chackID", user._id)
        return res.status(200).json(
          {
            message: message.LOGIN_SUCCESS,
            token: `Bearer ${await encode({
              id: user._id,
            })}`
          }
        );
      }
}
const AuthController = {
    login
  }
  export default AuthController;