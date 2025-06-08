import api from '../axios';
import endpoints from '../endpoints';
import { Procedimento } from '../types/procedimento'; 
import { RequestParams } from '../types/params';
import { AxiosResponse } from 'axios';

// Resposta paginada de procedimentos
interface PaginatedResponse<T> {
  procedimentos: T[];
  total: number;
  page: number;
  limit: number;
}

export const getProcedimentos = (
  params?: RequestParams
): Promise<AxiosResponse<PaginatedResponse<Procedimento>>> => {
  return api.get(endpoints.procedimentos.listWithFilters(params));
  
};

export const getProcedimentoById = (
  id: string | number
): Promise<AxiosResponse<Procedimento>> => {
  return api.get(endpoints.procedimentos.byId(id));
};

export const updateProcedimento = (
  id: string | number,
  data: Partial<Procedimento>
): Promise<AxiosResponse<Procedimento>> => {
  return api.put(endpoints.procedimentos.update(id), data);
};

export const deleteProcedimento = (
  id: string | number
): Promise<AxiosResponse<void>> => {
  return api.delete(endpoints.procedimentos.delete(id));
};
