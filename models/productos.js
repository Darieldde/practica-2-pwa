const Schema = mongoose.Schema;

var schema = new Schema({
    enlaceDeImagen: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    prrecio: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Product', schema);