DELIMITER $$
DROP PROCEDURE IF EXISTS deportista_getAll;
CREATE PROCEDURE deportista_getAll()
BEGIN
	SELECT *
    FROM deportista
    ORDER BY id_deportista ASC;
END $$
DELIMITER ;