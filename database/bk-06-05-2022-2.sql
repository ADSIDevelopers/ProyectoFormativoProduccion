-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-05-2022 a las 20:32:48
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `produccion`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `Administrar_Inventario` (IN `p_operacion` VARCHAR(40), IN `P_cantidad` INT, IN `P_produccion` INT, IN `P_inventario` INT)  BEGIN


	if(p_operacion='ActualizarBodega') then

			insert into bodega(fecha,cantidad,fk_inventario,fk_produccion)
			values(curdate(),P_cantidad,P_inventario,P_produccion);

			update inventario set stock=stock+P_cantidad where id_inventario=P_inventario;
				
              select 'Inventario actualizado al punto de venta..' as mensaje;   
	end if;



END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Administrar_Reserva` (IN `p_operacion` VARCHAR(20), IN `p_persona` BIGINT)  BEGIN

declare cant int;
declare tipo_mov varchar(20);
-- Buscar movimientso tipo reserva en estado Reservado

select rol into tipo_mov from personas where identificacion=p_persona;

if(p_operacion='Buscar_Reserva') then

			if (tipo_mov='Vocero') then 
				set tipo_mov='Grupal';
                else
                set tipo_mov='Individual';
            
            end if;
            

	      SELECT count(*) into cant FROM movimientos where fk_persona= p_persona and estado='Reservado';
        
		
		  if (cant>0) then
			update movimientos set Fecha=CURDATE() where fk_persona=p_persona and estado='Reservado';
				
			else
				insert into movimientos(Estado,Fecha,fk_persona,tipo)values('Reservado',CURDATE(),p_persona,tipo_mov);
		  end if;
        
           
          
	SELECT distinct m.Id_movimiento,m.tipo,per.Cargo,per.Rol,per.identificacion,per.Nombres as Persona,per.ficha,d.id_detalle,p.Nombre,d.cantidad,d.valor as valor,(d.valor * d.cantidad) as subtotal,
    (select pn.nombres from personas pn where pn.identificacion=d.persona)as aprendiz
    FROM movimientos m
	join personas per on per.identificacion = fk_Persona
    left join detalle d on d.fk_Id_movimiento= m.Id_movimiento
    left join inventario iv on iv.id_inventario= d.fk_id_inventario
    left join productos p on p.Codigo_pdto= iv.fk_codigo_pdto
    left join precios pr on pr.fk_producto= p.Codigo_pdto and pr.fk_cargo=per.cargo
   
    where m.fk_persona=p_persona and m.Estado = 'Reservado';
          


end if;




END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Administrar_Ventas` (IN `P_operacion` VARCHAR(40), IN `P_persona` BIGINT, IN `P_id_movimiento` INT)  BEGIN
declare cant int;
declare ID_INV int;
declare CANTIDAD_MOV int;
declare ESTADO_MOV varchar(20);
declare finloop boolean default false;

DECLARE InventarioProducto CURSOR FOR  select fk_id_inventario,estado,cantidad from detalle  where fk_id_movimiento=P_id_movimiento;
DECLARE CONTINUE HANDLER FOR  SQLSTATE '02000' SET finloop= TRUE;



if(P_operacion='NuevaVenta') then

				SELECT count(*) into cant FROM movimientos where fk_persona= P_persona and estado='Reservado';


				 if (cant>0) then
								update movimientos set Fecha=CURDATE() where fk_persona=p_persona and estado='Reservado';
							else
								insert into movimientos(Estado,Fecha,fk_persona,tipo)values('Reservado',CURDATE(),p_persona,'Individual');
					
					end if; -- fin del condicioanal cant>0
    
    
end if;-- fin del condicioanal P_operacion='NuevaVenta'





