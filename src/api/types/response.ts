// Resposta paginada genérica
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}