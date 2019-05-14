import Classroom from 'Database/models/classroom';

export default class EmptyFacilityController {
  async isClassroomEmpty(classroom_id) {
    const classroom = await Classroom.findById(
      classroom_id,
      { _id: 0, lectures: 1 }
    ).populate({
      path: 'lectures',
      select: 'class order -_id',
      populate: {
        path: 'class',
        select: 'times -_id'
      }
    });

    const time_list = [];
    classroom.lectures.forEach((lecture) => {
      time_list.push(lecture.class.times[lecture.order]);
    });

    let is_empty = true;
    let { curr_day, curr_time } = get_current_time();
    // let curr_day = 'TUE';
    // let curr_time = '1148';

    for (let i = 0; i < time_list.length; i++) {
      if (time_list[i].day == curr_day) {
        if ((time_list[i].start <= curr_time) && (time_list[i].end >= curr_time)) {
          is_empty = false;
          break;
        }
      }
    }

    return is_empty;
  }
}

function get_current_time() {
  const local_date = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  
  let day = local_date.toString().split(' ')[0].toUpperCase();
  let hour = local_date.getHours().toString().padStart(2, '0');
  let min = local_date.getMinutes().toString().padStart(2, '0');

  return { curr_day: day, curr_time: hour + min };
}
