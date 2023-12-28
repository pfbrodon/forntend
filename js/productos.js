const { createApp } = Vue
createApp({
    data() {
        return {
            productos: [],
            url: 'http://localhost:5000/productos',
            // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
            //url: 'https://pfbrodon.pythonanywhere.com/productos', // si ya lo subieron a pythonanywhere
            error: false,
            cargando: true,
            /*atributos para el guardar los valores del formulario */
            id: 0,
            categoria: "",
            codigo: 0,
            descripcion: "",
            cantidad: 0,
            precioUnit: 0,
            precioVPublico: 0,
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        restarEnUno(id) {
            const producto = this.productos.find(item => item.id === id);

            if (producto && producto.cantidad > 0) {
                producto.cantidad -= 1;

                // Aquí puedes realizar alguna acción adicional después de restar en 1,
                // como guardar el cambio en el backend mediante una llamada a la API.
                // Puedes agregar la lógica aquí según tus necesidades.

                // Por ejemplo:
                this.actualizarCantidadEnBackend(id, producto.cantidad);
            } else {
                alert('La cantidad no puede ser menor que 0.');
            }
        },
        sumarEnUno(id) {
            const producto = this.productos.find(item => item.id === id);

            if (producto && producto.cantidad > 0) {
                producto.cantidad += 1;

                // Aquí puedes realizar alguna acción adicional después de restar en 1,
                // como guardar el cambio en el backend mediante una llamada a la API.
                // Puedes agregar la lógica aquí según tus necesidades.

                // Por ejemplo:
                this.actualizarCantidadEnBackend(id, producto.cantidad);
            } else {
                alert('La cantidad no puede ser menor que 0.');
            }
        },
        eliminar(id) {
            const url = this.url + '/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },
        grabar() {
            let producto = {
                categoria: this.categoria,
                codigo: this.codigo,
                descripcion: this.descripcion,
                cantidad: this.cantidad,
                precioUnit: this.precioUnit,
                precioVPublico: this.precioVPublico
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function() {
                    alert("Registro grabado")
                    window.location.href = "./index.html"; // recarga productos.html
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