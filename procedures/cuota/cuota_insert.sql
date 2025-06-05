DELIMITER $$
DROP PROCEDURE IF EXISTS cuota_insert;
CREATE PROCEDURE cuota_insert(
IN xid_socio INT,
IN xprecio_mensual DECIMAL(10,2),
IN xfecha_pago DATE
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo insertar la cuota' as 'result';
    END;
    
    START TRANSACTION;
		INSERT INTO cuota(id_socio, precio_mensual, fecha_pago)
        VALUES (
        xid_socio,
        xprecio_mensual,
        xfecha_pago
        );
        COMMIT;
        SELECT 'Se pudo insertar la cuota' as 'result';
END $$
DELIMITER ;