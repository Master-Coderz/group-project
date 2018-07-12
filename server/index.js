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
    CALLBACK_URL,
    SUCCESS_REDIRECT,
    FAILURE_REDIRECT
} = process.env

massive(process.env.CONNECTION_STRING).then(dbInstance =>
    app.set("db", dbInstance)
);



const app = express();

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/../build`))

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
    const db = app.get('db')
    db.find_user([profile.id]).then((userResult) => {
        if (!userResult[0]) {
            db.create_user([
                profile.id,
                profile.name.givenName,
                profile.name.familyName,
                profile.picture
            ])
                .then((createdUser) => {
                    return done(null, createdUser[0].id)
                })
        } else {
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
        .catch(err => console.error(err));
});


app.get(
    "/auth",
    passport.authenticate("auth0", {
        successRedirect: SUCCESS_REDIRECT,
        failureRedirect: FAILURE_REDIRECT
    })
);
app.get("/auth/logout", (req, res) => {
    console.log("logging out");
    req.logOut();

    res.redirect(
        302,
        `https://carter-childs.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost:3000/&client_id=${CLIENT_ID}`
    );
});
app.get(
    "/auth/callback",
    passport.authenticate("auth0", {
        successRedirect: SUCCESS_REDIRECT,
        failureRedirect: FAILURE_REDIRECT
    })
);

app.get('/auth/me', function (req, res) {
    if (!req.user)
        return res.status(404).send('User not found')
    else
        return res.status(200).send(req.user)
}
);


//endpoints 
app.post('/api/addReview/:movie_id', controller.addReview)
app.get('/api/getReviews/:movie_id', controller.getReviews)
app.post('/api/addToWatchlist/:movie_id', controller.addToWatchlist)
app.get('/api/getUser', controller.getUserInfo)
app.get('/api/getWatchlist', controller.getWatchlist)
app.delete('/api/removeMovie/:movie_id', controller.removeFromWatchlist)
app.delete('/api/deleteReview/:review_id', controller.deleteReview)
app.get('/api/checkWatchlistMovie/:id', controller.checkWatchlistMovie)
app.put('/api/updateReview/:review_id', controller.updateReview)


app.listen(SERVER_PORT, () => console.log(`Listening on port: ${SERVER_PORT}`));