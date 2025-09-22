DELIMITER $$
DROP PROCEDURE IF EXISTS deporte_insert;
CREATE PROCEDURE deporte_insert(
IN xdescripcion VARCHAR(256)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo insertar el deporte' as 'result';
    END;
    
    START TRANSACTION;
		INSERT INTO deporte(descripcion)
        VALUES (
        xdescripcion
        );
        COMMIT;
        SELECT 'Se pudo insertar el deporte' as 'result';
END $$
DELIMITER ;