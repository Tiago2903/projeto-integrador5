import { useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';
import './Header.css';

const routeNames = {
  '/dashboard': 'Dashboard',
  '/pacientes': 'Lista de Pacientes',
  '/paciente/rotinas': 'Rotinas do Paciente',
  '/execucao': 'Execução de Rotina',
  '/observacao': 'Registrar Observação',
  '/prontuario': 'Prontuário Resumido',
  '/historico': 'Histórico Clínico',
  '/cadastro': 'Cadastro Procedimento',
  '/perfil': 'Perfil do Usuário',
  '/relatorios': 'Relatórios Operacionais',
  '/configuracoes': 'Configurações',
  '/alertas': 'Alertas do Sistema'
};

function getTitle(pathname) {
  if (pathname.startsWith('/paciente/detalhes')) return 'Detalhes do Paciente';
  return routeNames[pathname] || 'CareTrack';
}

export default function Header() {
  const location = useLocation();
  const title = getTitle(location.pathname);

  return (
    <header className="header">
      <div className="header-title">{title}</div>
      <div className="header-actions">
        <button className="notification-btn">
          <Bell size={20} />
          <span className="badge"></span>
        </button>
        <div className="shift-badge">
          Plantão: 12h
        </div>
      </div>
    </header>
  );
}
