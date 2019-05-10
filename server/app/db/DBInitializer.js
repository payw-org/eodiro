import Class from 'Database/models/class';
import University from 'Database/models/university';
import logger from 'Configs/log';
import class_data from 'Resources/result.json';
import metadata from 'Resources/metadata.json';

export default class DBInitializer {
  async init(option = 'normal') {
    if (option == 'normal') {
      let count_of_class = await Class.estimatedDocumentCount();

      if (count_of_class == 0) {
        await Promise.all([this.insertClasses(), University.deleteMany({})]);
        await this.createUniversities();
      } else {
        let count_of_university = await University.estimatedDocumentCount();

        if (count_of_university == 0) {
          await this.createUniversities();
        }
      }
    } else if (option == 'drop') {
      await Promise.all([Class.deleteMany({}), University.deleteMany({})]);
      await this.insertClasses();
      await this.createUniversities();
    }
  }

  insertClasses() {
    Class.insertMany(class_data, (err, docs) => {
      if (err) logger.error("class save error: " + err);
    });

    return Promise.resolve();
  }

  createUniversities() {
    University.insertMany(metadata, (err, docs) => {
      if (err) logger.error("university save error: " + err);
    });

    return Promise.resolve();
  }
}
