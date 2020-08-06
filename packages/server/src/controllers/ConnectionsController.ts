import { Request, Response } from 'express';

import db from '../database/connection';

export default class ClassesController {
    async index(req: Request, res: Response){
        let [{amount}] = await db('connections')
        .count({amount: '*'})

    return res.status(201).send({amount});
    }

    async create(req: Request, res: Response){
        const { user_id } = req.body;

        await db('connections')
            .insert({
                user_id
            })

        return res.status(201).send();
    }

}