const { createApp } = Vue
createApp({
    data() {
        return {
            usuarios: [],
            url: 'http://localhost:5000/usuarios',
            // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
            //url: 'https://pfbrodon.pythonanywhere.com/productos', // si ya lo subieron a pythonanywhere
            error: false,
            cargando: true,
            /*atributos para el guardar los valores del formulario */
            id: 0,
            email: "",
            password: "",
            nombre: "",
            tipouser: "cliente",
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.usuarios = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        grabar() {
            let usuario = {
                email: this.email,
                password: this.password,
                nombre: this.nombre,
                tipouser: this.tipouser,
            }
            var options = {
                body: JSON.stringify(usuario),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function() {
                    alert("Registro grabado")
                        //window.location.href = "./index.html"; // recarga productos.html no hace falta para el usuario
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar") // puedo mostrar el error tambien
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')