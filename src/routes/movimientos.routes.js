import { Router } from 'express';
const router = Router();

// Database connection
import { connect } from '../database';
import { ObjectID } from 'mongodb';

//*-----------------------------------------------------------------//
// Movimientos
router.get('/', async (req, res) => {
    const db = await connect();
    const result = await db.collection('movimientos').find({}).toArray()
    res.json(result);
});

router.post('/', async (req, res) => {
    const db = await connect();
    const movimiento = {
        clave: req.body.clave,
        fecha: req.body.fecha,
        hora: req.body.hora,
        importe: req.body.importe,
        creddeb: req.body.creddeb
    };
    const result = await db.collection('movimientos').insertOne(movimiento);
    res.json(result.ops[0]);
    console.log(result);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection('movimientos').findOne({ _id: ObjectID(id) });
    res.json(result);
});

router.delete('/:id', async (req, res) => {
const { id } = req.params;
const db = await connect();
const result = await db.collection('movimientos').deleteOne({_id: ObjectID(id)});
res.json({
    message: 'Movimiento ${id} dada de baja',
    result
    })
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updateMovimiento = {
        clave: req.body.clave,
        fecha: req.body.fecha,
        hora: req.body.hora,
        importe: req.body.importe,
        creddeb: req.body.creddeb
        }
    const db = await connect();
    await db.collection('movimientos').updateOne({_id: ObjectID(id)}, { $set: updateMovimiento});
    res.json({
        message: 'Movimiento ${id} modificado',
        })
    });

export default router;