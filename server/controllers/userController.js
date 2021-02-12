import User from "../models/User";

export const authSuccess = async (req, res) => {
  res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image,
  });
};

export const register = async (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
          success: true
      });
  });
};

export const postLogin = async (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
      if (!user)
          return res.json({
              success: false,
              message: "Auth failed, email not found"
          });

      user.comparePassword(req.body.password, (err, isMatch) => {
          if (!isMatch)
              return res.json({ success: false, message: "Wrong password" });

          user.generateToken((err, user) => {
              if (err) return res.status(400).send(err);
              res.cookie("w_authExp", user.tokenExp);
              res
                  .cookie("w_auth", user.token)
                  .status(200)
                  .json({
                      success: true, userId: user._id
                  });
          });
      });
  });
};

export const logout = (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
      if (err) return res.json({ success: false, message: "Error occurred", err });
      return res.status(200).send({
          success: true
      });
  });
};