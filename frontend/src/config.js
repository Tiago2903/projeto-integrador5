/**
 * Configuração central da aplicação.
 * Para ambiente de produção, defina VITE_API_URL no .env
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
