import express from 'express';
import UniversityListMiddleware from 'Middleware/UniversityListMiddleware';
import BuildingListMiddleware from 'Middleware/BuildingListMiddleware';
import FloorListMiddleware from 'Middleware/FloorListMiddleware';
import ClassroomListMiddleware from 'Middleware/ClassroomListMiddleware';

const router = express.Router();

// University list data
router.get('/university', async (req, res) => {
  const middleware = new UniversityListMiddleware();
  const univ_list = await middleware.getList(
    req.query.language
  );

  res.json({ error: false, universities: univ_list });
});

// Building list data
router.get('/:vendor', async (req, res) => {
  const middleware = new BuildingListMiddleware();

  const building_list = await middleware.getList(
    req.params.vendor,
    req.query.language
  );

  res.json({ error: false, buildings: building_list });
});

// Building list data include number of empty classrooms
router.get('/:vendor/empty', async (req, res) => {
  const middleware = new BuildingListMiddleware();

  const building_list = await middleware.getListIncludeEmptyNum(
    req.params.vendor,
    req.query.language
  );

  res.json({ error: false, buildings: building_list });
});

// Floor list data
router.get('/:vendor/:building_num', async (req, res) => {
  const middleware = new FloorListMiddleware();

  const floor_list = await middleware.getList(
    req.params.vendor,
    req.params.building_num
  );

  res.json({ error: false, floors: floor_list });
});

// Floor list data include number of empty classrooms
router.get('/:vendor/:building_num/empty', async (req, res) => {
  const middleware = new FloorListMiddleware();

  const floor_list = await middleware.getListIncludeEmptyNum(
    req.params.vendor,
    req.params.building_num
  );

  res.json({ error: false, floors: floor_list });
});

// Classroom list data
router.get('/:vendor/:building_num/:floor_num', async (req, res) => {
  const middleware = new ClassroomListMiddleware();

  const classroom_list = await middleware.getList(
    req.params.vendor,
    req.params.building_num,
    req.params.floor_num.toUpperCase()
  );

  res.json({ error: false, classrooms: classroom_list });
});

// invalid request
router.get('*', (req, res) => {
  res.status(404).json({
    error: true,
    msg: "invalid request"
  });
});

export { router };
