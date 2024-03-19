import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import { auth } from "../../firebase.config";

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const cadastrar = async () => {
    if (!email || !senha) {
      Alert.alert("Atenção!", "Preencha email e senha!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      Alert.alert("Cadastro", "Seu cadastro foi feito com sucesso!", [
        {
          style: "cancel",
          text: "Ficar aqui mesmo",
          onPress: () => {
            return;
          },
        },
        {
          style: "default",
          text: "Ir para área logada",
          onPress: () => navigation.replace("AreaLogada"),
        },
      ]);
    } catch (error) {
      console.error(error.code);
      let mensagem;
      switch (error.code) {
        case "auth/email-already-in-use":
          mensagem = "Email já cadastrado!";
          break;
        case "auth/invalid-credential":
          mensagem = "Dados inválidos!";
          break;
        case "auth/invalid-email":
          mensagem = "Endereço de e-mail inválido!";
          break;
        case "auth/week-password":
          mensagem = "Senha Fraca (mínimo de 6 caracteres)";
          break;

        default:
          mensagem = "Houve um erro, tente mais tarde!";
          break;
      }
      Alert.alert("Ops!", mensagem);
    }
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.formulario}>
        <TextInput
          keyboardType="email-address"
          placeholder="E-mail"
          style={estilos.input}
          onChangeText={(valor) => setEmail(valor)}
        />
        <TextInput
          secureTextEntry
          placeholder="Senha"
          style={estilos.input}
          onChangeText={(valor) => setSenha(valor)}
        />
        <View style={estilos.botoes}>
          <Button title="Cadastre-se" color="blue" onPress={cadastrar} />
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  formulario: {
    marginVertical: 16,
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    marginVertical: 8,
    padding: 8,
    borderRadius: 4,
  },
  botoes: {
    marginVertical: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
