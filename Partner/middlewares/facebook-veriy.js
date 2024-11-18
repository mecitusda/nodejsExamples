/*const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;


    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['displayName']
        },
        async function(accessToken, refreshToken, profile, cb) {
            console.log("girdi")
            const user = await User.findOne({facebookId: profile.id});
            if(!user){
                const newUser = new User({
                    facebookId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value
                });
                await newUser.save();
                console.log("User created");
                return cb(null, profile);
            }
            console.log("User already exists");
            return cb(null, profile);
         
        }
    ));


passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });



module.exports = passport.authenticate('facebook', { scope: 'public_profile' });


*/


const verify = async(req, res) => {

};

module.exports = verify;