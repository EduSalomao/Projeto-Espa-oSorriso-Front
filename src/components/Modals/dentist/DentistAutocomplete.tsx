import React, { useState } from "react";
import styled from "styled-components";
import { getDentistas } from "../../../api/services/DentistaService";
import { Dentista } from "../../../api/types/dentista";
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

const SelectedDentista = styled.div`
  margin-top: 0.5rem;
  font-size: 16px;
  color: #5a75a3;
  font-family: var(--font-roboto);
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

interface DentistaAutocompleteProps {
  value: Dentista | null;
  onChangeForm: (event: { target: { name: string; value: Dentista | null } }) => void;
  name?: string;
}

export const DentistaAutocomplete: React.FC<DentistaAutocompleteProps> = ({
  value,
  onChangeForm,
  name = "dentista",
}) => {
  const [term, setTerm] = useState("");
  const [options, setOptions] = useState<Dentista[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleSearch = async (val: string) => {
    setTerm(val);
    if (val.length < 2) {
      const resp = await getDentistas({ termo: "", page: 1, limit: 1000 });
      setOptions(resp.data.dentistas);
      setShowOptions(true);
      return;
    }
    try {
      const resp = await getDentistas({ termo: val, page: 1, limit: 5 });
      setOptions(resp.data.dentistas);
      setShowOptions(true);
    } catch {
      setOptions([]);
      setShowOptions(false);
    }
  };

  const handleSelect = (dentista: Dentista) => {
    onChangeForm({ target: { name, value: dentista } });
    setTerm(dentista.name);
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
      <Label>Dentista</Label>
      <Input
        type="text"
        value={term}
        onChange={e => handleSearch(e.target.value)}
        placeholder="Buscar dentista por nome ou CRO"
        autoComplete="off"
        onFocus={() => handleSearch("")}
        onBlur={() => setTimeout(() => setShowOptions(false), 150)}
        disabled={!!value}
      />
      {showOptions && options.length > 0 && !value && (
        <Suggestions>
          {options.map(d => (
            <SuggestionItem key={d.id} onClick={() => handleSelect(d)}>
              {d.name} - {d.cro}
            </SuggestionItem>
          ))}
        </Suggestions>
      )}
      {value && (
        <SelectedDentista>
          Selecionado: {value.name} ({value.cro})
          <RemoveButton onClick={handleRemove} title="Remover dentista">
            ×
          </RemoveButton>
        </SelectedDentista>
      )}
    </Wrapper>
  );
};