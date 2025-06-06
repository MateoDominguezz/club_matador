DELIMITER $$
DROP PROCEDURE IF EXISTS puesto_insert;
CREATE PROCEDURE puesto_insert(
IN xid_turno INT,
IN xdescripcion VARCHAR(256),
IN xremuneracion_puesto DECIMAL(10,2)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo insertar el puesto' as 'result';
    END;
    
    START TRANSACTION;
		INSERT INTO puesto(id_turno, descripcion, remuneracion_puesto)
        VALUES (
        xid_turno,
        xdescripcion,
        xremuneracion_puesto
        );
        COMMIT;
        SELECT 'Se pudo insertar el puesto' as 'result';
END $$
DELIMITER ;