const Authentication = require('./controllers/authentication');
const Photos = require('./controllers/photos');
const passportService = require('./services/passport');
const passport = require('passport');
const Comments = require('./controllers/comments');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });


module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'super secret code is abc1234' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  app.post('/photo/upload', requireAuth, Photos.upload);
  app.get('/photo/fetchAll', requireAuth, Photos.fetchAll);
  app.post('/comment/add', requireAuth, Comments.add);
};
