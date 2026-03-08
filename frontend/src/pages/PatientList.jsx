import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import './PatientList.css';

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/patients`)
      .then(res => res.json().then(data => {
        if (!res.ok) throw new Error(data?.error || 'Erro ao buscar pacientes');
        return data;
      }))
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
    return <div className="patient-list-container" style={{padding: '2rem', color: 'var(--text-secondary)'}}>Carregando lista de pacientes...</div>;
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
            {patients.map(p => {
              const priorityClass = (p.priority || '') === 'Crítico' ? 'badge-critical' : (p.priority || '') === 'Moderado' ? 'badge-warning' : 'badge-success';
              return (
                <tr key={p.id}>
                  <td className="font-medium">{p.name}</td>
                  <td>{p.room}</td>
                  <td><span className={`status-badge ${priorityClass}`}>{(p.priority || 'Estável').toUpperCase()}</span></td>
                  <td>{p.lastRoutine || '-'}</td>
                  <td>
                    <Link to={`/paciente/detalhes/${p.id}`} className="action-link">Ver Detalhes</Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
