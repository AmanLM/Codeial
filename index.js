const express = require('express');
const app = express();
const port = 8000;

//layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//middleware
app.use(express.urlencoded());

//assets
app.use(express.static('./assets'));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//views
app.set('view engine','ejs');
app.set('views','./views');

//database
const db = require('./config/mongoose');

//cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//passport

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratergy');

// const MongoStore = require('connect-mongo')(session);


app.use(session({
    name: 'codeial',
    secret: 'Happy',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    // store: new MongoStore(
    //     {
    //         mongooseConnection: db,
    //         autoRemove: 'disabled'
    //     },
    //     function(err){
    //         console.log(err ||  'connect-mongodb setup ok');
    //     }
    // )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//----passport up-----


app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("Server running on port : "+ port);
})