<?php	defined( "_55NWxxCDu6Tahi4W1958uAtlpG6Vsnvy4eC" ) or die( "Direct Access to this location is not allowed." );

	function printn($string) {
		print($string."\n");
	}

	function polacz_z_baza(&$link) {
		$link=mysql_connect(DB_SERVER,DB_SERVER_USERNAME,DB_SERVER_PASSWORD)
			or die("Nie mogę nawiązać połączenia z bazą danych.");

		mysql_select_db(DB_DATABASE) OR die('Nie udalo mi sie wybrać bazy danych: '.mysql_error());
                
                mysql_query("SET NAMES utf8");
                mysql_query("SET CHARACTER SET utf8");
                mysql_query("SET SESSION collation_connection='utf8_general_ci'");
  	}


	function rozlacz_z_baza(&$link) {
	 	@mysql_close($link);
	}

  	function zalogowany() {
 		if(isset($_SESSION['zalogowany']) && $_SESSION['zalogowany']==true) {
 			$result = true;
 		} else $result = false;
 			
 		return $result;
 		
 	}

 	/**
	 * Funkcja tworzy miniature z obrazka
	 *
	 * @param int $max_width - (maksymalna) szerokość miniatury
	 * @param int $max_height - (maksymalna) wysokość miniatury
	 * @param string $source - ścieżka do obrazka
	 * @param string $source_type typ obrazka. np 'jpg' albo 'image/jpeg'
	 * @param string $dest - ścieżka docelowa miniaturki
	 * @param string $dest_type typ obrazka. np 'jpg'
	 * @param bool $proportional - czy proporcjonalne mają być boki, czy nie ($max_width * $max_height)
	 * @param bool $powieksz - czy ma powiękaszać gdy obrazek jest mniejszy
	 * @param bool $kadruj - czy ma kadrować obrazek (środek) do określonego rozmiaru
	 */
	function stworz_miniature($max_width, $max_height, $source, $source_type, $dest, $dest_type = 'jpg', $proportional = false, $powieksz = true, $kadruj = false) {
	    $size = getimagesize($source);
	    $w = $size[0];
	    $h = $size[1];

	    switch($source_type) {
	        case 'gif':
	        	$simg = imagecreatefromgif($source);
	        	break;
	        case 'image/gif':
	        	$simg = imagecreatefromgif($source);
                        $source_type = 'gif';
	        	break;
	        case 'jpg':
	        	$simg = imagecreatefromjpeg($source);
	        	break;
	        case 'image/jpeg':
	        	$simg = imagecreatefromjpeg($source);
                        $source_type = 'jpg';
	        	break;
	        case 'image/pjpeg':
	        	$simg = imagecreatefromjpeg($source);
                        $source_type = 'jpg';
	        	break;
	        case 'png':
	        	$simg = imagecreatefrompng($source);
                        $source_type = 'png';
	        	break;
	        case 'image/png':
	        	$simg = imagecreatefrompng($source);
                        $source_type = 'png';
	        	break;
                default:
	        	$simg = imagecreatefromjpeg($source);
                        $source_type = 'jpg';
	        	break;
	    }

            if($w==$max_width && $h = $max_height && $source_type == $dest_type) {
                copy($source, $dest);
                return true;
            }
            
            if(!$powieksz) {
                if($max_width>$w) {
                    $max_width = $w;
                }
                if($max_height>$h) {
                    $max_height = $h;
                }
            }
	    if (($proportional) && (!$kadruj)) {

	    	$stosunek_szerokosci = $max_width/$w;
	    	$stosunek_wysokosci = $max_height/$h;
	    	if($stosunek_szerokosci<$stosunek_wysokosci) {
                    $max_height = floor($stosunek_szerokosci*$h);
                } else {
                    $max_width = floor($stosunek_wysokosci*$w);
                }
	    }
	    $dimg = imagecreatetruecolor($max_width, $max_height);

            if(($powieksz) && (($max_height>$h) || ($max_width>$w))) {
                 if($max_height>$h) {
                    $new_height = $max_height;
                    $new_width = floor(($new_height/$h) * $w);
                 } else {
                    $new_width = $max_width;
                    $new_height = floor(($new_width/$w) * $h);
                 }

                 $new_simg = imagecreatetruecolor($new_width, $new_height);
                 imagecopyresampled($new_simg, $simg, 0, 0, 0, 0, $new_width, $new_height, $w, $h);
                 $w = $new_width;
                 $h = $new_height;
                 $simg = $new_simg;
            }

            if($kadruj) {
		 	$x = 0;
			$y = 0;
			$width_ratio = $w/$max_width;  //>1 dla dużej grafiki
			$height_ratio = $h/$max_height;

			if($width_ratio>$height_ratio) {
                                $old_w = $w;
                                $w = floor($height_ratio*$max_width);
				$y = 0;
				$x = floor(($old_w-$w)/2);
			} else {
                                $old_h = $h;
                                $h = floor($width_ratio*$max_height);
				$x = 0;
				$y = floor(($old_h-$h)/2);
			}
		 	imagecopyresampled($dimg, $simg, 0, 0, $x, $y, $max_width, $max_height, $w, $h);

            } else imagecopyresampled($dimg, $simg, 0, 0, 0, 0, $max_width, $max_height, $w, $h);


            $spnMatrix = array( array(-1,-1,-1,),
                                        array(-1,16,-1,),
                                        array(-1,-1,-1));
            $divisor = 8;
            $offset = 0;
            if(function_exists('imageconvolution')) {
              imageconvolution($dimg, $spnMatrix, $divisor, $offset);
            }
	    switch($dest_type) {
	        case 'gif':
		        imagegif($dimg,$dest,85);
		        break;
	        case 'jpg':
		        imagejpeg($dimg,$dest,85);
		        break;
	        case 'png':
		        imagepng($dimg,$dest,9);
		        break;
	    }
    }

	function generate_url($string)
    {
		$trans0 = array
		(
			'ą' => 'a',
			'ć' => 'c',
			'ę' => 'e',
			'ł' => 'l',
			'ń' => 'n',
			'ó' => 'o',
			'ś' => 's',
			'ź' => 'z',
			'ż' => 'z',
		
			'Ą' => 'A',
			'Ć' => 'C',
			'Ę' => 'E',
			'Ł' => 'L',
			'Ń' => 'N',
			'Ó' => 'O',
			'Ś' => 'S',
			'Ź' => 'Z',
			'Ż' => 'Z',
		);

		
		$trans1 = array
		(
			' ' => '-',
			'.' => '',
			',' => '',
			'!' => '',
			'\'' => '',
                        '/' => '',

			'&amp;' => '',
			'&' => '',		
		);
		
		$trans2 = array
		(
			'-------' => '-',
			'------' => '-',
			'-----' => '-',
			'----' => '-',
			'---' => '-',
			'--' => '-',
		);
		
		$string = stripslashes($string);
		$string = trim($string);
		$string = strtr($string, $trans0);
		$string = strtr($string, $trans1);
		$string = strtr($string, $trans2);
                $string = preg_replace("/[^\x9\xA\xD\x20-\x7F]/", "", $string); // strip out non-standard ascii characters
		$string = strtolower($string);
		$string = substr($string, 0, 80);
		$string = urlencode($string);
		
		return $string;	
    }

    function generate_url_db($string, $table, $row, $id = false) {
        $url = generate_url($string);
        $counter = 1;

        if($id) {
            $id_sql = " AND `id`!='$id' ";
        } else {
            $id_sql = '';
        }
        $select = "SELECT * FROM `$table` WHERE `$row`='$url' $id_sql LIMIT 1";
        $wynik = mysql_query($select);
        if($w = mysql_fetch_array($wynik)) {
            $loop = true;
            while($loop) {
                $counter++;
                $url_counter = $url.$counter;
                $select2 = "SELECT * FROM `$table` WHERE `$row`='$url_counter' $id_sql LIMIT 1";
                $wynik2 = mysql_query($select2);
                if(!($w2 = mysql_fetch_array($wynik2))) {
                    $loop = false;
                }
            }
            $url = $url_counter;

        }

        return $url;

    }

    function generate_url_value($url) {
        if(substr($url,0,7)=='http://') {
            $url_value = $url;
        } else {
            $url_value = 'http://'.$url;
        }
        return $url_value;
    }
	
    function escape_data($data) {
    	global $link;
    	if(ini_get('magic_quotes_gpc')) {
    		$data = stripslashes($data);
    	}
    	return mysql_real_escape_string($data, $link);
    }

    function include_default() {
        include('controllers/'.DEFAULT_CONTROLLER.'.php');
    }

    function generuj_long_text_show($text) {
        //$text = stripslashes($text);
        return $text;
    }

    function generuj_long_text_onecolumn_show($text) {
        //$text = stripslashes($text);
        $replace = array('<p>&nbsp;</p>'=>'', '<p>'=>'<p class="white-text"><span>', '<p class=\"white\">' => '<p class="white-text"><span>', '<p class=\"blue\">' => '<p class="blue-text"><span>', '<p class=\"brown\">' => '<p class="brown-text"><span>', '</p>' => '</span></p><br>', '<ul>' => '<ul class="bluearrowul">', '<li class=\"brown\">' => '<li><p class="brown-text"><span>', '<li class=\"blue\">' => '<li><p class="blue-text"><span>', '<li>' => '<li><p class="white-text"><span>', '<li class=\"white\">' => '<li><p class="white-text"><span>', '</li>' => '</span></p></li>');
        $text = strtr($text, $replace);
        $text= '<div class="column2">'.$text;
        if(substr($text,-4)=='<br>') {
            $text = substr($text,0, -4);
        }
        $text.='</div>';
        return $text;
    }

    function generuj_order($category2 = '') {
        global $category;
        if(empty ($category2)) $category2 = $category;
        $wynik = mysql_query("SELECT MAX(id) `m_id` FROM `$category2`");
        $w = mysql_fetch_array($wynik);
        $order = $w['m_id'] + 1;
        return $order;
    }

    function generuj_title_url($title, $id = '', $category2 = '') {
        return generate_url($title);
    }

    function move_to($location) {
        //echo ADRES_CMS.'index.php?category='.$location;
        //index.php?category=cms&action=login
        header('Location: '.ADRES_CMS.'index.php?category='.$location);
        exit();
    }

?>