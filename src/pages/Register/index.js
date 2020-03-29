import React from 'react';

import {StatusBar} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Container,
  FormInput,
  FieldText,
  Form,
  FormLabel,
  LabelText,
  ItemForm,
  SubmitText,
  SubmitButton,
} from './styles';

const FormItemInput = ({labelname, sample, secure}) => {
  return (
    <ItemForm>
      <FormLabel>
        <LabelText>{labelname}</LabelText>
      </FormLabel>
      <FormInput>
        <FieldText placeholder={sample} secureTextEntry={secure} />
      </FormInput>
    </ItemForm>
  );
};

export default function Register({navigation}) {
  return (
    <Container>
      <StatusBar backgroundColor="#212121" />
      <Icon
        name="drivers-license"
        size={50}
        color="#FFD54F"
        style={{alignSelf: 'center', marginBottom: 15}}
      />

      <Form>
        <FormItemInput labelname="Nome" sample="Digite seu nome" />
        <FormItemInput
          labelname="Endereço"
          sample="Ex.: Rua Novo Horizonte, 35 - Centro"
        />
        <FormItemInput
          labelname="Celular"
          sample="(00) 00000-0000"
          secure={false}
        />
        <FormItemInput
          labelname="CPF"
          sample="Ex.: 000.000.000-00"
          secure={false}
        />
        <FormItemInput
          labelname="Número da CNH"
          sample="00000000"
          secure={false}
        />
        <FormItemInput
          labelname="Vencimento da CNH"
          sample="00/00/0000"
          secure={false}
        />
        <FormItemInput
          labelname="E-mail"
          sample="nome@gmail.com"
          secure={false}
        />
        <FormItemInput
          labelname="Digite uma senha"
          sample="***********"
          secure={true}
        />
        <FormItemInput
          labelname="Confirme sua senha"
          sample="***********"
          secure={true}
        />
        <SubmitButton activeOpacity={0.8}>
          <SubmitText>Cadastrar</SubmitText>
        </SubmitButton>
      </Form>
    </Container>
  );
}
