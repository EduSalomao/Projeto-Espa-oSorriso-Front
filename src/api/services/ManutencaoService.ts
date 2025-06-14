import api from '../axios';
import endpoints from '../endpoints';
import { Manutencao, ManutencaoCreate, ManutencaoUpdate } from '../types/manutencao'; 
import { RequestParams } from '../types/params';
import { AxiosResponse } from 'axios';

interface PaginatedResponse {
  manutencoes: Manutencao[];
  total: number;
  page: number;
  totalPages: number;
}

export const getManutencoes = (
  params?: RequestParams
): Promise<AxiosResponse<PaginatedResponse>> => {
  return api.get(endpoints.manutencoes.listWithFilters(params));
};

export const getManutencaoById = (
  id: string | number
): Promise<AxiosResponse<Manutencao>> => {
  return api.get(endpoints.manutencoes.byId(id));
};

export const createManutencao = (
  data: ManutencaoCreate
): Promise<AxiosResponse<Manutencao>> => {
  return api.post(endpoints.manutencoes.base, data);
};

export const updateManutencao = (
  id: string | number,
  data: ManutencaoUpdate
): Promise<AxiosResponse<Manutencao>> => {
  return api.put(endpoints.manutencoes.update(id), data);
};

export const deleteManutencao = (
  id: string | number
): Promise<AxiosResponse<{ message: string }>> => {
  return api.delete(endpoints.manutencoes.delete(id));
};