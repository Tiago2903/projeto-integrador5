const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3000;

// Middlewares globais
app.use(cors()); // Permite requisições do frontend React (Vite)
app.use(express.json()); // Permite parse de JSON no body da req

// --- Rotas de Pacientes ---

// 1. Listar todos os pacientes
app.get('/api/patients', (req, res) => {
  db.all('SELECT * FROM patients', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    // Aninhando a 'lastRoutine' simulada para o frontend
    const pacientesCompletos = rows.map(p => ({
      ...p,
      lastRoutine: p.priority === 'Crítico' ? '10:30 - Sinais Vitais' 
                 : p.priority === 'Moderado' ? '09:00 - Curativo' 
                 : '08:15 - Medicação' // hardcoded para simplificar a listagem
    }));
    
    res.json(pacientesCompletos);
  });
});

// 2. Detalhes de um paciente específico (incluindo rotinas e observações)
app.get('/api/patients/:id', (req, res) => {
  const id = req.params.id;
  
  db.get('SELECT * FROM patients WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Paciente não encontrado' });
    
    // Busca rotinas atreladas
    db.all('SELECT * FROM routines WHERE patient_id = ? ORDER BY id DESC', [id], (err, routines) => {
      if (err) return res.status(500).json({ error: err.message });
      
      // Busca observações atreladas
      db.all('SELECT * FROM observations WHERE patient_id = ? ORDER BY id DESC', [id], (err, observations) => {
        if (err) return res.status(500).json({ error: err.message });
        
        // Retorna o objeto completo consolidado
        res.json({
          ...row,
          routines,
          observations
        });
      });
    });
  });
});

// --- Rotas de Procedimentos Mistas ---

// 3. Cadastrar Novo Procedimento/Rotina
app.post('/api/routines', (req, res) => {
  const { patient_id, description, scheduled_time, responsible } = req.body;
  
  // Validação simples
  if (!patient_id || !description) {
    return res.status(400).json({ error: 'Dados insuficientes. patient_id e description são obrigatórios.' });
  }

  const sql = 'INSERT INTO routines (patient_id, description, scheduled_time, responsible) VALUES (?, ?, ?, ?)';
  const params = [patient_id, description, scheduled_time, responsible];
  
  db.run(sql, params, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, message: 'Rotina agendada com sucesso' });
  });
});

// 4. Cadastrar Nova Observação
app.post('/api/observations', (req, res) => {
  const { patient_id, type, description } = req.body;

  if (!patient_id || !type || !description) {
    return res.status(400).json({ error: 'Dados insuficientes. patient_id, type e description são obrigatórios.' });
  }

  const created_at = new Date().toISOString();
  const sql = 'INSERT INTO observations (patient_id, type, description, created_at) VALUES (?, ?, ?, ?)';
  const params = [patient_id, type, description.trim(), created_at];

  db.run(sql, params, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, message: 'Observação registrada com sucesso' });
  });
});

// Start do servidor
app.listen(PORT, () => {
  console.log(`Backend rodando com sucesso em http://localhost:${PORT}`);
});
