var express = require('express');
const  route  = require('.');
var router = express.Router();

let goals = [
    {
        id: 1,
        name: 'Goal 1',
        description: 'Description for Goal 1'
    },
    {
        id: 2,
        name: 'Goal 2',
        description: 'Description for Goal 2'
    },
    {
        id: 3,
        name: 'Goal 3',
        description: 'Description for Goal 3'
    }
]

router.get('/getGoals', function(req, res, next) {
     res.status(200).json(goals);
})

router.delete('/deleteGoal/:id', function (req, res, next) {
  const goalId = parseInt(req.params.id);
  const goal = goals.find(goal => goal.id === goalId);

if (!goal) {
  return res.status(400).json({ message: 'Goal not found' });
} else {
  goals = goals.filter(goal => goal.id !== goalId);
  return res.status(200).json({ message: 'Goal deleted successfully' });
}
});

router.post('/addGoal', function(req, res, next) {
    const newGoal = {
        id: goals.length + 1,
        name: req.body.name,
        description: req.body.description
    };
    goals.push(newGoal);
     res.status(200).json({ message: 'Goal added successfully', goal: newGoal });
});

module.exports = router;
