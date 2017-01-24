<?php
    define( "_55NWxxCDu6Tahi4W1958uAtlpG6Vsnvy4eC", 1);
    require('admin/include/_data.php');
    require('admin/include/functions.php');
    polacz_z_baza($link);
    
    error_reporting(0);
    
    
    $category_db = 'realizacje';
    $category_db2 = 'realizacje_galeria';
    
    $sql = "SELECT * FROM `$category_db`  ORDER BY `ord` ASC";
    $wynik = mysql_query($sql);
    $realizacje = array();
    while($w = mysql_fetch_array($wynik)) {
        /* GALERIA */
        $sql2 = "SELECT * FROM `$category_db2` WHERE `realizacje_id` = '{$w['id']}' ORDER BY `ord` ASC";
        $wynik2 = mysql_query($sql2);
        $w['gallery'] = array();
        while($w2 = mysql_fetch_array($wynik2)) {
            $w['gallery'][] = $w2;
        }
        
        $realizacje[] = $w;
    }
    
    rozlacz_z_baza($link);
    
    define('LANG', 'en');
    
    include('templates/english.phtml');
?>