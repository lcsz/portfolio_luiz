class FormularioController {

    restHelper = new RestHelper("usuario");

    constructor() {
        this.botao = document.getElementById("btnEnviar");
        this.btnDeletar = document.getElementById("btnDeletar");

        this.inputLogin = document.getElementById("inputLogin");
        this.inputPwd = document.getElementById("inputPwd");
        this.inputNome = document.getElementById("inputNome");
        this.inputId = document.getElementById("inputId");

        this.divListaUsuario = document.getElementById("listaUsuario");
        this.divButtonDeletar = document.getElementById("divButtonDeletar");

        this.login = null;
        this.pwd = null;
        this.nome = null;
        this.usuarioId = null;

        this.listaUsuarios = [];

        this.changeDivButtonDeletar(false);
        this.pegarUsuarios();

    }

    listeners() {
        this.botao.addEventListener("click", this.enviar());
        this.btnDeletar.addEventListener("click", this.deletar());


        this.inputLogin.addEventListener("keyup", this.changeLoginValue());
        this.inputPwd.addEventListener("keyup", this.changePwdValue());
        this.inputNome.addEventListener("keyup", this.changeNomeValue());
    }


    deletar() {
        return (e) => {
            let usuarioId = this.inputId.value;
            
            if (usuarioId != null) {
                this.loading(true);
                this.restHelper.delete(usuarioId).then((response) => {
                    this.listaUsuarios = this.listaUsuarios.filter((usuario) => {
                        return usuario.id != usuarioId;
                    });
                    this.limparDados();
                    this.atualizarListaUsuario();
                    this.loading(false);
                });
            }
        }
    }


    changeDivButtonDeletar(mostrar) {
        if (mostrar == true) {
            this.divButtonDeletar.classList.remove("d-none");
        } else {
            this.divButtonDeletar.classList.add("d-none");
        }

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
            this.btnDeletar.disabled = true;
        } else {
            this.botao.disabled = false;
            this.btnDeletar.disabled = false;
        }
    }

    limparDados() {
        this.inputLogin.value = "";
        this.inputPwd.value = "";
        this.inputNome.value = "";
        this.inputId.value = "";

        this.login = null;
        this.pwd = null;
        this.nome = null;
        this.usuarioId = null;

        this.changeDivButtonDeletar(false);
    }


    async criarDados(usuario) {
        let novoUsuario = await this.restHelper.post(usuario);  
        this.listaUsuarios.push(novoUsuario);              
        return novoUsuario;
    }


    async atualizarDados(usuario) {        
        let usuarioAtualizado = await this.restHelper.put(usuario.id, {
            "name": usuario.name,
            "email": usuario.email,
            "password": usuario.password
        });

        this.listaUsuarios = this.listaUsuarios.map((usuario) => {
            if (usuario.id == usuarioAtualizado.id) {
                return usuarioAtualizado;
            }
            return usuario;
        });

        return usuarioAtualizado;
    }


    async enviarDados(data) {     
        this.loading(true);
        
        if (data.id == null) {
            let usuario = await this.criarDados(data);
            this.atualizarListaUsuario();
        } else {
            let usuario = await this.atualizarDados(data);
            this.atualizarListaUsuario();
        }

        this.limparDados();
        this.loading(false);
        
    }

    atualizarListaUsuario() {
        this.divListaUsuario.innerHTML = "";

        this.listaUsuarios.forEach((usuario) => {
            let novoUsuario = `<li id="usuario-${usuario.id}" class="list-group-item" onclick="atualizar(${usuario.id}, '${usuario.name}', '${usuario.email}', '${usuario.pwd}')">${usuario.id} - ${usuario.name} - ${usuario.email} - ******</li>`;
            this.divListaUsuario.innerHTML += novoUsuario;
        })
    }

    enviar() {
        return (e) => {             
            
            let idValue = this.inputId.value;            
            this.enviarDados({
                "id": idValue == "" ? null : idValue,
                "name": this.nome,
                "email": this.login,
                "password": this.pwd
            });                    
            
        }
    }

    pegarUsuarios() {        
        this.restHelper.get().then((usuarios) => {
            this.listaUsuarios = usuarios;            
            this.atualizarListaUsuario();
            
        });
    }

    colocarDadosFormulario(id, nome, email, pwd) {
        
        this.inputLogin.value = email;
        this.inputPwd.value = pwd;
        this.inputNome.value = nome;
        this.inputId.value = id;

        this.login = email;
        this.pwd = pwd;
        this.nome = nome;
        this.usuarioId = id;

        this.changeDivButtonDeletar(true);
    }

}


