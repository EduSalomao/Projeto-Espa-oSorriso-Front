import api from '../axios';
import endpoints from '../endpoints';
import { Consulta, ConsultaCreate, ConsultaUpdate } from '../types/consulta'; 
import { RequestParams } from '../types/params';
import { AxiosResponse } from 'axios';

interface PaginatedResponse {
  consultas: Consulta[];
  total: number;
  page: number;
  totalPages: number;
}

export const getConsultas = (
  params?: RequestParams
): Promise<AxiosResponse<PaginatedResponse>> => {
  return api.get(endpoints.consultas.listWithFilters(params));
};

export const getConsultaById = (
  id: string | number
): Promise<AxiosResponse<Consulta>> => {
  return api.get(endpoints.consultas.byId(id));
};

export const createConsulta = (
  data: ConsultaCreate
): Promise<AxiosResponse<Consulta>> => {
  return api.post(endpoints.consultas.base, data);
};

export const updateConsulta = (
  id: string | number,
  data: ConsultaUpdate
): Promise<AxiosResponse<Consulta>> => {
  return api.put(endpoints.consultas.update(id), data);
};

export const deleteConsulta = (
  id: string | number
): Promise<AxiosResponse<{ message: string }>> => {
  return api.delete(endpoints.consultas.delete(id));
};
