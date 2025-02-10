class FormularioController {

    constructor() {
        this.botao = document.getElementById("btnEnviar");
        this.inputLogin = document.getElementById("inputLogin");
        this.inputPwd = document.getElementById("inputPwd");

        this.login = null;
        this.pwd = null;
    }

    listeners() {
        this.botao.addEventListener("click", this.enviar());
        this.inputLogin.addEventListener("keyup", this.changeLoginValue());
        this.inputPwd.addEventListener("keyup", this.changePwdValue());
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

    enviar() {
        return (e) => {            
            alert(this.login + " " + this.pwd);
        }
    }

}


new FormularioController().listeners();