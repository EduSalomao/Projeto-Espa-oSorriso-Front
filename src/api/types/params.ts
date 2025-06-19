export interface RequestParams {
  page?: number;
  limit?: number;
  termo?: string;
  idDentista?: number | string | null;
  idPaciente?: number | string | null;
}