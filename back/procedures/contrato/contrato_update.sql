DELIMITER $$
DROP PROCEDURE IF EXISTS contrato_update;
CREATE PROCEDURE contrato_update(
IN xid_contrato INT,
IN xid_deportista INT,
IN xid_empleado INT,
IN xdescripcion VARCHAR(256),
IN xfecha_inicio DATE,
IN xfecha_fin DATE
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo actualizar el contrato' as 'result';
    END;
    
    START TRANSACTION;
		UPDATE contrato
        SET id_deportista = xid_deportista,
			id_empleado = xid_empleado,
			descripcion = xdescripcion,
			fecha_inicio = xfecha_inicio,
			fecha_fin = xfecha_fin
		WHERE id_contrato = xid_socio;
        COMMIT;
END $$
DELIMITER ;