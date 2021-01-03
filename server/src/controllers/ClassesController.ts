import { Request, Response } from 'express';

import db from '../database/connection';
import Sentry from '../config/sentry';

import { convertHourToMinutes } from '../utils/convertHourToMinutes';

interface scheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const transaction = Sentry.startTransaction({
        op: "class_index",
        name: "List classes",
        data: {
          filters
        }
    });

    try {
      const subject = filters.subject as string,
        week_day = filters.week_day as string,
        time = filters.time as string;


      if (!filters.week_day || !filters.subject || !filters.time)
        return response.status(400).json({
          error: 'Missing filters to search classes'
        });

      let timeInMinutes = convertHourToMinutes(time);

      const classes = await db('classes')
        .whereExists(function () {
          this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
            .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
            .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
            .whereRaw('`class_schedule`.`to` >= ??', [timeInMinutes + 30])
        })
        .where('classes.subject', '=', subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*']);

      return response.json({ classes });
    } catch (error) {
        Sentry.captureException(error);
        return response.status(400).json({error: true, message: error});
    } finally {
        transaction.finish();
    }
  }

  async create(request: Request, response: Response) {

    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;

    const transaction = Sentry.startTransaction({
        op: "class_create",
        name: "Create a new class"
    });

    const trx = await db.transaction();

    try {

      const [user_id] = await trx('users')
        .insert({
          name,
          avatar,
          whatsapp,
          bio
        });

      const [class_id] = await trx('classes')
        .insert({
          subject,
          cost,
          user_id
        });

      const classSchedule = schedule.map((scheduleItem: scheduleItem) => {
        return {
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
          class_id
        }
      });

      await trx('class_schedule')
        .insert(classSchedule);

      await trx.commit();

      return response.status(201).send();
    } catch (error) {
      await trx.rollback()

      Sentry.captureException(error);
      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      });
    } finally {
        transaction.finish();
    }
  }
}