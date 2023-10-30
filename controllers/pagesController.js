const getHomepage = (req, res) => {
    res.render('home');
};
const getLoginPage = (req, res) => {
    res.render('login');
};
module.exports = { getHomepage, getLoginPage };