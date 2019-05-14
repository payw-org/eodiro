import University from 'Database/models/university';

export default class ClassroomListMiddleware {
  async getList(vendor, building_num, floor_num) {
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
        select: 'number classrooms -_id',
        match: { number: floor_num },
        populate: {
          path: 'classrooms',
          select: 'number lectures -_id',
          options: { sort: { 'number': 1 } },
          populate: {
            path: 'lectures',
            select: 'class order -_id',
            populate: {
              path: 'class',
              select: 'name instructor times.day times.start times.end -_id'
            }
          }
        }
      }
    });

    // if not found
    if (!university) {
      return Promise.reject("university not found");
    }

    if (!university.buildings[0]) {
      return Promise.reject("building not found");
    }

    if (!university.buildings[0].floors[0]) {
      return Promise.reject("floor not found");
    }

    if (university.buildings[0].floors[0].classrooms.length == 0) {
      return Promise.reject("classrooms not found");
    }

    let lecture_list;
    const classroom_list = [];

    const classrooms = university.buildings[0].floors[0].classrooms;
    classrooms.forEach((classroom) => {
      lecture_list = [];
      classroom.lectures.forEach((lecture) => {
        lecture_list.push({
          name: lecture.class.name,
          instructor: lecture.class.instructor,
          time: lecture.class.times[lecture.order]
        });
      });

      lecture_list.sort((a, b) => {
        const day_num = {
          MON: 0,
          TUE: 1,
          WED: 2,
          THU: 3,
          FRI: 4,
          SAT: 5,
          SUN: 6
        };

        return (day_num[a.time.day] > day_num[b.time.day]) ? 1 :
        (day_num[a.time.day] < day_num[b.time.day]) ? -1 :
        (a.time.start > b.time.start) ? 1 :
        -1;
      });

      classroom_list.push({
        number: classroom.number,
        lectures: lecture_list
      });
    });

    return classroom_list;
  }
}
