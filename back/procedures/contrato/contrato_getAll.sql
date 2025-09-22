DELIMITER $$
DROP PROCEDURE IF EXISTS contrato_getAll;
CREATE PROCEDURE contrato_getAll()
BEGIN
	SELECT *
    FROM contrato
    ORDER BY id_contrato ASC;
END $$
DELIMITER ;