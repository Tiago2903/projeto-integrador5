import { Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-title">Pacientes Internados</div>
          <div className="metric-value">42</div>
        </div>
        <div className="metric-card">
          <div className="metric-title blue">Rotinas do Turno</div>
          <div className="metric-value blue">18</div>
        </div>
        <div className="metric-card">
          <div className="metric-title red">Atendimentos Críticos</div>
          <div className="metric-value red">03</div>
        </div>
        <div className="metric-card">
          <div className="metric-title orange">Atrasos</div>
          <div className="metric-value orange">01</div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="priorities-section">
          <h3>Prioridades do Dia</h3>
          <div className="priority-list">
            <div className="priority-item critical">
              <div className="priority-info">
                <h4>Leito 204 - Sr. Alberto Souza</h4>
                <p>Administração de Insulina - Atrasada 15min</p>
              </div>
              <Link to="/paciente/detalhes/1" className="btn-details">Ver Detalhes</Link>
            </div>
            
            <div className="priority-item warning">
              <div className="priority-info">
                <h4>Leito 301 - Sra. Maria Clara</h4>
                <p>Avaliação Pós-Cirúrgica - Pendente</p>
              </div>
              <Link to="/paciente/detalhes/2" className="btn-details">Ver Detalhes</Link>
            </div>
          </div>
        </div>
        
        <div className="chart-section">
          <h3>Ocupação por Setor</h3>
          <div className="chart-container">
            <div className="circular-chart">
              <span>85%</span>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span><span className="dot red"></span> UTI</span>
                <span>95%</span>
              </div>
              <div className="legend-item">
                <span><span className="dot blue"></span> Enfermaria</span>
                <span>70%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
