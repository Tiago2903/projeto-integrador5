import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { API_BASE_URL } from '../config';
import './PatientDetails.css';

export default function PatientDetails() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/patients/${id}`)
      .then(res => res.json())
      .then(data => {
        setPatient(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao buscar detalhes do paciente:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="patient-details-container">Carregando detalhes do paciente...</div>;
  }

  if (!patient || patient.error) {
    return <div className="patient-details-container">Erro: Paciente não encontrado.</div>;
  }

  return (
    <div className="patient-details-container">
      <Link to="/pacientes" className="back-link">
        <ArrowLeft size={16} /> Voltar para Lista
      </Link>
      
      <div className="patient-header">
        <div>
          <h2>{patient.name}</h2>
          <p className="patient-subtitle">{patient.gender === 'M' ? 'Masculino' : 'Feminino'}, {patient.age} anos | Leito {patient.room}</p>
        </div>
        <div className="header-actions">
          <Link to="/paciente/rotinas" className="btn btn-primary">Ver Rotinas</Link>
          <Link to="/prontuario" className="btn btn-secondary">Prontuário</Link>
          <Link to="/observacao" className="btn btn-secondary">Registrar Obs.</Link>
        </div>
      </div>
      
      <div className="info-cards-grid">
        <div className="info-card">
          <h3>Informações Clínicas</h3>
          
          <div className="info-group">
            <span className="info-label">Diagnóstico Principal</span>
            <p className="info-value">{patient.diagnosis || 'Não informado'}</p>
          </div>
          
          <div className="info-group">
            <span className="info-label">Alergias</span>
            <div className="tags-container">
              <span className="tag critical">Não Informadas</span>
            </div>
          </div>
        </div>
        
        <div className="info-card">
          <h3>Observações Gerais</h3>
          <p className="description-text">
            {patient.observations && patient.observations.length > 0 
              ? patient.observations[0].description 
              : 'Nenhuma observação registrada.'}
          </p>
        </div>
      </div>
      
      <div className="info-card full-width">
        <h3 className="text-secondary">Últimas Atividades</h3>
        
        <div className="timeline">
          {patient.routines && patient.routines.length > 0 ? (
            patient.routines.map(routine => (
               <div key={routine.id} className="timeline-item success">
                 <span className="time">{routine.scheduled_time}</span>
                 <span className="event">- {routine.description} ({routine.status}) | {routine.responsible}</span>
               </div>
            ))
          ) : (
            <p className="text-secondary">S/ dados.</p>
          )}
        </div>
      </div>
    </div>
  );
}
