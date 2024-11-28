# App Reciclador 🌱

Este é um aplicativo de reciclagem desenvolvido em React Native. Ele permite que usuários indiquem a disponibilidade de recicláveis para coleta, como plástico, papelão, alumínio e metal. Administradores podem gerenciar essas coletas e confirmar a retirada dos materiais.

---

## 🚀 Funcionalidades

### Funcionalidades do Usuário:
1. **Cadastro de Coletas:**
   - Usuários podem adicionar coletas indicando:
     - Tipo de material reciclável (plástico, papelão, alumínio ou metal).
     - Quantidade em quilogramas (kg).
     - Localização.
   - Após adicionar, um **pin** é exibido no mapa com os detalhes da coleta.

2. **Visualização do Mapa:**
   - Exibe as coletas disponíveis no mapa.

3. **Logout:**
   - Usuários podem encerrar sua sessão com um botão de logout.

---

### Funcionalidades do Administrador:
1. **Gestão de Coletas:**
   - Exibição de todas as coletas criadas pelos usuários.
   - Opção para **confirmar coletas**, removendo o **pin** do mapa.

2. **Autenticação:**
   - Login exclusivo para administradores e usuários.

---

## 🛠️ Passo a Passo para Rodar o Projeto

### 1️⃣ Pré-requisitos
Antes de começar, certifique-se de ter os seguintes softwares instalados:
- **Node.js** (https://nodejs.org/)
- **Git** (https://git-scm.com/)
- **Visual Studio Code** (https://code.visualstudio.com/)
- **Emulador Android** (ou dispositivo físico com modo de desenvolvedor habilitado).

---

### 2️⃣ Clone o Repositório
No terminal, execute:

git clone https://github.com/NickMarvila/AppReciclador.git
cd AppReciclador

### 3️⃣ Instale as Dependências

Para instalar as dependências do projeto, siga os seguintes passos:

1. No terminal, dentro do diretório do projeto, execute o comando abaixo para instalar todas as dependências necessárias:

   npm install

## 4️⃣ Configure o Ambiente de Desenvolvimento

Certifique-se de que o ambiente de desenvolvimento está corretamente configurado para rodar o projeto no seu dispositivo ou emulador.

### **Android:**

1. Verifique se o **Android Studio** está instalado e configurado, incluindo o emulador ou dispositivo físico com o modo de desenvolvedor habilitado.

2. Para rodar o projeto no emulador Android, execute o seguinte comando:

   npm run android

## 5️⃣ Execute o Projeto

### 1. **Abra o Visual Studio Code no diretório do seu projeto**:

   Abra o terminal no VS Code e execute o seguinte comando para abrir o projeto no editor:

   code .

