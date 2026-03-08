import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../pages/PatientDetails.css';

export default function MedicalRecord() {
  return (
    <div className="patient-details-container">
      <Link to="/pacientes" className="back-link">
        <ArrowLeft size={16} /> Voltar para Lista de Pacientes
      </Link>
      
      <div className="patient-header" style={{ alignItems: 'center' }}>
        <h2 style={{ marginBottom: 0 }}>Prontuário: Alberto Souza</h2>
        <button className="btn btn-secondary">Imprimir PDF</button>
      </div>

      <div className="info-cards-grid">
        <div className="info-card">
          <h3 style={{color: 'var(--primary-color)'}}>Diagnóstico</h3>
          <p className="info-value">Insuficiência Cardíaca Congestiva (CID 150)</p>
        </div>
        
        <div className="info-card">
          <h3 style={{color: 'var(--primary-color)'}}>Comorbidades</h3>
          <ul className="description-text" style={{ paddingLeft: '1.25rem', margin: 0 }}>
            <li>Hipertensão Arterial Sistêmica</li>
            <li>Diabetes Mellitus Tipo 2</li>
          </ul>
        </div>
        
        <div className="info-card">
          <h3 className="text-secondary">Alergias Importantes</h3>
          <div className="tags-container" style={{ marginTop: '0.5rem' }}>
            <span className="tag critical">Dipirona</span>
            <span className="tag critical">Sulfa</span>
          </div>
        </div>

        <div className="info-card">
          <h3 className="text-secondary">Histórico Resumido</h3>
          <p className="description-text" style={{ fontSize: '0.85rem' }}>
            Admissão em 05/12 via Emergência com dispneia e edema de MMII. 
            Iniciado protocolo de descompensação cardíaca.
          </p>
        </div>
      </div>
    </div>
  );
}
