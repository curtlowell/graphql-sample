module.exports = (req, res, next) => {
    res.setHeader('Access-Controll-Allow-Origin', '*')
    res.setHeader('Access-Controll-Allow-Methods', 'POST, GET, OPTIONS')
    res.setHeader('Access-Controll-Allow-Headers', 'Content-Type, Authorization')
    if(req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }
    next()
}