<?php

require_once "config.php";
require_once 'model/base_model.php';
require_once 'validation/user_validation.php';

class Users_Model extends Base_Model
{
    public function __construct()
    {
        parent::__construct('users', ['name', 'password']);
    }

    public function add($params)
    {
        $params["password"] = md5(Config::get("DB", "salt").$params["password"]);
        parent::add($params);
    }

    public function is_user($params)
    {
        (new User_Validation())->check($params);
        return count($this->get([
            "name" => $params["name"],
            "password" => md5(Config::get("DB", "salt").$params["password"])
            ]
        )['data']) > 0;
    }
}
