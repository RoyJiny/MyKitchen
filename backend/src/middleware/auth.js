

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        
        /* verify with firebase */
        

        /* verify find that the user exists inside the data base */
        // const user = await User.findOne({
        //     _id: decoded._id,
        //     "tokens.token": token
        // });

        // if (!user) {
        //     throw new Error();
        // }

        // req.token = token;
        // req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: "Unauthorized" });
    }
};

module.exports = auth;
