import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 8px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #edf2fd;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  box-shadow: 0px 2px 8px rgba(61, 85, 130, 0.08);
`;

export const Thead = styled.thead`
  background: #5a75a3;
`;

export const Th = styled.th`
  color: #fff;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 18px;
  font-weight: bold;
  padding: 12px 8px;
  text-align: left;
  border-top-left-radius: ${({ first }: { first?: boolean }) => first ? "8px" : "0"};
  border-top-right-radius: ${({ last }: { last?: boolean }) => last ? "8px" : "0"};
`;

export const Tr = styled.tr`
  &&:hover {
    background: #d3d3d3;
    cursor: pointer
  }
`;

export const Td = styled.td`
  color: #3d5582;
  font-size: 16px;
  padding: 10px 8px;
  border-bottom: 1px solid #d3d3d3;
`;

export const Tbody = styled.tbody`
  background: #edf2fd;
`;