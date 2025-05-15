import api from '../axios';
import endpoints from '../endpoints';
import { Paciente } from '../types/paciente'; // ajuste o path se necessário
import { RequestParams } from '../types/params';
import { AxiosResponse } from 'axios';

// Resposta paginada de pacientes
interface PaginatedResponse<T> {
  pacientes: T[];
  total: number;
  page: number;
  limit: number;
}

export const getPacientes = (
  params?: RequestParams
): Promise<AxiosResponse<PaginatedResponse<Paciente>>> => {
  return api.get(endpoints.pacientes.listWithFilters(params));
  
};

export const getPacienteById = (
  id: string | number
): Promise<AxiosResponse<Paciente>> => {
  return api.get(endpoints.pacientes.byId(id));
};

export const updatePaciente = (
  id: string | number,
  data: Partial<Paciente>
): Promise<AxiosResponse<Paciente>> => {
  return api.put(endpoints.pacientes.update(id), data);
};

export const deletePaciente = (
  id: string | number
): Promise<AxiosResponse<void>> => {
  return api.delete(endpoints.pacientes.delete(id));
};
