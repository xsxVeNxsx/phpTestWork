<?php

include_once "validation/base_validation.php";

class User_Validation extends Base_Validation
{
    protected $fields = array("name" => ["requered", "name"], "password" => ["requered"]);

    protected function name($params, $field)
    {
        if (strlen($params[$field]) > 100)
            throw new Exception("'Name' maximum length is 100");
    }
}
