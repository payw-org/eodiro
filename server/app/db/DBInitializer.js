import logger from 'Configs/log';
import Class from 'Database/models/class';
import University from 'Database/models/university';
import Building from 'Database/models/building';
import Floor from 'Database/models/floor';
import Classroom from 'Database/models/classroom';
import Lecture from 'Database/models/lecture';
// import class_data from 'Resources/result.json';
import metadata from 'Resources/metadata.json';

export default class DBInitializer {
  async initialize(option = 'normal') {
    if (option == 'normal') {
      let count_of_lecture = await Lecture.estimatedDocumentCount();

      if (count_of_lecture == 0) {
        await this.dropAndBuild();
      }
    } else if (option == 'drop') {
      await this.dropAndBuild();
    }

    return Promise.resolve();
  }

  async dropAndBuild() {
    await Promise.all([
      Class.deleteMany({}),
      University.deleteMany({}),
      Building.deleteMany({}),
      Floor.deleteMany({}),
      Classroom.deleteMany({}),
      Lecture.deleteMany({})
    ]);
    await Promise.all([this.insertClasses(), this.insertMetadata()]);

    await this.build();

    return Promise.resolve();
  }

  async insertClasses() {
    await Class.insertMany(class_data).catch((err) => {
      if (err) logger.error("class save error: " + err);
    })

    return Promise.resolve();
  }

  insertMetadata() {
    metadata.forEach(async (value) => {
      const university = await University.create({ name: value['name'], campus: value['campus'], vendor: value['vendor'] });
      
      value['buildings'].forEach((building) => {
        building['university'] = university._id;
      });
      const buildings = await Building.insertMany(value['buildings']);

      await University.update({ vendor: value['vendor'] }, { "buildings": buildings });
    });

    return Promise.resolve();
  }

  async build() {
    const classes = await Class.find({}, { locations: 1 });

    classes.forEach((cls) => {
      cls['locations'].forEach(async (location, index) => {
        let floor_num = location['room'].split('-')[0];
        floor_num = floor_num.substr(0, floor_num.length - 2);

        const building = await Building.findOne({ number: location['building'] }).populate({
          path: 'university',
          match: { vendor: 'cau' }
        }).exec();

        const floor = await Floor.findOneAndUpdate(
          { building: building._id, number: floor_num },
          { building: building._id, number: floor_num },
          { upsert: true, new: true } 
        );
        await Building.findByIdAndUpdate(building._id, { $addToSet: { floors: floor._id } });

        const classroom = await Classroom.findOneAndUpdate(
          { floor: floor._id, number: location['room'] },
          { floor: floor._id, number: location['room'] },
          { upsert: true, new: true }
        );
        await Floor.findByIdAndUpdate(floor._id, { $addToSet: { classrooms: classroom._id } });

        const lecture = await Lecture.create({ classroom: classroom._id, class: cls._id, order: index });
        await Classroom.findByIdAndUpdate(classroom._id, { $addToSet: { lectures: lecture._id } });
      });
    });

    return Promise.resolve();
  }
}
