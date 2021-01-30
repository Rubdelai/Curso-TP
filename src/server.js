import express, { json } from 'express'

const app = express();

// Routes
import IndexRoutes from './routes/index.routes'
import UsuarioRoutes from './routes/usuarios.routes'
import CuentasRoutes from './routes/cuentas.routes'
import MovimientosRoutes from './routes/movimientos.routes'

// Settings
app.set('puerto', process.env.PORT || 3000);

// Middlewares
app.use(json());

// Routes
app.use(IndexRoutes);
app.use('/usuarios', UsuarioRoutes);
app.use('/cuentas', CuentasRoutes);
app.use('/movimientos', MovimientosRoutes);

export default app;