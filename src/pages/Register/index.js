import React, {useState, useEffect} from 'react';

import {StatusBar, ActivityIndicator} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import api from '~/services/api';

import ImagePicker from 'react-native-image-crop-picker';

import {Picker} from '@react-native-community/picker';

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
  ContainerProfile,
  InformText,
} from './styles';

import PhotoPreview from '../../components/PhotoPreview';

export default function Register({navigation}) {
  const [image, setImage] = useState();

  const [hasPrefecture, setHasPrefecture] = useState(false);
  const [prefectureInfo, setPrefectureInfo] = useState(null);
  const [idPrefectureSelected, setIdPrefectureSelected] = useState();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');
  const [driverLicenseImage, setDriverLicenseImage] = useState('');
  const [imageLicense, setImageLicense] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [board, setBoard] = useState('');
  const [renavam, setRenavam] = useState('');
  const [yearManufacture, setYearManufacture] = useState('');
  const [yearModel, setYearModel] = useState('');
  const [passengers, setPassengers] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [vehicleModelId, setVehicleModelId] = useState('');

  useEffect(() => {
    api
      .get('general/prefectures')
      .then(async response => {
        console.log(response.data);
        setPrefectureInfo(response.data);
        // setHasPrefecture(true);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (hasPrefecture) {
      prefectureInfo?.data.map(data => {
        if (data.user_id === idPrefectureSelected) {
          setCity(data.city);
          setUf(data.uf);
        }
      });
    }
  }, [hasPrefecture, idPrefectureSelected, prefectureInfo]);

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
      {/* <Icon
        name="drivers-license"
        size={40}
        color="#fff"
        style={{alignSelf: 'center', marginBottom: 15}}
      /> */}

      {hasPrefecture && (
        <ContainerProfile>
          <PhotoPreview />
        </ContainerProfile>
      )}

      {!hasPrefecture && (
        <Form>
          <InformText>
            Para continuar é importante que você selecione a cidade onde irá
            trabalhar:
          </InformText>
          <Picker
            mode="dialog"
            selectedValue={idPrefectureSelected}
            onValueChange={(itemValue, itemIndex) => {
              setIdPrefectureSelected(itemValue);
            }}>
            <Picker.Item label="Escolha uma cidade..." value={0} />
            {prefectureInfo?.data.map(data => {
              return (
                <Picker.Item
                  label={data.city + ', ' + data.uf}
                  value={data.user_id}
                />
              );
              // console.log('rei');
            })}
          </Picker>
          <SubmitButton
            onPress={() => {
              if (idPrefectureSelected != 0) {
                setHasPrefecture(true);
              } else {
                alert('Selecione a cidade.');
              }
            }}
            activeOpacity={0.8}>
            <SubmitText>Continuar</SubmitText>
          </SubmitButton>
        </Form>
      )}

      {hasPrefecture ? (
        <>
          <Form>
            <ItemForm>
              <FormLabel>
                <LabelText>Nome</LabelText>
              </FormLabel>
              <FormInput>
                <FieldText
                  placeholder="Digite seu nome"
                  value={name}
                  onChangeText={text => setName(text)}
                />
              </FormInput>
            </ItemForm>

            <ItemForm>
              <FormLabel>
                <LabelText>Endereço</LabelText>
              </FormLabel>
              <FormInput>
                <FieldText
                  placeholder="Ex.: Rua Novo Horizonte, Centro"
                  value={address}
                  onChangeText={text => setAddress(text)}
                />
              </FormInput>
            </ItemForm>

            <ItemForm>
              <FormLabel>
                <LabelText>Número</LabelText>
              </FormLabel>
              <FormInput>
                <FieldText
                  placeholder="140"
                  value={number}
                  onChangeText={text => setNumber(text)}
                />
              </FormInput>
            </ItemForm>

            <ItemForm>
              <FormLabel>
                <LabelText>Cidade</LabelText>
              </FormLabel>
              <FormInput>
                <FieldText placeholder="" value={city} editable={false} />
              </FormInput>
            </ItemForm>

            <ItemForm>
              <FormLabel>
                <LabelText>UF</LabelText>
              </FormLabel>
              <FormInput>
                <FieldText placeholder="" value={uf} editable={false} />
              </FormInput>
            </ItemForm>

            <ItemForm>
              <FormLabel>
                <LabelText>CEP</LabelText>
              </FormLabel>
              <FormInput>
                <FieldText
                  placeholder="Insira seu CEP"
                  value={zipCode}
                  onChangeText={text => setZipCode(text)}
                />
              </FormInput>
            </ItemForm>

            <ItemForm>
              <FormLabel>
                <LabelText>Placa do Veículo</LabelText>
              </FormLabel>
              <FormInput>
                <FieldText
                  placeholder="XXX-0000"
                  value={board}
                  onChangeText={text => setBoard(text)}
                />
              </FormInput>
            </ItemForm>

            <ItemForm>
              <FormLabel>
                <LabelText>Ano Fabricação</LabelText>
              </FormLabel>
              <FormInput>
                <FieldText
                  placeholder="Ex.: 2014"
                  value={yearManufacture}
                  onChangeText={text => setYearManufacture(text)}
                />
              </FormInput>
            </ItemForm>

            <ItemForm>
              <FormLabel>
                <LabelText>Ano Modelo</LabelText>
              </FormLabel>
              <FormInput>
                <FieldText
                  placeholder="Ex.: 2015"
                  value={yearModel}
                  onChangeText={text => setYearModel(text)}
                />
              </FormInput>
            </ItemForm>

            <ItemForm>
              <FormLabel>
                <LabelText>Quantidade Passageiros</LabelText>
              </FormLabel>
              <FormInput>
                <FieldText
                  placeholder="Ex: 15"
                  value={passengers}
                  onChangeText={text => setPassengers(text)}
                />
              </FormInput>
            </ItemForm>

            <ItemForm>
              <FormLabel>
                <LabelText>Senha</LabelText>
              </FormLabel>
              <FormInput>
                <FieldText
                  placeholder="********"
                  value={password}
                  onChangeText={text => setPassword(text)}
                  secureTextEntry={true}
                />
              </FormInput>
            </ItemForm>

            <ItemForm>
              <FormLabel>
                <LabelText>Confirmar Senha</LabelText>
              </FormLabel>
              <FormInput>
                <FieldText
                  placeholder="********"
                  value={passwordConfirmation}
                  onChangeText={text => setPasswordConfirmation(text)}
                  secureTextEntry={true}
                />
              </FormInput>
            </ItemForm>

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
        </>
      ) : null}
    </Container>
  );
}
