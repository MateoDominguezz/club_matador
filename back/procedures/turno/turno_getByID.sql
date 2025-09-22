DELIMITER $$
DROP PROCEDURE IF EXISTS turno_getByID;
CREATE PROCEDURE turno_getByID(
IN xid_turno INT
)
BEGIN
	SELECT *
    FROM turno
    WHERE id_turno = xid_turno;
END $$
DELIMITER ;