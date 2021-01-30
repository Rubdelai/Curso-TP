import { Router } from 'express';
const router = Router();

// Database connection
import { connect } from '../database';
import { ObjectID } from 'mongodb';

//*-----------------------------------------------------------------//
// Cuentas
router.get('/', async (req, res) => {
    const db = await connect();
    const result = await db.collection('cuentas').find({}).toArray()
    res.json(result);
});

router.post('/', async (req, res) => {
    const db = await connect();
    const cuenta = {
        clave: req.body.clave,
        tipo: req.body.tipo,
        saldo: req.body.saldo,
        fealta: req.body.fealta,
        fecierre: req.body.fecierre
    };
    const result = await db.collection('cuentas').insertOne(cuenta);
    res.json(result.ops[0]);
    console.log(result);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection('cuentas').findOne({ _id: ObjectID(id) });
    res.json(result);
});

router.delete('/:id', async (req, res) => {
const { id } = req.params;
const db = await connect();
const result = await db.collection('cuentas').deleteOne({_id: ObjectID(id)});
res.json({
    message: 'Cuenta ${id} dada de baja',
    result
    })
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updateCuenta = {
        clave: req.body.clave,
        tipo: req.body.tipo,
        saldo: req.body.saldo,
        fealta: req.body.fealta,
        fecierre: req.body.fecierre
        }
    const db = await connect();
    await db.collection('cuentas').updateOne({_id: ObjectID(id)}, { $set: updateCuenta});
    res.json({
        message: 'Cuenta ${id} modificada'
        })
    });

export default router;