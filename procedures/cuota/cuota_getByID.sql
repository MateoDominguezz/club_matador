DELIMITER $$
DROP PROCEDURE IF EXISTS cuota_getByID;
CREATE PROCEDURE cuota_getByID(
IN xid_cuota INT
)
BEGIN
	SELECT *
    FROM cuota
    WHERE id_cuota = xid_cuota;
END $$
DELIMITER ;