-- cambiar de estado el movimiento de estado reservado a facturado
 if(P_operacion='Facturar') then

	update movimientos set estado='Facturado' where Id_movimiento= P_id_movimiento;
  -- update detalle set estado='Facturado' where fk_Id_movimiento= P_id_movimiento;
 
  OPEN InventarioProducto;

		ciclo: LOOP -- inicia el for
		     FETCH InventarioProducto INTO ID_INV,ESTADO_MOV,CANTIDAD_MOV; -- copiamos los datos
               
           --  select ID_INV,ESTADO_MOV,CANTIDAD_MOV;
           
           /*
           if(ESTADO_MOV='Entregado') then
					update inventario set stock=stock-CANTIDAD_MOV  where id_inventario=ID_INV;
			end if;
        
        */
        
				IF finloop THEN
					LEAVE ciclo;
				END IF;  
                
		END LOOP ciclo;
    
  CLOSE InventarioProducto;
  
  

 
  end if; -- fin del if facturar
  
  
  
					SELECT distinct m.Id_movimiento,m.tipo,per.identificacion,per.Nombres as nomb_comprador,d.id_detalle,p.Nombre as producto,d.cantidad,d.valor,(d.valor * d.cantidad) as subtotal,
					(select pn.nombres from personas pn where pn.identificacion=d.persona)as persona
					FROM movimientos m
					join personas per on per.identificacion = fk_Persona
					left join detalle d on d.fk_Id_movimiento= m.Id_movimiento
					left join inventario iv on iv.id_inventario= d.fk_id_inventario
					left join productos p on p.Codigo_pdto= iv.fk_codigo_pdto
					left join precios pr on pr.fk_producto= p.Codigo_pdto and pr.fk_cargo=per.cargo
		
					where m.fk_persona=p_persona and m.Estado = 'Reservado';


END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bodega`
--

CREATE TABLE `bodega` (
  `id_bodega` int(11) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `fk_inventario` int(11) DEFAULT NULL,
  `fk_produccion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `bodega`
--

