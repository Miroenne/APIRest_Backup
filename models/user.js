const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* import du module permettant de hacher les expressions (protection mdp) */
const bcrypt = require('bcrypt'); 

const User = new Schema({
    name: {
        type        : String,
        trim        : true,
        required    : [true, 'Le nom est requis']
    },
    fisrtname: {
        type        : String,
        trim        : true,        
    },
    email: {
        type        : String,
        trim        : true,
        required    : [true, "L'email est requis"],
        unique      : true,
        lowercase   : true
    },
    password : {
        type        : String,
        trim        : true
    }
},{
    // ajoute 2 champs au document "createdAt" et "updateAt"
    timestamps      : true
});

// hasher le mot de passe quand il est modifié
User.pre('save', async function(next){
    if (!this.isModified('password')){
        return next();
    }

    this.password = await bcrypt.hashSync(this.password, 10);

    next();
});

module.exports = mongoose.model('User',User);