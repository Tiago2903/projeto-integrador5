import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { API_BASE_URL } from '../config';
import './PatientDetails.css';
import './Forms.css';

export default function ObservationRegistry() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/patients`)
      .then(res => res.json())
      .then(data => setPatients(Array.isArray(data) ? data : []))
      .catch(() => setPatients([]))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const patientId = parseInt(form.patient_id?.value, 10);
    const type = form.type?.value?.trim();
    const description = form.description?.value?.trim();

    if (!patientId || !type || !description) {
      setError('Paciente, tipo e descrição são obrigatórios.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/observations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patient_id: patientId, type, description }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Erro ao registrar');
      navigate('/pacientes');
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="patient-details-container">
      <Link to="/pacientes" className="back-link">
        <ArrowLeft size={16} /> Voltar para Lista de Pacientes
      </Link>
      
      <div className="form-container">
        <h3 className="form-title">Registrar Nova Observação</h3>
        {error && <p style={{ color: 'var(--critical-color)', marginBottom: '1rem' }}>{error}</p>}
        
        <form onSubmit={handleSubmit} className="custom-form">
          <div className="form-group">
            <label>Paciente</label>
            <select name="patient_id" required disabled={loading}>
              <option value="">Selecione o paciente...</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.name} - Leito {p.room}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Tipo de Observação</label>
            <select name="type" required>
              <option value="Evolução de Enfermagem">Evolução de Enfermagem</option>
              <option value="Anotação Médica">Anotação Médica</option>
              <option value="Avaliação Multidisciplinar">Avaliação Multidisciplinar</option>
              <option value="Evolução Médica">Evolução Médica</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Descrição Detalhada</label>
            <textarea 
              name="description"
              placeholder="Descreva o ocorrido..." 
              rows={8}
              required
            ></textarea>
          </div>
          
          <div className="form-actions-single">
            <button type="submit" className="btn btn-primary full-width" disabled={submitting}>
              {submitting ? 'Salvando...' : 'Salvar Registro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
