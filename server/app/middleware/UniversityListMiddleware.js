import University from 'Database/models/university';
import logger from 'Configs/log';

export default class UniversityListMiddleware {
  async getList(language = 'ko') {
    const universities = await University.find(
      {},
      { _id: 0, name: 1, campus: 1, vendor: 1 },
      (err) => {
        if (err) {
          logger.error(err);
        }
      }
    ).sort([['name.' + language, 1]]);

    // if not found
    if (universities.length == 0) {
      return Promise.reject("universities not found");
    }

    const univ_list = [];
    universities.forEach((university) => {
      univ_list.push({
        name: university['name'][language],
        campus: university['campus'][language],
        vendor: university['vendor']
      });
    })

    return Promise.resolve(univ_list);
  }
}
