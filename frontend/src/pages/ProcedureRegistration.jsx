import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import './Forms.css';

export default function ProcedureRegistration() {
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
    const description = form.description?.value?.trim();
    const datetimeValue = form.scheduled_time?.value;
    const responsible = form.responsible?.value?.trim() || null;

    if (!patientId || !description) {
      setError('Paciente e descrição são obrigatórios.');
      return;
    }

    const scheduledTime = datetimeValue
      ? new Date(datetimeValue).toTimeString().slice(0, 5)
      : null;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/routines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: patientId,
          description,
          scheduled_time: scheduledTime,
          responsible: responsible || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Erro ao cadastrar');
      navigate('/pacientes');
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="patient-details-container">
      <div className="form-container">
        <h3 className="form-title">Cadastrar Novo Procedimento</h3>
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
            <label>Tipo de Procedimento</label>
            <input name="description" type="text" placeholder="Ex: Raio-X de Tórax, Sinais Vitais" required autoFocus />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div className="form-group">
              <label>Horário Agendado</label>
              <input name="scheduled_time" type="datetime-local" required />
            </div>
            
            <div className="form-group">
              <label>Responsável</label>
              <select name="responsible">
                <option value="">Selecione...</option>
                <option value="Dr. Thiago (Radiologia)">Dr. Thiago (Radiologia)</option>
                <option value="Dra. Amanda (Cirurgia)">Dra. Amanda (Cirurgia)</option>
                <option value="Equipe de Enfermagem">Equipe de Enfermagem</option>
                <option value="Enf. Ana">Enf. Ana</option>
                <option value="Enf. Carlos">Enf. Carlos</option>
                <option value="Téc. João">Téc. João</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Observações / Instruções</label>
            <textarea 
              name="instructions"
              placeholder="Instruções de preparo ou materiais necessários..." 
              rows={5}
            ></textarea>
          </div>
          
          <div className="form-actions-single">
            <button type="submit" className="btn btn-primary full-width" disabled={submitting}>
              {submitting ? 'Salvando...' : 'Salvar Procedimento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
