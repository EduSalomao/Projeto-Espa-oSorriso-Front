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

const SelectedList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SelectedDentista = styled.span`
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

interface DentistaMultiAutocompleteProps {
  value: Dentista[];
  onChangeForm: (event: { target: { name: string; value: [] } }) => void;
}

export const DentistaMultiAutocomplete: React.FC<DentistaMultiAutocompleteProps> = ({
  value,
  onChangeForm,
  name = "dentistas",
}) => {
  const [term, setTerm] = useState("");
  const [options, setOptions] = useState<Dentista[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleSearch = async (val: string) => {
    setTerm(val);
    if (val.length < 2) {
      const resp = await getDentistas({ termo: "", page: 1, limit: 1000 });
      setOptions(resp.data.dentistas.filter(d => !value.some(v => v.id === d.id)));
      setShowOptions(true);
      return;
    }
    try {
      const resp = await getDentistas({ termo: val, page: 1, limit: 1000 });
      // Remove já selecionados das opções
      setOptions(resp.data.dentistas.filter(d => !value.some(v => v.id === d.id)));
      setShowOptions(true);
    } catch {
      setOptions([]);
      setShowOptions(false);
    }
  };

  const handleSelect = (dentista: Dentista) => {
    const newValue = [...value, dentista];
    onChangeForm({ target: { name, value: newValue } });
    
    setTerm("");
    setOptions([]);
    setShowOptions(false);
  };

  const handleRemove = (id: number | string) => {
    const newValue = value.filter(d => d.id !== id);
    onChangeForm({ target: { name, value: newValue } });
  };

  return (
    <Wrapper>
      <Label>Dentistas</Label>
      <Input
        type="text"
        value={term}
        onChange={e => handleSearch(e.target.value)}
        placeholder="Buscar dentista por nome ou CRO"
        autoComplete="off"
        onFocus={() => handleSearch("")}
        onBlur={() => setTimeout(() => setShowOptions(false), 150)}
      />
      {showOptions && options.length > 0 && (
        <Suggestions>
          {options.map(d => (
            <SuggestionItem key={d.id} onClick={() => handleSelect(d)}>
              {d.name} - {d.cro}
            </SuggestionItem>
          ))}
        </Suggestions>
      )}
      {value.length > 0 && (
        <SelectedList>
          {value.map(d => (
            <SelectedDentista key={d.id}>
              {d.name} ({d.cro})
              <RemoveButton onClick={() => handleRemove(d.id)} title="Remover dentista">
                ×
              </RemoveButton>
            </SelectedDentista>
          ))}
        </SelectedList>
      )}
    </Wrapper>
  );
};