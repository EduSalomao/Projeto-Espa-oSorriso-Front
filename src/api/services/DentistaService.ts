import api from '../axios';
import endpoints from '../endpoints';
import { Dentista } from '../types/dentista'; 
import { RequestParams } from '../types/params';
import { AxiosResponse } from 'axios';

// Resposta paginada de dentistas
interface PaginatedResponse<T> {
  dentistas: T[];
  total: number;
  page: number;
  limit: number;
}

export const getDentistas = (
  params?: RequestParams
): Promise<AxiosResponse<PaginatedResponse<Dentista>>> => {
  return api.get(endpoints.dentistas.listWithFilters(params));
  
};

export const getDentistaById = (
  id: string | number
): Promise<AxiosResponse<Dentista>> => {
  return api.get(endpoints.dentistas.byId(id));
};

export const updateDentista = (
  id: string | number,
  data: Partial<Dentista>
): Promise<AxiosResponse<Dentista>> => {
  return api.put(endpoints.dentistas.update(id), data);
};

export const deleteDentista = (
  id: string | number
): Promise<AxiosResponse<void>> => {
  return api.delete(endpoints.dentistas.delete(id));
};