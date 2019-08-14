var express = require('express');
var router = express.Router();

const channelUsersController = require('../controllers').channelUsers;
const messagesController = require('../controllers').messages;
const channelsController = require('../controllers').channels;
const usersController = require('../controllers').users;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200);
  res.json({test: 'ok'})
});

router.get('/api/channels', channelsController.list);
// router.get('/api/channels/:id', channelsController.getById);
router.post('/api/create-channel', channelsController.create);
router.post('/api/create-channel-user', channelUsersController.findOrCreate);
router.post('/api/channelUsers/edit/:id', channelUsersController.update);
router.post('/api/channels', channelsController.create);
router.post('/api/messages', messagesController.createOrUpdate);
router.post('/api/register', usersController.create);
router.post('/api/login', usersController.validate);

module.exports = router;
