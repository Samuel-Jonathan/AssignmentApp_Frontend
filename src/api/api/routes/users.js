let User = require('../model/user');

function getUser(req, res) {
    let username = req.params.username;

    User.findOne({ username: username }, (err, user) => {
        if (err) {
            // Si une erreur de base de données s'est produite, renvoyez un code d'état 500 (Erreur interne du serveur)
            console.error("Erreur lors de la recherche de l'utilisateur:", err);
            return res.status(500).send(err);
        }
        if (!user) {
            // Si aucun utilisateur n'est trouvé, renvoyez un code d'état 404 (Non trouvé)
            return res.status(404).send("User not found");
        }
        // Si l'utilisateur est trouvé, renvoyez l'utilisateur
        res.json(user);
    });
}

module.exports = { getUser };
