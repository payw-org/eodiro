import Course from 'Database/models/course';
import course_data from 'Resources/result.json';
import logger from 'Configs/log';

export default class DBInitializer {
  saveCourses() {
      Course.insertMany(course_data, (err, docs) => {
          if (err) logger.error("course save error: " + err);
      });
  }
}
