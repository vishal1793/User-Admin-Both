const schema = require("../../schema/schema")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {
    try {
        const Token = await req.headers.authorization.split(" ")[1];
        if (!Token) {
            res.json({ msg: "token not found" });
        } else {
            const decode = jwt.verify(Token, process.env.jwt)
            if (decode) {
                req.user = decode.role;
                next();
            } else {
                return res.json({ msg: "token not valid" })
            }
        }
    } catch (error) {
        res.status(404).json({ msg: "error", error })
    }
}

const readData = async (req, res) => {
    try {
        const data = await schema.find();
        res.json(data)
    } catch (error) {
        res.json({ msg: "error", error })
    }
}

const getData = async (req, res) => {
    try {
        if (req.user === "admin") {
            const data = await schema.find()
            const visibleData = await data.filter((val, ind) => {
                return val.role !== "admin"
            })
            res.json({ msg: 'data retrived', visibleData })
        }
        else {
            res.json("only admin can access")
        }
    } catch (error) {
        res.status(404).json({ msg: 'error', error })
    }
}

const postData = async (req, res) => {
    try {
        const passwordHashing = await bcryptjs.hash(req.body.password, 7)
        const data = new schema({
            name: req.body.name,
            email: req.body.email,
            password: passwordHashing,
            role: req.body.role
        })

        await data.save();
        res.json({ msg: "data saved", data })
    } catch (error) {
        res.status(404).json({ msg: "error", error })
    }
}

const putData = async (req, res) => {
    try {
        const editData = await schema.findByIdAndUpdate(req.params.id, req.body)
        res.json({ msg: "data updated", data: editData })
    } catch (error) {
        res.status(404).json({ msg: "error", error })
    }
}

const deleteData = async (req, res) => {
    try {
        const data = await schema.findByIdAndDelete(req.params.id)
        res.json({ msg: "data deleted", data })
    } catch (error) {
        res.status(404).json({ msg: "err", error })
    }
}

const loginData = async (req, res) => {
    try {
        const verifyEmail = await schema.findOne({ email: req.body.email })
        if (!verifyEmail) return res.json("email invalid");
        const verifyPassword = await bcryptjs.compare(req.body.password, verifyEmail.password)
        if (!verifyPassword) return res.json("password invalid");

        const token = jwt.sign({
            name: verifyEmail.name,
            email: verifyEmail.email,
            role: verifyEmail.role
        }, process.env.jwt, { expiresIn: "20m" })

        res.json({ msg: "login successful", token })
    } catch (error) {
        res.status(404).json({ msg: "error", error })
    }
}


module.exports = { getData, postData, putData, deleteData, loginData, verifyToken, readData }