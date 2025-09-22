DELIMITER $$
DROP PROCEDURE IF EXISTS deporte_getByID;
CREATE PROCEDURE deporte_getByID(
IN xid_deporte INT
)
BEGIN
	SELECT *
    FROM deporte
    WHERE id_deporte = xid_deporte;
END $$
DELIMITER ;