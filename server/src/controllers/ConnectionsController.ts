import { Request, Response } from 'express';

import db from '../database/connection';
import Sentry from '../config/sentry';

export default class ClassesController {
  async index(request: Request, response: Response) {
    const transaction = Sentry.startTransaction({
      op: "connection_number",
      name: "Return number of connections"
    });

    try {
      let [{ amount }] = await db('connections')
        .count({ amount: '*' })

      return response.status(201).send({ amount });
    } catch (error) {
      Sentry.captureException(error);
      return response.status(400).json({error: true, message: error});
    } finally {
      transaction.finish();
    }
  }

  async create(request: Request, response: Response) {
    const { user_id } = request.body;

    const transaction = Sentry.startTransaction({
      op: "connection_create",
      name: "Add a connection"
    });

    try {
      await db('connections')
        .insert({
          user_id
        })

      return response.status(201).send();
    } catch (error) {
      Sentry.captureException(error);
      return response.status(400).json({error: true, message: error});
    } finally {
      transaction.finish();
    }
  }
}