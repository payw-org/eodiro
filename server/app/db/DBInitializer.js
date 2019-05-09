import Course from 'Database/models/course';
import course_data from 'Resources/result.json';
import logger from 'Configs/log';

export default class DBInitializer {
  init(option = 'normal') {
    if (option == 'normal') {
      Course.estimatedDocumentCount().then((count) => {
        logger.info(count);

      });
    } else if (option == 'drop') {
      
    }
  }

  insertCourses() {
    Course.insertMany(course_data, (err, docs) => {
      if (err) logger.error("course save error: " + err);
    });
  }
}
