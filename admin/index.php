<?php

	define( "_55NWxxCDu6Tahi4W1958uAtlpG6Vsnvy4eC", 1);
 	require('include/_data.php');

	if (isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW'])) {
		if ($_SERVER['PHP_AUTH_USER'] != WT_CMS_USERNAME || $_SERVER['PHP_AUTH_PW'] != WT_CMS_PASSWORD) {

			header('WWW-Authenticate: Basic realm="Protected area"');
			header('HTTP/1.0 401 Unauthorized');

			die('Login failed!');
		} 
	}

	
        require('include/config.php');
        require('include/functions.php');
        
        define('ADRES_CMS', ADRES.'admin/');
 	
	polacz_z_baza($link);
	
        $category = DEFAULT_CONTROLLER;
 	
        $filename = 'controllers/'.$category.'.php';
        include($filename);
	
	rozlacz_z_baza($link);
?>