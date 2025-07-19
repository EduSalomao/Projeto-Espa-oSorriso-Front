import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getProcedimentos } from "../../../api/services/ProcedimentoService";
import { Procedimento } from "../../../api/types/procedimento";
import * as S from "../Modal.styles.ts";

const Wrapper = S.FieldWrapper;
const Label = S.Label;
const Input = S.Input;

const Suggestions = styled.ul`
  position: absolute;
  width: 100%;
  color: #000;
  background: #fff;
  border: 1px solid #3a5a99;
  border-radius: 6px;
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

const SelectedProcedimento = styled.span`
  background: #5a75a3;
  color: #fff;
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
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  margin-left: 0.25rem;
`;

interface ProcedimentoMultiAutocompleteProps {
  value: Procedimento[];
  onChangeForm: (event: { target: { name: string; value: Procedimento[] } }) => void;
  dentistaId: number | null;
  name?: string;
}

export const ProcedimentoMultiAutocomplete: React.FC<ProcedimentoMultiAutocompleteProps> = ({
  value,
  onChangeForm,
  dentistaId,
  name = "procedimentos",
}) => {
  const [term, setTerm] = useState("");
  const [options, setOptions] = useState<Procedimento[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    // Quando o dentista muda, limpa as opções e o termo de busca
    setTerm("");
    setOptions([]);
    setShowOptions(false);
  }, [dentistaId]);

  const handleSearch = async (val: string) => {
    setTerm(val);
    if (!dentistaId) {
        setOptions([]);
        setShowOptions(false);
        return;
    }
    try {
      const resp = await getProcedimentos({ termo: val, page: 1, limit: 1000, idDentista: dentistaId });
      setOptions(resp.data.procedimentos.filter(p => !value.some(v => v.id === p.id)));
      setShowOptions(true);
    } catch {
      setOptions([]);
      setShowOptions(false);
    }
  };

  const handleSelect = (procedimento: Procedimento) => {
    const newValue = [...value, procedimento];
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
      <Label>Procedimentos</Label>
      <Input
        type="text"
        value={term}
        onChange={e => handleSearch(e.target.value)}
        placeholder={dentistaId ? "Buscar procedimento por nome" : "Selecione um dentista primeiro"}
        autoComplete="off"
        onFocus={() => handleSearch("")}
        onBlur={() => setTimeout(() => setShowOptions(false), 150)}
        disabled={!dentistaId}
      />
      {showOptions && options.length > 0 && (
        <Suggestions>
          {options.map(p => (
            <SuggestionItem key={p.id} onClick={() => handleSelect(p)}>
              {p.name}
            </SuggestionItem>
          ))}
        </Suggestions>
      )}
      {value.length > 0 && (
        <SelectedList>
          {value.map(p => (
            <SelectedProcedimento key={p.id}>
              {p.name}
              <RemoveButton onClick={() => handleRemove(p.id)} title="Remover procedimento">
                ×
              </RemoveButton>
            </SelectedProcedimento>
          ))}
        </SelectedList>
      )}
    </Wrapper>
  );
};