const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
var dotenv = require('dotenv');
dotenv.config();

const { auth } = require('./middleware/auth');
const { User } = require("./models/User");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_URL);
var db = mongoose.connection;
db.once('open', function(){
    console.log("✅  Connected to DB");
});
db.on('error', function(err){
    console.log(`❌ Error on DB Connection:${err}`);
});

app.get('/', (req, res) => res.send('Hello World!~~안녕하세요 ~ '));

app.get('/api/hello', (req, res) => res.send('Hello World!~~ '));

app.post('/api/users/register', (req, res) => {
    //회원 가입 할떄 필요한 정보들을  client에서 가져오면 
    //그것들을  데이터 베이스에 넣어준다. 
    const user = new User(req.body);

    user.save((err, userInfo) => {
        if (err) return res.json({ registerSuccess: false, err });
        return res.status(200).json({
            registerSuccess: true
        });
    });
});

app.post('/api/users/login', (req, res) => {
    //요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        // console.log('user', user);
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            });
        };
        //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
            //비밀번호 까지 맞다면 토큰을 생성하기.
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                // 토큰을 저장한다.  어디에 ?  쿠키 , 로컳스토리지 
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id });
            });
        });
    });
});

// role 1 어드민    role 2 특정 부서 어드민 
 // role 0 -> 일반유저   role 0이 아니면  관리자 
 app.get('/api/users/auth', auth, (req, res) => {
    //여기 까지 미들웨어를 통과해 왔다는 얘기는  Authentication 이 True 라는 말.
    console.log(req.user);
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image
    });
});

app.get('/api/users/logout', auth, (req, res) => {
    // console.log('req.user', req.user)
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
        if (err) return res.json({ logoutSuccess: false, err });
            
        return res.status(200).send({
            logoutSuccess: true
        });
    });
});

const port = 4000;
app.listen(port, () => console.log(`server on! http://localhost:${port}`));