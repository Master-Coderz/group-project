require("dotenv").config();
const express = require('express'),
    session = require('express-session'),
    bodyParser = require("body-parser"),
    massive = require("massive"),
    passport = require("passport"),
    Auth0Strategy = require('passport-auth0'),
    controller = require("./controller");



const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL
} = process.env

massive(process.env.CONNECTION_STRING).then(dbInstance =>
    app.set("db", dbInstance)
);



const app = express();

app.use(bodyParser.json());


app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function (accessToken, refreshToken, extraParams, profile, done) {
    // console.log(profile)
    const db = app.get('db')
    db.find_user([profile.id]).then((userResult) => {
        console.log('user checked')
        if (!userResult[0]) {
            db.create_user([
                profile.id,
                profile.name.givenName,
                profile.name.familyName,
                profile.picture
            ])
                .then((createdUser) => {
                    console.log('user created')
                    return done(null, createdUser[0].id)
                })
        } else {
            console.log('user existed', userResult[0].id)
            return done(null, userResult[0].id)
        }
    })
}))



passport.serializeUser((id, done) => {
    done(null, id)
})

passport.deserializeUser((id, done) => {
    const db = app.get("db");
    db
        .find_user_session([id])
        .then(loggedInUser => {
            done(null, loggedInUser[0]);
        })
        .catch(err => console.log(err, "error"));
});


app.get(
    "/auth",
    passport.authenticate("auth0", {
        successRedirect: "http://localhost:3000/#/",
        failureRedirect: "http://localhost:3000"
    })
);
app.get(
    "/auth/callback",
    passport.authenticate("auth0", {
        successRedirect: "http://localhost:3000/",
        failureRedirect: "http://localhost:3000"
    })
);

app.get( '/auth/me', function( req, res ) {
    console.log(req.user)
    if( !req.user )
        return res.status(404).send( 'User not found' )
    else
        return res.status(200).send( req.user )
}
);


//endpoints 
app.post('/api/addReview/:movie_id', controller.addReview)




app.listen(SERVER_PORT, () => console.log(`Listening on port: ${SERVER_PORT}`));