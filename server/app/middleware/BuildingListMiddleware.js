import University from 'Database/models/university';
import EmptyFacilityController from 'Controller/EmptyFacilityController';

export default class BuildingListMiddleware {
  async getList(vendor, language = 'ko') {
    const university = await University.findOne(
      { vendor: vendor },
      { _id: 0, buildings: 1 }
    ).populate({
      path: 'buildings',
      select: 'number name -_id',
      options: { sort: { 'number': 1 } }
    });

    const building_list = [];
    
    university.buildings.forEach((building) => {
      building_list.push({
        number: building['number'],
        name: building['name'][language]
      });
    });

    return building_list;
  }

  async getListIncludeEmptyNum(vendor, language = 'ko') {
    const university = await University.findOne(
      { vendor: vendor },
      { _id: 0, buildings: 1 }
    ).populate({
      path: 'buildings',
      select: 'number name floors -_id',
      options: { sort: { 'number': 1 } },
      populate: {
        path: 'floors',
        select: 'classrooms -_id'
      }
    });

    const empty_controller = new EmptyFacilityController();
    const building_list = [];
    const promise_lists = [];

    university.buildings.forEach((building, index) => {
      promise_lists[index] = [];

      building.floors.forEach((floor) => {
        floor.classrooms.forEach((classroom_id) => {
          promise_lists[index].push(empty_controller.isClassroomEmpty(classroom_id));
        });
      });

      building_list.push({
        number: building['number'],
        name: building['name'][language],
        empty_classroom: 0
      });
    });

    for (let i = 0; i < promise_lists.length; i++) {
      promise_lists[i] = Promise.all(promise_lists[i]);
    }

    let empty_lists = await Promise.all(promise_lists);
    empty_lists.forEach((empty_list, index) => {
      empty_list.forEach((is_empty) => {
        if (is_empty) {
          building_list[index].empty_classroom++;
        }
      });
    });

    return building_list;
  }
}
