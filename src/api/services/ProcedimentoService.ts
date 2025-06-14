import api from '../axios';
import endpoints from '../endpoints';
import { Procedimento, ProcedimentoCreate, ProcedimentoUpdate } from '../types/procedimento'; 
import { RequestParams } from '../types/params';
import { AxiosResponse } from 'axios';

interface PaginatedResponse {
  procedimentos: Procedimento[];
  total: number;
  page: number;
  totalPages: number;
}

export const getProcedimentos = (
  params?: RequestParams
): Promise<AxiosResponse<PaginatedResponse>> => {
  return api.get(endpoints.procedimentos.listWithFilters(params));
};

export const getProcedimentoById = (
  id: string | number
): Promise<AxiosResponse<Procedimento>> => {
  return api.get(endpoints.procedimentos.byId(id));
};

export const createProcedimento = (
  data: ProcedimentoCreate
): Promise<AxiosResponse<Procedimento>> => {
  return api.post(endpoints.procedimentos.base, data);
};

export const updateProcedimento = (
  id: string | number,
  data: ProcedimentoUpdate
): Promise<AxiosResponse<Procedimento>> => {
  return api.put(endpoints.procedimentos.update(id), data);
};

export const deleteProcedimento = (
  id: string | number
): Promise<AxiosResponse<{ message: string }>> => {
  return api.delete(endpoints.procedimentos.delete(id));
};