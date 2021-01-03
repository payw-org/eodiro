// /**
//  * npm run ts-node:[prod|dev] src/scripts/seed-lectures -- --lecturesFile data/lectures-2020-하계-1592711940996.json
//  */

// import { boot } from '@/boot'
// import Config from '@/config'
// import collegesMajorsSeeder from '@/db/seeders/colleges-majors-seeder'
// import timetableSeeder from '@/db/seeders/timetable-seeder'
// import argv from '@/dev/argv'
// import getSemester from '@/modules/get-semester'
// import { Semester } from '@/types'
// import { CTTS } from '@payw/cau-timetable-scraper'
// import chalk from 'chalk'
// import dayjs from 'dayjs'
// import fs from 'fs'

// const log = console.log

// async function main(): Promise<void> {
//   const args = argv<{
//     y: string
//     year: string
//     semester: string
//     s: string
//     collegesFile: string
//     lecturesFile: string
//   }>()

//   const quit = await boot({
//     db: true,
//     listen: false,
//   })

//   const year = Number(args.year) || Number(args.y) || dayjs().year()
//   const semester =
//     (args.semester as Semester) || (args.s as Semester) || getSemester()

//   log(`[ ${chalk.blue('seeding')} ] seeding lectures: ${year}, ${semester}`)

//   if (!args.collegesFile && !args.lecturesFile) {
//     log('Scraping from server')
//     const { colleges, lectures } = await CTTS(
//       {
//         id: Config.CAU_ID,
//         pw: Config.CAU_PW,
//       },
//       {
//         year,
//         semester,
//       }
//     )

//     const timestamp = `${dayjs().format('YYYY-MM-DD_HH:mm:ss')}`

//     fs.writeFileSync(
//       `data/colleges-${timestamp}.json`,
//       JSON.stringify(colleges, null, 2)
//     )
//     fs.writeFileSync(
//       `data/lectures-${year}-${semester}-${timestamp}.json`,
//       JSON.stringify(lectures, null, 2)
//     )

//     await collegesMajorsSeeder(colleges)
//     await timetableSeeder(lectures)
//   } else {
//     if (args.collegesFile) {
//       log('Colleges file is given')
//       const colleges = JSON.parse(fs.readFileSync(args.collegesFile, 'utf8'))
//       await collegesMajorsSeeder(colleges)
//     }
//     if (args.lecturesFile) {
//       log('Lectures file is given')
//       const lectures = JSON.parse(fs.readFileSync(args.lecturesFile, 'utf8'))
//       await timetableSeeder(lectures)
//     }
//   }

//   log(`[ ${chalk.blue('seeding')} ] Done seeding lectures`)

//   quit()
//   process.exit()
// }

// main()
