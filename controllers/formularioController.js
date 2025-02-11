class FormularioController {

    restHelper = new RestHelper("usuario");

    constructor() {
        this.botao = document.getElementById("btnEnviar");
        this.inputLogin = document.getElementById("inputLogin");
        this.inputPwd = document.getElementById("inputPwd");
        this.inputNome = document.getElementById("inputNome");
        this.divListaUsuario = document.getElementById("listaUsuario");

        this.login = null;
        this.pwd = null;
        this.nome = null;

        this.pegarUsuarios();
    }

    listeners() {
        this.botao.addEventListener("click", this.enviar());
        this.inputLogin.addEventListener("keyup", this.changeLoginValue());
        this.inputPwd.addEventListener("keyup", this.changePwdValue());
        this.inputNome.addEventListener("keyup", this.changeNomeValue());
    }

    changeLoginValue() {
        return (e) => {
            this.login = this.inputLogin.value;            
        }
    }

    changePwdValue() {
        return (e) => {
            this.pwd = this.inputPwd.value;            
        }
    }

    changeNomeValue() {
        return (e) => {
            this.nome = this.inputNome.value;            
        }
    }

    loading(ligado) {
        if (ligado) {
            this.botao.disabled = true;
        } else {
            this.botao.disabled = false;
        }
    }

    limparDados() {
        this.inputLogin.value = "";
        this.inputPwd.value = "";
        this.inputNome.value = "";

        this.login = null;
        this.pwd = null;
        this.nome = null;
    }

    async enviarDados(data) {        
        this.loading(true);
        let usuario = await this.restHelper.post(data);
        this.limparDados();
        this.loading(false);
        this.atualizarListaUsuario(usuario);
    }

    atualizarListaUsuario(usuario) {
        let novoUsuario = `<li class="list-group-item" onclick="alert(${usuario.id})">${usuario.id} - ${usuario.name} - ${usuario.email} - ******</li>`;
        this.divListaUsuario.innerHTML += novoUsuario;
    }

    teste(id) {
        return (e) => {
            alert(id)
        }
    }

    enviar() {
        return (e) => {                
            this.enviarDados({
                "name": this.nome,
                "email": this.login,
                "password": this.pwd
            });            
        }
    }

    pegarUsuarios() {
        this.restHelper.get().then((usuarios) => {
            usuarios.forEach(usuario => {
                this.atualizarListaUsuario(usuario);
            });
        });
    }

}


new FormularioController().listeners();