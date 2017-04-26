<?php

include_once "validation/base_validation.php";

class User_Validation extends Base_Validation
{
    protected $fields_params = ["name" => ["max_len" => 100]];
    protected $fields = array("name" => ["requered", "max_len"], "password" => ["requered"]);
}
