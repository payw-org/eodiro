import express from 'express';

let router = express.Router();

// University list data
router.get('/university', (req, res) => {

});

// Building list data
router.get('/:vendor', (req, res) => {

});

// Floor list data
router.get('/:vendor/:building', (req, res) => {

});

// Classroom list data
router.get('/:vendor/:building/:floor', (req, res) => {

});

router.get('*', (req, res) => {
    res.status(404).json({
        error: "Incorrect request"
    });
});

export { router };
