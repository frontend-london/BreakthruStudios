<?
    global $category, $default_action, $category_db, $category_db2;
    $category = 'realizacje';
    $category_db = $category;
    $category_db2 = 'realizacje_galeria';
    $default_action = 'edit';
    
    function generuj_menu() {
            global $category_db;
            $sql = "SELECT * FROM `$category_db`  ORDER BY `ord` ASC";
            $wynik = mysql_query($sql);
            $menu = array();
            while($w = mysql_fetch_array($wynik)) {
                    $menu[] = $w;
            }
            return $menu;
    }

    function generuj_rekord($id='') {
        global $category_db, $category_db2;

        if(!empty($id)) {
            $sql = "SELECT * FROM `$category_db` WHERE `id` = '$id' LIMIT 1";
            $wynik = mysql_query($sql);
            $w = mysql_fetch_array($wynik);
        } else {
            $w = false;
        }

        if(!$w) {
            $sql = "SELECT * FROM `$category_db` ORDER BY `ord` ASC LIMIT 1";
            $wynik = mysql_query($sql);
            $w = mysql_fetch_array($wynik);
        }
        
        /* GALERIA */
        $sql2 = "SELECT * FROM `$category_db2` WHERE `realizacje_id` = '{$w['id']}' ORDER BY `ord` ASC";
        $wynik2 = mysql_query($sql2);
        $w['gallery'] = array();
        while($w2 = mysql_fetch_array($wynik2)) {
            $w['gallery'][] = $w2;
        }

        return $w;
    }

    if(empty($action) && isset($_POST['action'])) $action = $_POST['action'];
    if(empty($action) && isset($_GET['action'])) $action = $_GET['action'];
    if(empty($action)) $action = $default_action;

    $continue = true;

    while($continue):
        $continue = false;

        switch($action):
            case 'edit':
                $t['menu'] = generuj_menu();
                if(empty($id) && isset($_GET['id'])) $id = (int)$_GET['id'];
                if(empty($id)) $id = 0;
                $t['record'] = generuj_rekord($id);
                if($t['record']) {
                    $t['action'] = 'edit-save';
                } else {
                    $t['action'] = 'add-save';
                }
                include("templates/$category.phtml");
                break;

            case 'edit-save':
                $id = escape_data($_POST['id']);
                $tytul_pl = escape_data($_POST['tytul_pl']);
                $rezyseria_pl = escape_data($_POST['rezyseria_pl']);
                $tytul_en = escape_data($_POST['tytul_en']);
                $rezyseria_en = escape_data($_POST['rezyseria_en']);
                $sql = "UPDATE `$category_db` SET `tytul_pl`= '$tytul_pl', `rezyseria_pl` = '$rezyseria_pl', `tytul_en`= '$tytul_en', `rezyseria_en` = '$rezyseria_en' WHERE `id` = '$id'";
                $wynik=mysql_query ($sql);
                
                /* GALERIA */                
                if(!empty($_FILES['image']['name'])) {
                    $order = generuj_order($category_db2);
                    $sql = "INSERT INTO `$category_db2`(`realizacje_id`, `ord`) VALUES(
                                                        '$id', '$order')";
                    $wynik=mysql_query($sql);
                    $id_gallery = mysql_insert_id();
                    
                    $filename = "../images/realizacje/$id_gallery.jpg";
                    $filename_m = "../images/realizacje/{$id_gallery}_m.jpg";
                    @unlink($filename);
                    @unlink($filename_m);
                    stworz_miniature(CMS_TH_WIDTH, CMS_TH_HEIGHT, $_FILES['image']['tmp_name'], $_FILES['image']['type'], $filename_m, 'jpg', true, true, true, true);
                    stworz_miniature(CMS_IMG_WIDTH, CMS_IMG_HEIGHT, $_FILES['image']['tmp_name'], $_FILES['image']['type'], $filename, 'jpg', true, false, false);
                }
                
                if($wynik) $t['message'] = 'Film został poprawnie zmieniony';
                else $t['message'] = 'Wystąpił błąd przy zmianie filmu.';
                
                $continue = true;
                $action = 'edit';
                break;
                
            case 'delete-gallery':
                $id_s = escape_data($_GET['id_s']);
                $wynik=mysql_query ("DELETE FROM `$category_db2` WHERE `id`= '$id_s' LIMIT 1");
                if($wynik) $t['message'] = 'Zdjęcie zostało poprawnie usunięte.';
                else $t['message'] = 'Wystąpił błąd przy usuwaniu zdjęcia.';
                $filename = "../images/realizacje/$id_s}.jpg";
                $filename_m = "../images/realizacje/{$id_s}_m.jpg";
                @unlink($filename);
                @unlink($filename_m);
                $continue = true;
                $action = 'edit';
                break;

            
            case 'add':
                $t['record']['id'] =  'new';
                $t['record']['tytul_pl'] =  '';
                $t['record']['rezyseria_pl'] =  '';
                $t['record']['tytul_en'] =  '';
                $t['record']['rezyseria_en'] =  '';
                $t['menu'] = generuj_menu();
                $t['action'] = 'add-save';
                include("templates/$category.phtml");
                break;

            case 'add-save':
                $tytul_pl = escape_data($_POST['tytul_pl']);
                $rezyseria_pl = escape_data($_POST['rezyseria_pl']);
                $tytul_en = escape_data($_POST['tytul_en']);
                $rezyseria_en = escape_data($_POST['rezyseria_en']);
                $order = generuj_order($category_db);

                $wynik=mysql_query("INSERT INTO `$category_db`(`tytul_pl`, `rezyseria_pl`, `tytul_en`, `rezyseria_en`, `ord`) VALUES(
                                                    '$tytul_pl', '$rezyseria_pl', '$tytul_en', '$rezyseria_en', '$order')");
                if($wynik) {
                        $id = mysql_insert_id();
                        $t['message'] = 'Film został poprawnie dodany';
                } else {
                        unset($id);
                        $t['message'] = 'Wystąpił błąd przy dodawaniu filmu.';
                }
                
                /* GALERIA */                
                if(!empty($_FILES['image']['name'])) {
                    $order = generuj_order($category_db2);
                    $sql = "INSERT INTO `$category_db2`(`realizacje_id`, `ord`) VALUES(
                                                        '$id', '$order')";
                    $wynik=mysql_query($sql);
                    $id_gallery = mysql_insert_id();
                    
                    $filename = "../images/realizacje/$id_gallery.jpg";
                    $filename_m = "../images/realizacje/{$id_gallery}_m.jpg";
                    @unlink($filename);
                    @unlink($filename_m);
                    stworz_miniature(CMS_TH_WIDTH, CMS_TH_HEIGHT, $_FILES['image']['tmp_name'], $_FILES['image']['type'], $filename_m, 'jpg', true, true, true, true);
                    stworz_miniature(CMS_IMG_WIDTH, CMS_IMG_HEIGHT, $_FILES['image']['tmp_name'], $_FILES['image']['type'], $filename, 'jpg', true, false, false);
                }
                

                $continue = true;
                $action = 'edit';
                break;
            
            
            case 'delete':
                $id_s = escape_data($_GET['id_s']);
                $t['record'] = generuj_rekord($id_s);
                
                $sql = "DELETE FROM `$category_db` WHERE `id`= '$id_s' LIMIT 1";
                $wynik=mysql_query ($sql);
                
                foreach ($t['record']['gallery'] as $gallery) {
                    $id_gallery = $gallery['id'];
                    $sql = "DELETE FROM `$category_db2` WHERE `id`= '$id_gallery' LIMIT 1";
                    $wynik=mysql_query ($sql);
                    $filename = "../images/realizacje/$id_gallery.jpg";
                    $filename_m = "../images/realizacje/{$id_gallery}_m.jpg";
                    @unlink($filename);
                    @unlink($filename_m);
                }

                if($wynik) $t['message'] = 'Film został poprawnie usunięty.';
                else $t['message'] = 'Wystąpił błąd przy usuwaniu filmu.';
                $continue = true;
                $action = 'edit';
                break;
            
            /*case 'turnOn':
                $id_s = escape_data($_GET['id_s']);
                $wynik=mysql_query ("UPDATE `$category_db` SET `active`= '1' WHERE id= $id_s");
                if($wynik) $t['message'] = 'News został włączony.';
                else $t['message'] = 'Wystąpił błąd przy włączaniu newsa.';
                $continue = true;
                $action = 'edit';
                break;
            case 'turnOff':
                $id_s = escape_data($_GET['id_s']);
                $wynik=mysql_query ("UPDATE `$category_db` SET `active`= '0' WHERE `id`= '$id_s'");
                if($wynik) $t['message'] = 'News został wyłączony.';
                else $t['message'] = 'Wystąpił błąd przy wyłączaniu newsa.';
                $continue = true;
                $action = 'edit';
                break;
            */
            case 'swap':
                if(isset($_GET['id1']) && isset($_GET['id2'])) {
                    $id1 = $_GET['id1'];
                    $id2 = $_GET['id2'];
                    $wynik = mysql_query("SELECT * FROM `$category_db` WHERE `id` = '$id1' OR `id` = '$id2' LIMIT 2");
                    if($w = mysql_fetch_array($wynik)) {
                        $id1 = $w['id'];
                        $order1 = $w['order'];
                    }

                    if($w = mysql_fetch_array($wynik)) {
                        $id2 = $w['id'];
                        $order2 = $w['order'];
                    }

                    if(!empty($order1) && !empty($order2)) {
                        $wynik=mysql_query ("UPDATE `$category_db` SET `ord`= '$order1' WHERE id= $id2");
                        $wynik=mysql_query ("UPDATE `$category_db` SET `ord`= '$order2' WHERE id= $id1");
                    }
                }

                $continue = true;
                $action = 'edit';
                break;
            case 'swap-gallery':
                if(isset($_GET['id1']) && isset($_GET['id2'])) {
                    $id1 = $_GET['id1'];
                    $id2 = $_GET['id2'];
                    $wynik = mysql_query("SELECT * FROM `$category_db2` WHERE `id` = '$id1' OR `id` = '$id2' LIMIT 2");
                    if($w = mysql_fetch_array($wynik)) {
                        $id1 = $w['id'];
                        $order1 = $w['order'];
                    }

                    if($w = mysql_fetch_array($wynik)) {
                        $id2 = $w['id'];
                        $order2 = $w['order'];
                    }

                    if(!empty($order1) && !empty($order2)) {
                        $wynik=mysql_query ("UPDATE `$category_db2` SET `ord`= $order1 WHERE id= $id2");
                        $wynik=mysql_query ("UPDATE `$category_db2` SET `ord`= $order2 WHERE id= $id1");
                    }
                }

                $continue = true;
                $action = 'edit';
                break;
            default:
                $action = $default_action;
                $continue = true;
        endswitch;
    endwhile;



?>