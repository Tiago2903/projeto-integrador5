import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList } from 'lucide-react';
import { API_BASE_URL } from '../config';
import './PatientList.css';

export default function PatientRoutines() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/patients`)
      .then(res => {
        if (!res.ok) throw new Error('Falha ao buscar dados');
        return res.json();
      })
      .then(data => {
        setPatients(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch(err => {
        console.error('Erro ao buscar pacientes:', err);
        setPatients([]);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="patient-list-container" style={{ padding: '2rem', color: 'var(--text-secondary)' }}>
        Carregando rotinas...
      </div>
    );
  }

  if (error) {
    return (
      <div className="patient-list-container" style={{ padding: '2rem', color: 'var(--critical-color)' }}>
        Erro ao carregar: {error}. Verifique se o backend está rodando em {API_BASE_URL}.
      </div>
    );
  }

  return (
    <div className="patient-list-container">
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ClipboardList size={24} /> Rotinas por Paciente
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Selecione um paciente para ver suas rotinas e procedimentos.
      </p>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome do Paciente</th>
              <th>Quarto/Leito</th>
              <th>Prioridade</th>
              <th>Última Rotina</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(p => (
              <tr key={p.id}>
                <td className="font-medium">{p.name}</td>
                <td>{p.room}</td>
                <td>
                  <span className={`status-badge ${(p.priority || '').toLowerCase() === 'crítico' ? 'badge-critical' : (p.priority || '').toLowerCase() === 'moderado' ? 'badge-warning' : 'badge-success'}`}>
                    {(p.priority || 'Estável').toUpperCase()}
                  </span>
                </td>
                <td>{p.lastRoutine || '-'}</td>
                <td>
                  <Link to={`/paciente/detalhes/${p.id}`} className="action-link">Ver Rotinas</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
