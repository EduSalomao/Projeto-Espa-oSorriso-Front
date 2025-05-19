import React from "react";
import * as S from "../Form.style";

type Props = {
    form: {
        name: string;
        birthdate: string;
        cpf: string;
        phone: string;
        address: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onMaskedChange: (field: "cpf" | "phone", value: string) => void;
    onSubmit?: () => void;
    onCancel?: () => void;
    form: PatientFormData;
    setForm: React.Dispatch<React.SetStateAction<PatientFormData>>;
};

export default function PatientForm({
    form,
    onChange,
    onMaskedChange,
    onSubmit,
    onCancel
}: Props) {
    return (
        
        <S.FormContainer>
                <S.FieldWrapper style={{ width: "70%" }}>
                    <S.Label htmlFor="name">Nome</S.Label>
                    <S.Input
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        placeholder="Digite o nome"
                    />
                </S.FieldWrapper>
                <S.FieldWrapper>
                    <S.Label htmlFor="birthdate">Data de Nascimento</S.Label>
                    <S.Input
                        name="birthdate"
                        type="date"
                        value={form.birthdate}
                        onChange={onChange}
                    />
                </S.FieldWrapper>
                <S.FieldWrapper style={{ width: "60%" }}>
                    <S.Label htmlFor="cpf">CPF</S.Label>
                    <S.MaskedInput
                        mask="000.000.000-00"
                        value={form.cpf}
                        placeholder="xxx.xxx.xxx-xx"
                        onAccept={(value: any) =>
                            onMaskedChange("cpf", value)
                        }
                    />
                </S.FieldWrapper>
                <S.FieldWrapper>
                    <S.Label htmlFor="phone">Telefone</S.Label>
                    <S.MaskedInput
                        mask="(00) 00000-0000"
                        value={form.phone}
                        placeholder="(XX) XXXXX-XXXX"
                        onAccept={(value: any) =>
                            onMaskedChange("phone", value)
                        }
                    />
                </S.FieldWrapper>
                <S.FieldWrapper style={{ width: "100%" }}>
                    <S.Label htmlFor="address">Endereço</S.Label>
                    <S.Input
                        name="address"
                        value={form.address}
                        onChange={onChange}
                        placeholder="Digite o endereço"
                    />
                </S.FieldWrapper>
            </S.FormContainer>
    );
}
