DELIMITER $$
DROP PROCEDURE IF EXISTS socio_getByID;
CREATE PROCEDURE socio_getByID(
IN xid_socio INT
)
BEGIN
	SELECT *
    FROM socio
    WHERE id_socio = xid_socio;
END $$
DELIMITER ;