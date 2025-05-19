import * as S from "./Modal.styles";

type Props = {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    children: React.ReactNode;
};

function Modal({ isOpen, onClose, title, onSubmit, children }: Props) {
  
  if (!isOpen) return null;
  
  return (
    <S.ModalOverlay>
        <S.Container>
            <S.Title>{title}</S.Title>
            <>{children}</>
            <S.ButtonGroup>
                <S.Button onClick={onSubmit}>Salvar</S.Button>
                <S.CancelButton onClick={onClose}>Cancelar</S.CancelButton>
            </S.ButtonGroup>
        </S.Container>
    </S.ModalOverlay>
    
  );
}

export default Modal;
