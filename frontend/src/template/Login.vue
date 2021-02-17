<template>
    <v-app>
        <v-dialog v-model="dialog" max-width="600px" min-width="360px">
            <v-card color="basil">
                <v-tabs v-model="tab" show-arrows background-color="blue lighten-2" icons-and-text dark grow>
                    <v-tabs-slider color="purple darken-4"></v-tabs-slider>
                    <v-tab v-for="i in tabs" :key="i">
                        <v-icon large>{{ i.icon }}</v-icon>
                        <div class="caption py-1">{{ i.name }}</div>
                    </v-tab>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="loginForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Senha" hint="Mínimo de 8 caracteres." counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex ml-auto mr-auto" cols="12" sm="3" xsm="12">
                                            <v-btn x-large block :disabled="!valid" color="success" @click="validate"> Entrar </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="registerForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="firstName" :rules="[rules.required]" label="Nome" maxlength="20" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="lastName" :rules="[rules.required]" label="Sobrenome" maxlength="20" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Senha" hint="Mínimo de 8 caracteres." counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirmar Senha" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex ml-auto mr-auto" cols="12" sm="3" xsm="12">
                                            <v-btn x-large block :disabled="!valid" color="success" @click="validate">Registrar</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>            
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
export default {
    app: 'Login',
    data: function() {
        return {
            dialog: true,
            tab: 0,
            tabs: [
                {name:"Entrar", icon:"mdi-account"},
                {name:"Registrar", icon:"mdi-account-outline"}                
            ],
            valid: true,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            verify: "",
            loginPassword: "",
            loginEmail: "",
            loginEmailRules: [
                v => !!v || "Campo obrigatório.",
                v => /.+@.+\..+/.test(v) || "O E-mail deve ser válido."
            ],
            emailRules: [
                v => !!v || "Campo obrigatório.",
                v => /.+@.+\..+/.test(v) || "O E-mail deve ser válido."
            ], 
            show1: false,
            rules: {
                required: value => !!value || "Campo obrigatório.",
                min: v => (v && v.length >= 8) || "Mínimo 8 caracteres."
            }                       
        }
    },
    computed: {
        passwordMatch() {
            return () => this.password === this.verify || "As senhas devem ser iguais.";
        }
    },    
    methods: {
        validate() {
            if (this.$refs.loginForm.validate()) {
                // submit form to server/API here...
            }
        },
        reset() {
            this.$refs.form.reset();
        },
        resetValidation() {
            this.$refs.form.resetValidation();
        }
    }
}
</script>

<style>
#login {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>