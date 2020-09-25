const jwt = require("jsonwebtoken")

module.exports = {
    generateToken: (user) => {
        const accessToken = jwt.sign(user, process.env.TOKEN_SECRET,{expiresIn:'30m'})
        return accessToken
    },
    generateRefreshToken: (user) => {
        return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    },
    authToken: (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(token == null){
            res.sendStatus(403)
        }jwt.verify(token, process.env.TOKEN_SECRET, (err, usr) => {
            if (err) res.sendStatus(403) 
         
            req.user = usr
            req.user.freshtoken = jwt.sign(usr, process.env.TOKEN_SECRET)

            next()
         })
    },
    getNewToken: (refToken) => {
        if(refToken == null){
            return false
        }
        return jwt.verify(refToken, process.env.REFRESH_TOKEN_SECRET, (err, usr) => {
            if (err) return false
        
            var freshtoken = jwt.sign(usr, process.env.TOKEN_SECRET)
            return freshtoken
         })
    },
    generateAdminToken: (user) => {
        const accessToken = jwt.sign(user, process.env.TOKEN_SECRET,{expiresIn:'30m'})
        return accessToken
    },
    generateAdminRefreshToken: (user) => {
        return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    },
    authAdminToken: (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(token == null){
            res.sendStatus(403)
        }else{
            jwt.verify(token, process.env.TOKEN_SECRET, (err, usr) => {
                if (err) res.sendStatus(403)          
                req.user = usr
                next()
             })
        } 
        
    }
}