import express from 'express';
import UniversityListMiddleware from 'Middleware/UniversityListMiddleware';
import BuildingListMiddleware from 'Middleware/BuildingListMiddleware';
import FloorListMiddleware from 'Middleware/FloorListMiddleware';
import ClassroomListMiddleware from 'Middleware/ClassroomListMiddleware';

import logger from 'Configs/log';

const router = express.Router();

// University list data
router.get('/university', async (req, res) => {
  const middleware = new UniversityListMiddleware();

  try {
    const univ_list = await middleware.getList(
      req.query.language
    );

    res.json({ err: false, universities: univ_list });
  } catch (err) {
    res.json({ err: true, msg: err });
  }
});

// Building list data
router.get('/:vendor', async (req, res) => {
  const middleware = new BuildingListMiddleware();

  try {
    const building_list = await middleware.getList(
      req.params.vendor,
      req.query.language
    );
  
    res.json({ err: false, buildings: building_list });
  } catch (err) {
    res.json({ err: true, msg: err });
  }
});

// Building list data include number of empty classrooms
router.get('/:vendor/empty', async (req, res) => {
  const middleware = new BuildingListMiddleware();

  try {
    const building_list = await middleware.getListIncludeEmptyNum(
      req.params.vendor,
      req.query.language
    );
  
    res.json({ err: false, buildings: building_list });
  } catch (err) {
    res.json({ err: true, msg: err });
  }
});

// Floor list data
router.get('/:vendor/:building_num', async (req, res) => {
  const middleware = new FloorListMiddleware();

  try {
    const floor_list = await middleware.getList(
      req.params.vendor,
      req.params.building_num
    );
  
    res.json({ err: false, floors: floor_list });
  } catch (err) {
    res.json({ err: true, msg: err });
  }
});

// Floor list data include number of empty classrooms
router.get('/:vendor/:building_num/empty', async (req, res) => {
  const middleware = new FloorListMiddleware();

  try {
    const floor_list = await middleware.getListIncludeEmptyNum(
      req.params.vendor,
      req.params.building_num
    );
  
    res.json({ err: false, floors: floor_list });
  } catch (err) {
    res.json({ err: true, msg: err });
  }
});

// Classroom list data
router.get('/:vendor/:building_num/:floor_num', async (req, res) => {
  const middleware = new ClassroomListMiddleware();

  try {
    const classroom_list = await middleware.getList(
      req.params.vendor,
      req.params.building_num,
      req.params.floor_num.toUpperCase()
    );
  
    res.json({ err: false, classrooms: classroom_list });
  } catch (err) {
    res.json({ err: true, msg: err });
  }
});

// invalid request
router.get('*', (req, res) => {
  res.status(404).json({ err: true, msg: "invalid request" });
});

export { router };
