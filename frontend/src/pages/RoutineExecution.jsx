import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './PatientDetails.css';
import './Forms.css';

export default function RoutineExecution() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/paciente/rotinas');
  };

  return (
    <div className="patient-details-container">
      <Link to="/paciente/rotinas" className="back-link">
        <ArrowLeft size={16} /> Voltar para Rotinas
      </Link>
      
      <div className="form-container">
        <h3 className="form-title">Executar: Administração de Insulina</h3>
        
        <form onSubmit={handleSubmit} className="custom-form">
          <div className="form-group">
            <label>Procedimento</label>
            <input type="text" value="Insulina NPH 10UI" readOnly className="input-readonly" />
          </div>
          
          <div className="form-group">
            <label>Horário Previsto</label>
            <input type="text" value="14:00" readOnly className="input-readonly" />
          </div>
          
          <div className="form-group">
            <label>Observações do Responsável</label>
            <textarea 
              placeholder="Digite observações sobre a aplicação..." 
              rows={4}
            ></textarea>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn btn-success">Concluir Rotina</button>
            <Link to="/paciente/rotinas" className="btn btn-outline-danger">Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
