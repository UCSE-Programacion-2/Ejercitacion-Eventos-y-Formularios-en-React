import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta al archivo de datos
const dataFilePath = path.join(__dirname, 'data', 'personajes.json');

// Cargar datos iniciales
let personajes = [];
try {
  const rawData = fs.readFileSync(dataFilePath, 'utf-8');
  personajes = JSON.parse(rawData);
} catch (error) {
  console.error('Error al cargar server/data/personajes.json:', error.message);
  personajes = [];
}

// Ruta informativa raíz
app.get('/', (req, res) => {
  res.json({
    nombre: 'Dragon Ball Character Hub API',
    version: '1.0.0',
    endpoints: {
      listar: 'GET /api/personajes',
      obtenerUno: 'GET /api/personajes/:id',
      crear: 'POST /api/personajes',
      eliminar: 'DELETE /api/personajes/:id',
    },
  });
});

// Endpoint GET /api/personajes - Obtener todos los personajes
app.get('/api/personajes', (req, res) => {
  res.json(personajes);
});

// Endpoint GET /api/personajes/:id - Obtener un personaje por ID
app.get('/api/personajes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const personaje = personajes.find(p => p.id === id);

  if (!personaje) {
    return res.status(404).json({ error: 'Personaje no encontrado' });
  }

  res.json(personaje);
});

// Endpoint POST /api/personajes - Crear un nuevo personaje
app.post('/api/personajes', (req, res) => {
  const { name, race, ki, maxKi, affiliation, image, description } = req.body;

  // Validaciones del servidor
  if (!name || typeof name !== 'string' || name.trim().length < 3) {
    return res.status(400).json({
      error: 'El nombre es obligatorio y debe tener al menos 3 caracteres.',
    });
  }

  if (!race || typeof race !== 'string' || race.trim().length === 0) {
    return res.status(400).json({
      error: 'La raza es obligatoria.',
    });
  }

  // Generar nuevo ID autoincremental
  const nextId = personajes.reduce((max, p) => (p.id > max ? p.id : max), 0) + 1;

  const nuevoPersonaje = {
    id: nextId,
    name: name.trim(),
    race: race.trim(),
    gender: req.body.gender || 'Desconocido',
    ki: ki ? String(ki).trim() : '1.000',
    maxKi: maxKi ? String(maxKi).trim() : '5.000',
    affiliation: affiliation ? String(affiliation).trim() : 'Guerrero Z',
    image:
      image && image.trim().length > 0
        ? image.trim()
        : 'https://dragonball-api.com/characters/goku_normal.webp',
    description:
      description && description.trim().length > 0
        ? description.trim()
        : `Guerrero ${name.trim()} perteneciente a la raza ${race.trim()}.`,
  };

  personajes.push(nuevoPersonaje);

  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(personajes, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Advertencia: no se pudo persistir en archivo:', err.message);
  }

  console.log(`POST /api/personajes - Creado: ${nuevoPersonaje.name} (ID: ${nuevoPersonaje.id})`);
  res.status(201).json(nuevoPersonaje);
});

// Endpoint DELETE /api/personajes/:id - Eliminar un personaje por ID
app.delete('/api/personajes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = personajes.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Personaje no encontrado para eliminar' });
  }

  const [eliminado] = personajes.splice(index, 1);

  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(personajes, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Advertencia: no se pudo actualizar el archivo:', err.message);
  }

  console.log(`DELETE /api/personajes/${id} - Eliminado: ${eliminado.name}`);
  res.json({ message: 'Personaje eliminado exitosamente', id });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Dragon Ball Server corriendo en http://localhost:${PORT}`);
  console.log(`Endpoints disponibles en http://localhost:${PORT}/api/personajes`);
});

export default app;
