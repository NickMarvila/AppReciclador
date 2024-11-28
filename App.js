import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';

// Definimos alguns usuários iniciais para o sistema
const usuariosIniciais = [
  { usuario: 'maria', senha: 'maria1' },
  { usuario: 'joao', senha: 'joao123' },
  { usuario: 'davi', senha: 'davi21' },
];

export default function App() {
  // Estado para controlar o login do usuário
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [usuarioInput, setUsuarioInput] = useState('');
  const [senhaInput, setSenhaInput] = useState('');

  // Estados para entrada de dados das anotações de coleta
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [anotacoes, setAnotacoes] = useState([]);
  const [usuarios, setUsuarios] = useState(usuariosIniciais);
  const [novoUsuario, setNovoUsuario] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [relatorioDiario, setRelatorioDiario] = useState([]); // Armazena o relatório das coletas confirmadas

  // Estado para controlar o tipo único de reciclável selecionado
  const [tipoSelecionado, setTipoSelecionado] = useState(null);

  // Carrega as anotações salvas e o relatório de coletas confirmadas ao abrir o app
  useEffect(() => {
    carregarAnotacoes();
    carregarRelatorioDiario();
  }, []);

  // Função para carregar anotações do AsyncStorage
  const carregarAnotacoes = async () => {
    try {
      const dadosSalvos = await AsyncStorage.getItem('anotacoes');
      if (dadosSalvos) setAnotacoes(JSON.parse(dadosSalvos));
    } catch (erro) {
      console.log('Erro ao carregar anotações:', erro);
    }
  };

  // Função para carregar o relatório diário do AsyncStorage
  const carregarRelatorioDiario = async () => {
    try {
      const relatorioSalvo = await AsyncStorage.getItem('relatorioDiario');
      if (relatorioSalvo) setRelatorioDiario(JSON.parse(relatorioSalvo));
    } catch (erro) {
      console.log('Erro ao carregar relatório:', erro);
    }
  };

  // Salva nova anotação de coleta no AsyncStorage e no estado
  const salvarAnotacoes = async (novaAnotacao) => {
    try {
      const anotacoesAtualizadas = [...anotacoes, novaAnotacao];
      setAnotacoes(anotacoesAtualizadas);
      await AsyncStorage.setItem('anotacoes', JSON.stringify(anotacoesAtualizadas));
    } catch (erro) {
      console.log('Erro ao salvar anotações:', erro);
    }
  };

  // Atualiza o relatório diário de coletas confirmadas no AsyncStorage
  const atualizarRelatorioDiario = async (anotacao) => {
    try {
      const relatorioAtualizado = [...relatorioDiario, anotacao];
      setRelatorioDiario(relatorioAtualizado);
      await AsyncStorage.setItem('relatorioDiario', JSON.stringify(relatorioAtualizado));
    } catch (erro) {
      console.log('Erro ao atualizar relatório:', erro);
    }
  };

  // Remove uma anotação após confirmação de coleta e atualiza o relatório
  const removerAnotacao = async (id) => {
    try {
      const anotacaoRemovida = anotacoes.find((anotacao) => anotacao.id === id);
      if (anotacaoRemovida) {
        await atualizarRelatorioDiario(anotacaoRemovida);
      }
      const anotacoesRestantes = anotacoes.filter((anotacao) => anotacao.id !== id);
      setAnotacoes(anotacoesRestantes);
      await AsyncStorage.setItem('anotacoes', JSON.stringify(anotacoesRestantes));
    } catch (erro) {
      console.log('Erro ao remover anotação:', erro);
    }
  };

  // Verifica as credenciais de login do usuário
  const autenticarUsuario = () => {
    if (usuarioInput === 'admin' && senhaInput === 'admin') {
      setUsuarioLogado('admin'); // Login como administrador
    } else {
      const usuarioValido = usuarios.find(
        (u) => u.usuario === usuarioInput && u.senha === senhaInput
      );
      if (usuarioValido) {
        setUsuarioLogado(usuarioInput); // Login como usuário comum
      } else {
        Alert.alert('Erro', 'Usuário ou senha incorretos');
      }
    }
  };

  // Função de logout do usuário
  const deslogar = () => {
    setUsuarioLogado(null);
    setUsuarioInput('');
    setSenhaInput('');
  };

  // Criação de um novo usuário com verificação de preenchimento e duplicidade
  const criarNovoUsuario = () => {
    if (!novoUsuario || !novaSenha) {
      Alert.alert('Erro', 'Usuário e senha não podem estar vazios');
      return;
    }
    const usuarioExistente = usuarios.find((u) => u.usuario === novoUsuario);
    if (usuarioExistente) {
      Alert.alert('Erro', 'Usuário já existe');
      return;
    }
    const novoUsuarioObj = { usuario: novoUsuario, senha: novaSenha };
    setUsuarios([...usuarios, novoUsuarioObj]);
    setNovoUsuario('');
    setNovaSenha('');
    Alert.alert('Sucesso', 'Novo usuário criado');
  };

  // Função para adicionar nova coleta com verificação de preenchimento dos campos
  const adicionarAnotacao = () => {
    if (!endereco || !bairro || !quantidade || !tipoSelecionado) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos e um tipo de reciclável selecionado');
      return;
    }

    const novaAnotacao = {
      id: Date.now().toString(),
      endereco,
      bairro,
      tipo: tipoSelecionado,
      quantidade,
    };
    salvarAnotacoes(novaAnotacao);
    setEndereco('');
    setBairro('');
    setQuantidade('');
    setTipoSelecionado(null);

    Alert.alert('Sucesso', 'Coleta adicionada com sucesso!');
  };

  // Tela de Login
  if (!usuarioLogado) {
    return (
      <View style={estilos.container}>
        <Text style={estilos.titulo}>Login</Text>
        <TextInput
          style={estilos.input}
          placeholder="Usuário"
          value={usuarioInput}
          onChangeText={setUsuarioInput}
        />
        <TextInput
          style={estilos.input}
          placeholder="Senha"
          value={senhaInput}
          secureTextEntry
          onChangeText={setSenhaInput}
        />
        <Button title="Entrar" onPress={autenticarUsuario} />
        <Text style={estilos.subtitulo}>Criar Novo Usuário</Text>
        <TextInput
          style={estilos.input}
          placeholder="Novo Usuário"
          value={novoUsuario}
          onChangeText={setNovoUsuario}
        />
        <TextInput
          style={estilos.input}
          placeholder="Nova Senha"
          value={novaSenha}
          secureTextEntry
          onChangeText={setNovaSenha}
        />
        <Button title="Criar Usuário" onPress={criarNovoUsuario} />
      </View>
    );
  }

  // Tela do Administrador para visualizar e confirmar coletas, com relatório diário
  if (usuarioLogado === 'admin') {
    return (
      <View style={estilos.container}>
        <Text style={estilos.titulo}>Bem-vindo, Administrador</Text>
        <FlatList
          data={anotacoes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={estilos.anotacao}>
              <Text>Endereço: {item.endereco}</Text>
              <Text>Bairro: {item.bairro}</Text>
              <Text>Tipo: {item.tipo}</Text>
              <Text>Quantidade: {item.quantidade} KG</Text>
              <TouchableOpacity
                onPress={() => removerAnotacao(item.id)}
                style={estilos.botaoRemover}
              >
                <Text style={estilos.textoBotaoRemover}>Confirmar Coleta</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <Text style={estilos.subtitulo}>Relatório Diário</Text>
        <FlatList
          data={relatorioDiario}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={estilos.anotacao}>
              <Text>Endereço: {item.endereco}</Text>
              <Text>Bairro: {item.bairro}</Text>
              <Text>Tipo: {item.tipo}</Text>
              <Text>Quantidade: {item.quantidade} KG</Text>
            </View>
          )}
        />
        <Button title="Sair" onPress={deslogar} />
      </View>
    );
  }

  // Tela do usuário comum para adicionar coletas
  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Bem-vindo, {usuarioLogado}</Text>
      <TextInput
        style={estilos.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TextInput
        style={estilos.input}
        placeholder="Bairro"
        value={bairro}
        onChangeText={setBairro}
      />
      <Text style={estilos.subtitulo}>Tipo de reciclável:</Text>
      <View style={estilos.checkboxContainer}>
        <CheckBox
          value={tipoSelecionado === 'Plástico'}
          onValueChange={() => setTipoSelecionado('Plástico')}
        />
        <Text style={estilos.checkboxLabel}>Plástico</Text>
        <CheckBox
          value={tipoSelecionado === 'Papelão'}
          onValueChange={() => setTipoSelecionado('Papelão')}
        />
        <Text style={estilos.checkboxLabel}>Papelão</Text>
        <CheckBox
          value={tipoSelecionado === 'Metal'}
          onValueChange={() => setTipoSelecionado('Metal')}
        />
        <Text style={estilos.checkboxLabel}>Metal</Text>
        <CheckBox
          value={tipoSelecionado === 'Alumínio'}
          onValueChange={() => setTipoSelecionado('Alumínio')}
        />
        <Text style={estilos.checkboxLabel}>Alumínio</Text>
      </View>
      <TextInput
        style={estilos.input}
        placeholder="Quantidade (KG)"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />
      <Button title="Adicionar Coleta" onPress={adicionarAnotacao} />
      <FlatList
        data={anotacoes.filter((item) => item.usuario === usuarioLogado)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={estilos.anotacao}>
            <Text>Endereço: {item.endereco}</Text>
            <Text>Bairro: {item.bairro}</Text>
            <Text>Tipo: {item.tipo}</Text>
            <Text>Quantidade: {item.quantidade} KG</Text>
          </View>
        )}
      />
      <Button title="Sair" onPress={deslogar} />
    </View>
  );
}

// Estilos do aplicativo
const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f2f1',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#26a69a',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    backgroundColor: '#ffffff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  checkboxLabel: {
    marginRight: 10,
  },
  anotacao: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#b2dfdb',
    borderRadius: 5,
  },
  botaoRemover: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ff5252',
    borderRadius: 5,
  },
  textoBotaoRemover: {
    color: 'white',
    textAlign: 'center',
  },
});
