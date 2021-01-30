import { Router } from 'express';
const router = Router();

// Database connection
import { connect } from '../database';
import { ObjectID } from 'mongodb';

// Tasks (ejemplo)
router.get('/', async (req, res) => {
    const db = await connect();
//    const result = await db.collection('tasks').find({}).toArray()
    const result = await db.collection('usuarios').find({}).toArray()
    res.json(result);
});

router.post('/', async (req, res) => {
    const db = await connect();
    const usuario = {
 //       title: req.body.title,
 //       description: req.body.description
        usuario: req.body.usuario,
        documento: req.body.documento,
        clave: req.body.clave
    };
  //  const result = await db.collection('tasks').insertOne(task);
  const result = await db.collection('usuarios').insertOne(usuario);
    res.json(result.ops[0]);
    console.log(result);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connect();
//    const result = await db.collection('tasks').findOne({ _id: ObjectID(id) });
    const result = await db.collection('usuarios').findOne({ _id: ObjectID(id) });
    res.json(result);
});

router.delete('/:id', async (req, res) => {
const { id } = req.params;
const db = await connect();
//const result = await db.collection('tasks').deleteOne({_id: ObjectID(id)});
const result = await db.collection('usuarios').deleteOne({_id: ObjectID(id)});
res.json({
    message: 'Usuario ${id} deleted',
    result
    })
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updateUsuario = {
//        title: req.body.title,
//        description: req.body.description
        usuario: req.body.usuario,
        documento: req.body.documento,
        clave: req.body.clave
    }
    const db = await connect();
 //   await db.collection('tasks').updateOne({_id: ObjectID(id)}, { $set: updateTask});
    await db.collection('usuarios').updateOne({_id: ObjectID(id)}, { $set: updateUsuario});
    res.json({
        message: 'Usuario ${id} updated'
        })
    });
  
export default router;