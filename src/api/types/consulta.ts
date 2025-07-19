import { Dentista } from './dentista';
import { Paciente } from './paciente';
import { Procedimento } from './procedimento';

export interface Consulta {
  id: number;
  data_hora: string;
  duracao: string;
  data_hora_fim: string;
  motivo: string;
  id_paciente: number;
  paciente_nome: string;
  paciente_cpf: string;
  id_dentista: number;
  dentista_nome: string;
  dentista_cro: string;
  procedimentos: Procedimento[];
}

export interface ConsultaCreate {
  id_paciente: number;
  id_dentista: number;
  data_hora: string;
  duracao: string;
  motivo: string;
  procedimentos: number[];
}
export interface ConsultaDetalhada extends Consulta {
    // A view 'consulta_detalhada' já contém os campos que precisamos
}

export type ConsultaUpdate = Partial<ConsultaCreate>;