DELIMITER $$
DROP PROCEDURE IF EXISTS socio_deporte_getByID;
CREATE PROCEDURE socio_deporte_getByID(
IN xid_deporte INT,
IN xid_socio INT
)
BEGIN
	SELECT *
    FROM cuota
    WHERE id_deporte = xid_deporte AND id_socio = xid_socio;
END $$
DELIMITER ;