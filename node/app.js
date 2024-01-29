const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const uuid = require('uuid')

const app = express();
app.use(cors());
app.use(bodyParser.json());

const validateDate = [
  check('description').isString().notEmpty(),
  check('amount').isNumeric().notEmpty(),
  check('spent_at').isISO8601().notEmpty(),
  check('currency').isString().notEmpty(),
];

let spendings = [];

app.get('/spendings', (req, res) => {
  res.status(200).json(spendings);
});

app.post('/spendings', validateDate, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const spending = { ...req.body, id: uuid.v4() }
  spendings.push(spending);

  res.status(201).json(spending);
});

module.exports = app;
