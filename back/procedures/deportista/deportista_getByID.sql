DELIMITER $$
DROP PROCEDURE IF EXISTS deportista_getByID;
CREATE PROCEDURE deportista_getByID(
IN xid_deportista INT
)
BEGIN
	SELECT *
    FROM deportista
    WHERE id_deportista = xid_deportista;
END $$
DELIMITER ;