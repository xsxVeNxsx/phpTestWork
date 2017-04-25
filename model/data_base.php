<?php

require_once "config.php";

class Data_Base
{
    public $db;

    public function __construct()
    {
        $host = Config::get("DB", "host");
        $name = Config::get("DB", "name");
        $user = Config::get("DB", "user");
        $pass = Config::get("DB", "pass");
        $this->db = new PDO('mysql:host='.$host.';dbname='.$name, $user, $pass, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
        $this->db->query('SET character_set_connection = utf8');
        $this->db->query('SET character_set_client = utf8');
        $this->db->query('SET character_set_results = utf8');
    }
}
