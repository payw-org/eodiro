import University from 'Database/models/university';
import EmptyFacilityController from 'Controller/EmptyFacilityController';

export default class FloorListMiddleware {
  async getList(vendor, building_num) {
    const university = await University.findOne(
      { vendor: vendor },
      { _id: 0, buildings: 1 },
      (err) => {
        if (err) {
          logger.error(err);
        }
      }
    ).populate({
      path: 'buildings',
      select: 'number floors -_id',
      match: { number: building_num },
      populate: {
        path: 'floors',
        select: 'number -_id'
      }
    });

    // if not found
    if (!university) {
      return Promise.reject("university not found");
    }

    if (!university.buildings[0]) {
      return Promise.reject("building not found");
    }

    if (university.buildings[0].floors.length == 0) {
      return Promise.reject("floors not found");
    }

    const floors = university.buildings[0].floors;
    floors.sort((a, b) => {
      let int_a = convert_floor_to_int(a.number);
      let int_b = convert_floor_to_int(b.number);

      return int_a > int_b ? -1 : int_a < int_b ? 1 : 0;
    });

    const floor_list = [];
    
    floors.forEach((floor) => {
      floor_list.push({
        number: floor.number
      });
    });

    return floor_list;
  }

  async getListIncludeEmptyNum(vendor, building_num) {
    const university = await University.findOne(
      { vendor: vendor },
      { _id: 0, buildings: 1 }
    ).populate({
      path: 'buildings',
      select: 'number floors -_id',
      match: { number: building_num },
      populate: {
        path: 'floors',
        select: 'number classrooms -_id'
      }
    });
    
    // if not found
    if (!university) {
      return Promise.reject("university not found");
    }

    if (!university.buildings[0]) {
      return Promise.reject("building not found");
    }

    if (university.buildings[0].floors.length == 0) {
      return Promise.reject("floors not found");
    }

    const floors = university.buildings[0].floors;
    floors.sort((a, b) => {
      let int_a = convert_floor_to_int(a.number);
      let int_b = convert_floor_to_int(b.number);

      return int_a > int_b ? -1 : int_a < int_b ? 1 : 0;
    });

    const empty_controller = new EmptyFacilityController();
    const floor_list = [];
    const promise_lists = [];

    floors.forEach((floor, index) => {
      promise_lists[index] = [];

      floor.classrooms.forEach((classroom_id) => {
        promise_lists[index].push(empty_controller.isClassroomEmpty(classroom_id));
      });

      floor_list.push({
        number: floor.number,
        empty_classroom: 0,
        total_classroom: promise_lists[index].length
      });
    });

    for (let i = 0; i < promise_lists.length; i++) {
      promise_lists[i] = Promise.all(promise_lists[i]);
    }

    let empty_lists = await Promise.all(promise_lists);
    empty_lists.forEach((empty_list, index) => {
      empty_list.forEach((is_empty) => {
        if (is_empty) {
          floor_list[index].empty_classroom++;
        }
      });
    });

    return floor_list;
  }
}

function convert_floor_to_int(floor) {
  if (floor.substr(0, 1) == "B") {
    return - parseInt(floor.substr(1));
  } else {
    return parseInt(floor);
  }
}
