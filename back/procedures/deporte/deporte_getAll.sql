DELIMITER $$
DROP PROCEDURE IF EXISTS deporte_getAll;
CREATE PROCEDURE deporte_getAll()
BEGIN
	SELECT *
    FROM deporte
    ORDER BY id_deporte ASC;
END $$
DELIMITER ; 