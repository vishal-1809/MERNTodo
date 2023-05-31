const { addTask, getTask, getIdTask, updateTask, deleteTask, status } = require('../controllers/ListController');
const router = require('express').Router();

router.post('/addTask', addTask);
router.post('/getTask', getTask);
router.get('/getIdTask/:id', getIdTask);
router.put('/updateTask/:id', updateTask);
router.delete('/deleteTask/:id', deleteTask);
router.post('/status/:id', status);

module.exports = router;