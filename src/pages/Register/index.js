import React, {useState} from 'react';

import {StatusBar} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import ImagePicker from 'react-native-image-crop-picker';

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
  AddPhoto,
  AddPhotoText,
  PreviewCNH,
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
  const [image, setImage] = useState();

  function openCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    }).then(image => {
      console.log(image);
      setImage(image);
    });
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#C10C19" />
      <Icon
        name="drivers-license"
        size={40}
        color="#fff"
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
        {image ? <PreviewCNH source={{uri: image.path}} /> : null}
        <AddPhoto activeOpacity={0.8} onPress={() => openCamera()}>
          <Icon name="camera" size={20} color="#d32f2f" />
          <AddPhotoText>
            {!image ? 'Fotografar CNH' : 'Fotografar novamente'}
          </AddPhotoText>
        </AddPhoto>

        <SubmitButton
          onPress={() => navigation.navigate('VehicleRegister')}
          activeOpacity={0.8}>
          <SubmitText>Cadastrar</SubmitText>
        </SubmitButton>
      </Form>
    </Container>
  );
}
