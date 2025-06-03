DROP TABLE IF EXISTS socio;
CREATE TABLE IF NOT EXISTS socio (
	id_socio INT AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(20) NOT NULL,
    dni VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    PRIMARY KEY (id_socio)
);

DROP TABLE IF EXISTS empleado;
CREATE TABLE IF NOT EXISTS empleado(
	id_empleado INT AUTO_INCREMENT NOT NULL,
	nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(20) NOT NULL,
    dni VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    PRIMARY KEY (id_empleado)
);

DROP TABLE IF EXISTS turno;
CREATE TABLE IF NOT EXISTS turno(
	id_turno INT AUTO_INCREMENT NOT NULL,
    descripcion VARCHAR(256) NOT NULL,
    horario_inicio TIME NOT NULL, -- Solo muestra la hora como: '10:30:00'
    horario_final TIME NOT NULL,
    PRIMARY KEY (id_turno)
);

DROP TABLE IF EXISTS puesto;
CREATE TABLE IF NOT EXISTS puesto(
	id_puesto INT AUTO_INCREMENT NOT NULL,
    id_turno INT NOT NULL,
    descripcion VARCHAR(256) NOT NULL,
    remuneracion_puesto DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id_puesto),
    FOREIGN KEY (id_turno) REFERENCES turno(id_turno)
);

DROP TABLE IF EXISTS empleado_puesto;
CREATE TABLE IF NOT EXISTS empleado_puesto(
	id_empleado INT NOT NULL,
    id_puesto INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    PRIMARY KEY (id_empleado, id_puesto),
    FOREIGN KEY (id_empleado) REFERENCES empleado(id_empleado),
    FOREIGN KEY (id_puesto) REFERENCES puesto(id_puesto)
);

DROP TABLE IF EXISTS deporte;
CREATE TABLE IF NOT EXISTS deporte(
	id_deporte INT AUTO_INCREMENT NOT NULL,
    descripcion VARCHAR(256) NOT NULL,
    PRIMARY KEY (id_deporte)
);

DROP TABLE IF EXISTS socio_deporte;
CREATE TABLE IF NOT EXISTS socio_deporte(
	id_deporte INT NOT NULL,
    id_socio INT NOT NULL,
    fecha_inscripcion DATE NOT NULL,
    PRIMARY KEY (id_deporte, id_socio),
    FOREIGN KEY (id_deporte) REFERENCES deporte(id_deporte),
    FOREIGN KEY (id_socio) REFERENCES socio(id_socio)
);

DROP TABLE IF EXISTS cuota;
CREATE TABLE IF NOT EXISTS cuota(
	id_cuota INT NOT NULL AUTO_INCREMENT,
    id_socio INT NOT NULL,
    precio_mensual DECIMAL(10,2) NOT NULL,
    fecha_pago DATE NOT NULL,
    PRIMARY KEY(id_cuota),
    FOREIGN KEY (id_socio) REFERENCES socio(id_socio)
);

DROP TABLE IF EXISTS deportista;
CREATE TABLE IF NOT EXISTS deportista(
	id_deportista INT AUTO_INCREMENT NOT NULL,
    id_deporte INT NOT NULL,
	nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(20) NOT NULL,
    dni VARCHAR(20) NOT NULL,
	telefono VARCHAR(20) NOT NULL,
    PRIMARY KEY (id_deportista),
    FOREIGN KEY (id_deporte) REFERENCES deporte(id_deporte)
);

DROP TABLE IF EXISTS contrato;
CREATE TABLE IF NOT EXISTS contrato(
	id_contrato INT AUTO_INCREMENT NOT NULL,
    id_deportista INT NOT NULL,
    id_empleado INT NOT NULL,
    descripcion VARCHAR(256) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    PRIMARY KEY (id_contrato),
    FOREIGN KEY (id_deportista) REFERENCES deportista(id_deportista),
    FOREIGN KEY (id_empleado) REFERENCES empleado(id_empleado)
);

/*DROP TABLE IF EXISTS fichaje;
CREATE TABLE IF NOT EXISTS fichaje(
	id_fichaje INT AUTO_INCREMENT NOT NULL,
	id_contrato INT NOT NULL,
    id_deportista INT NOT NULL,
    fecha_fichaje DATE NOT NULL,
    observacion VARCHAR(256) NOT NULL,
    PRIMARY KEY (id_fichaje),
    FOREIGN KEY (id_contrato) REFERENCES contrato(id_contrato),
    FOREIGN KEY (id_deportista) REFERENCES deportista(id_deportista)
); */

DROP TABLE IF EXISTS fichaje;
DROP TABLE IF EXISTS contrato;
DROP TABLE IF EXISTS empleado_puesto;
DROP TABLE IF EXISTS socio_deporte;
DROP TABLE IF EXISTS cuota;
DROP TABLE IF EXISTS deportista;
DROP TABLE IF EXISTS puesto;
DROP TABLE IF EXISTS turno;
DROP TABLE IF EXISTS deporte;
DROP TABLE IF EXISTS empleado;
DROP TABLE IF EXISTS socio;












