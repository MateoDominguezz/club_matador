DELIMITER $$
DROP PROCEDURE IF EXISTS socio_deporte_insert;
CREATE PROCEDURE socio_deporte_insert(
IN xid_deporte INT,
IN xid_socio INT,
IN xfecha_inscripcion DATE
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo insertar el socio con el puesto' as 'result';
    END;
    
    START TRANSACTION;
		INSERT INTO socio_deporte (id_deporte, id_socio, fecha_inscripcion)
        VALUES (
        xid_deporte,
        xid_socio,
        xfecha_inscripcion
        );
        COMMIT;
        SELECT 'Se pudo insertar el socio con el deporte' as 'result';
END $$
DELIMITER ;