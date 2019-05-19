import logger from 'Configs/log';
import Class from 'Database/models/class';
import University from 'Database/models/university';
import Building from 'Database/models/building';
import Floor from 'Database/models/floor';
import Classroom from 'Database/models/classroom';
import Lecture from 'Database/models/lecture';

import metadata from 'Resources/metadata.json';
import classes_cau from 'Resources/classes/cau.json';
import classes_cau2 from 'Resources/classes/cau2.json';
import classes_korea from 'Resources/classes/korea.json';

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

    await this.insertMetadata();
    await Promise.all([
      this.insertClasses(classes_cau),
      this.insertClasses(classes_cau2),
      this.insertClasses(classes_korea)
    ]);

    await Promise.all([
      this.build('cau'),
      this.build('cau2'),
      this.build('korea')
    ]);

    return Promise.resolve();
  }

  async insertMetadata() {
    for (let i = 0; i < metadata.length; i++) {
      const university = await University.create({
        name: metadata[i].name,
        campus: metadata[i].campus,
        vendor: metadata[i].vendor
      });
    
      metadata[i].buildings.forEach((building) => {
        building['university'] = university._id;
      });

      const buildings = await Building.insertMany(metadata[i].buildings);

      await University.update(
        { vendor: metadata[i].vendor },
        { buildings: buildings }
      );
    }

    return Promise.resolve();
  }

  async insertClasses(data) {
    const classes = await Class.insertMany(data.classes).catch((err) => {
      if (err) logger.error("class save error: " + err);
    });

    await University.update(
      { vendor: data.vendor },
      { classes: classes }
    );

    return Promise.resolve();
  }

  async build(vendor) {
    const university = await University.findOne(
      { vendor: vendor },
      { _id: 0, classes: 1 },
      (err) => {
        if (err) {
          logger.error(err);
        }
      }
    ).populate({
      path: 'classes',
      select: 'locations'
    });

    const classes = university.classes;

    for (let i = 0; i < classes.length; i++) {
      let cls = classes[i];

      for (let j = 0; j < cls.locations.length; j++) {
        let location = cls.locations[j];
    
        let floor_num = location['room'].match(/^(?:[Bb]|)\d+(?=\d\d)/)[0];

        const building = await Building.findOne({
          number: location['building']
        }).populate({
          path: 'university',
          select: 'vendor -_id',
          match: { vendor: vendor }
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

        const lecture = await Lecture.create({ classroom: classroom._id, class: cls._id, order: j });
        await Classroom.findByIdAndUpdate(classroom._id, { $addToSet: { lectures: lecture._id } });
      }
    }

    return Promise.resolve();
  }
}
