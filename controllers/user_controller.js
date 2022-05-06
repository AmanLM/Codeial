const User = require('../models/user');

module.exports.profile = function(req,res){
    if (req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if (user){
                return res.render('profile', {
                    title: "User Profile",
                    user: user
                })
            }else{
                return res.redirect('/users/signin');

            }
        });
    }else{
        return res.redirect('/users/signin');

    }
}

module.exports.signup = function(req,res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('signup',{
        title: "SignUP"
    })
}

module.exports.signin = function(req,res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('signin',{
        title: "SignIn"
    })
}

module.exports.create = function(req,res){
    
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/signin');
            })
        }else{
            return res.redirect('back');
        }

    });
}

// module.exports.createSession = function(req,res){

//     User.findOne({email: req.body.email}, function(err, user){
//         if(err){console.log('error in finding user in signing in'); return}
//         if (user){
//             if (user.password != req.body.password){
//                 return res.redirect('back');
//             }
//             res.cookie('user_id', user.id);
//             return res.redirect('/users/profile');
//         }else{
//             return res.redirect('back');
//         }
//     })
// }


//passport
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
}


