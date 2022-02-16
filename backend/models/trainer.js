const mongoose=require('mongoose');
const bcrypt= require('bcrypt');

const schema = new mongoose.Schema({
 first_name: { type:String, default : '' },
 last_name: { type:String, default : '' },
 email: { type:String, default : '' },
 password: { type:String ,required : true},
  profile_image: { type:String, default : '' },
 profession: { type:String, default : '' }
});

schema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('trainer',schema);