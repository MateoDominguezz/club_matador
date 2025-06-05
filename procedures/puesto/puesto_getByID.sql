DELIMITER $$
DROP PROCEDURE IF EXISTS puesto_getByID;
CREATE PROCEDURE puesto_getByID(
IN xid_puesto INT
)
BEGIN
	SELECT *
    FROM puesto
    WHERE id_puesto = xid_puesto;
END $$
DELIMITER ;