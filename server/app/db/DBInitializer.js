import Course from 'Database/models/course';
import course_data from 'Resources/result';

export default class DBInitializer {
    saveCourses() {
        Course.insertMany(course_data);
    }
}
