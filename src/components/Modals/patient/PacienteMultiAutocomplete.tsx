import React, { useState } from "react";
import styled from "styled-components";
import { getPacientes } from "../../../api/services/PacienteService";
import { Paciente } from "../../../api/types/paciente";
import * as S from "../Modal.styles.ts"; // Reusing styles

const Wrapper = S.FieldWrapper;
const Label = S.Label;
const Input = S.Input;

const Suggestions = styled.ul`
  position: absolute;
  width: 100%;
  color: #000;
  background: #fff;
  border: 1px solid #3a5a99;
  border-radius: 6px 6px;
  max-height: 180px;
  overflow-y: auto;
  z-index: 10;
  margin: 0;
  padding: 0.5em;
  list-style: none;
`;

const SuggestionItem = styled.li`
  padding: 0.5rem;
  cursor: pointer;
  font-family: var(--font-roboto);
  font-size: 18px;
  &:hover {
    background: #e6eaf3;
  }
`;

const SelectedList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SelectedPaciente = styled.span`
  background: #5a75a3;
  color: #000;
  border-radius: 12px;
  padding: 0.25rem 0.75rem;
  font-size: 16px;
  font-family: var(--font-roboto);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #000;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  margin-left: 0.25rem;
`;

interface PacienteMultiAutocompleteProps {
  value: Paciente[];
  onChangeForm: (event: { target: { name: string; value: Paciente[] } }) => void;
  name?: string;
}

export const PacienteMultiAutocomplete: React.FC<PacienteMultiAutocompleteProps> = ({
  value,
  onChangeForm,
  name = "pacientes",
}) => {
  const [term, setTerm] = useState("");
  const [options, setOptions] = useState<Paciente[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleSearch = async (val: string) => {
    setTerm(val);
    if (val.length < 2) {
      const resp = await getPacientes({ termo: "", page: 1, limit: 5 });
      setOptions(resp.data.pacientes.filter(p => !value.some(v => v.id === p.id)));
      setShowOptions(true);
      return;
    }
    try {
      const resp = await getPacientes({ termo: val, page: 1, limit: 5 });
      setOptions(resp.data.pacientes.filter(p => !value.some(v => v.id === p.id)));
      setShowOptions(true);
    } catch {
      setOptions([]);
      setShowOptions(false);
    }
  };

  const handleSelect = (paciente: Paciente) => {
    const newValue = [...value, paciente];
    onChangeForm({ target: { name, value: newValue } });
    setTerm("");
    setOptions([]);
    setShowOptions(false);
  };

  const handleRemove = (id: number) => {
    const newValue = value.filter(p => p.id !== id);
    onChangeForm({ target: { name, value: newValue } });
  };

  return (
    <Wrapper>
      <Label>Pacientes</Label>
      <Input
        type="text"
        value={term}
        onChange={e => handleSearch(e.target.value)}
        placeholder="Buscar paciente por nome ou CPF"
        autoComplete="off"
        onFocus={() => handleSearch("")}
        onBlur={() => setTimeout(() => setShowOptions(false), 150)}
      />
      {showOptions && options.length > 0 && (
        <Suggestions>
          {options.map(p => (
            <SuggestionItem key={p.id} onClick={() => handleSelect(p)}>
              {p.name} - {p.cpf}
            </SuggestionItem>
          ))}
        </Suggestions>
      )}
      {value.length > 0 && (
        <SelectedList>
          {value.map(p => (
            <SelectedPaciente key={p.id}>
              {p.name} ({p.cpf})
              <RemoveButton onClick={() => handleRemove(p.id)} title="Remover paciente">
                ×
              </RemoveButton>
            </SelectedPaciente>
          ))}
        </SelectedList>
      )}
    </Wrapper>
  );
};