DELIMITER $$
DROP PROCEDURE IF EXISTS contrato_getByID;
CREATE PROCEDURE contrato_getByID(
IN xid_contrato INT
)
BEGIN
	SELECT *
    FROM contrato
    WHERE id_contrato = xid_contrato;
END $$
DELIMITER ;