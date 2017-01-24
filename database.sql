-- phpMyAdmin SQL Dump
-- version 4.6.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Czas generowania: 24 Sty 2017, 16:42
-- Wersja serwera: 5.6.31
-- Wersja PHP: 5.5.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `modul_breakthru`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `realizacje`
--

CREATE TABLE `realizacje` (
  `id` int(11) NOT NULL,
  `ord` int(11) NOT NULL,
  `tytul_pl` varchar(100) NOT NULL,
  `tytul_en` varchar(100) NOT NULL,
  `rezyseria_pl` text NOT NULL,
  `rezyseria_en` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `realizacje`
--

INSERT INTO `realizacje` (`id`, `ord`, `tytul_pl`, `tytul_en`, `rezyseria_pl`, `rezyseria_en`) VALUES
(1, 1, 'Chomiczy Raj', 'Hamsters Heaven, ', 'reż. Paul Bolger ', 'dir. Paul Bolger '),
(2, 2, 'Szkice Chopina', 'Chopin\'s Drawings, ', 'reż. Dorota Kobiela ', 'dir. Dorota Kobiela '),
(3, 3, 'Państwo Chomikowie', 'Fat Hamster', 'reż. Adam Wyrwas  (2011)', 'dir. Adam Wyrwas  (2011)'),
(4, 4, 'Szafa Zbigniewa', 'Zbigniev\'s Cupboard', 'reż. Magdalena Osińska ( 2010 r. ) ', 'dir. Magdalena Osińska ( 2010 r. ) '),
(5, 5, 'Nocna Wyspa', 'Night Island', 'reż. Salvador Maldonado ( 2011 r. ) ', 'dir. Salvador Maldonado ( 2011 r. ) '),
(6, 6, 'Mały Listonosz', 'Little Postman', 'reż. Dorota Kobiela ( 2011 r. ) ', 'dir. Dorota Kobiela ( 2011 r. ) '),
(7, 7, 'Zaczarowany Fortepian', 'The Magic Piano', 'reż. Martin Clapp ( 2011 r. ) ', 'dir. Martin Clapp ( 2011 r. ) '),
(8, 8, 'Latająca Maszyna', 'The Flying Machine', 'reż. Martin Clapp, Geoff Lindsey, Dorota Kobiela ( 2011 r. ) ', 'dir. Martin Clapp, Geoff Lindsey, Dorota Kobiela ( 2011 r. ) '),
(9, 9, 'Skrzaty Fortepianu', 'Spirits of the Piano', 'reż. Magdalena Osińska ( 2011 r. ) ', 'dir. Magdalena Osińska ( 2011 r. ) '),
(10, 10, 'Synek Tatusia', 'Papa’s Boy', 'reż. Leevi Lemmetty ( 2010 r. ) ', 'dir. Leevi Lemmetty ( 2010 r. ) '),
(11, 11, 'Strach na wróble', 'Scarecrow', 'reż. Przemysław Anusiewicz, Janusz Martyn ( 2011 r. ) ', 'dir. Przemysław Anusiewicz, Janusz Martyn ( 2011 r. ) '),
(12, 12, 'PL!INK', 'PL!INK', 'reż. Anne Kristin Berge ( 2011 r. ) ', 'dir. Anne Kristin Berge  ( 2011 r. ) ');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `realizacje_galeria`
--

CREATE TABLE `realizacje_galeria` (
  `id` int(11) NOT NULL,
  `realizacje_id` int(11) NOT NULL,
  `ord` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `realizacje_galeria`
--

INSERT INTO `realizacje_galeria` (`id`, `realizacje_id`, `ord`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 6, 6),
(7, 7, 7),
(8, 8, 8),
(9, 8, 9),
(10, 9, 10),
(11, 10, 11),
(12, 11, 12),
(13, 12, 13);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `realizacje`
--
ALTER TABLE `realizacje`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orde` (`ord`);

--
-- Indexes for table `realizacje_galeria`
--
ALTER TABLE `realizacje_galeria`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ord` (`ord`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `realizacje`
--
ALTER TABLE `realizacje`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT dla tabeli `realizacje_galeria`
--
ALTER TABLE `realizacje_galeria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
