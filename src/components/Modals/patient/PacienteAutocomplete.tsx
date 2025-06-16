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

const SelectedPaciente = styled.div`
  margin-top: 0.5rem;
  font-size: 16px;
  color: #5a75a3;
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

interface PacienteAutocompleteProps {
  value: Paciente | null;
  onChangeForm: (event: { target: { name: string; value: Paciente | null } }) => void;
  name?: string;
}

export const PacienteAutocomplete: React.FC<PacienteAutocompleteProps> = ({
  value,
  onChangeForm,
  name = "paciente",
}) => {
  const [term, setTerm] = useState("");
  const [options, setOptions] = useState<Paciente[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleSearch = async (val: string) => {
    setTerm(val);
    if (val.length < 2) {
      const resp = await getPacientes({ termo: "", page: 1, limit: 5 });
      setOptions(resp.data.pacientes);
      setShowOptions(true);
      return;
    }
    try {
      const resp = await getPacientes({ termo: val, page: 1, limit: 5 });
      setOptions(resp.data.pacientes);
      setShowOptions(true);
    } catch {
      setOptions([]);
      setShowOptions(false);
    }
  };

  const handleSelect = (paciente: Paciente) => {
    onChangeForm({ target: { name, value: paciente } });
    setTerm(paciente.name);
    setOptions([]);
    setShowOptions(false);
  };

  const handleRemove = () => {
    onChangeForm({ target: { name, value: null } });
    setTerm("");
    setOptions([]);
    setShowOptions(false);
  };

  return (
    <Wrapper>
      <Label>Paciente</Label>
      <Input
        type="text"
        value={term}
        onChange={e => handleSearch(e.target.value)}
        placeholder="Buscar paciente por nome ou CPF"
        autoComplete="off"
        onFocus={() => handleSearch("")}
        onBlur={() => setTimeout(() => setShowOptions(false), 150)}
        disabled={!!value}
      />
      {showOptions && options.length > 0 && !value && (
        <Suggestions>
          {options.map(p => (
            <SuggestionItem key={p.id} onClick={() => handleSelect(p)}>
              {p.name} - {p.cpf}
            </SuggestionItem>
          ))}
        </Suggestions>
      )}
      {value && (
        <SelectedPaciente>
          Selecionado: {value.name} ({value.cpf})
          <RemoveButton onClick={handleRemove} title="Remover paciente">
            ×
          </RemoveButton>
        </SelectedPaciente>
      )}
    </Wrapper>
  );
};