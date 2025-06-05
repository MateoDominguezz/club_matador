DELIMITER $$
DROP PROCEDURE IF EXISTS cuota_update;
CREATE PROCEDURE cuota_update(
IN xid_cuota INT,
IN xid_socio INT,
IN precio_mensual DECIMAL(10,2),
IN fecha_pago DATE
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo actualizar la cuota' as 'result';
    END;
    
    START TRANSACTION;
		UPDATE cuota
        SET id_socio = xid_socio,
			precio_mensual = xprecio_mensual,
            fecha_pago = xfecha_pago
		WHERE id_cuota = xid_cuota;
        COMMIT;
END $$
DELIMITER ;