INSERT INTO `bodega` (`id_bodega`, `fecha`, `cantidad`, `fk_inventario`, `fk_produccion`) VALUES
(4, '2022-04-25 00:00:00', 20, 9, 6),
(5, '2022-04-25 00:00:00', 20, 9, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargo`
--

CREATE TABLE `cargo` (
  `idcargo` int(11) NOT NULL,
  `nombre_cargo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cargo`
--

INSERT INTO `cargo` (`idcargo`, `nombre_cargo`) VALUES
(1, 'Aprendiz'),
(2, 'Instructor'),
(3, 'Administrativos'),
(4, 'externo'),
(5, 'auxiliares');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle`
--

CREATE TABLE `detalle` (
  `id_detalle` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `Estado` enum('Facturado','Entregado','No Entregado','Anulado') DEFAULT NULL,
  `Persona` bigint(20) DEFAULT NULL,
  `fk_Id_movimiento` int(11) NOT NULL,
  `fk_id_inventario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `detalle`
--

INSERT INTO `detalle` (`id_detalle`, `cantidad`, `valor`, `Estado`, `Persona`, `fk_Id_movimiento`, `fk_id_inventario`) VALUES
(2, 1, '10000.00', 'No Entregado', 1007163342, 6, 5),
(22, 1, '1000.00', 'No Entregado', 96361787, 7, 5),
(45, 1, '10000.00', 'No Entregado', 96361787, 15, 14),
(51, 2, '10000.00', 'No Entregado', 96361787, 15, 8),
(54, 1, '10000.00', 'Facturado', 1004442967, 14, 14),
(55, 1, '10000.00', 'Facturado', 1006947348, 14, 14),
(56, 1, '10000.00', 'No Entregado', 1116912148, 16, 14),
(58, 1, '2000.00', 'Entregado', 96361787, 18, 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id_inventario` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `fk_codigo_pdto` int(11) NOT NULL,
  `fk_id_punto_vent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`id_inventario`, `stock`, `fk_codigo_pdto`, `fk_id_punto_vent`) VALUES
(1, 50, 1, 4),
(2, 50, 2, 4),
(3, 50, 3, 4),
(4, 50, 4, 3),
(5, 50, 5, 4),
(6, 50, 6, 1),
(7, 12, 11, 2),
(8, 32, 9, 4),
(9, 40, 1, 7),
(10, 0, 6, 6),
(11, 0, 5, 6),
(12, 0, 6, 2),
(13, 0, 6, 8),
(14, 0, 7, 8);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `lista_produccion_up`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `lista_produccion_up` (
`Id_produccion` int(11)
,`fecha` date
,`Codigo_pdto` int(11)
,`producto` varchar(50)
,`Estado` enum('Producido','Aceptado','Rechazado')
,`codigo_up` int(11)
,`nomb_up` varchar(40)
,`Producido` int(11)
,`Distribuido` decimal(32,0)
,`Disponible` decimal(33,0)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `lista_productos`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `lista_productos` (
`Id_punto_vent` int(11)
,`Nombre` varchar(30)
,`id_inventario` int(11)
,`Producto` varchar(50)
,`descripcion` varchar(80)
,`imagen` varchar(80)
,`reserva` enum('Si','No')
,`estado` enum('Activo','Inactivo')
,`maxreserva` int(11)
,`tipo` enum('Venta','Servicio')
,`stock` int(11)
,`codigo_up` int(11)
,`nomb_up` varchar(40)
,`aprendiz` decimal(10,2)
,`instructor` decimal(10,2)
,`administrativo` decimal(10,2)
,`externo` decimal(10,2)
,`auxiliar` decimal(10,2)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientos`
--

CREATE TABLE `movimientos` (
  `Id_movimiento` int(11) NOT NULL,
  `Estado` enum('Reservado','Facturado','Anulado') DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `fk_persona` bigint(20) NOT NULL,
  `tipo` enum('Grupal','Individual') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `movimientos`
--

INSERT INTO `movimientos` (`Id_movimiento`, `Estado`, `Fecha`, `fk_persona`, `tipo`) VALUES
(1, 'Reservado', '2022-04-01', 1006947348, 'Individual'),
(2, 'Reservado', '2022-04-01', 1004419254, 'Individual'),
(3, 'Reservado', '2022-04-01', 1004419254, 'Individual'),
(4, 'Reservado', '2022-04-01', 1007163272, 'Individual'),
(6, 'Facturado', '2022-04-01', 1083864069, 'Individual'),
(7, 'Facturado', '2022-05-03', 96361787, 'Individual'),
(14, 'Facturado', '2022-05-04', 1007163342, 'Grupal'),
(15, 'Facturado', '2022-05-04', 96361787, 'Individual'),
(16, 'Reservado', '2022-05-04', 1007163342, 'Grupal'),
(17, 'Facturado', '2022-05-05', 96361787, 'Individual'),
(18, 'Reservado', '2022-05-05', 96361787, 'Individual');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `identificacion` bigint(20) NOT NULL,
  `Nombres` varchar(80) NOT NULL,
  `Correo` varchar(30) DEFAULT NULL,
  `Login` varchar(20) NOT NULL,
  `Password` varchar(15) NOT NULL,
  `Direccion` varchar(40) DEFAULT NULL,
  `Telefono` varchar(15) DEFAULT NULL,
  `Cargo` int(11) DEFAULT NULL,
  `Rol` enum('Invitado','Vocero','Lider UP','Punto Venta',' Admin','Aprendiz') DEFAULT NULL,
  `Ficha` int(11) DEFAULT NULL,
  `Estado` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`identificacion`, `Nombres`, `Correo`, `Login`, `Password`, `Direccion`, `Telefono`, `Cargo`, `Rol`, `Ficha`, `Estado`) VALUES
(96361787, 'Wilson Martinez', NULL, '96361787', '96361787', NULL, NULL, 2, ' Admin', NULL, 1),
(1004419254, 'Jhon Mario', NULL, '1004419254', '1004419254', NULL, NULL, 1, ' Admin', 2252407, 1),
(1004442967, 'Francisco Plazas', NULL, '1004442967', '1004442967', 'casa', NULL, 1, ' Admin', 2252407, 1),
(1006524359, 'Andrea Figueroa', NULL, '1006524359', '1006524359', NULL, '3143841408', 1, ' Admin', 2252407, 1),
(1006947348, 'Edinson', 'krt847@gmail.com', '1006947348', '1006947348', '1234567890', '3102833525', 1, ' Admin', 2252407, 1),
(1007163272, 'Karen', 'kdortega14@gmail.com', '1007163272', '1007163272', 'pitalito', '3212681728', 1, ' Admin', 2252407, 1),
(1007163342, 'Evelin Manuela Bermeo Calderon', 'evelinbermeo05@gmail.com', '1007163342', '1007163342', NULL, '3167390108', 1, 'Vocero', 2252407, 1),
(1083864069, 'Yeinery Daniela Machado Sotelo', 'danielasoteloms1211@gmail.com', '1083864069', '1083864069', NULL, '3144184632', 1, ' Admin', 2252407, 1),
(1116912148, 'Alejandro', 'cubillos@gmail.com', '1116912148', '12345678', 'Mi casa', '313', 3, ' Admin', 2252407, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precios`
--

CREATE TABLE `precios` (
  `id_precio` int(11) NOT NULL,
  `fk_cargo` int(11) DEFAULT NULL,
  `fk_producto` int(11) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `precios`
--

INSERT INTO `precios` (`id_precio`, `fk_cargo`, `fk_producto`, `precio`) VALUES
(1, 1, 1, '500.00'),
(8, 2, 2, '4000.00'),
(21, 5, 3, '1000.00'),
(23, 4, 5, '6000.00'),
(28, 3, 1, '3500.00'),
(30, 2, 1, '5500.00'),
(31, 4, 1, '3500.00'),
(32, 5, 1, '6000.00'),
(33, 1, 2, '3500.00'),
(34, 1, 3, '1500.00'),
(35, 2, 3, '1800.00'),
(37, 1, 4, '5000.00'),
(44, 1, 7, '2000.00'),
(45, 2, 7, '5000.00'),
(46, 3, 7, '4000.00'),
(47, 4, 7, '3000.00'),
(48, 5, 7, '2000.00'),
(49, 3, 2, '3700.00'),
(50, 4, 2, '4200.00'),
(51, 5, 2, '300.00'),
(52, 3, 3, '1700.00'),
(53, 4, 3, '2000.00'),
(54, 2, 4, '7000.00'),
(55, 3, 4, '6000.00'),
(56, 4, 4, '7500.00'),
(58, 5, 4, '4000.00'),
(59, 1, 5, '4000.00'),
(60, 2, 5, '5000.00'),
(61, 3, 5, '5000.00'),
(62, 5, 5, '4000.00'),
(63, 1, 6, '1500.00'),
(64, 2, 6, '1800.00'),
(65, 3, 6, '2000.00'),
(66, 4, 6, '2200.00'),
(67, 5, 6, '1400.00'),
(68, 1, 8, '7000.00'),
(69, 5, 8, '7000.00'),
(70, 2, 8, '7500.00'),
(71, 3, 8, '7700.00'),
(72, 4, 8, '8000.00'),
(73, 1, 9, '2000.00'),
(74, 2, 9, '2400.00'),
(75, 3, 9, '2200.00'),
(76, 4, 9, '2700.00'),
(77, 5, 9, '2000.00'),
(78, 1, 11, '1500.00'),
(79, 2, 11, '2000.00'),
(80, 3, 11, '1800.00'),
(81, 4, 11, '3000.00'),
(82, 5, 11, '2500.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `produccion`
--

CREATE TABLE `produccion` (
  `Id_produccion` int(11) NOT NULL,
  `Estado` enum('Producido','Aceptado','Rechazado') DEFAULT NULL,
  `Cantidad` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `Observacion` varchar(50) DEFAULT NULL,
  `fk_codigo_pdto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `produccion`
--

INSERT INTO `produccion` (`Id_produccion`, `Estado`, `Cantidad`, `fecha`, `Observacion`, `fk_codigo_pdto`) VALUES
(1, 'Aceptado', 500, '2022-04-01', 'Alta calidad', 1),
(2, 'Aceptado', 500, '2022-04-01', 'Alta calidad', 2),
(3, 'Aceptado', 500, '2022-04-02', 'Alta calidad', 3),
(4, 'Aceptado', 500, '2022-04-02', 'Alta calidad', 4),
(5, 'Aceptado', 500, '2022-04-03', 'Alta calidad', 5),
(6, 'Aceptado', 500, '2022-04-03', 'Alta calidad', 6),
(7, 'Producido', 5, '2022-05-02', 'Alta Calidad', 1),
(8, 'Producido', 555, '2022-05-02', 'Alta Calidad', 6),
(9, NULL, 5, '2022-05-03', 'mm', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `Codigo_pdto` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Descripcion` varchar(80) DEFAULT NULL,
  `imagen` varchar(80) DEFAULT NULL,
  `Estado` enum('Activo','Inactivo') DEFAULT NULL,
  `Reserva` enum('Si','No') DEFAULT NULL,
  `MaxReserva` int(11) NOT NULL,
  `Tipo` enum('Venta','Servicio') DEFAULT NULL,
  `fk_codigo_up` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`Codigo_pdto`, `Nombre`, `Descripcion`, `imagen`, `Estado`, `Reserva`, `MaxReserva`, `Tipo`, `fk_codigo_up`) VALUES
(1, 'Papa Criolla', 'Papa economica', '1651586367837product.jpg', 'Activo', 'No', 10, 'Venta', 2),
(2, 'Tomate', 'Muy rico', '1651586393072product.jpg', 'Activo', 'No', 10, 'Venta', 2),
(3, 'Naranja', 'Con mucha vitamina', '1651586407397product.jpg', 'Activo', 'No', 10, 'Venta', 2),
(4, 'Camisas', 'Facheritas', '1651586421922product.jpg', 'Activo', 'No', 10, 'Venta', 8),
(5, 'Huevos', 'Ricos ', '1651586442194product.jpg', 'Activo', 'Si', 10, 'Venta', 2),
(6, 'Tinto', 'Café especial', '1651586461386product.jpg', 'Activo', 'No', 10, 'Venta', 3),
(7, 'Almuerzos', 'Almuerzos especiales', '1651586570718product.jpg', 'Activo', 'Si', 1, 'Venta', 1),
(8, 'Trucha', 'Trucha especial', '1651586675023product.jpg', 'Activo', 'Si', 5, 'Venta', 7),
(9, 'Cebolla larga', 'Cebollin', '1651586728041product.jpg', 'Inactivo', 'Si', 10, 'Venta', 2),
(11, 'Yuca', 'Yuca Fresca', '1651588935696product.jpg', 'Inactivo', 'No', 15, 'Venta', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `punto_venta`
--

CREATE TABLE `punto_venta` (
  `Id_punto_vent` int(11) NOT NULL,
  `Sede` enum('Centro','Yamboro') NOT NULL,
  `Direccion` varchar(30) NOT NULL,
  `Nombre` varchar(30) DEFAULT NULL,
  `fk_persona` bigint(20) NOT NULL,
  `Estado` enum('Activo','Inactivo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `punto_venta`
--

INSERT INTO `punto_venta` (`Id_punto_vent`, `Sede`, `Direccion`, `Nombre`, `fk_persona`, `Estado`) VALUES
(1, 'Yamboro', 'Vereda Yamboro', 'TintosYamboro', 96361787, 'Activo'),
(2, 'Centro', 'Comercio Y servicios', 'SenaStore', 1006947348, 'Activo'),
(3, 'Centro', 'Centro Y Servicios', 'FashonSENA', 1007163342, 'Activo'),
(4, 'Yamboro', 'Vereda Yamboro', 'FruverYamboro', 1006524359, 'Activo'),
(6, 'Centro', 'Pitalito', 'Super Ete', 96361787, 'Activo'),
(7, 'Yamboro', 'detodito', 'sdf', 1004419254, 'Activo'),
(8, 'Yamboro', 'Yamboro', 'Cooperativa Yamboro', 1004419254, 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidades_productivas`
--

CREATE TABLE `unidades_productivas` (
  `codigo_up` int(11) NOT NULL,
  `Nombre` varchar(40) NOT NULL,
  `Logo` varchar(80) DEFAULT NULL,
  `Descripcion` varchar(100) DEFAULT NULL,
  `sede` enum('Yamboro','Centro') DEFAULT NULL,
  `estado` enum('Activo','Inactivo') DEFAULT NULL,
  `entrega_producto` tinyint(1) NOT NULL,
  `fk_persona` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `unidades_productivas`
--

INSERT INTO `unidades_productivas` (`codigo_up`, `Nombre`, `Logo`, `Descripcion`, `sede`, `estado`, `entrega_producto`, `fk_persona`) VALUES
(1, 'Gastronomía', '1651585697549logo-de-SENA-png-Negro-300x300.png', 'Venta de almuerzos especiales', 'Yamboro', 'Activo', 1, 1004419254),
(2, 'Agricola', '1651585783441logo-de-SENA-png-Negro-300x300.png', 'Producción Productos del campo orgánicos', 'Yamboro', 'Activo', 1, 1007163272),
(3, 'Escuela Nacional de la Calidad del Café', '1651585826488logo-de-SENA-png-Negro-300x300.png', '', 'Yamboro', 'Activo', 1, 1006524359),
(4, 'Ambiental – Recursos Naturales', '1651585859314logo-de-SENA-png-Negro-300x300.png', '', 'Yamboro', 'Activo', 1, 1007163272),
(5, 'Agroindustrias', '1651585739401logo-de-SENA-png-Negro-300x300.png', 'Proceso de productos lácteos y cárnicos', 'Yamboro', 'Inactivo', 1, 1006524359),
(6, 'Empresa de Servicios Públicos', '1651585887528logo-de-SENA-png-Negro-300x300.png', '', 'Centro', 'Inactivo', 1, 1083864069),
(7, 'Pecuaria', 'logo-de-SENA-png-Negro-300x300.png', 'Se crían peces', 'Yamboro', 'Activo', 1, 1083864069),
(8, 'Moda – Comercio y Servicios', '1651585924497logo-de-SENA-png-Negro-300x300.png', '', 'Centro', 'Activo', 1, 1004419254),
(12, 'Circo', '1651586820429logoSena.png', 'se hace comedia', 'Yamboro', 'Activo', 1, 1116912148);

-- --------------------------------------------------------

--
-- Estructura para la vista `lista_produccion_up`
--
DROP TABLE IF EXISTS `lista_produccion_up`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `lista_produccion_up`  AS SELECT `pd`.`Id_produccion` AS `Id_produccion`, `pd`.`fecha` AS `fecha`, `pr`.`Codigo_pdto` AS `Codigo_pdto`, `pr`.`Nombre` AS `producto`, `pd`.`Estado` AS `Estado`, `up`.`codigo_up` AS `codigo_up`, `up`.`Nombre` AS `nomb_up`, `pd`.`Cantidad` AS `Producido`, (select sum(`b`.`cantidad`) from `bodega` `b` where `b`.`fk_produccion` = `pd`.`Id_produccion`) AS `Distribuido`, `pd`.`Cantidad`- (select sum(`b`.`cantidad`) from `bodega` `b` where `b`.`fk_produccion` = `pd`.`Id_produccion`) AS `Disponible` FROM ((`produccion` `pd` join `productos` `pr` on(`pr`.`Codigo_pdto` = `pd`.`fk_codigo_pdto`)) join `unidades_productivas` `up` on(`up`.`codigo_up` = `pr`.`fk_codigo_up`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `lista_productos`
--
DROP TABLE IF EXISTS `lista_productos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `lista_productos`  AS SELECT `pv`.`Id_punto_vent` AS `Id_punto_vent`, `pv`.`Nombre` AS `Nombre`, `i`.`id_inventario` AS `id_inventario`, `p`.`Nombre` AS `Producto`, `p`.`Descripcion` AS `descripcion`, `p`.`imagen` AS `imagen`, `p`.`Reserva` AS `reserva`, `p`.`Estado` AS `estado`, `p`.`MaxReserva` AS `maxreserva`, `p`.`Tipo` AS `tipo`, `i`.`stock` AS `stock`, `up`.`codigo_up` AS `codigo_up`, `up`.`Nombre` AS `nomb_up`, (select `pr`.`precio` from `precios` `pr` where `pr`.`fk_producto` = `p`.`Codigo_pdto` and `pr`.`fk_cargo` = 1) AS `aprendiz`, (select `pr`.`precio` from `precios` `pr` where `pr`.`fk_producto` = `p`.`Codigo_pdto` and `pr`.`fk_cargo` = 2) AS `instructor`, (select `pr`.`precio` from `precios` `pr` where `pr`.`fk_producto` = `p`.`Codigo_pdto` and `pr`.`fk_cargo` = 3) AS `administrativo`, (select `pr`.`precio` from `precios` `pr` where `pr`.`fk_producto` = `p`.`Codigo_pdto` and `pr`.`fk_cargo` = 4) AS `externo`, (select `pr`.`precio` from `precios` `pr` where `pr`.`fk_producto` = `p`.`Codigo_pdto` and `pr`.`fk_cargo` = 5) AS `auxiliar` FROM (((`punto_venta` `pv` join `inventario` `i` on(`i`.`fk_id_punto_vent` = `pv`.`Id_punto_vent`)) join `productos` `p` on(`p`.`Codigo_pdto` = `i`.`fk_codigo_pdto`)) join `unidades_productivas` `up` on(`up`.`codigo_up` = `p`.`fk_codigo_up`)) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bodega`
--
ALTER TABLE `bodega`
  ADD PRIMARY KEY (`id_bodega`),
  ADD KEY `bodega_inventario_idx` (`fk_inventario`),
  ADD KEY `bodega_produccion_idx` (`fk_produccion`);

--
-- Indices de la tabla `cargo`
--
ALTER TABLE `cargo`
  ADD PRIMARY KEY (`idcargo`);

--
-- Indices de la tabla `detalle`
--
ALTER TABLE `detalle`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `tiene_1` (`fk_Id_movimiento`),
  ADD KEY `tiene_2` (`fk_id_inventario`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id_inventario`),
  ADD UNIQUE KEY `unique_pv_pto` (`fk_id_punto_vent`,`fk_codigo_pdto`),
  ADD KEY `tiene_3` (`fk_id_punto_vent`),
  ADD KEY `tiene_4` (`fk_codigo_pdto`);

--
-- Indices de la tabla `movimientos`
--
ALTER TABLE `movimientos`
  ADD PRIMARY KEY (`Id_movimiento`),
  ADD KEY `comprar` (`fk_persona`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`identificacion`),
  ADD KEY `persona_cargo_idx` (`Cargo`);

--
-- Indices de la tabla `precios`
--
ALTER TABLE `precios`
  ADD PRIMARY KEY (`id_precio`),
  ADD UNIQUE KEY `unique_precios` (`fk_producto`,`fk_cargo`),
  ADD KEY `precio_cargo_idx` (`fk_cargo`),
  ADD KEY `precio_prodcuto_idx` (`fk_producto`);

--
-- Indices de la tabla `produccion`
--
ALTER TABLE `produccion`
  ADD PRIMARY KEY (`Id_produccion`),
  ADD KEY `Fabrica` (`fk_codigo_pdto`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`Codigo_pdto`),
  ADD KEY `Genera` (`fk_codigo_up`);

--
-- Indices de la tabla `punto_venta`
--
ALTER TABLE `punto_venta`
  ADD PRIMARY KEY (`Id_punto_vent`),
  ADD KEY `encargado` (`fk_persona`);

--
-- Indices de la tabla `unidades_productivas`
--
ALTER TABLE `unidades_productivas`
  ADD PRIMARY KEY (`codigo_up`),
  ADD KEY `Asignar` (`fk_persona`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bodega`
--
ALTER TABLE `bodega`
  MODIFY `id_bodega` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `cargo`
--
ALTER TABLE `cargo`
  MODIFY `idcargo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `detalle`
--
ALTER TABLE `detalle`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id_inventario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `movimientos`
--
ALTER TABLE `movimientos`
  MODIFY `Id_movimiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `precios`
--
ALTER TABLE `precios`
  MODIFY `id_precio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT de la tabla `produccion`
--
ALTER TABLE `produccion`
  MODIFY `Id_produccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `Codigo_pdto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `punto_venta`
--
ALTER TABLE `punto_venta`
  MODIFY `Id_punto_vent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `unidades_productivas`
--
ALTER TABLE `unidades_productivas`
  MODIFY `codigo_up` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bodega`
--
ALTER TABLE `bodega`
  ADD CONSTRAINT `bodega_inventario` FOREIGN KEY (`fk_inventario`) REFERENCES `inventario` (`id_inventario`),
  ADD CONSTRAINT `bodega_produccion` FOREIGN KEY (`fk_produccion`) REFERENCES `produccion` (`Id_produccion`);

--
-- Filtros para la tabla `detalle`
--
ALTER TABLE `detalle`
  ADD CONSTRAINT `tiene_1` FOREIGN KEY (`fk_Id_movimiento`) REFERENCES `movimientos` (`Id_movimiento`),
  ADD CONSTRAINT `tiene_2` FOREIGN KEY (`fk_id_inventario`) REFERENCES `inventario` (`id_inventario`);

--
-- Filtros para la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `tiene_3` FOREIGN KEY (`fk_id_punto_vent`) REFERENCES `punto_venta` (`Id_punto_vent`),
  ADD CONSTRAINT `tiene_4` FOREIGN KEY (`fk_codigo_pdto`) REFERENCES `productos` (`Codigo_pdto`);

--
-- Filtros para la tabla `movimientos`
--
ALTER TABLE `movimientos`
  ADD CONSTRAINT `movimientos_ibfk_1` FOREIGN KEY (`fk_persona`) REFERENCES `personas` (`identificacion`);

--
-- Filtros para la tabla `personas`
--
ALTER TABLE `personas`
  ADD CONSTRAINT `persona_cargo` FOREIGN KEY (`Cargo`) REFERENCES `cargo` (`idcargo`);

--
-- Filtros para la tabla `precios`
--
ALTER TABLE `precios`
  ADD CONSTRAINT `precio_cargo` FOREIGN KEY (`fk_cargo`) REFERENCES `cargo` (`idcargo`),
  ADD CONSTRAINT `precio_prodcuto` FOREIGN KEY (`fk_producto`) REFERENCES `productos` (`Codigo_pdto`);

--
-- Filtros para la tabla `produccion`
--
ALTER TABLE `produccion`
  ADD CONSTRAINT `produccion_ibfk_1` FOREIGN KEY (`fk_codigo_pdto`) REFERENCES `productos` (`Codigo_pdto`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`fk_codigo_up`) REFERENCES `unidades_productivas` (`codigo_up`);

--
-- Filtros para la tabla `punto_venta`
--
ALTER TABLE `punto_venta`
  ADD CONSTRAINT `punto_venta_ibfk_1` FOREIGN KEY (`fk_persona`) REFERENCES `personas` (`identificacion`);

--
-- Filtros para la tabla `unidades_productivas`
--
ALTER TABLE `unidades_productivas`
  ADD CONSTRAINT `unidades_productivas_ibfk_1` FOREIGN KEY (`fk_persona`) REFERENCES `personas` (`identificacion`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
