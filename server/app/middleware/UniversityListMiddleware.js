import University from 'Database/models/university';

export default class UniversityListMiddleware {
  async getList(language = 'kor') {
    const universities = await University.find(
      {},
      { _id: 0, name: 1, campus: 1, vendor: 1 }
    ).sort([['name.' + language, 1]]);

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
